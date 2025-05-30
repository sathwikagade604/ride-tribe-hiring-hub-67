
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { User, Phone, Mail, MapPin, Car, FileText } from 'lucide-react';

interface DriverRegistrationProps {
  onSubmit: (driverData: any) => void;
}

const DriverRegistration: React.FC<DriverRegistrationProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      emergencyContact: ''
    },
    vehicle: {
      type: '',
      make: '',
      model: '',
      year: '',
      color: '',
      plateNumber: ''
    },
    documents: {
      drivingLicense: '',
      aadharCard: '',
      panCard: '',
      vehicleRegistration: '',
      insurance: ''
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.personalInfo.fullName || !formData.personalInfo.email || !formData.personalInfo.phone) {
      toast.error('Please fill in all required personal information');
      return;
    }

    if (!formData.vehicle.type || !formData.vehicle.plateNumber) {
      toast.error('Please provide vehicle information');
      return;
    }

    if (!formData.documents.drivingLicense) {
      toast.error('Driving license is required');
      return;
    }

    onSubmit(formData);
    toast.success('Driver registration submitted successfully!');
    
    // Reset form
    setFormData({
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        emergencyContact: ''
      },
      vehicle: {
        type: '',
        make: '',
        model: '',
        year: '',
        color: '',
        plateNumber: ''
      },
      documents: {
        drivingLicense: '',
        aadharCard: '',
        panCard: '',
        vehicleRegistration: '',
        insurance: ''
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                placeholder="+91 9876543210"
                required
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.personalInfo.emergencyContact}
                onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', e.target.value)}
                placeholder="+91 9876543211"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.personalInfo.address}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              placeholder="Enter full address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleType">Vehicle Type *</Label>
              <Select 
                value={formData.vehicle.type} 
                onValueChange={(value) => handleInputChange('vehicle', 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bike">Bike</SelectItem>
                  <SelectItem value="auto">Auto Rickshaw</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="plateNumber">License Plate *</Label>
              <Input
                id="plateNumber"
                value={formData.vehicle.plateNumber}
                onChange={(e) => handleInputChange('vehicle', 'plateNumber', e.target.value)}
                placeholder="UP16AB1234"
                required
              />
            </div>
            <div>
              <Label htmlFor="make">Vehicle Make</Label>
              <Input
                id="make"
                value={formData.vehicle.make}
                onChange={(e) => handleInputChange('vehicle', 'make', e.target.value)}
                placeholder="Maruti, Hyundai, etc."
              />
            </div>
            <div>
              <Label htmlFor="model">Vehicle Model</Label>
              <Input
                id="model"
                value={formData.vehicle.model}
                onChange={(e) => handleInputChange('vehicle', 'model', e.target.value)}
                placeholder="Swift, i20, etc."
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.vehicle.year}
                onChange={(e) => handleInputChange('vehicle', 'year', e.target.value)}
                placeholder="2020"
                min="2000"
                max="2024"
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.vehicle.color}
                onChange={(e) => handleInputChange('vehicle', 'color', e.target.value)}
                placeholder="White, Black, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="drivingLicense">Driving License Number *</Label>
              <Input
                id="drivingLicense"
                value={formData.documents.drivingLicense}
                onChange={(e) => handleInputChange('documents', 'drivingLicense', e.target.value)}
                placeholder="DL123456789"
                required
              />
            </div>
            <div>
              <Label htmlFor="aadharCard">Aadhar Card Number</Label>
              <Input
                id="aadharCard"
                value={formData.documents.aadharCard}
                onChange={(e) => handleInputChange('documents', 'aadharCard', e.target.value)}
                placeholder="1234 5678 9012"
              />
            </div>
            <div>
              <Label htmlFor="panCard">PAN Card Number</Label>
              <Input
                id="panCard"
                value={formData.documents.panCard}
                onChange={(e) => handleInputChange('documents', 'panCard', e.target.value)}
                placeholder="ABCDE1234F"
              />
            </div>
            <div>
              <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
              <Input
                id="vehicleRegistration"
                value={formData.documents.vehicleRegistration}
                onChange={(e) => handleInputChange('documents', 'vehicleRegistration', e.target.value)}
                placeholder="UP16AB1234"
              />
            </div>
            <div>
              <Label htmlFor="insurance">Insurance Policy Number</Label>
              <Input
                id="insurance"
                value={formData.documents.insurance}
                onChange={(e) => handleInputChange('documents', 'insurance', e.target.value)}
                placeholder="INS123456"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg">
        Submit Driver Registration
      </Button>
    </form>
  );
};

export default DriverRegistration;
