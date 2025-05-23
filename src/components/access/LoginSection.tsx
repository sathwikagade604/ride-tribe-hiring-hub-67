
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/access/LoginForm';
import SignupForm from '@/components/access/SignupForm';
import AvailableRoles from '@/components/access/AvailableRoles';
import GeneralAccess from '@/components/access/GeneralAccess';
import { LoginFormValues } from '@/schemas/loginFormSchema';
import { SignupFormValues } from '@/schemas/signupFormSchema';

interface LoginSectionProps {
  onLogin: (data: LoginFormValues) => void;
  onSignup: (data: SignupFormValues) => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin, onSignup }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <Button
          variant={!isSignupMode ? "default" : "outline"}
          onClick={() => setIsSignupMode(false)}
          className="mr-2"
        >
          Login
        </Button>
        <Button
          variant={isSignupMode ? "default" : "outline"}
          onClick={() => setIsSignupMode(true)}
        >
          Sign Up
        </Button>
      </div>
      
      {isSignupMode ? (
        <SignupForm onSignup={onSignup} />
      ) : (
        <LoginForm onLogin={onLogin} />
      )}
      
      <AvailableRoles />
      <GeneralAccess />
    </div>
  );
};

export default LoginSection;
