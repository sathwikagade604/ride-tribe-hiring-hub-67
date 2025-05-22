
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Smartphone, Laptop, Search } from 'lucide-react';

const SystemDiagnostics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Diagnostics Tools</CardTitle>
        <CardDescription>
          Run diagnostics on app and device issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-24 flex flex-col items-center justify-center space-y-2">
            <Smartphone className="h-6 w-6" />
            <span>Mobile App Diagnostics</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center space-y-2" variant="outline">
            <Laptop className="h-6 w-6" />
            <span>System Logs Analyzer</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center space-y-2" variant="outline">
            <Search className="h-6 w-6" />
            <span>Network Connectivity Test</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemDiagnostics;
