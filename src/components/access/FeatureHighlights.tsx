
import React from 'react';
import { MapPin, Shield, Star } from 'lucide-react';

const FeatureHighlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
        <p className="text-muted-foreground">
          Track your ride in real-time with GPS accuracy
        </p>
      </div>
      <div className="text-center">
        <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
        <p className="text-muted-foreground">
          Verified drivers and secure payment options
        </p>
      </div>
      <div className="text-center">
        <Star className="h-16 w-16 mx-auto mb-4 text-yellow-600" />
        <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
        <p className="text-muted-foreground">
          Rated drivers and 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlights;
