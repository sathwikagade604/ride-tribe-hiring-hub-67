
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PublicAuthForm from './PublicAuthForm';
import CompanyAccessForm from './CompanyAccessForm';
import CompanySignupForm from './CompanySignupForm';
import { RoleSignupValues, RoleLoginValues, CompanyAccessValues, CompanySignupValues } from '@/schemas/authSchemas';

interface RoleBasedAuthProps {
  onSuccess: (role: string) => void;
}

const RoleBasedAuth: React.FC<RoleBasedAuthProps> = ({ onSuccess }) => {
  const { signUp, signIn, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isCompanyAccess, setIsCompanyAccess] = useState(false);
  const [isCompanySignup, setIsCompanySignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignup = async (data: RoleSignupValues) => {
    setIsSubmitting(true);
    try {
      const userData = {
        full_name: data.fullName,
        phone: data.phone,
        user_type: data.role,
        license_number: data.role === 'driver' ? data.licenseNumber : undefined,
      };

      const { error } = await signUp(data.email, data.password, userData);
      
      if (!error) {
        toast.success('Account created successfully! Please check your email to verify your account.');
        setIsSignup(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogin = async (data: RoleLoginValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (!error) {
        toast.success('Login successful!');
        onSuccess(data.role);
      } else {
        toast.error('Invalid credentials or account not verified. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCompanyAccess = async (data: CompanyAccessValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (!error) {
        toast.success('Company access granted!');
        onSuccess(data.department);
      } else {
        toast.error('Invalid company credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Company access error:', error);
      toast.error('Failed to access company portal. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCompanySignup = async (data: CompanySignupValues) => {
    console.log('Company signup attempt with data:', { 
      fullName: data.fullName, 
      employeeId: data.employeeId, 
      department: data.department,
      email: data.email 
    });
    
    setIsSubmitting(true);
    try {
      const userData = {
        full_name: data.fullName,
        employee_id: data.employeeId,
        department: data.department,
        user_type: 'employee',
      };

      console.log('Calling signUp with userData:', userData);
      const { error } = await signUp(data.email, data.password, userData);
      
      if (!error) {
        toast.success('Company account created successfully! Please check your email to verify your account.');
        setIsCompanySignup(false);
        setIsCompanyAccess(false);
      }
    } catch (error) {
      console.error('Company signup error:', error);
      toast.error('Failed to create company account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isCompanySignup) {
    return (
      <CompanySignupForm
        onSignup={onCompanySignup}
        onBackToLogin={() => setIsCompanySignup(false)}
        onBackToPublic={() => {
          setIsCompanyAccess(false);
          setIsCompanySignup(false);
        }}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (isCompanyAccess) {
    return (
      <CompanyAccessForm
        onLogin={onCompanyAccess}
        onSignup={() => setIsCompanySignup(true)}
        onBackToPublic={() => setIsCompanyAccess(false)}
        isSubmitting={isSubmitting}
      />
    );
  }

  return (
    <PublicAuthForm
      isSignup={isSignup}
      onSignup={onSignup}
      onLogin={onLogin}
      onToggleMode={() => setIsSignup(!isSignup)}
      onCompanyAccess={() => setIsCompanyAccess(true)}
      isSubmitting={isSubmitting}
    />
  );
};

export default RoleBasedAuth;
