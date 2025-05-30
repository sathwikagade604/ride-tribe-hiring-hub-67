
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  TrendingUp, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { formatCurrency } from '@/utils/fareCalculator';

const AdminDashboard = () => {
  const [stats] = useState({
    totalRiders: 15420,
    totalDrivers: 3250,
    activeRides: 142,
    todayRevenue: 285400,
    weeklyRevenue: 1950000,
    monthlyRevenue: 8450000,
    averageRating: 4.6,
    completionRate: 94.2
  });

  const [pendingVerifications] = useState([
    {
      id: '1',
      driverName: 'Rajesh Kumar',
      vehicleType: 'Auto',
      documentsSubmitted: '2024-05-30',
      status: 'pending',
      documents: ['License', 'Registration', 'Insurance']
    },
    {
      id: '2',
      driverName: 'Amit Singh',
      vehicleType: 'Sedan',
      documentsSubmitted: '2024-05-29',
      status: 'pending',
      documents: ['License', 'Registration', 'Insurance', 'PAN']
    }
  ]);

  const [liveRides] = useState([
    {
      id: 'R001',
      rider: 'Priya S.',
      driver: 'Raj K.',
      pickup: 'Connaught Place',
      destination: 'Airport',
      status: 'in_progress',
      vehicleType: 'Sedan',
      fare: 320,
      startTime: '14:30'
    },
    {
      id: 'R002',
      rider: 'Amit C.',
      driver: 'Vikram S.',
      pickup: 'Saket',
      destination: 'Gurgaon',
      status: 'driver_arriving',
      vehicleType: 'Auto',
      fare: 180,
      startTime: '14:45'
    }
  ]);

  const [complaints] = useState([
    {
      id: 'C001',
      type: 'Driver Behavior',
      reporter: 'Neha P.',
      driver: 'Suresh M.',
      rideId: 'R895',
      severity: 'high',
      status: 'investigating',
      date: '2024-05-30'
    },
    {
      id: 'C002',
      type: 'Vehicle Condition',
      reporter: 'Rohit S.',
      driver: 'Ajay K.',
      rideId: 'R892',
      severity: 'medium',
      status: 'resolved',
      date: '2024-05-29'
    }
  ]);

  const approveDriver = (driverId: string) => {
    console.log('Approving driver:', driverId);
    // API call to approve driver
  };

  const rejectDriver = (driverId: string) => {
    console.log('Rejecting driver:', driverId);
    // API call to reject driver
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Riders</p>
                <p className="text-2xl font-bold">{stats.totalRiders.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Drivers</p>
                <p className="text-2xl font-bold">{stats.totalDrivers.toLocaleString()}</p>
              </div>
              <Car className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Rides</p>
                <p className="text-2xl font-bold">{stats.activeRides}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.todayRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="rides">Live Rides</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Today</span>
                  <span className="font-bold">{formatCurrency(stats.todayRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>This Week</span>
                  <span className="font-bold">{formatCurrency(stats.weeklyRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="font-bold">{formatCurrency(stats.monthlyRevenue)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span className="font-bold">{stats.averageRating} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-bold">{stats.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Drivers</span>
                  <span className="font-bold">1,248</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="h-4 w-4 mr-2" />
                  Driver Verification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  View Complaints
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Driver Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{driver.driverName}</h3>
                        <Badge variant="secondary">{driver.vehicleType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Submitted: {driver.documentsSubmitted}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {driver.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => approveDriver(driver.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => rejectDriver(driver.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Ride Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">#{ride.id}</span>
                        <Badge 
                          variant={ride.status === 'in_progress' ? 'default' : 'secondary'}
                        >
                          {ride.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-600">{ride.vehicleType}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Rider:</strong> {ride.rider}</p>
                          <p><strong>Driver:</strong> {ride.driver}</p>
                        </div>
                        <div>
                          <p><strong>From:</strong> {ride.pickup}</p>
                          <p><strong>To:</strong> {ride.destination}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(ride.fare)}</p>
                      <p className="text-sm text-gray-600">Started: {ride.startTime}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">#{complaint.id}</span>
                        <Badge variant="outline">{complaint.type}</Badge>
                        <Badge 
                          variant={complaint.severity === 'high' ? 'destructive' : 'secondary'}
                        >
                          {complaint.severity}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>Reporter:</strong> {complaint.reporter}</p>
                        <p><strong>Driver:</strong> {complaint.driver}</p>
                        <p><strong>Ride:</strong> {complaint.rideId}</p>
                        <p><strong>Date:</strong> {complaint.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={complaint.status === 'resolved' ? 'default' : 'secondary'}
                      >
                        {complaint.status}
                      </Badge>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { city: 'Delhi NCR', rides: 12500, revenue: 2800000 },
                    { city: 'Mumbai', rides: 9800, revenue: 2200000 },
                    { city: 'Bangalore', rides: 8900, revenue: 1950000 },
                    { city: 'Hyderabad', rides: 6500, revenue: 1420000 }
                  ].map((city, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{city.city}</p>
                        <p className="text-sm text-gray-600">{city.rides} rides</p>
                      </div>
                      <p className="font-bold">{formatCurrency(city.revenue)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'Auto', percentage: 35, rides: 15400 },
                    { type: 'Mini', percentage: 28, rides: 12320 },
                    { type: 'Sedan', percentage: 20, rides: 8800 },
                    { type: 'Bike', percentage: 17, rides: 7480 }
                  ].map((vehicle, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{vehicle.type}</span>
                        <span>{vehicle.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${vehicle.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{vehicle.rides} rides</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
