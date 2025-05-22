
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GeneralAccess: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">General Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/" className="no-underline">
          <Button variant="outline" className="w-full text-lg justify-start h-14">
            🏠 Home Page
          </Button>
        </Link>
        <Link to="/drivers" className="no-underline">
          <Button variant="outline" className="w-full text-lg justify-start h-14">
            🚗 For Drivers
          </Button>
        </Link>
        <Link to="/riders" className="no-underline">
          <Button variant="outline" className="w-full text-lg justify-start h-14">
            👤 For Riders
          </Button>
        </Link>
        <Link to="/safety" className="no-underline">
          <Button variant="outline" className="w-full text-lg justify-start h-14">
            🛡️ Safety
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GeneralAccess;
