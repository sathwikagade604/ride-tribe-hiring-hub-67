
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'green' | 'blue' | 'red' | 'gray';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default', className }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      default:
        // Determine color based on status text if variant not specified
        if (status.toLowerCase().includes('progress') || status.toLowerCase().includes('completed')) {
          return 'bg-green-100 text-green-800';
        } else if (status.toLowerCase().includes('started')) {
          return 'bg-blue-100 text-blue-800';
        } else if (status.toLowerCase().includes('cancelled')) {
          return 'bg-red-100 text-red-800';
        } else {
          return 'bg-gray-100 text-gray-800';
        }
    }
  };

  return (
    <span className={cn(`px-2 py-1 rounded-full text-xs ${getVariantClasses()}`, className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
