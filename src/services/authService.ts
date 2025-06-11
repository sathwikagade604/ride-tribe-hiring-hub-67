
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { AppRole } from '@/types/auth';

export const signUpUser = async (email: string, password: string, userData?: any) => {
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
      
      // Create profiles after successful signup
      await createUserProfile(data.user, userData);
      await assignUserRole(data.user.id, userData?.user_type);
    }
    
    return { error: null };
  } catch (error) {
    console.error('Signup error:', error);
    toast.error('An unexpected error occurred during signup');
    return { error };
  }
};

export const signInUser = async (email: string, password: string) => {
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

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      toast.error(`Sign out failed: ${error.message}`);
    } else {
      toast.success('Logged out successfully');
    }
    return { error };
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('An unexpected error occurred during logout');
    return { error };
  }
};

export const checkUserRole = async (userId: string, role: AppRole): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
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

const createUserProfile = async (user: any, userData?: any) => {
  try {
    if (userData?.user_type === 'driver') {
      await supabase
        .from('driver_profiles')
        .insert([{
          user_id: user.id,
          license_number: userData.license_number || 'TEMP_LICENSE',
          vehicle_type: userData.vehicle_type || 'sedan',
          phone_number: userData.phone
        }]);
    } else if (userData?.user_type === 'rider') {
      await supabase
        .from('rider_profiles')
        .insert([{
          user_id: user.id,
          phone_number: userData.phone
        }]);
    } else if (userData?.user_type === 'employee') {
      // Store employee data in profiles table
      await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          email: user.email!,
          full_name: userData.full_name,
          phone: userData.phone || '0000000000',
          user_type: 'employee'
        }]);
    }
  } catch (profileError) {
    console.error('Error creating user profile:', profileError);
  }
};

const assignUserRole = async (userId: string, userType: string) => {
  if (!userType) return;
  
  try {
    await supabase.rpc('assign_user_role', {
      _user_id: userId,
      _role: userType
    });
  } catch (roleError) {
    console.error('Error assigning user role:', roleError);
  }
};
