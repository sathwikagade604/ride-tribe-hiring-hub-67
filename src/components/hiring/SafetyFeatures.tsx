
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, AlertTriangle, Phone, MapPin, Camera, Users, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface SafetyFeaturesProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const SafetyFeatures: React.FC<SafetyFeaturesProps> = ({ drivers, onUpdateDriver }) => {
  const [sosDialog, setSosDialog] = useState(false);
  const [emergencyDialog, setEmergencyDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const safetyFeatures = [
    {
      id: 'sos',
      title: 'SOS Emergency Button',
      description: 'One-touch emergency assistance',
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-100'
    },
    {
      id: 'tracking',
      title: 'Live GPS Tracking',
      description: 'Real-time location monitoring',
      icon: MapPin,
      color: 'text-blue-500',
      bg: 'bg-blue-100'
    },
    {
      id: 'emergency_contacts',
      title: 'Emergency Contacts',
      description: 'Quick access to emergency numbers',
      icon: Phone,
      color: 'text-green-500',
      bg: 'bg-green-100'
    },
    {
      id: 'trip_sharing',
      title: 'Trip Sharing',
      description: 'Share ride details with trusted contacts',
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-100'
    },
    {
      id: 'panic_mode',
      title: 'Panic Mode',
      description: 'Silent alarm system',
      icon: Shield,
      color: 'text-orange-500',
      bg: 'bg-orange-100'
    },
    {
      id: 'health_check',
      title: 'Driver Wellness',
      description: 'Monitor driver health and fatigue',
      icon: Heart,
      color: 'text-pink-500',
      bg: 'bg-pink-100'
    }
  ];

  const handleSOSAlert = (driverId: string) => {
    // Simulate SOS alert processing
    toast.error('SOS Alert Activated - Emergency Response Initiated');
    
    // Update driver status
    onUpdateDriver(driverId, {
      emergencyStatus: {
        isActive: true,
        type: 'sos',
        timestamp: new Date().toISOString(),
        location: 'Current GPS location',
        responded: false
      }
    });

    setSosDialog(false);
  };

  const addEmergencyContact = (driverId: string, contactData: any) => {
    const driver = drivers.find(d => d.id === driverId);
    const updatedContacts = [...(driver.emergencyContacts || []), contactData];
    
    onUpdateDriver(driverId, {
      emergencyContacts: updatedContacts
    });

    toast.success('Emergency contact added successfully');
    setEmergencyDialog(false);
  };

  const getSafetyScore = (driver: any) => {
    let score = 0;
    
    // Check various safety factors
    if (driver.verification.backgroundCheck === 'cleared') score += 25;
    if (driver.verification.documentsVerified) score += 20;
    if (driver.emergencyContacts?.length > 0) score += 15;
    if (driver.rating >= 4.5) score += 20;
    if (driver.totalRides > 100) score += 20;

    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Safety & Security Features</h2>
          <p className="text-muted-foreground">
            Comprehensive safety measures for drivers and riders
          </p>
        </div>
      </div>

      {/* Safety Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safetyFeatures.map(feature => {
          const FeatureIcon = feature.icon;
          return (
            <Card key={feature.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${feature.bg}`}>
                    <FeatureIcon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Driver Safety Dashboard */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Driver Safety Dashboard</h3>
        
        {drivers.map(driver => {
          const safetyScore = getSafetyScore(driver);
          const hasEmergencyContacts = driver.emergencyContacts?.length > 0;
          const isActive = driver.status === 'active';

          return (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6" />
                      </div>
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{driver.personalInfo.fullName}</h3>
                      <p className="text-muted-foreground">{driver.personalInfo.email}</p>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Safety Score</span>
                          <span className="text-sm font-bold">{safetyScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              safetyScore >= 80 ? 'bg-green-500' : 
                              safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${safetyScore}%` }}
                          ></div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant={hasEmergencyContacts ? 'default' : 'outline'}>
                            Emergency Contacts: {driver.emergencyContacts?.length || 0}
                          </Badge>
                          <Badge variant={driver.verification.backgroundCheck === 'cleared' ? 'default' : 'outline'}>
                            Background: {driver.verification.backgroundCheck}
                          </Badge>
                          <Badge variant={isActive ? 'default' : 'secondary'}>
                            Status: {driver.status}
                          </Badge>
                        </div>

                        {driver.emergencyStatus?.isActive && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium text-red-700">
                                Emergency Alert Active
                              </span>
                            </div>
                            <p className="text-xs text-red-600 mt-1">
                              {driver.emergencyStatus.type.toUpperCase()} activated at {
                                new Date(driver.emergencyStatus.timestamp).toLocaleTimeString()
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => setSelectedDriver(driver)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          SOS Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-red-600">SOS Emergency System</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <p className="text-sm text-red-700">
                              <strong>Warning:</strong> This will trigger an emergency alert and notify 
                              emergency contacts and authorities.
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <Label>Current Location</Label>
                              <Input value="Sector 18, Noida, UP (GPS: 28.5706, 77.3272)" readOnly />
                            </div>
                            <div>
                              <Label>Emergency Type</Label>
                              <select className="w-full p-2 border rounded">
                                <option>Medical Emergency</option>
                                <option>Security Threat</option>
                                <option>Vehicle Breakdown</option>
                                <option>Other Emergency</option>
                              </select>
                            </div>
                            <div>
                              <Label>Additional Information</Label>
                              <Textarea placeholder="Describe the emergency situation..." />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSOSAlert(driver.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700"
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Activate SOS
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setSosDialog(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDriver(driver)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Emergency Contacts
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Emergency Contacts</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {driver.emergencyContacts?.length > 0 ? (
                            <div className="space-y-2">
                              {driver.emergencyContacts.map((contact: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                    <p className="font-medium">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                                    <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                                  </div>
                                  <Badge variant="outline">Primary</Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-4">
                              No emergency contacts added yet
                            </p>
                          )}

                          <div className="border-t pt-4 space-y-3">
                            <h4 className="font-medium">Add Emergency Contact</h4>
                            <div className="space-y-2">
                              <Input placeholder="Contact Name" />
                              <Input placeholder="Phone Number" />
                              <Input placeholder="Relationship" />
                            </div>
                            <Button
                              onClick={() => addEmergencyContact(driver.id, {
                                name: 'Emergency Contact',
                                phone: '+91 9876543210',
                                relationship: 'Family'
                              })}
                              className="w-full"
                            >
                              Add Contact
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Track Live
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

export default SafetyFeatures;
