
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import { 
  Car, 
  Users, 
  Shield, 
  Phone, 
  MapPin, 
  Star,
  Building,
  LogIn,
  UserPlus
} from 'lucide-react';

const Access = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to RideShare India</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your trusted partner for safe and reliable transportation across India
          </p>
        </div>

        {/* Authentication Section */}
        {!user && (
          <div className="max-w-md mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Get Started</CardTitle>
                <CardDescription className="text-center">
                  Sign in or create an account to access all features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Access Section */}
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
                <Link to={user ? "/dashboard" : "/login"}>
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
                <Link to={user ? "/driver-app" : "/login"}>
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
                <Link to="/access">
                  <Button variant="outline" className="w-full">
                    Company Access
                  </Button>
                </Link>
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

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
      </div>
    </PageLayout>
  );
};

export default Access;
