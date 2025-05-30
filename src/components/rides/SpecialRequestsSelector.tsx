
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SpecialRequestsSelectorProps {
  specialRequests: string[];
  onToggleRequest: (request: string) => void;
}

const SpecialRequestsSelector: React.FC<SpecialRequestsSelectorProps> = ({
  specialRequests,
  onToggleRequest,
}) => {
  const availableRequests = ['AC Required', 'Pet Friendly', 'Extra Luggage', 'Wheelchair Accessible'];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Special Requests (Optional)</h3>
      <div className="flex flex-wrap gap-2">
        {availableRequests.map((request) => (
          <Badge
            key={request}
            variant={specialRequests.includes(request) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onToggleRequest(request)}
          >
            {request}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SpecialRequestsSelector;
