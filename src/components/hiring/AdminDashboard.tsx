
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  Settings,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { formatCurrency } from '@/utils/fareCalculator';

interface AdminDashboardProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ drivers, onUpdateDriver }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  const totalEarnings = drivers.reduce((sum, driver) => sum + driver.earnings.month, 0);
  const avgRating = drivers.length > 0 ? drivers.reduce((sum, driver) => sum + driver.rating, 0) / drivers.length : 0;
  const activeDrivers = drivers.filter(driver => driver.status === 'active').length;
  const pendingVerifications = drivers.filter(driver => 
    driver.verification.kycStatus === 'pending' || 
    driver.verification.backgroundCheck === 'pending'
  ).length;

  const analytics = {
    dailySignups: 12,
    conversionRate: 85,
    avgOnboardingTime: 3.2,
    retentionRate: 92
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || driver.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const exportData = (type: string) => {
    // Simulate data export
    console.log(`Exporting ${type} data...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive overview and management console
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Drivers</p>
                <p className="text-3xl font-bold">{drivers.length}</p>
                <p className="text-sm text-green-600">+{analytics.dailySignups} today</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Drivers</p>
                <p className="text-3xl font-bold">{activeDrivers}</p>
                <p className="text-sm text-blue-600">{((activeDrivers / drivers.length) * 100).toFixed(1)}% active</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold">{formatCurrency(totalEarnings)}</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold">{pendingVerifications}</p>
                <p className="text-sm text-orange-600">Require attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Driver Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Avg Driver Rating</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{analytics.avgOnboardingTime} days</p>
                  <p className="text-sm text-muted-foreground">Avg Onboarding</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{analytics.retentionRate}%</p>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'New driver registration', user: 'Rajesh Kumar', time: '2 minutes ago', type: 'success' },
                  { action: 'Background check completed', user: 'Priya Sharma', time: '15 minutes ago', type: 'info' },
                  { action: 'Document verification pending', user: 'Amit Singh', time: '1 hour ago', type: 'warning' },
                  { action: 'Driver account suspended', user: 'Ravi Patel', time: '2 hours ago', type: 'error' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'info' ? 'bg-blue-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drivers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Driver List */}
          <div className="space-y-3">
            {filteredDrivers.map(driver => (
              <Card key={driver.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{driver.personalInfo.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{driver.personalInfo.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={driver.status === 'active' ? 'default' : 'secondary'}>
                            {driver.status}
                          </Badge>
                          <Badge variant="outline">
                            {driver.totalRides} rides
                          </Badge>
                          <span className="text-sm text-muted-foreground">★ {driver.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View</Button>
                      <Select>
                        <SelectTrigger className="w-[100px] h-8">
                          <SelectValue placeholder="Actions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suspend">Suspend</SelectItem>
                          <SelectItem value="activate">Activate</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Registration Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  Chart showing driver registrations over time
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Earnings Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  Chart showing earnings trends
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Driver Activity Report', description: 'Detailed driver performance metrics' },
              { title: 'Financial Summary', description: 'Earnings and commission reports' },
              { title: 'Safety Compliance', description: 'Safety incidents and compliance status' },
              { title: 'Verification Status', description: 'KYC and background check progress' },
              { title: 'Vehicle Inspection', description: 'Vehicle safety and maintenance reports' },
              { title: 'Custom Analytics', description: 'Create custom reports and dashboards' }
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  <Button size="sm" variant="outline" onClick={() => exportData(report.title)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Rating Threshold</label>
                  <Input type="number" step="0.1" defaultValue="4.0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background Check Provider</label>
                  <Select defaultValue="provider1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="provider1">Provider 1</SelectItem>
                      <SelectItem value="provider2">Provider 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Update Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'New driver registrations',
                    'Verification status updates',
                    'Safety alerts',
                    'Payment notifications',
                    'System maintenance'
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{setting}</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  ))}
                </div>
                <Button className="w-full">Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
