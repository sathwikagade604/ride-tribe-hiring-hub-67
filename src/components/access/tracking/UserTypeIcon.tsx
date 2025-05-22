
import React from 'react';
import { Car, User } from 'lucide-react';

interface UserTypeIconProps {
  type: string;
}

const UserTypeIcon: React.FC<UserTypeIconProps> = ({ type }) => {
  if (type === 'Driver') {
    return (
      <span className="flex items-center">
        <Car className="h-3 w-3 mr-1" /> Driver
      </span>
    );
  }
  
  return (
    <span className="flex items-center">
      <User className="h-3 w-3 mr-1" /> Rider
    </span>
  );
};

export default UserTypeIcon;
