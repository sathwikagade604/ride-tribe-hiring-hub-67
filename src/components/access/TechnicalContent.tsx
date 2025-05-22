
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FilterX, Laptop, Smartphone, HelpCircle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock technical issues data
const mockTechnicalIssues = [
  { 
    id: 'T1001', 
    title: 'App Crashes on Startup', 
    userType: 'driver', 
    username: 'ashokd', 
    device: 'Android 13',
    status: 'open',
    priority: 'high',
    created: '2025-05-20T10:30:00'
  },
  { 
    id: 'T1002', 
    title: 'Payment Screen Freezes', 
    userType: 'rider', 
    username: 'priyar', 
    device: 'iOS 18',
    status: 'in progress',
    priority: 'medium',
    created: '2025-05-21T09:15:00'
  },
  { 
    id: 'T1003', 
    title: 'Location Not Updating', 
    userType: 'driver', 
    username: 'rajeshs', 
    device: 'Android 14',
    status: 'open',
    priority: 'high',
    created: '2025-05-21T14:45:00'
  },
  { 
    id: 'T1004', 
    title: 'Unable to Upload Documents', 
    userType: 'driver', 
    username: 'vikramd', 
    device: 'Android 12',
    status: 'resolved',
    priority: 'medium',
    created: '2025-05-19T11:20:00'
  },
  { 
    id: 'T1005', 
    title: 'Notification Sounds Not Working', 
    userType: 'rider', 
    username: 'amitc', 
    device: 'iOS 17',
    status: 'in progress',
    priority: 'low',
    created: '2025-05-20T16:10:00'
  },
];

// Technical Support knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 'KB001',
    title: 'Troubleshooting App Crashes',
    category: 'App Issues',
    platform: 'All Platforms',
    lastUpdated: '2025-05-15'
  },
  {
    id: 'KB002',
    title: 'Fixing GPS Issues for Drivers',
    category: 'Location Services',
    platform: 'Android',
    lastUpdated: '2025-05-10'
  },
  {
    id: 'KB003',
    title: 'Payment Processing Errors',
    category: 'Payments',
    platform: 'All Platforms',
    lastUpdated: '2025-05-18'
  },
  {
    id: 'KB004',
    title: 'Optimizing Battery Usage',
    category: 'Performance',
    platform: 'iOS',
    lastUpdated: '2025-05-12'
  },
  {
    id: 'KB005',
    title: 'Resolving Login Issues',
    category: 'Authentication',
    platform: 'All Platforms',
    lastUpdated: '2025-05-20'
  },
];

const TechnicalContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter technical issues based on search query and status filter
  const filteredIssues = mockTechnicalIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleResolveIssue = (issueId: string) => {
    toast.success(`Issue ${issueId} marked as resolved`);
  };
  
  const handleViewKnowledgeBase = (articleId: string) => {
    toast.info(`Viewing knowledge base article ${articleId}`);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Technical Support Dashboard</h2>
      
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">Technical Issues</TabsTrigger>
          <TabsTrigger value="diagnostics">System Diagnostics</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="stats">Support Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search issues..."
                className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(statusFilter === 'open' ? null : 'open')}
              >
                Open
              </Button>
              <Button
                variant={statusFilter === 'in progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(statusFilter === 'in progress' ? null : 'in progress')}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(statusFilter === 'resolved' ? null : 'resolved')}
              >
                Resolved
              </Button>
              {statusFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStatusFilter(null)}
                >
                  <FilterX className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No technical issues match your search criteria
              </div>
            ) : (
              filteredIssues.map(issue => (
                <Card key={issue.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{issue.title}</CardTitle>
                      <div className="flex space-x-2">
                        <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'outline'}>
                          {issue.priority}
                        </Badge>
                        <Badge variant={
                          issue.status === 'open' ? 'default' : 
                          issue.status === 'in progress' ? 'secondary' : 
                          'outline'
                        }>
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      ID: {issue.id} • Reported by: {issue.userType === 'driver' ? 'Driver' : 'Rider'} ({issue.username}) • 
                      Device: {issue.device} • {new Date(issue.created).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex justify-end w-full space-x-2">
                      <Button variant="outline" size="sm">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        {issue.userType === 'driver' ? (
                          <Laptop className="h-4 w-4 mr-1" />
                        ) : (
                          <Smartphone className="h-4 w-4 mr-1" />
                        )}
                        Contact {issue.userType === 'driver' ? 'Driver' : 'Rider'}
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleResolveIssue(issue.id)}
                        disabled={issue.status === 'resolved'}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        {issue.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeBaseArticles.map(article => (
              <Card key={article.id} className="cursor-pointer hover:border-primary" onClick={() => handleViewKnowledgeBase(article.id)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>
                    {article.category} • {article.platform}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 text-sm text-muted-foreground">
                  Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="diagnostics">
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
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Technical Support Statistics</CardTitle>
              <CardDescription>
                Overview of technical support performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-4xl font-bold text-center">24</CardTitle>
                    <CardDescription className="text-center">Open Issues</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-4xl font-bold text-center">85%</CardTitle>
                    <CardDescription className="text-center">Resolution Rate</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-4xl font-bold text-center">3.2h</CardTitle>
                    <CardDescription className="text-center">Avg. Response Time</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalContent;
