
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import { 
  Users, 
  Car, 
  Shield, 
  MessageSquare, 
  Search, 
  MapPin, 
  Wrench,
  AlertTriangle,
  HeartPulse,
  PhoneCall,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface WorkTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  assignedTo: RoleKey[];
  requiredPermissions: string[];
  estimatedHours: number;
  createdAt: string;
  dueDate: string;
}

interface WorkAllocationSystemProps {
  currentUserRole: RoleKey;
  currentUserSubRole?: string;
}

const WorkAllocationSystem: React.FC<WorkAllocationSystemProps> = ({
  currentUserRole,
  currentUserSubRole = ''
}) => {
  const [tasks, setTasks] = useState<WorkTask[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Initialize with sample tasks that would be automatically allocated
  useEffect(() => {
    const sampleTasks: WorkTask[] = [
      {
        id: '1',
        title: 'Driver Verification Process',
        description: 'Review and verify new driver applications and documents',
        category: 'driver_management',
        priority: 'high',
        status: 'assigned',
        assignedTo: ['employee', 'support'],
        requiredPermissions: ['view_drivers', 'edit_drivers'],
        estimatedHours: 4,
        createdAt: '2024-05-30',
        dueDate: '2024-06-01'
      },
      {
        id: '2',
        title: 'Customer Support Tickets',
        description: 'Handle customer inquiries and resolve support issues',
        category: 'customer_support',
        priority: 'medium',
        status: 'assigned',
        assignedTo: ['support', 'chat'],
        requiredPermissions: ['view_tickets', 'resolve_tickets'],
        estimatedHours: 6,
        createdAt: '2024-05-30',
        dueDate: '2024-05-31'
      },
      {
        id: '3',
        title: 'Vehicle Maintenance Scheduling',
        description: 'Schedule and coordinate vehicle maintenance activities',
        category: 'vehicle_service',
        priority: 'medium',
        status: 'assigned',
        assignedTo: ['service'],
        requiredPermissions: ['view_vehicles', 'schedule_service'],
        estimatedHours: 3,
        createdAt: '2024-05-30',
        dueDate: '2024-06-02'
      },
      {
        id: '4',
        title: 'Real-time Ride Tracking',
        description: 'Monitor active rides and ensure smooth operations',
        category: 'tracking',
        priority: 'high',
        status: 'assigned',
        assignedTo: ['tracking'],
        requiredPermissions: ['view_live_tracking', 'track_rides'],
        estimatedHours: 8,
        createdAt: '2024-05-30',
        dueDate: '2024-05-30'
      },
      {
        id: '5',
        title: 'Technical Issue Resolution',
        description: 'Resolve app and device technical problems',
        category: 'technical_support',
        priority: 'high',
        status: 'assigned',
        assignedTo: ['technical'],
        requiredPermissions: ['view_technical_issues', 'resolve_tickets'],
        estimatedHours: 5,
        createdAt: '2024-05-30',
        dueDate: '2024-06-01'
      },
      {
        id: '6',
        title: 'Safety Incident Response',
        description: 'Handle safety reports and emergency situations',
        category: 'safety',
        priority: 'critical',
        status: 'assigned',
        assignedTo: ['safety', 'emergency'],
        requiredPermissions: ['manage_emergencies', 'view_safety_reports'],
        estimatedHours: 2,
        createdAt: '2024-05-30',
        dueDate: '2024-05-30'
      },
      {
        id: '7',
        title: 'Data Analysis and Reporting',
        description: 'Generate analytics reports and perform data queries',
        category: 'analytics',
        priority: 'low',
        status: 'assigned',
        assignedTo: ['query'],
        requiredPermissions: ['run_queries', 'view_analytics'],
        estimatedHours: 6,
        createdAt: '2024-05-30',
        dueDate: '2024-06-03'
      },
      {
        id: '8',
        title: 'Call Center Operations',
        description: 'Handle incoming customer calls and provide support',
        category: 'call_center',
        priority: 'medium',
        status: 'assigned',
        assignedTo: ['callcenter'],
        requiredPermissions: ['receive_calls', 'make_calls'],
        estimatedHours: 8,
        createdAt: '2024-05-30',
        dueDate: '2024-05-31'
      }
    ];

    setTasks(sampleTasks);
  }, []);

  // Check if current user can access a task
  const canAccessTask = (task: WorkTask) => {
    const userRole = roleAccessLevels[currentUserRole];
    const hasRoleAccess = task.assignedTo.includes(currentUserRole);
    const hasPermissions = task.requiredPermissions.every(permission => 
      userRole.permissions.includes(permission) ||
      (currentUserSubRole && userRole.subRoles?.[currentUserSubRole]?.permissions.includes(permission))
    );
    return hasRoleAccess && hasPermissions;
  };

  // Update task status
  const updateTaskStatus = (taskId: string, newStatus: WorkTask['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Filter tasks based on access and category
  const filteredTasks = tasks.filter(task => {
    const hasAccess = canAccessTask(task);
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return hasAccess && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'assigned': return <ArrowRight className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const categories = [
    { id: 'all', name: 'All Tasks' },
    { id: 'driver_management', name: 'Driver Management' },
    { id: 'customer_support', name: 'Customer Support' },
    { id: 'vehicle_service', name: 'Vehicle Service' },
    { id: 'tracking', name: 'Tracking' },
    { id: 'technical_support', name: 'Technical Support' },
    { id: 'safety', name: 'Safety' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'call_center', name: 'Call Center' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Work Allocation System</h1>
          <p className="text-muted-foreground">
            Tasks automatically assigned based on your department and access level
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {roleAccessLevels[currentUserRole].name}
            {currentUserSubRole && ` - ${roleAccessLevels[currentUserRole].subRoles?.[currentUserSubRole]?.name}`}
          </Badge>
        </div>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-9 w-full">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredTasks.filter(t => t.status === 'assigned').length}
            </div>
            <p className="text-sm text-muted-foreground">Assigned to You</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredTasks.filter(t => t.status === 'in_progress').length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredTasks.filter(t => t.status === 'completed').length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredTasks.filter(t => t.priority === 'critical' || t.priority === 'high').length}
            </div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Assigned Tasks</h2>
        {filteredTasks.map(task => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge 
                      className={`${getPriorityColor(task.priority)} text-white text-xs`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.requiredPermissions.map(permission => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    <span>Est. {task.estimatedHours}h</span>
                    <span>Category: {task.category.replace(/_/g, ' ')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {task.status === 'assigned' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'in_progress')}
                    >
                      Start Work
                    </Button>
                  )}
                  {task.status === 'in_progress' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'completed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No tasks assigned to your department at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkAllocationSystem;
