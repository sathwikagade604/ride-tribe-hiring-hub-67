
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Car, Clock, Star, CreditCard, Shield, Phone, Users } from 'lucide-react';
import PageLayout from '@/layouts/PageLayout';
import AdvancedRideBooking from '@/components/rides/AdvancedRideBooking';
import RideHistory from '@/components/rides/RideHistory';
import RideTracking from '@/components/rides/RideTracking';
import { useAuthState } from '@/hooks/useAuthState';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, handleLogout } = useAuthState();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {username}!</h1>
            <p className="text-muted-foreground">Book your ride or manage your trips</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/driver-app')} variant="outline">
              Driver Portal
            </Button>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Car className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Book a Ride</h3>
              <p className="text-sm text-muted-foreground">Quick ride booking</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Schedule Ride</h3>
              <p className="text-sm text-muted-foreground">Plan ahead</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Payment</h3>
              <p className="text-sm text-muted-foreground">Manage payments</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Safety</h3>
              <p className="text-sm text-muted-foreground">Emergency contacts</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="book">Book Ride</TabsTrigger>
            <TabsTrigger value="track">Track Ride</TabsTrigger>
            <TabsTrigger value="history">Ride History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Advanced Ride Booking */}
              <div className="lg:col-span-2">
                <AdvancedRideBooking />
              </div>
              
              {/* Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Your Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.8</div>
                      <div className="flex justify-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Based on 127 rides</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Emergency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">
                      SOS Emergency
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Emergency contacts will be notified
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Refer & Earn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Invite friends and earn ₹100 for each successful referral</p>
                    <Button variant="outline" className="w-full">
                      Share Referral Code
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <RideTracking rideId="12345" status="driver_arriving" />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <RideHistory />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Profile management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
