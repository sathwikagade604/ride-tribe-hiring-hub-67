
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileDown, BarChart, Clock } from 'lucide-react';

const QueryContent: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-6 w-6" />
          Query Analysis Portal
        </CardTitle>
        <CardDescription>
          Perform data queries and generate insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="font-medium">Driver Performance Analysis</div>
                    <div className="text-sm text-gray-500">Delhi Region, 3h ago</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="font-medium">Revenue by Vehicle Type</div>
                    <div className="text-sm text-gray-500">Nationwide, 1d ago</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <div className="font-medium">Customer Satisfaction Trends</div>
                    <div className="text-sm text-gray-500">Mumbai, 2d ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Query Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" /> New Query
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileDown className="mr-2 h-4 w-4" /> Export Results
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <BarChart className="mr-2 h-4 w-4" /> View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Query Name</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Monthly Driver Earnings</TableCell>
                  <TableCell>Financial</TableCell>
                  <TableCell>May 15, 2025</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Peak Hours Analysis</TableCell>
                  <TableCell>Operational</TableCell>
                  <TableCell>May 18, 2025</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Running
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Status
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer Feedback Analysis</TableCell>
                  <TableCell>Support</TableCell>
                  <TableCell>May 20, 2025</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Scheduled
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit Query
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueryContent;
