
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { roleAccessLevels, RoleKey, RoleApplication } from '@/constants/roleAccessLevels';
import { toast } from '@/components/ui/sonner';

interface QuickAccessProps {
  role: RoleKey;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ role }) => {
  const applications = roleAccessLevels[role].applications || [];
  
  const handleApplicationClick = (app: RoleApplication) => {
    // In a real app, this would navigate to the application
    // For now, we'll just show a toast notification
    toast.info(`Navigating to ${app.name}`);
    console.log(`Would navigate to: ${app.path}`);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applications.map((app, index) => (
          <Card 
            key={index} 
            className="hover:border-primary hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleApplicationClick(app)}
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">{app.name}</h3>
                <p className="text-sm text-muted-foreground">{app.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
