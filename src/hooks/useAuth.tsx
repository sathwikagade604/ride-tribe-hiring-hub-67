import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

type AppRole = 'admin' | 'driver' | 'rider' | 'employee';

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
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please try logging in instead.');
        } else if (error.message.includes('invalid email')) {
          toast.error('Please enter a valid email address.');
        } else if (error.message.includes('Password should be')) {
          toast.error('Password should be at least 6 characters long.');
        } else {
          toast.error(`Sign up failed: ${error.message}`);
        }
        return { error };
      }

      if (data.user && !data.session) {
        toast.success('Account created successfully! Please check your email to verify your account before logging in.');
      } else if (data.session) {
        toast.success('Account created and verified successfully!');
        
        // Create appropriate profile based on user type
        if (userData?.user_type === 'driver') {
          try {
            await supabase
              .from('driver_profiles')
              .insert([{
                user_id: data.user.id,
                license_number: userData.license_number || 'TEMP_LICENSE',
                vehicle_type: userData.vehicle_type || 'sedan',
                phone_number: userData.phone
              }]);
          } catch (profileError) {
            console.error('Error creating driver profile:', profileError);
          }
        } else if (userData?.user_type === 'rider') {
          try {
            await supabase
              .from('rider_profiles')
              .insert([{
                user_id: data.user.id,
                phone_number: userData.phone
              }]);
          } catch (profileError) {
            console.error('Error creating rider profile:', profileError);
          }
        } else if (userData?.user_type === 'employee') {
          try {
            // Store employee data in profiles table
            await supabase
              .from('profiles')
              .insert([{
                id: data.user.id,
                email: data.user.email!,
                full_name: userData.full_name,
                phone: userData.phone || '0000000000',
                user_type: 'employee'
              }]);
          } catch (profileError) {
            console.error('Error creating employee profile:', profileError);
          }
        }

        // Assign user role based on user type
        if (userData?.user_type) {
          try {
            await supabase.rpc('assign_user_role', {
              _user_id: data.user.id,
              _role: userData.user_type
            });
          } catch (roleError) {
            console.error('Error assigning user role:', roleError);
          }
        }
      }
      
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred during signup');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and click the verification link before logging in.');
        } else if (error.message.includes('Too many requests')) {
          toast.error('Too many login attempts. Please wait a moment and try again.');
        } else if (error.message.includes('invalid_grant')) {
          toast.error('Please verify your email address before logging in.');
        } else {
          toast.error(`Sign in failed: ${error.message}`);
        }
        return { error };
      }

      if (data.session && data.user) {
        // Check if user has verified their email
        if (!data.user.email_confirmed_at) {
          await supabase.auth.signOut();
          toast.error('Please verify your email address before logging in. Check your inbox for a verification link.');
          return { error: new Error('Email not verified') };
        }
        
        toast.success('Login successful!');
      }
      
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred during login');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast.error(`Sign out failed: ${error.message}`);
      } else {
        toast.success('Logged out successfully');
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred during logout');
    }
  };

  const hasRole = async (role: AppRole): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: role
      });
      
      if (error) {
        console.error('Error checking user role:', error);
        return false;
      }
      
      return data || false;
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
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
