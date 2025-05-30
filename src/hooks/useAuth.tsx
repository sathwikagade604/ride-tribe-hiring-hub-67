
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

type AppRole = 'admin' | 'driver' | 'rider' | 'support';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasRole: (role: AppRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          // Log security event - using a direct query instead of RPC for now
          try {
            await supabase
              .from('security_audit_log')
              .insert([{
                user_id: session.user.id,
                action: 'user_login',
                resource: 'authentication'
              }]);
          } catch (error) {
            console.log('Security logging error:', error);
          }
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    
    if (error) {
      toast.error(`Sign up failed: ${error.message}`);
    } else {
      toast.success('Please check your email to confirm your account');
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      toast.error(`Sign in failed: ${error.message}`);
      // Log failed login attempt
      try {
        await supabase
          .from('security_audit_log')
          .insert([{
            action: 'failed_login',
            resource: 'authentication'
          }]);
      } catch (logError) {
        console.log('Security logging error:', logError);
      }
    }
    
    return { error };
  };

  const signOut = async () => {
    if (user) {
      try {
        await supabase
          .from('security_audit_log')
          .insert([{
            user_id: user.id,
            action: 'user_logout',
            resource: 'authentication'
          }]);
      } catch (error) {
        console.log('Security logging error:', error);
      }
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`Sign out failed: ${error.message}`);
    }
  };

  const hasRole = async (role: AppRole): Promise<boolean> => {
    if (!user) return false;
    
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: role
    });
    
    if (error) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    return data || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
