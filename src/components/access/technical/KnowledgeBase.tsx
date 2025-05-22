
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { knowledgeBaseArticles } from './types';

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter knowledge base articles based on search query
  const filteredArticles = knowledgeBaseArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewKnowledgeBase = (articleId: string) => {
    toast.info(`Viewing knowledge base article ${articleId}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search knowledge base..."
          className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map(article => (
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
    </div>
  );
};

export default KnowledgeBase;
