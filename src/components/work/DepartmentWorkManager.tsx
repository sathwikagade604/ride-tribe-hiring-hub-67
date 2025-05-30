
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import { Plus, Edit, Save, X } from 'lucide-react';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  estimatedHours: z.number().min(0.5).max(40),
  dueDate: z.string().min(1, 'Due date is required'),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface DepartmentWorkManagerProps {
  currentUserRole: RoleKey;
  currentUserSubRole?: string;
}

interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  assignedTo: string;
  createdBy: string;
  estimatedHours: number;
  actualHours?: number;
  dueDate: string;
  completedDate?: string;
  notes: string;
}

const DepartmentWorkManager: React.FC<DepartmentWorkManagerProps> = ({
  currentUserRole,
  currentUserSubRole = ''
}) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      estimatedHours: 2,
      dueDate: '',
    },
  });

  // Check if user can create/edit tasks
  const canManageTasks = () => {
    const userRole = roleAccessLevels[currentUserRole];
    const hasManagePermissions = userRole.permissions.some(p => 
      p.includes('manage') || p.includes('edit') || p.includes('resolve')
    );
    return hasManagePermissions;
  };

  // Create new work item
  const createWorkItem = (data: TaskFormData) => {
    const newItem: WorkItem = {
      id: Date.now().toString(),
      ...data,
      status: 'pending',
      assignedTo: currentUserRole,
      createdBy: currentUserRole,
      notes: '',
    };
    setWorkItems(prev => [...prev, newItem]);
    setIsCreating(false);
    form.reset();
  };

  // Update work item
  const updateWorkItem = (id: string, updates: Partial<WorkItem>) => {
    setWorkItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  // Update work status
  const updateStatus = (id: string, status: WorkItem['status']) => {
    const updates: Partial<WorkItem> = { status };
    if (status === 'completed') {
      updates.completedDate = new Date().toISOString().split('T')[0];
    }
    updateWorkItem(id, updates);
  };

  // Add work notes
  const addNotes = (id: string, notes: string) => {
    updateWorkItem(id, { notes });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Department Work Manager</h1>
          <p className="text-muted-foreground">
            Manage and track work items for {roleAccessLevels[currentUserRole].name}
            {currentUserSubRole && ` - ${roleAccessLevels[currentUserRole].subRoles?.[currentUserSubRole]?.name}`}
          </p>
        </div>
        {canManageTasks() && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Work Item</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(createWorkItem)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., driver_verification" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimatedHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Hours</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button type="submit">Create</Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Work Items List */}
      <div className="space-y-4">
        {workItems.map(item => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge className={`${getPriorityColor(item.priority)} text-white`}>
                      {item.priority}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>Due: {item.dueDate}</span>
                    <span>Est. {item.estimatedHours}h</span>
                    <span>Category: {item.category}</span>
                    {item.completedDate && (
                      <span>Completed: {item.completedDate}</span>
                    )}
                  </div>
                  {item.notes && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{item.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {item.status === 'pending' && canManageTasks() && (
                    <Button 
                      size="sm"
                      onClick={() => updateStatus(item.id, 'in_progress')}
                    >
                      Start
                    </Button>
                  )}
                  {item.status === 'in_progress' && canManageTasks() && (
                    <Button 
                      size="sm"
                      onClick={() => updateStatus(item.id, 'completed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete
                    </Button>
                  )}
                  {canManageTasks() && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Notes</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Add work notes or updates..."
                            defaultValue={item.notes}
                            onChange={(e) => addNotes(item.id, e.target.value)}
                          />
                          <Button>Save Notes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {workItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No work items yet. {canManageTasks() ? 'Create your first task to get started.' : 'Tasks will appear here when assigned.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DepartmentWorkManager;
