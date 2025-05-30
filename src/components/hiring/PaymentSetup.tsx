import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, Wallet, Ban, IndianRupee, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface PaymentSetupProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const PaymentSetup: React.FC<PaymentSetupProps> = ({ drivers, onUpdateDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [paymentDialog, setPaymentDialog] = useState(false);

  const paymentMethods = [
    { id: 'bank', label: 'Bank Account', icon: Ban, description: 'Direct bank transfer' },
    { id: 'upi', label: 'UPI', icon: Wallet, description: 'UPI payments' },
    { id: 'wallet', label: 'Digital Wallet', icon: CreditCard, description: 'Paytm, PhonePe, etc.' }
  ];

  const setupPaymentMethod = (driverId: string, method: string, details: any) => {
    // Simulate payment method setup
    onUpdateDriver(driverId, {
      paymentSetup: {
        method,
        details,
        verified: true,
        setupDate: new Date().toISOString()
      }
    });
    
    toast.success('Payment method configured successfully');
    setPaymentDialog(false);
  };

  const calculateEarnings = (driver: any) => {
    // Simulate earnings calculation based on rides
    const baseRate = 50; // Base rate per ride
    const commission = 0.15; // 15% commission
    const grossEarnings = driver.totalRides * baseRate;
    const netEarnings = grossEarnings * (1 - commission);
    
    return {
      gross: grossEarnings,
      commission: grossEarnings * commission,
      net: netEarnings
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment & Wallet Management</h2>
          <p className="text-muted-foreground">
            Configure payment methods and manage driver earnings
          </p>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {drivers.reduce((sum, d) => sum + d.earnings.month, 0).toLocaleString()}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Drivers</p>
                <p className="text-2xl font-bold">
                  {drivers.filter(d => d.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payment Setup</p>
                <p className="text-2xl font-bold">
                  {drivers.filter(d => d.paymentSetup?.verified).length}/{drivers.length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {drivers.length > 0 
                    ? (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Payment Setup */}
      <div className="space-y-4">
        {drivers.map(driver => {
          const earnings = calculateEarnings(driver);
          const hasPaymentSetup = driver.paymentSetup?.verified;

          return (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{driver.personalInfo.fullName}</h3>
                      <p className="text-muted-foreground">{driver.personalInfo.email}</p>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-600 font-medium">Today's Earnings</p>
                          <p className="text-lg font-bold flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {driver.earnings.today}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 font-medium">Weekly Earnings</p>
                          <p className="text-lg font-bold flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {driver.earnings.week}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">Monthly Earnings</p>
                          <p className="text-lg font-bold flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {driver.earnings.month}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Badge className={hasPaymentSetup ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {hasPaymentSetup ? 'Payment Setup Complete' : 'Payment Setup Pending'}
                        </Badge>
                        <Badge variant="outline">
                          {driver.totalRides} rides
                        </Badge>
                      </div>

                      {hasPaymentSetup && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>Method: {driver.paymentSetup.method.toUpperCase()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant={hasPaymentSetup ? 'outline' : 'default'}
                          onClick={() => setSelectedDriver(driver)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          {hasPaymentSetup ? 'Update Payment' : 'Setup Payment'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {hasPaymentSetup ? 'Update' : 'Setup'} Payment Method
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Payment Method</Label>
                            <Select defaultValue={driver.paymentSetup?.method || 'bank'}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                {paymentMethods.map(method => (
                                  <SelectItem key={method.id} value={method.id}>
                                    <div className="flex items-center gap-2">
                                      <method.icon className="h-4 w-4" />
                                      {method.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label>Account Holder Name</Label>
                              <Input placeholder="Enter account holder name" />
                            </div>
                            <div>
                              <Label>Account Number / UPI ID</Label>
                              <Input placeholder="Enter account details" />
                            </div>
                            <div>
                              <Label>IFSC Code / Additional Info</Label>
                              <Input placeholder="Enter IFSC or additional details" />
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Earnings Summary</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Gross Earnings:</span>
                                <span className="flex items-center">
                                  <IndianRupee className="h-3 w-3" />
                                  {earnings.gross}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Commission (15%):</span>
                                <span className="flex items-center">
                                  <IndianRupee className="h-3 w-3" />
                                  {earnings.commission}
                                </span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Net Earnings:</span>
                                <span className="flex items-center">
                                  <IndianRupee className="h-3 w-3" />
                                  {earnings.net}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => setupPaymentMethod(driver.id, 'bank', {})}
                            className="w-full"
                          >
                            {hasPaymentSetup ? 'Update' : 'Setup'} Payment Method
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="outline">
                      View Earnings Report
                    </Button>
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

export default PaymentSetup;
