
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FilterX, Laptop, Smartphone, HelpCircle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { TechnicalIssue, mockTechnicalIssues } from './types';
import TechnicalIssueCard from './TechnicalIssueCard';

const TechnicalIssues: React.FC = () => {
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
  
  return (
    <div className="space-y-4">
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
            <TechnicalIssueCard 
              key={issue.id} 
              issue={issue} 
              onResolve={handleResolveIssue} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TechnicalIssues;
