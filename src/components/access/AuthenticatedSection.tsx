
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoleHeader from '@/components/access/RoleHeader';
import RoleContent from '@/components/access/RoleContent';
import DriverDetail from '@/components/access/DriverDetail';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { Driver } from '@/data/mockDrivers';
import { Home, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthenticatedSectionProps {
  role: RoleKey;
  username: string;
  subRole?: SubRoleKey;
  onLogout: () => void;
  selectedDriver: Driver | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  drivers: Driver[];
  onDriverSelect: (driver: Driver) => void;
}

const AuthenticatedSection: React.FC<AuthenticatedSectionProps> = ({
  role,
  username,
  subRole = '',
  onLogout,
  selectedDriver,
  activeTab,
  setActiveTab,
  drivers,
  onDriverSelect
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <RoleHeader 
          role={role} 
          username={username} 
          subRole={subRole} 
          onLogout={onLogout} 
        />
        <div className="flex gap-2">
          <Button onClick={handleGoHome} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <RoleContent 
            role={role} 
            subRole={subRole} 
            onLogout={onLogout}
            drivers={drivers}
            onDriverSelect={onDriverSelect}
          />
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drivers.map((driver) => (
                  <Card 
                    key={driver.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onDriverSelect(driver)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{driver.name}</h3>
                      <p className="text-sm text-muted-foreground">City: {driver.city}</p>
                      <p className="text-sm">Status: {driver.status}</p>
                      <p className="text-sm">Rating: {driver.rating}/5</p>
                      <p className="text-sm">Trips: {driver.trips}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="driver-detail">
          {selectedDriver && (
            <DriverDetail 
              driver={selectedDriver} 
              onBack={() => setActiveTab('drivers')} 
            />
          )}
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">System Status</h3>
                  <p className="text-green-600">All systems operational</p>
                </div>
                <div>
                  <h3 className="font-semibold">Active Users</h3>
                  <p>234 riders, 156 drivers online</p>
                </div>
                <div>
                  <h3 className="font-semibold">Server Status</h3>
                  <p className="text-green-600">Healthy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Daily Rides</h3>
                      <p className="text-2xl font-bold">1,234</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Revenue</h3>
                      <p className="text-2xl font-bold">₹45,678</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Active Drivers</h3>
                      <p className="text-2xl font-bold">156</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticatedSection;
