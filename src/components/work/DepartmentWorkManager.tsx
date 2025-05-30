
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  assignedTo: RoleKey;
  createdBy: RoleKey;
  estimatedHours: number;
  dueDate: string;
  notes: string;
}

interface DepartmentWorkManagerProps {
  currentUserRole: RoleKey;
  currentUserSubRole?: string;
}

const DepartmentWorkManager: React.FC<DepartmentWorkManagerProps> = ({
  currentUserRole,
  currentUserSubRole = ''
}) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<WorkItem>>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    assignedTo: currentUserRole,
    estimatedHours: 1,
    dueDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Initialize with sample work items
  useEffect(() => {
    const sampleItems: WorkItem[] = [
      {
        id: '1',
        title: 'Driver Background Verification',
        description: 'Complete background check for new driver applications',
        category: 'driver_management',
        priority: 'high',
        status: 'pending',
        assignedTo: 'employee',
        createdBy: currentUserRole,
        estimatedHours: 2,
        dueDate: '2024-06-01',
        notes: 'Priority verification for peak season'
      },
      {
        id: '2',
        title: 'Customer Complaint Resolution',
        description: 'Handle customer complaints about ride quality',
        category: 'customer_support',
        priority: 'medium',
        status: 'assigned',
        assignedTo: 'support',
        createdBy: currentUserRole,
        estimatedHours: 1,
        dueDate: '2024-05-31',
        notes: 'Follow up required within 24 hours'
      }
    ];
    setWorkItems(sampleItems);
  }, [currentUserRole]);

  const createWorkItem = () => {
    if (!newItem.title || !newItem.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const workItem: WorkItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      category: newItem.category || 'general',
      priority: newItem.priority || 'medium',
      status: 'pending',
      assignedTo: newItem.assignedTo || currentUserRole,
      createdBy: currentUserRole,
      estimatedHours: newItem.estimatedHours || 1,
      dueDate: newItem.dueDate || new Date().toISOString().split('T')[0],
      notes: newItem.notes || ''
    };

    setWorkItems(prev => [...prev, workItem]);
    setNewItem({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      assignedTo: currentUserRole,
      estimatedHours: 1,
      dueDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsCreateDialogOpen(false);
    toast.success('Work item created successfully');
  };

  const updateWorkItem = (id: string, updates: Partial<WorkItem>) => {
    setWorkItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    toast.success('Work item updated');
  };

  const deleteWorkItem = (id: string) => {
    setWorkItems(prev => prev.filter(item => item.id !== id));
    toast.success('Work item deleted');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'assigned': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
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

  // Filter items based on user access
  const canManageItem = (item: WorkItem) => {
    const userRole = roleAccessLevels[currentUserRole];
    return item.createdBy === currentUserRole || 
           item.assignedTo === currentUserRole ||
           userRole.permissions.includes('manage_all_work');
  };

  const filteredItems = workItems.filter(canManageItem);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Department Work Manager</h1>
          <p className="text-muted-foreground">
            Create and manage work items for your department
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Work Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Work Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter work item title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the work item"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver_management">Driver Management</SelectItem>
                      <SelectItem value="customer_support">Customer Support</SelectItem>
                      <SelectItem value="vehicle_service">Vehicle Service</SelectItem>
                      <SelectItem value="technical_support">Technical Support</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newItem.priority} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select value={newItem.assignedTo} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, assignedTo: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleAccessLevels).map(([key, role]) => (
                        <SelectItem key={key} value={key}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estimatedHours">Estimated Hours</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={newItem.estimatedHours || 1}
                    onChange={(e) => setNewItem(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newItem.dueDate || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newItem.notes || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or instructions"
                />
              </div>
              <Button onClick={createWorkItem} className="w-full">
                Create Work Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.status === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.status === 'in_progress').length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.status === 'completed').length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {filteredItems.filter(item => item.priority === 'critical' || item.priority === 'high').length}
            </div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Items List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Work Items</h2>
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(item.status)}
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge className={`${getPriorityColor(item.priority)} text-white text-xs`}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">
                      {roleAccessLevels[item.assignedTo]?.name}
                    </Badge>
                    <Badge variant="outline">
                      {item.category.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Due: {item.dueDate}</span>
                    <span>Est. {item.estimatedHours}h</span>
                    <span>Created by: {roleAccessLevels[item.createdBy]?.name}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Notes:</strong> {item.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Select
                    value={item.status}
                    onValueChange={(value: any) => updateWorkItem(item.id, { status: value })}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteWorkItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No work items found. Create your first work item to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DepartmentWorkManager;
