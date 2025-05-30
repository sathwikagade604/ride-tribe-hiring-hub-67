
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, Phone, Shield } from 'lucide-react';

interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface RideTrackingViewProps {
  pickup: Location;
  destination: Location;
}

const RideTrackingView: React.FC<RideTrackingViewProps> = ({
  pickup,
  destination,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Ride Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Driver Assigned</span>
              <Badge className="bg-green-100 text-green-800">On the way</Badge>
            </div>
            <p className="text-sm text-gray-600">Raj Kumar • ★ 4.8 • DL 01 AB 1234</p>
            <p className="text-sm text-gray-600">Estimated arrival: 5 minutes</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">{pickup.address}</span>
            </div>
            <div className="w-px h-6 bg-gray-300 ml-1.5"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">{destination.address}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Driver
            </Button>
            <Button variant="outline" className="flex-1">
              <Shield className="h-4 w-4 mr-2" />
              Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideTrackingView;
