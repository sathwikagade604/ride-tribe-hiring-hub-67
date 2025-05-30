
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { FileText, Upload, CheckCircle, XCircle, Clock, Camera } from 'lucide-react';

interface KYCVerificationProps {
  drivers: any[];
  onUpdateDriver: (driverId: string, updates: any) => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ drivers, onUpdateDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');

  const documentTypes = [
    { key: 'drivingLicense', label: 'Driving License', required: true },
    { key: 'aadharCard', label: 'Aadhar Card', required: true },
    { key: 'panCard', label: 'PAN Card', required: false },
    { key: 'vehicleRegistration', label: 'Vehicle Registration', required: true },
    { key: 'insurance', label: 'Insurance Certificate', required: true }
  ];

  const getVerificationStatus = (driver: any) => {
    const { kycStatus } = driver.verification;
    switch (kycStatus) {
      case 'verified':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Verified' };
      case 'rejected':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Rejected' };
      default:
        return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Pending' };
    }
  };

  const handleDocumentUpload = (driverId: string, docType: string) => {
    setUploadType(docType);
    setSelectedDriver(drivers.find(d => d.id === driverId));
    setUploadDialog(true);
  };

  const processDocumentUpload = () => {
    if (!selectedDriver) return;

    // Simulate document upload
    const updatedDocuments = {
      ...selectedDriver.documents,
      [uploadType]: `uploaded_${uploadType}_${Date.now()}`
    };

    onUpdateDriver(selectedDriver.id, {
      documents: updatedDocuments
    });

    toast.success('Document uploaded successfully');
    setUploadDialog(false);
    setUploadType('');
  };

  const verifyDriver = (driverId: string, status: 'verified' | 'rejected') => {
    onUpdateDriver(driverId, {
      verification: {
        ...drivers.find(d => d.id === driverId)?.verification,
        kycStatus: status,
        documentsVerified: status === 'verified'
      }
    });

    toast.success(`Driver ${status} successfully`);
  };

  const checkDocumentCompleteness = (driver: any) => {
    const requiredDocs = documentTypes.filter(doc => doc.required);
    const uploadedDocs = requiredDocs.filter(doc => driver.documents[doc.key]);
    return {
      completed: uploadedDocs.length,
      total: requiredDocs.length,
      percentage: (uploadedDocs.length / requiredDocs.length) * 100
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">KYC & Document Verification</h2>
          <p className="text-muted-foreground">
            Verify driver documents and complete KYC process
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.kycStatus === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.kycStatus === 'verified').length}
            </div>
            <p className="text-sm text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.kycStatus === 'rejected').length}
            </div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.verification.documentsVerified).length}
            </div>
            <p className="text-sm text-muted-foreground">Documents Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Driver KYC List */}
      <div className="space-y-4">
        {drivers.map(driver => {
          const status = getVerificationStatus(driver);
          const docProgress = checkDocumentCompleteness(driver);
          const StatusIcon = status.icon;

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
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Document Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {docProgress.completed}/{docProgress.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${docProgress.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {documentTypes.map(docType => (
                          <div key={docType.key} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              driver.documents[docType.key] ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-xs">{docType.label}</span>
                            {docType.required && !driver.documents[docType.key] && (
                              <span className="text-xs text-red-500">*</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge className={status.bg}>
                      {status.label}
                    </Badge>
                    
                    {driver.verification.kycStatus === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => verifyDriver(driver.id, 'verified')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => verifyDriver(driver.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Documents
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {driver.personalInfo.fullName} - Documents
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {documentTypes.map(docType => (
                            <div key={docType.key} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{docType.label}</h4>
                                <div className="flex items-center gap-2">
                                  {driver.documents[docType.key] ? (
                                    <Badge className="bg-green-100 text-green-800">
                                      Uploaded
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      Not Uploaded
                                    </Badge>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDocumentUpload(driver.id, docType.key)}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </div>
                              </div>
                              {driver.documents[docType.key] && (
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-sm text-muted-foreground">
                                    Document ID: {driver.documents[docType.key]}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
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

      {/* Document Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Document Type</Label>
              <p className="text-sm text-muted-foreground">
                {documentTypes.find(doc => doc.key === uploadType)?.label}
              </p>
            </div>
            <div>
              <Label htmlFor="documentFile">Choose File</Label>
              <Input
                id="documentFile"
                type="file"
                accept="image/*,application/pdf"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notes">Verification Notes</Label>
              <Textarea
                id="notes"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                placeholder="Add any notes about this document..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={processDocumentUpload} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <Button
                variant="outline"
                onClick={() => setUploadDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCVerification;
