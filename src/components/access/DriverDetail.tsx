
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from 'lucide-react';
import { Driver } from '@/data/mockDrivers';

interface DriverDetailProps {
  driver: Driver;
  onBack: () => void;
}

const DriverDetail: React.FC<DriverDetailProps> = ({ driver, onBack }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Driver Profile: {driver.name}</CardTitle>
          <CardDescription>ID: #{driver.id} • Joined {driver.joinDate}</CardDescription>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to List
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="aspect-square max-w-[200px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <User size={80} className="text-gray-400" />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-semibold">{driver.rating}</div>
              <div className="text-sm text-gray-500">Driver Rating</div>
            </div>
            
            <div className="flex justify-between text-center border-t pt-3">
              <div>
                <div className="font-semibold">{driver.trips}</div>
                <div className="text-sm text-gray-500">Trips</div>
              </div>
              <div>
                <div className="font-semibold">{driver.city}</div>
                <div className="text-sm text-gray-500">City</div>
              </div>
              <div>
                <div className="font-semibold">{driver.status}</div>
                <div className="text-sm text-gray-500">Status</div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="info">Driver Info</TabsTrigger>
                <TabsTrigger value="history">Trip History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={driver.name} readOnly />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input value="+91 98765 43210" readOnly />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={`${driver.name.toLowerCase().replace(' ', '.')}@example.com`} readOnly />
                    </div>
                    <div>
                      <Label>License Number</Label>
                      <Input value={`DL${Math.floor(10000000 + Math.random() * 90000000)}`} readOnly />
                    </div>
                    <div>
                      <Label>Vehicle Type</Label>
                      <Input value="Toyota Innova" readOnly />
                    </div>
                    <div>
                      <Label>Vehicle Number</Label>
                      <Input value={`MH${Math.floor(10 + Math.random() * 90)} AB ${Math.floor(1000 + Math.random() * 9000)}`} readOnly />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Edit Details</Button>
                    <Button variant="destructive">Suspend Driver</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trip ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>#T8756</TableCell>
                      <TableCell>Today, 10:30 AM</TableCell>
                      <TableCell>Juhu Beach</TableCell>
                      <TableCell>Bandra Station</TableCell>
                      <TableCell>₹350</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#T8755</TableCell>
                      <TableCell>Today, 8:15 AM</TableCell>
                      <TableCell>Andheri West</TableCell>
                      <TableCell>BKC Complex</TableCell>
                      <TableCell>₹420</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#T8749</TableCell>
                      <TableCell>Yesterday, 6:45 PM</TableCell>
                      <TableCell>Goregaon East</TableCell>
                      <TableCell>Powai Lake</TableCell>
                      <TableCell>₹380</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#T8742</TableCell>
                      <TableCell>Yesterday, 2:20 PM</TableCell>
                      <TableCell>Vile Parle</TableCell>
                      <TableCell>Chhatrapati Shivaji Airport</TableCell>
                      <TableCell>₹250</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Driving License</CardTitle>
                      </CardHeader>
                      <CardContent className="h-32 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">License Document Preview</p>
                      </CardContent>
                      <div className="p-4 pt-0 flex justify-between">
                        <p className="text-xs text-gray-500">Expires: 2026-05-12</p>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Vehicle Registration</CardTitle>
                      </CardHeader>
                      <CardContent className="h-32 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">Registration Document Preview</p>
                      </CardContent>
                      <div className="p-4 pt-0 flex justify-between">
                        <p className="text-xs text-gray-500">Expires: 2025-11-30</p>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverDetail;
