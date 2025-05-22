
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, CheckCircle, Users, Car, AlertTriangle, HeartPulse } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SupportContentProps {
  subRole?: string;
}

const SupportContent: React.FC<SupportContentProps> = ({ subRole = '' }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Support Portal
          {subRole && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">
              {subRole === 'general' ? 'General Support' : 
               subRole === 'email' ? 'Email Support' : 
               subRole === 'escalation' ? 'Escalation Team' : 
               subRole === 'safety' ? 'Safety Response' :
               subRole === 'sos' ? 'SOS Team' : ''}
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Handle customer support requests and driver issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subRole === 'general' || subRole === '' ? (
          <GeneralSupportContent />
        ) : subRole === 'email' ? (
          <EmailSupportContent />
        ) : subRole === 'escalation' ? (
          <EscalationTeamContent />
        ) : subRole === 'safety' ? (
          <SafetyResponseContent />
        ) : subRole === 'sos' ? (
          <SOSTeamContent />
        ) : (
          <GeneralSupportContent />
        )}
      </CardContent>
    </Card>
  );
};

const GeneralSupportContent = () => {
  return (
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
  );
};

const EmailSupportContent = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Email Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="font-medium">Refund Request - customer123@gmail.com</div>
                <div className="text-sm text-gray-500">30 minutes ago</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="font-medium">Lost Item - rider456@gmail.com</div>
                <div className="text-sm text-gray-500">1 hour ago</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="font-medium">Account Access - driver789@gmail.com</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Refund Approval Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Account Reset Instructions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Lost Item Procedure
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Driver Verification Process
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Email Response Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 min-h-[200px]">
            <div className="mb-4">
              <p className="text-sm text-gray-500">To: customer@example.com</p>
              <p className="text-sm text-gray-500">Subject: Re: Refund Request #45623</p>
            </div>
            <div className="border-t pt-4">
              <p>Dear Customer,</p>
              <p className="my-2">Thank you for contacting RideShare India support. We have received your refund request and are processing it.</p>
              <p className="my-2">Your refund should be processed within 3-5 business days.</p>
              <p>Best regards,<br/>RideShare India Support Team</p>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Send Email</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EscalationTeamContent = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="escalated" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="escalated">Escalated Tickets</TabsTrigger>
          <TabsTrigger value="priority">Priority Cases</TabsTrigger>
          <TabsTrigger value="vip">VIP Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="escalated">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Escalated Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium">#45630 - Multiple Billing Issues</div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      High Priority
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">Customer charged 3x for one ride</div>
                  <div className="text-sm text-gray-500">Escalated by: Amit S. (2 hours ago)</div>
                  <div className="mt-2">
                    <Button size="sm" variant="default">Handle Case</Button>
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium">#45631 - Driver Misconduct</div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      High Priority
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">Customer complaint about driver behavior</div>
                  <div className="text-sm text-gray-500">Escalated by: Priya R. (4 hours ago)</div>
                  <div className="mt-2">
                    <Button size="sm" variant="default">Handle Case</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="priority">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Priority Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case #</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#PR-293</TableCell>
                    <TableCell>Account Compromise</TableCell>
                    <TableCell>Vikram M. (Premium)</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Under Investigation
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Review Case
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#PR-294</TableCell>
                    <TableCell>Disputed Charges</TableCell>
                    <TableCell>Neha K. (Business)</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Pending Review
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Review Case
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vip">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">VIP Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Active VIP Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium">Rahul S. (Corporate Account)</div>
                        <div className="text-sm text-gray-500">Billing dispute - 3 active tickets</div>
                        <Button size="sm" variant="outline" className="mt-2 w-full">View Details</Button>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium">Tata Consultancy (Enterprise)</div>
                        <div className="text-sm text-gray-500">Account management - 1 active ticket</div>
                        <Button size="sm" variant="outline" className="mt-2 w-full">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">VIP Response Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        Premium Account Resolution
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Corporate Apology Letter
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        VIP Service Recovery
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Enterprise Account Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SafetyResponseContent = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            Safety Response Dashboard
          </CardTitle>
          <CardDescription>
            Monitor and respond to safety-related incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2 bg-green-50">
                <CardTitle className="text-sm">Active Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm text-gray-500">Open safety cases requiring attention</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 bg-blue-50">
                <CardTitle className="text-sm">Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">14</div>
                <div className="text-sm text-gray-500">Rides under safety monitoring</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 bg-purple-50">
                <CardTitle className="text-sm">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4m</div>
                <div className="text-sm text-gray-500">Average safety response time today</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Active Safety Incidents</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex justify-between">
                  <div className="font-medium">Unsafe Driving Report</div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    High Priority
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Driver: Ravi K. (ID: DRV-3456)</p>
                  <p>Location: Saki Naka, Mumbai</p>
                  <p>Reported: 12 minutes ago</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="default">Contact Driver</Button>
                  <Button size="sm" variant="outline">Contact Rider</Button>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex justify-between">
                  <div className="font-medium">Route Deviation Alert</div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Medium Priority
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Driver: Suresh P. (ID: DRV-7890)</p>
                  <p>Location: Whitefield, Bangalore</p>
                  <p>Reported: 26 minutes ago</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="default">Contact Driver</Button>
                  <Button size="sm" variant="outline">Contact Rider</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Safety Resources</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" /> Safety Protocol Guide
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" /> Emergency Contact List
              </Button>
              <Button variant="outline" className="justify-start">
                <HeartPulse className="mr-2 h-4 w-4" /> First Response Actions
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="mr-2 h-4 w-4" /> Local Authority Contacts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SOSTeamContent = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <HeartPulse className="h-5 w-5 text-red-600 mr-2" />
            SOS Emergency Response Center
          </CardTitle>
          <CardDescription>
            Respond to emergency SOS signals from riders and drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="bg-red-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-800">Active SOS Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-800">1</div>
                <div className="text-sm text-red-800">Emergency requiring immediate response</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Response Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-gray-500">Teams available for dispatch</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Average Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2m</div>
                <div className="text-sm text-gray-500">For emergency SOS situations</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="p-4 bg-red-100 border border-red-300 rounded-md mb-4 animate-pulse">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-red-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                ACTIVE EMERGENCY SOS
              </h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-200 text-red-800">
                00:03:42 elapsed
              </span>
            </div>
            
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-semibold text-red-800">Rider</div>
                  <div className="font-medium">Ananya S.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-800">Driver</div>
                  <div className="font-medium">Kamal R. (ID: DRV-5432)</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-800">Location</div>
                  <div className="font-medium">MG Road, Bangalore</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-800">Vehicle</div>
                  <div className="font-medium">KA 01 MJ 4567 (White Sedan)</div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button variant="destructive" className="flex-1">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Contact Emergency Services
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact Rider
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact Driver
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent SOS History</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[200px] overflow-y-auto">
                <div className="space-y-2">
                  <div className="p-2 border rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">Medical Emergency</div>
                      <div className="text-xs text-gray-500">1 hour ago</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>South Extension, Delhi</p>
                    </div>
                    <div className="mt-1">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">Accident Report</div>
                      <div className="text-xs text-gray-500">Yesterday</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Andheri West, Mumbai</p>
                    </div>
                    <div className="mt-1">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Emergency Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Protocol Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HeartPulse className="mr-2 h-4 w-4" /> Medical Emergency Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" /> Local Police Stations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" /> Emergency Contact Directory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportContent;
