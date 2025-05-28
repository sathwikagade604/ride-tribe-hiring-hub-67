
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, CheckCircle, XCircle, Clock, FileText, Camera, Shield } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const driverVerificationSchema = z.object({
  licenseNumber: z.string().min(10, 'License number must be at least 10 characters'),
  licenseExpiry: z.string().min(1, 'License expiry date is required'),
  vehicleRegistration: z.string().min(8, 'Vehicle registration number is required'),
  vehicleInsurance: z.string().min(1, 'Insurance policy number is required'),
  insuranceExpiry: z.string().min(1, 'Insurance expiry date is required'),
  aadharNumber: z.string().min(12, 'Aadhar number must be 12 digits').max(12, 'Aadhar number must be 12 digits'),
  panNumber: z.string().min(10, 'PAN number must be 10 characters').max(10, 'PAN number must be 10 characters'),
});

type DriverVerificationValues = z.infer<typeof driverVerificationSchema>;

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected' | 'uploaded';
  required: boolean;
  uploadedAt?: string;
}

const DriverVerification = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'license', name: 'Driving License', status: 'pending', required: true },
    { id: 'registration', name: 'Vehicle Registration Certificate', status: 'pending', required: true },
    { id: 'insurance', name: 'Vehicle Insurance', status: 'pending', required: true },
    { id: 'aadhar', name: 'Aadhar Card', status: 'pending', required: true },
    { id: 'pan', name: 'PAN Card', status: 'pending', required: true },
    { id: 'photo', name: 'Profile Photo', status: 'pending', required: true },
    { id: 'vehicle-photo', name: 'Vehicle Photo', status: 'pending', required: true },
    { id: 'police-verification', name: 'Police Verification Certificate', status: 'pending', required: false },
  ]);

  const form = useForm<DriverVerificationValues>({
    resolver: zodResolver(driverVerificationSchema),
    defaultValues: {
      licenseNumber: '',
      licenseExpiry: '',
      vehicleRegistration: '',
      vehicleInsurance: '',
      insuranceExpiry: '',
      aadharNumber: '',
      panNumber: '',
    },
  });

  const handleDocumentUpload = (documentId: string) => {
    // Simulate document upload
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: 'uploaded', uploadedAt: new Date().toISOString() }
          : doc
      )
    );
    toast.success('Document uploaded successfully');
  };

  const onSubmit = (data: DriverVerificationValues) => {
    console.log('Verification data:', data);
    toast.success('Verification details submitted for review');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'uploaded':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'uploaded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const approvedCount = documents.filter(doc => doc.status === 'approved').length;
  const totalRequired = documents.filter(doc => doc.required).length;

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Driver Verification Status
          </CardTitle>
          <CardDescription>
            Complete your verification to start driving and earning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{approvedCount}/{totalRequired}</p>
              <p className="text-sm text-muted-foreground">Documents Approved</p>
            </div>
            <div className="text-right">
              <Badge variant={approvedCount === totalRequired ? 'default' : 'secondary'}>
                {approvedCount === totalRequired ? 'Verified' : 'Pending Verification'}
              </Badge>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(approvedCount / totalRequired) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>Upload required documents for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span className="font-medium text-sm">{doc.name}</span>
                    {doc.required && <span className="text-red-500 text-xs">*</span>}
                  </div>
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                </div>
                {doc.status === 'pending' ? (
                  <Button
                    onClick={() => handleDocumentUpload(doc.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Form */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Details</CardTitle>
          <CardDescription>Provide your document details for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driving License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licenseExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Registration Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter registration number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter policy number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insuranceExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 12-digit Aadhar number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter PAN number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Verification Details
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Background Check Info */}
      <Card>
        <CardHeader>
          <CardTitle>Background Check Process</CardTitle>
          <CardDescription>What happens after document submission</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium">Document Verification</h4>
                <p className="text-sm text-muted-foreground">We verify all submitted documents with relevant authorities</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium">Background Check</h4>
                <p className="text-sm text-muted-foreground">Police verification and criminal background check</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium">Training & Onboarding</h4>
                <p className="text-sm text-muted-foreground">Complete safety training and app orientation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div>
                <h4 className="font-medium">Start Earning</h4>
                <p className="text-sm text-muted-foreground">Begin accepting rides and earning money</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverVerification;
