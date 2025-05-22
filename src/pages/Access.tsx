
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Users, Key, Shield, MessageSquare, Car, CheckCircle, Info, Lock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';

// Define access levels for each role
const roleAccessLevels = {
  employee: {
    name: 'Employee',
    description: 'Manage drivers and general operations',
    permissions: ['view_drivers', 'edit_drivers', 'view_reports'],
    icon: <Users className="h-5 w-5" />,
  },
  support: {
    name: 'Support',
    description: 'Handle customer and driver issues',
    permissions: ['view_tickets', 'resolve_tickets', 'view_drivers'],
    icon: <Shield className="h-5 w-5" />,
  },
  service: {
    name: 'Vehicle Service',
    description: 'Manage vehicle maintenance and repairs',
    permissions: ['view_vehicles', 'schedule_service', 'update_vehicle_status'],
    icon: <Car className="h-5 w-5" />,
  },
  chat: {
    name: 'Chat Support',
    description: 'Handle live chat with customers and drivers',
    permissions: ['view_chats', 'respond_to_chats', 'escalate_issues'],
    icon: <MessageSquare className="h-5 w-5" />,
  },
};

// Login form schema
const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(['employee', 'support', 'service', 'chat']),
});

const Access = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      role: 'employee',
    },
  });

  React.useEffect(() => {
    document.title = "Access RideShare India | Quick Links";
    
    // Add meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = "Quick access links to all RideShare India services and features.";
    document.head.appendChild(metaDescription);
    
    // Cleanup function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  // Mock data for drivers
  const drivers = [
    { id: 1, name: 'Raj Kumar', rating: 4.8, city: 'Mumbai', status: 'Active', trips: 542, joinDate: '2023-05-12' },
    { id: 2, name: 'Priya Singh', rating: 4.9, city: 'Delhi', status: 'Active', trips: 328, joinDate: '2023-07-22' },
    { id: 3, name: 'Vikram Patel', rating: 4.7, city: 'Bangalore', status: 'Inactive', trips: 489, joinDate: '2023-04-05' },
    { id: 4, name: 'Anita Sharma', rating: 4.6, city: 'Chennai', status: 'Active', trips: 267, joinDate: '2023-09-18' },
    { id: 5, name: 'Sanjay Gupta', rating: 4.5, city: 'Kolkata', status: 'Active', trips: 356, joinDate: '2023-06-30' },
  ];

  // Handle login
  const onSubmit = (data) => {
    // This is a mock authentication - in a real app you'd validate with a backend
    if (data.username && data.password) {
      setIsLoggedIn(true);
      setRole(data.role);
      setUsername(data.username);
      
      // Show success toast
      toast.success(`Logged in successfully as ${roleAccessLevels[data.role].name}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    setSelectedDriver(null);
    setActiveTab('general');
    form.reset();
    
    toast.info('Logged out successfully');
  };
  
  // Handle driver selection
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    setActiveTab('driverDetail');
  };

  // Check if user has a specific permission
  const hasPermission = (permissionName) => {
    if (!role || !roleAccessLevels[role]) return false;
    return roleAccessLevels[role].permissions.includes(permissionName);
  };

  // Render role-specific content
  const renderRoleContent = () => {
    switch(role) {
      case 'employee':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" /> 
                Employee Portal
              </CardTitle>
              <CardDescription>
                Access employee-specific functions and driver management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="driverSearch">Search Drivers</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="driverSearch" placeholder="Search by name or city" />
                      <Button>Search</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Filter by Status</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drivers.map((driver) => (
                        <TableRow key={driver.id}>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.city}</TableCell>
                          <TableCell>{driver.rating}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {driver.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleDriverSelect(driver)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'support':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Support Portal
              </CardTitle>
              <CardDescription>
                Handle customer support requests and driver issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Open Support Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <div className="font-medium">#45623 - Payment Issue</div>
                          <div className="text-sm text-gray-500">Mumbai, 2h ago</div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                          <div className="font-medium">#45624 - Driver Behavior</div>
                          <div className="text-sm text-gray-500">Delhi, 5h ago</div>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <div className="font-medium">#45625 - App Crash</div>
                          <div className="text-sm text-gray-500">Bangalore, 1d ago</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Support Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full justify-start">
                          <CheckCircle className="mr-2 h-4 w-4" /> Resolve Ticket
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="mr-2 h-4 w-4" /> Assign to Agent
                        </Button>
                        <Button variant="secondary" className="w-full justify-start">
                          <Car className="mr-2 h-4 w-4" /> Driver Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket #</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#45620</TableCell>
                        <TableCell>App Navigation</TableCell>
                        <TableCell>Chennai</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#45621</TableCell>
                        <TableCell>Refund Request</TableCell>
                        <TableCell>Hyderabad</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolved
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#45622</TableCell>
                        <TableCell>Driver Rating</TableCell>
                        <TableCell>Pune</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Pending
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'service':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-6 w-6" />
                Vehicle Service Portal
              </CardTitle>
              <CardDescription>
                Manage vehicle maintenance and service records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Pending Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">24</div>
                      <div className="text-sm text-gray-500">Vehicles due for service</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">In Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">8</div>
                      <div className="text-sm text-gray-500">Vehicles being serviced</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Completed Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <div className="text-sm text-gray-500">Vehicles ready for pickup</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>RDS-1254</TableCell>
                        <TableCell>Toyota Innova</TableCell>
                        <TableCell>Scheduled Maintenance</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Waiting
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Start Service
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RDS-1876</TableCell>
                        <TableCell>Maruti Swift</TableCell>
                        <TableCell>Brake Repair</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>RDS-2034</TableCell>
                        <TableCell>Hyundai Creta</TableCell>
                        <TableCell>AC Repair</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ready
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Complete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'chat':
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Chat Support Portal
              </CardTitle>
              <CardDescription>
                Handle live chat support for riders and drivers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 border rounded-md h-[400px] overflow-y-auto">
                  <div className="p-3 font-medium border-b">
                    Active Chats (5)
                  </div>
                  <div className="divide-y">
                    <div className="p-3 bg-brand-primary/10 cursor-pointer">
                      <div className="font-medium">Arun Mehta</div>
                      <div className="text-sm text-gray-500 truncate">Need help with my booking...</div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Seema Verma</div>
                      <div className="text-sm text-gray-500 truncate">Driver didn't arrive at pickup...</div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Rahul Kumar</div>
                      <div className="text-sm text-gray-500 truncate">Payment issue with last ride...</div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Priya Sharma</div>
                      <div className="text-sm text-gray-500 truncate">How do I update my profile?</div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium">Manoj Singh</div>
                      <div className="text-sm text-gray-500 truncate">Need to report an item left in car...</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 border rounded-md h-[400px] flex flex-col">
                  <div className="p-3 border-b bg-gray-50">
                    <div className="font-medium">Arun Mehta</div>
                    <div className="text-sm text-gray-500">Mumbai • Rider since Jan 2023</div>
                  </div>
                  
                  <div className="flex-1 p-3 overflow-y-auto space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        <p>Hi, I need help with my booking. The driver canceled but I was still charged.</p>
                        <div className="text-xs text-gray-500 mt-1 text-right">10:32 AM</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-brand-primary text-white p-3 rounded-lg max-w-[80%]">
                        <p>Hello Arun, I'm sorry to hear about that. Let me check your recent bookings.</p>
                        <div className="text-xs text-brand-light mt-1 text-right">10:33 AM</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-brand-primary text-white p-3 rounded-lg max-w-[80%]">
                        <p>I can see your booking #RB45678 was canceled by the driver at 9:45 AM. You're right, there was an erroneous charge of ₹150.</p>
                        <div className="text-xs text-brand-light mt-1 text-right">10:35 AM</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        <p>Yes, that's the one. Can you refund it please?</p>
                        <div className="text-xs text-gray-500 mt-1 text-right">10:36 AM</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="text-center p-8">
            <p>Unknown role: {role}</p>
            <Button onClick={handleLogout} className="mt-4">Logout</Button>
          </div>
        );
    }
  };

  // Driver detail view
  const renderDriverDetail = () => {
    if (!selectedDriver) return null;
    
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Driver Profile: {selectedDriver.name}</CardTitle>
            <CardDescription>ID: #{selectedDriver.id} • Joined {selectedDriver.joinDate}</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setActiveTab('general')}>
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
                <div className="text-3xl font-semibold">{selectedDriver.rating}</div>
                <div className="text-sm text-gray-500">Driver Rating</div>
              </div>
              
              <div className="flex justify-between text-center border-t pt-3">
                <div>
                  <div className="font-semibold">{selectedDriver.trips}</div>
                  <div className="text-sm text-gray-500">Trips</div>
                </div>
                <div>
                  <div className="font-semibold">{selectedDriver.city}</div>
                  <div className="text-sm text-gray-500">City</div>
                </div>
                <div>
                  <div className="font-semibold">{selectedDriver.status}</div>
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
                        <Input value={selectedDriver.name} readOnly />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input value="+91 98765 43210" readOnly />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={`${selectedDriver.name.toLowerCase().replace(' ', '.')}@example.com`} readOnly />
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

  // Render role information card
  const renderRoleInfo = (roleKey) => {
    const role = roleAccessLevels[roleKey];
    return (
      <div className="flex items-start space-x-4 p-4 rounded-lg border hover:border-primary hover:bg-accent cursor-pointer">
        <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
          {role.icon}
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{role.name}</p>
          <p className="text-sm text-muted-foreground">{role.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {role.permissions.map((permission, index) => (
              <span 
                key={index} 
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {permission.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Main rendering logic
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Access RideShare India</h1>
          
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Company Access Portal</CardTitle>
                  <CardDescription>Log in with your credentials to access the company portal</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Select Access Role</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                {Object.entries(roleAccessLevels).map(([key, role]) => (
                                  <FormItem key={key} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={key} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">{role.name}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">Log In</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Available Access Roles</h2>
                <div className="space-y-4">
                  {Object.entries(roleAccessLevels).map(([key, _]) => (
                    <div key={key} onClick={() => form.setValue('role', key)}>
                      {renderRoleInfo(key)}
                    </div>
                  ))}
                </div>
              </div>
          
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">General Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🏠 Home Page
                    </Button>
                  </Link>
                  <Link to="/drivers" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🚗 For Drivers
                    </Button>
                  </Link>
                  <Link to="/riders" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      👤 For Riders
                    </Button>
                  </Link>
                  <Link to="/safety" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🛡️ Safety
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold flex items-center">
                    {roleAccessLevels[role].icon}
                    <span className="ml-2">
                      {roleAccessLevels[role].name} Portal
                    </span>
                  </h2>
                  <p className="text-muted-foreground">
                    Logged in as {username}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Card className="p-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">
                        {roleAccessLevels[role].permissions.length} permissions
                      </span>
                    </div>
                  </Card>
                  <Button onClick={handleLogout} variant="outline">Logout</Button>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Access Level: {roleAccessLevels[role].name}</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  You have access to: 
                  <div className="flex flex-wrap gap-2 mt-2">
                    {roleAccessLevels[role].permissions.map((permission, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {permission.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {activeTab === 'general' ? renderRoleContent() : renderDriverDetail()}
            </div>
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Access;
