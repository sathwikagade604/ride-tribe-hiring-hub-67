
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Settings, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface VehicleManagementProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const VehicleManagement: React.FC<VehicleManagementProps> = ({ drivers, onUpdateDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [editVehicleDialog, setEditVehicleDialog] = useState(false);
  const [inspectionDialog, setInspectionDialog] = useState(false);

  const vehicleTypes = [
    { value: 'bike', label: 'Bike', icon: '🏍️' },
    { value: 'auto', label: 'Auto Rickshaw', icon: '🛺' },
    { value: 'hatchback', label: 'Hatchback', icon: '🚗' },
    { value: 'sedan', label: 'Sedan', icon: '🚙' },
    { value: 'suv', label: 'SUV', icon: '🚐' }
  ];

  const getVehicleStatus = (driver: any) => {
    // Simulate vehicle inspection status
    const inspectionDate = new Date(2024, 4, 15); // May 15, 2024
    const today = new Date();
    const daysSinceInspection = Math.floor((today.getTime() - inspectionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceInspection > 180) {
      return { status: 'expired', color: 'bg-red-500', label: 'Inspection Expired' };
    } else if (daysSinceInspection > 150) {
      return { status: 'warning', color: 'bg-yellow-500', label: 'Inspection Due Soon' };
    }
    return { status: 'valid', color: 'bg-green-500', label: 'Inspection Valid' };
  };

  const scheduleInspection = (driverId: string) => {
    // Simulate scheduling vehicle inspection
    toast.success('Vehicle inspection scheduled');
    setInspectionDialog(false);
  };

  const updateVehicleInfo = (driverId: string, vehicleData: any) => {
    onUpdateDriver(driverId, { vehicle: vehicleData });
    toast.success('Vehicle information updated');
    setEditVehicleDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vehicle Management</h2>
          <p className="text-muted-foreground">
            Manage vehicle registration, inspection, and maintenance
          </p>
        </div>
      </div>

      {/* Vehicle Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {vehicleTypes.map(type => (
          <Card key={type.value}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-2xl font-bold">
                {drivers.filter(d => d.vehicle.type === type.value).length}
              </div>
              <p className="text-sm text-muted-foreground">{type.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {drivers.map(driver => {
          const vehicleStatus = getVehicleStatus(driver);
          const vehicleType = vehicleTypes.find(t => t.value === driver.vehicle.type);

          return (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {vehicleType?.icon || '🚗'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{driver.personalInfo.fullName}</h3>
                      <p className="text-muted-foreground">{driver.personalInfo.phone}</p>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{driver.vehicle.make} {driver.vehicle.model}</p>
                            <p className="text-sm text-muted-foreground">
                              {driver.vehicle.year} • {driver.vehicle.color}
                            </p>
                          </div>
                          <Badge variant="outline" className="font-mono">
                            {driver.vehicle.plateNumber}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={`${vehicleStatus.color} text-white`}>
                            {vehicleStatus.label}
                          </Badge>
                          <Badge variant="outline">
                            {vehicleType?.label}
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>Registration: {driver.documents.vehicleRegistration}</p>
                          <p>Insurance: {driver.documents.insurance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDriver(driver)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Vehicle
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Vehicle Information</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Vehicle Type</Label>
                              <Select defaultValue={driver.vehicle.type}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {vehicleTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.icon} {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>License Plate</Label>
                              <Input defaultValue={driver.vehicle.plateNumber} />
                            </div>
                            <div>
                              <Label>Make</Label>
                              <Input defaultValue={driver.vehicle.make} />
                            </div>
                            <div>
                              <Label>Model</Label>
                              <Input defaultValue={driver.vehicle.model} />
                            </div>
                            <div>
                              <Label>Year</Label>
                              <Input type="number" defaultValue={driver.vehicle.year} />
                            </div>
                            <div>
                              <Label>Color</Label>
                              <Input defaultValue={driver.vehicle.color} />
                            </div>
                          </div>
                          <Button 
                            onClick={() => updateVehicleInfo(driver.id, driver.vehicle)}
                            className="w-full"
                          >
                            Update Vehicle Information
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className={vehicleStatus.status === 'expired' ? 'bg-red-600 hover:bg-red-700' : ''}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {vehicleStatus.status === 'expired' ? 'Schedule Inspection' : 'View Inspection'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Vehicle Inspection</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 border rounded-lg">
                            {vehicleStatus.status === 'valid' ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            )}
                            <div>
                              <p className="font-medium">{vehicleStatus.label}</p>
                              <p className="text-sm text-muted-foreground">
                                Last inspection: May 15, 2024
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium">Inspection Checklist</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Engine condition</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Brake system</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Tire condition</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Lights and signals</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Safety equipment</span>
                              </div>
                            </div>
                          </div>

                          {vehicleStatus.status !== 'valid' && (
                            <Button 
                              onClick={() => scheduleInspection(driver.id)}
                              className="w-full"
                            >
                              Schedule New Inspection
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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

export default VehicleManagement;
