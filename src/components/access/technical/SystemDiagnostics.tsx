
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Laptop, Search, ShieldAlert, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const SystemDiagnostics: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);

  const handleRunDiagnostic = (toolName: string) => {
    setSelectedTool(toolName);
    setIsDialogOpen(true);
    toast.info(`Running ${toolName} diagnostic...`);
  };

  const handleEmergencyAction = () => {
    setIsEmergencyDialogOpen(true);
  };

  const handleEmergencySubmit = () => {
    toast.success("Emergency alert sent to support team. They will contact the user shortly.");
    setIsEmergencyDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Diagnostics Tools</CardTitle>
          <CardDescription>
            Run diagnostics on app and device issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleRunDiagnostic('Mobile App Diagnostics')}
            >
              <Smartphone className="h-6 w-6" />
              <span>Mobile App Diagnostics</span>
            </Button>
            <Button 
              className="h-24 flex flex-col items-center justify-center space-y-2" 
              variant="outline"
              onClick={() => handleRunDiagnostic('System Logs Analyzer')}
            >
              <Laptop className="h-6 w-6" />
              <span>System Logs Analyzer</span>
            </Button>
            <Button 
              className="h-24 flex flex-col items-center justify-center space-y-2" 
              variant="outline"
              onClick={() => handleRunDiagnostic('Network Connectivity Test')}
            >
              <Search className="h-6 w-6" />
              <span>Network Connectivity Test</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-red-700 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Safety & Emergency Support
            </CardTitle>
            <Badge variant="destructive">Priority Support</Badge>
          </div>
          <CardDescription className="text-red-600">
            Handle critical safety concerns and emergency situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Technical support agents can initiate emergency protocols for users experiencing safety concerns or critical technical failures that may impact their well-being.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-md p-4 bg-white">
                <div className="font-semibold flex items-center gap-2 mb-2 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency Response Actions
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Coordinate with local emergency services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Contact rider's emergency contacts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Track real-time location data
                  </li>
                </ul>
              </div>
              
              <div className="border border-red-200 rounded-md p-4 bg-white">
                <div className="font-semibold flex items-center gap-2 mb-2 text-red-700">
                  <ShieldAlert className="h-4 w-4" />
                  Technical Safety Issues
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Vehicle critical malfunction
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    App location data failure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Payment system security breach
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            onClick={handleEmergencyAction}
            className="w-full"
          >
            <ShieldAlert className="h-4 w-4 mr-2" />
            Initiate Emergency Response Protocol
          </Button>
        </CardFooter>
      </Card>

      {/* Diagnostic Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTool}</DialogTitle>
            <DialogDescription>
              Running diagnostics to identify and resolve issues.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Checking system configuration...</span>
                <Badge>Complete</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Analyzing logs...</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Testing network connectivity...</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Verifying account permissions...</span>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button>View Full Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Emergency Response Dialog */}
      <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
        <DialogContent className="bg-red-50 border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-700">Emergency Response Protocol</DialogTitle>
            <DialogDescription className="text-red-600">
              This will alert the emergency support team immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-white p-4 rounded-md border border-red-200">
              <h4 className="font-medium mb-2">User Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>User ID:</div>
                <div>RDR-2876539</div>
                <div>Name:</div>
                <div>Priya Sharma</div>
                <div>Location:</div>
                <div>Delhi NCR (Last known)</div>
                <div>Contact:</div>
                <div>+91 98765-43210</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-red-200">
              <h4 className="font-medium mb-2">Emergency Details</h4>
              <textarea 
                className="w-full border rounded-md p-2 text-sm"
                rows={3}
                placeholder="Describe the emergency situation..."
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmergencyDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleEmergencySubmit}>
              <ShieldAlert className="h-4 w-4 mr-2" />
              Confirm Emergency Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemDiagnostics;
