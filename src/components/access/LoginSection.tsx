
import React from 'react';
import LoginForm from '@/components/access/LoginForm';
import AvailableRoles from '@/components/access/AvailableRoles';
import GeneralAccess from '@/components/access/GeneralAccess';
import { LoginFormValues } from '@/schemas/loginFormSchema';

interface LoginSectionProps {
  onLogin: (data: LoginFormValues) => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin }) => {
  return (
    <div className="max-w-md mx-auto">
      <LoginForm onLogin={onLogin} />
      <AvailableRoles />
      <GeneralAccess />
    </div>
  );
};

export default LoginSection;
