
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SupportStats: React.FC = () => {
  return (
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
  );
};

export default SupportStats;
