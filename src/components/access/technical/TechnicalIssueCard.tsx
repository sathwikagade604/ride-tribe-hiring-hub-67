
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, CheckCircle2, Laptop, Smartphone } from 'lucide-react';
import { TechnicalIssue } from './types';

interface TechnicalIssueCardProps {
  issue: TechnicalIssue;
  onResolve: (issueId: string) => void;
}

const TechnicalIssueCard: React.FC<TechnicalIssueCardProps> = ({ issue, onResolve }) => {
  return (
    <Card>
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
            onClick={() => onResolve(issue.id)}
            disabled={issue.status === 'resolved'}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {issue.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TechnicalIssueCard;
