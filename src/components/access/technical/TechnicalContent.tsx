
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechnicalIssues from './TechnicalIssues';
import SystemDiagnostics from './SystemDiagnostics';
import KnowledgeBase from './KnowledgeBase';
import SupportStats from './SupportStats';

const TechnicalContent: React.FC = () => {
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
        
        <TabsContent value="issues">
          <TechnicalIssues />
        </TabsContent>
        
        <TabsContent value="diagnostics">
          <SystemDiagnostics />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <KnowledgeBase />
        </TabsContent>
        
        <TabsContent value="stats">
          <SupportStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalContent;
