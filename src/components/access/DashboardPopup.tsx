
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Car, Users, UserPlus } from 'lucide-react';

interface DashboardPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DashboardPopup: React.FC<DashboardPopupProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handlePopupAction = (action: string) => {
    onOpenChange(false);
    
    switch (action) {
      case 'need-driver':
        navigate('/rider-signup');
        break;
      case 'am-rider':
        navigate('/rider-login');
        break;
      case 'am-driver':
        navigate('/driver-login');
        break;
      case 'ready-to-hire':
        navigate('/driver-hiring');
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-6">
            Welcome! How can we help you today?
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* I Need a Driver */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
            onClick={() => handlePopupAction('need-driver')}
          >
            <CardHeader className="text-center pb-4">
              <Users className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-xl">I Need a Driver</CardTitle>
              <CardDescription>
                Book a ride and get to your destination safely
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Quick and reliable transportation service
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book a Ride
              </Button>
            </CardContent>
          </Card>

          {/* I am a Rider */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
            onClick={() => handlePopupAction('am-rider')}
          >
            <CardHeader className="text-center pb-4">
              <Users className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <CardTitle className="text-xl">I am a Rider</CardTitle>
              <CardDescription>
                Access your rider account and manage trips
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Login to your existing rider account
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Rider Login
              </Button>
            </CardContent>
          </Card>

          {/* I am a Driver */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-500"
            onClick={() => handlePopupAction('am-driver')}
          >
            <CardHeader className="text-center pb-4">
              <Car className="h-16 w-16 mx-auto mb-4 text-purple-600" />
              <CardTitle className="text-xl">I am a Driver</CardTitle>
              <CardDescription>
                Access your driver dashboard and start earning
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Login to your driver account
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Driver Login
              </Button>
            </CardContent>
          </Card>

          {/* I am Ready to Hire */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-500"
            onClick={() => handlePopupAction('ready-to-hire')}
          >
            <CardHeader className="text-center pb-4">
              <UserPlus className="h-16 w-16 mx-auto mb-4 text-orange-600" />
              <CardTitle className="text-xl">I am Ready to Hire</CardTitle>
              <CardDescription>
                Recruit and manage drivers for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Access driver hiring platform
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Hiring Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPopup;
