
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  MapPin, 
  Star, 
  TrendingUp, 
  Clock, 
  Wallet,
  Shield,
  Power
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = React.useState(false);
  const [stats] = React.useState({
    todayEarnings: 1250,
    weeklyEarnings: 8750,
    monthlyEarnings: 32500,
    totalRides: 342,
    rating: 4.8,
  });

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Status Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <div>
                <h2 className="text-xl font-semibold">
                  {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delhi, India
                </p>
              </div>
            </div>
            <Button 
              onClick={toggleOnlineStatus}
              variant={isOnline ? 'destructive' : 'default'}
              size="lg"
              className="min-w-[120px]"
            >
              <Power className="h-4 w-4 mr-2" />
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.todayEarnings)}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.weeklyEarnings)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyEarnings)}</p>
              </div>
              <Car className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Total Trips Completed</span>
            <span className="font-bold">{stats.totalRides}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Average Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{stats.rating}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Online Hours Today</span>
            <span className="font-bold">6.5 hours</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Status</span>
            <Badge variant={isOnline ? 'default' : 'secondary'}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Shield className="h-6 w-6" />
            Documents
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Car className="h-6 w-6" />
            Vehicle Info
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Clock className="h-6 w-6" />
            Trip History
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <TrendingUp className="h-6 w-6" />
            Earnings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
