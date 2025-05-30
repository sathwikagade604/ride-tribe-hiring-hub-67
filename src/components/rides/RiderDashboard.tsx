
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Star, 
  Clock, 
  Wallet,
  Shield,
  Phone,
  Plus,
  History,
  CreditCard,
  Users,
  Gift,
  Settings
} from 'lucide-react';
import { formatCurrency } from '@/utils/fareCalculator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

interface RideHistory {
  id: string;
  date: string;
  from: string;
  to: string;
  fare: number;
  driver: string;
  rating: number;
  status: 'completed' | 'cancelled';
  vehicleType: string;
}

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

const RiderDashboard = () => {
  const [rideHistory, setRideHistory] = useState<RideHistory[]>([
    {
      id: '1',
      date: '2024-05-30T14:30:00',
      from: 'Home',
      to: 'Office',
      fare: 145,
      driver: 'Raj Kumar',
      rating: 5,
      status: 'completed',
      vehicleType: 'Auto'
    },
    {
      id: '2',
      date: '2024-05-29T18:15:00',
      from: 'Mall',
      to: 'Home',
      fare: 180,
      driver: 'Amit Singh',
      rating: 4,
      status: 'completed',
      vehicleType: 'Mini'
    },
    {
      id: '3',
      date: '2024-05-28T09:45:00',
      from: 'Airport',
      to: 'Hotel',
      fare: 320,
      driver: 'Vikram Sharma',
      rating: 5,
      status: 'completed',
      vehicleType: 'Sedan'
    }
  ]);

  const [walletBalance, setWalletBalance] = useState(1250);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    {
      id: '1',
      type: 'debit',
      amount: 145,
      description: 'Ride payment to Raj Kumar',
      date: '2024-05-30T14:30:00'
    },
    {
      id: '2',
      type: 'credit',
      amount: 500,
      description: 'Wallet top-up',
      date: '2024-05-30T10:00:00'
    },
    {
      id: '3',
      type: 'debit',
      amount: 180,
      description: 'Ride payment to Amit Singh',
      date: '2024-05-29T18:15:00'
    }
  ]);

  const [userStats, setUserStats] = useState({
    totalRides: 156,
    totalSpent: 12450,
    averageRating: 4.8,
    savedAmount: 2340,
    favoritePlaces: ['Home', 'Office', 'Gym', 'Mall']
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'Mom', phone: '+91 98765 43210', isPrimary: true },
    { id: '2', name: 'Dad', phone: '+91 98765 43211', isPrimary: false }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const addMoneyToWallet = () => {
    toast.success('Redirecting to payment gateway...');
    // In real app, integrate with payment gateway
  };

  const shareRideDetails = (ride: RideHistory) => {
    if (navigator.share) {
      navigator.share({
        title: 'Ride Details',
        text: `Travelled from ${ride.from} to ${ride.to} on ${formatDate(ride.date)}`,
        url: window.location.href
      });
    } else {
      toast.info('Ride details copied to clipboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Welcome Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">Welcome back, John!</h2>
                <p className="text-gray-600">Ready for your next ride?</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{userStats.averageRating}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {userStats.totalRides} rides completed
                  </div>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Book Ride
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Wallet className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-lg font-bold">{formatCurrency(walletBalance)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <History className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600">Total Rides</p>
            <p className="text-lg font-bold">{userStats.totalRides}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600">Money Saved</p>
            <p className="text-lg font-bold">{formatCurrency(userStats.savedAmount)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <p className="text-sm text-gray-600">Safety Score</p>
            <p className="text-lg font-bold">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="rides" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rides">Ride History</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="rides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rideHistory.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={ride.status === 'completed' ? 'default' : 'secondary'}>
                          {ride.vehicleType}
                        </Badge>
                        <span className="text-sm text-gray-600">{formatDate(ride.date)}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{ride.from}</span>
                        </div>
                        <div className="w-px h-3 bg-gray-300 ml-1"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm">{ride.to}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Driver: {ride.driver}</p>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className="font-bold">{formatCurrency(ride.fare)}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{ride.rating}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => shareRideDetails(ride)}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Balance
                </div>
                <Button onClick={addMoneyToWallet}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 mb-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{formatCurrency(walletBalance)}</p>
                <p className="text-gray-600">Available Balance</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Recent Transactions</h3>
                {walletTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Emergency Contacts</h3>
                  <div className="space-y-2">
                    {emergencyContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                        </div>
                        {contact.isPrimary && (
                          <Badge variant="secondary">Primary</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Safety Tools</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Call (112)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Share Trip Live
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Safety Checkup
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Safety Tips</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Always verify driver details before boarding</li>
                  <li>• Share your trip details with trusted contacts</li>
                  <li>• Keep emergency contacts updated</li>
                  <li>• Rate your driver to help maintain quality</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-bold">50% OFF</h3>
                    <p className="text-sm text-gray-600">On your next 3 rides</p>
                  </div>
                </div>
                <p className="text-sm mb-3">Use code: SAVE50</p>
                <Button size="sm" className="w-full">
                  Apply Offer
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold">Cashback ₹100</h3>
                    <p className="text-sm text-gray-600">On wallet payments</p>
                  </div>
                </div>
                <p className="text-sm mb-3">Valid till month end</p>
                <Button size="sm" variant="outline" className="w-full">
                  Know More
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiderDashboard;
