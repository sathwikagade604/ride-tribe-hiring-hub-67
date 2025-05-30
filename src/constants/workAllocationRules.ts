
import { RoleKey } from '@/constants/roleAccessLevels';

export interface WorkAllocationRule {
  taskType: string;
  category: string;
  primaryDepartments: RoleKey[];
  secondaryDepartments: RoleKey[];
  requiredPermissions: string[];
  autoAssign: boolean;
  escalationDepartment?: RoleKey;
}

export const workAllocationRules: WorkAllocationRule[] = [
  // Driver Management
  {
    taskType: 'driver_verification',
    category: 'driver_management',
    primaryDepartments: ['employee'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_drivers', 'edit_drivers'],
    autoAssign: true,
  },
  {
    taskType: 'driver_onboarding',
    category: 'driver_management',
    primaryDepartments: ['employee'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_drivers', 'edit_drivers'],
    autoAssign: true,
  },

  // Customer Support
  {
    taskType: 'customer_tickets',
    category: 'customer_support',
    primaryDepartments: ['support', 'chat'],
    secondaryDepartments: ['callcenter'],
    requiredPermissions: ['view_tickets', 'resolve_tickets'],
    autoAssign: true,
    escalationDepartment: 'support',
  },
  {
    taskType: 'live_chat_support',
    category: 'customer_support',
    primaryDepartments: ['chat'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_chats', 'respond_to_chats'],
    autoAssign: true,
  },
  {
    taskType: 'phone_support',
    category: 'customer_support',
    primaryDepartments: ['callcenter'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['receive_calls', 'make_calls'],
    autoAssign: true,
  },

  // Vehicle Service
  {
    taskType: 'vehicle_maintenance',
    category: 'vehicle_service',
    primaryDepartments: ['service'],
    secondaryDepartments: [],
    requiredPermissions: ['view_vehicles', 'schedule_service'],
    autoAssign: true,
  },
  {
    taskType: 'vehicle_inspection',
    category: 'vehicle_service',
    primaryDepartments: ['service'],
    secondaryDepartments: ['employee'],
    requiredPermissions: ['view_vehicles', 'update_vehicle_status'],
    autoAssign: true,
  },

  // Technical Support
  {
    taskType: 'technical_issues',
    category: 'technical_support',
    primaryDepartments: ['technical'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_technical_issues', 'resolve_tickets'],
    autoAssign: true,
  },
  {
    taskType: 'app_troubleshooting',
    category: 'technical_support',
    primaryDepartments: ['technical'],
    secondaryDepartments: [],
    requiredPermissions: ['view_technical_issues', 'access_system_logs'],
    autoAssign: true,
  },

  // Tracking and Monitoring
  {
    taskType: 'ride_monitoring',
    category: 'tracking',
    primaryDepartments: ['tracking'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_live_tracking', 'track_rides'],
    autoAssign: true,
  },
  {
    taskType: 'rider_tracking',
    category: 'tracking',
    primaryDepartments: ['tracking'],
    secondaryDepartments: [],
    requiredPermissions: ['view_live_tracking', 'track_riders'],
    autoAssign: true,
  },

  // Safety and Emergency
  {
    taskType: 'safety_incidents',
    category: 'safety',
    primaryDepartments: ['safety', 'emergency'],
    secondaryDepartments: ['support'],
    requiredPermissions: ['view_safety_reports', 'manage_emergencies'],
    autoAssign: true,
  },
  {
    taskType: 'emergency_response',
    category: 'safety',
    primaryDepartments: ['emergency'],
    secondaryDepartments: ['safety'],
    requiredPermissions: ['manage_emergencies', 'contact_authorities'],
    autoAssign: true,
  },

  // Analytics and Reporting
  {
    taskType: 'data_analysis',
    category: 'analytics',
    primaryDepartments: ['query'],
    secondaryDepartments: ['employee'],
    requiredPermissions: ['run_queries', 'view_analytics'],
    autoAssign: true,
  },
  {
    taskType: 'report_generation',
    category: 'analytics',
    primaryDepartments: ['query'],
    secondaryDepartments: ['employee'],
    requiredPermissions: ['run_queries', 'export_data'],
    autoAssign: true,
  },
];

// Function to automatically assign work based on rules
export const getAssignedDepartments = (taskType: string, category: string): RoleKey[] => {
  const rule = workAllocationRules.find(r => r.taskType === taskType && r.category === category);
  if (!rule || !rule.autoAssign) return [];
  
  return [...rule.primaryDepartments, ...rule.secondaryDepartments];
};

// Function to get required permissions for a task
export const getRequiredPermissions = (taskType: string, category: string): string[] => {
  const rule = workAllocationRules.find(r => r.taskType === taskType && r.category === category);
  return rule?.requiredPermissions || [];
};

// Function to get escalation department
export const getEscalationDepartment = (taskType: string, category: string): RoleKey | undefined => {
  const rule = workAllocationRules.find(r => r.taskType === taskType && r.category === category);
  return rule?.escalationDepartment;
};
