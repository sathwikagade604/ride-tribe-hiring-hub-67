
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted?: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to RideShare India</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Your trusted partner for safe and reliable transportation across India
      </p>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Get Started</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {onGetStarted ? (
              <Button onClick={onGetStarted} className="w-full" size="lg">
                <LogIn className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            ) : (
              <>
                <Link to="/login" className="block">
                  <Button className="w-full" size="lg">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingHero;
