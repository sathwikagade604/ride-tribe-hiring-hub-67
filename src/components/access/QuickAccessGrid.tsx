
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  Building, 
  Shield, 
  Phone, 
  Star 
} from 'lucide-react';

interface QuickAccessGridProps {
  isAuthenticated: boolean;
  onCompanyAccess?: () => void;
}

const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ isAuthenticated, onCompanyAccess }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Rider Access */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">For Riders</h3>
            <p className="text-muted-foreground mb-4">
              Book rides, track drivers, and manage your trips
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <Button className="w-full">
                Access Rider Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Driver Access */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Car className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">For Drivers</h3>
            <p className="text-muted-foreground mb-4">
              Start earning, manage trips, and track earnings
            </p>
            <Link to={isAuthenticated ? "/driver-app" : "/login"}>
              <Button className="w-full">
                Access Driver Portal
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Company Access Portal */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Company Portal</h3>
            <p className="text-muted-foreground mb-4">
              Employee access, support, and administrative tools
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onCompanyAccess}
            >
              Company Access
            </Button>
          </CardContent>
        </Card>

        {/* Driver Hiring */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <h3 className="text-xl font-semibold mb-2">Join as Driver</h3>
            <p className="text-muted-foreground mb-4">
              Complete verification and start driving
            </p>
            <Link to="/driver-hiring">
              <Button variant="outline" className="w-full">
                Driver Registration
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-semibold mb-2">Emergency Support</h3>
            <p className="text-muted-foreground mb-4">
              24/7 help and emergency assistance
            </p>
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
          </CardContent>
        </Card>

        {/* Safety Center */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h3 className="text-xl font-semibold mb-2">Safety Center</h3>
            <p className="text-muted-foreground mb-4">
              Safety guidelines and incident reporting
            </p>
            <Button variant="outline" className="w-full">
              Safety Info
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickAccessGrid;
