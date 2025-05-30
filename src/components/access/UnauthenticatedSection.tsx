
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LandingHero from '@/components/access/LandingHero';
import FeatureHighlights from '@/components/access/FeatureHighlights';
import { Car, Users, Building } from 'lucide-react';

interface UnauthenticatedSectionProps {
  onGetStarted: () => void;
  onCompanyAccess: () => void;
}

const UnauthenticatedSection: React.FC<UnauthenticatedSectionProps> = ({ 
  onGetStarted, 
  onCompanyAccess 
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <LandingHero onGetStarted={onGetStarted} />
      <div className="container mx-auto px-4 space-y-8">
        {/* Quick Access Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Car className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Driver Portal</CardTitle>
              <CardDescription>
                Join as a driver and start earning money
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => navigate('/driver-login')} 
                className="w-full"
              >
                Driver Login
              </Button>
              <Button 
                onClick={() => navigate('/driver-signup')} 
                variant="outline" 
                className="w-full"
              >
                Driver Sign Up
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Rider Portal</CardTitle>
              <CardDescription>
                Book rides and travel safely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => navigate('/rider-login')} 
                className="w-full"
              >
                Rider Login
              </Button>
              <Button 
                onClick={() => navigate('/rider-signup')} 
                variant="outline" 
                className="w-full"
              >
                Rider Sign Up
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Company Portal</CardTitle>
              <CardDescription>
                Department access for employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onCompanyAccess} 
                className="w-full"
              >
                Company Access
              </Button>
            </CardContent>
          </Card>
        </div>

        <FeatureHighlights />
      </div>
    </div>
  );
};

export default UnauthenticatedSection;
