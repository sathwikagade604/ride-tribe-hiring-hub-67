
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface BackgroundCheckProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const BackgroundCheck: React.FC<BackgroundCheckProps> = ({ drivers, onUpdateDriver }) => {
  const [processingChecks, setProcessingChecks] = useState<string[]>([]);

  const backgroundCheckSteps = [
    { id: 'criminal', label: 'Criminal Background Check', weight: 30 },
    { id: 'driving', label: 'Driving Record Verification', weight: 25 },
    { id: 'employment', label: 'Employment History', weight: 20 },
    { id: 'reference', label: 'Reference Verification', weight: 15 },
    { id: 'credit', label: 'Credit Score Check', weight: 10 }
  ];

  const initiateBackgroundCheck = async (driverId: string) => {
    setProcessingChecks(prev => [...prev, driverId]);
    
    try {
      // Simulate background check process
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Update progress would go here
      }

      // Simulate check result (90% pass rate)
      const passed = Math.random() > 0.1;
      
      onUpdateDriver(driverId, {
        verification: {
          ...drivers.find(d => d.id === driverId)?.verification,
          backgroundCheck: passed ? 'cleared' : 'failed'
        }
      });

      toast.success(`Background check ${passed ? 'cleared' : 'failed'} for driver`);
    } catch (error) {
      toast.error('Background check failed due to system error');
    } finally {
      setProcessingChecks(prev => prev.filter(id => id !== driverId));
    }
  };

  const getCheckStatus = (driver: any) => {
    const { backgroundCheck } = driver.verification;
    switch (backgroundCheck) {
      case 'cleared':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Cleared' };
      case 'failed':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Failed' };
      default:
        return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Pending' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Background Verification</h2>
          <p className="text-muted-foreground">
            Comprehensive background checks for driver safety
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.backgroundCheck === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Checks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.backgroundCheck === 'cleared').length}
            </div>
            <p className="text-sm text-muted-foreground">Cleared</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.backgroundCheck === 'failed').length}
            </div>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {processingChecks.length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Background Check Process Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Background Check Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backgroundCheckSteps.map(step => (
              <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">{step.label}</p>
                  <p className="text-sm text-muted-foreground">Weight: {step.weight}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Driver Background Check List */}
      <div className="space-y-4">
        {drivers.map(driver => {
          const status = getCheckStatus(driver);
          const StatusIcon = status.icon;
          const isProcessing = processingChecks.includes(driver.id);

          return (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${status.bg}`}>
                      <StatusIcon className={`h-5 w-5 ${status.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{driver.personalInfo.fullName}</h3>
                      <p className="text-muted-foreground">{driver.personalInfo.email}</p>
                      <p className="text-sm text-muted-foreground">{driver.personalInfo.phone}</p>
                      
                      {isProcessing && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Background check in progress...</p>
                          <Progress value={60} className="w-full" />
                        </div>
                      )}

                      {driver.verification.backgroundCheck === 'cleared' && (
                        <div className="mt-3">
                          <p className="text-sm text-green-600 font-medium">✓ All background checks passed</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <p>• Criminal background: Clear</p>
                            <p>• Driving record: Clean</p>
                            <p>• Employment history: Verified</p>
                            <p>• References: Confirmed</p>
                          </div>
                        </div>
                      )}

                      {driver.verification.backgroundCheck === 'failed' && (
                        <div className="mt-3">
                          <p className="text-sm text-red-600 font-medium">✗ Background check failed</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <p>• Issues found in verification process</p>
                            <p>• Manual review required</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge className={status.bg}>
                      {status.label}
                    </Badge>
                    
                    {driver.verification.backgroundCheck === 'pending' && !isProcessing && (
                      <Button
                        size="sm"
                        onClick={() => initiateBackgroundCheck(driver.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Start Check
                      </Button>
                    )}

                    {driver.verification.backgroundCheck === 'failed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => initiateBackgroundCheck(driver.id)}
                      >
                        Retry Check
                      </Button>
                    )}

                    {isProcessing && (
                      <Button size="sm" disabled>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundCheck;
