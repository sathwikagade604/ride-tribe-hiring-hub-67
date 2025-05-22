
// Technical issue types
export interface TechnicalIssue {
  id: string;
  title: string;
  userType: 'driver' | 'rider';
  username: string;
  device: string;
  status: 'open' | 'in progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  created: string;
}

// Knowledge base article types
export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  category: string;
  platform: string;
  lastUpdated: string;
}

// Mock data
export const mockTechnicalIssues: TechnicalIssue[] = [
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

export const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
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
