
import { MessageSquare, Shield, Users, Car, Search, MapPin, Mail, Wrench, AlertTriangle, HeartPulse, PhoneCall } from 'lucide-react';

// Define interface for sub-roles
export interface SubRole {
  name: string;
  description: string;
  permissions: string[];
}

// Define interface for applications
export interface RoleApplication {
  name: string;
  description: string;
  path: string;
}

// Define the interface for the role structure
export interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  applications: RoleApplication[];
  subRoles?: Record<string, SubRole>;
}

// Define the role keys type first to avoid circular reference
export type RoleKey = 'employee' | 'support' | 'service' | 'chat' | 'query' | 'tracking' | 'technical' | 'safety' | 'emergency' | 'callcenter';
export type SubRoleKey = string;

// Define access levels for each role
export const roleAccessLevels: Record<RoleKey, RoleDefinition> = {
  employee: {
    name: 'Employee',
    description: 'Manage drivers and general operations',
    permissions: ['view_drivers', 'edit_drivers', 'view_reports'],
    icon: Users,
    applications: [
      { name: 'Driver Management', description: 'View and manage driver profiles', path: '/drivers-management' },
      { name: 'Reports Dashboard', description: 'Access operational reports', path: '/reports' },
      { name: 'Staff Directory', description: 'View company staff', path: '/staff' }
    ]
  },
  support: {
    name: 'Support',
    description: 'Handle customer and driver issues',
    permissions: ['view_tickets', 'resolve_tickets', 'view_drivers', 'manage_emails'],
    icon: Shield,
    applications: [
      { name: 'Ticket Management', description: 'View and resolve support tickets', path: '/tickets' },
      { name: 'Driver Lookup', description: 'Quick access to driver information', path: '/driver-lookup' },
      { name: 'Customer Support', description: 'Handle customer inquiries', path: '/customer-support' },
      { name: 'Email Support', description: 'Manage email-based customer issues', path: '/email-support' },
      { name: 'Email Templates', description: 'Access standardized email templates', path: '/email-templates' }
    ],
    subRoles: {
      general: {
        name: 'General Support',
        description: 'Handle general customer inquiries and issues',
        permissions: ['view_tickets', 'resolve_tickets', 'view_drivers']
      },
      email: {
        name: 'Email Support',
        description: 'Manage email-based customer communications',
        permissions: ['manage_emails', 'view_tickets']
      },
      escalation: {
        name: 'Escalation Team',
        description: 'Handle escalated and complex customer issues',
        permissions: ['view_tickets', 'resolve_tickets', 'view_drivers', 'escalate_issues']
      },
      safety: {
        name: 'Safety Response',
        description: 'Handle safety and emergency situations',
        permissions: ['view_tickets', 'resolve_tickets', 'view_drivers', 'manage_emergencies']
      },
      sos: {
        name: 'SOS Team',
        description: 'Respond to emergency SOS signals and situations',
        permissions: ['view_tickets', 'view_drivers', 'manage_emergencies', 'contact_authorities']
      }
    }
  },
  service: {
    name: 'Vehicle Service',
    description: 'Manage vehicle maintenance and repairs',
    permissions: ['view_vehicles', 'schedule_service', 'update_vehicle_status'],
    icon: Car,
    applications: [
      { name: 'Maintenance Schedule', description: 'View and schedule vehicle maintenance', path: '/maintenance' },
      { name: 'Service History', description: 'Access vehicle service records', path: '/service-history' },
      { name: 'Fleet Status', description: 'Overview of vehicle fleet status', path: '/fleet-status' }
    ]
  },
  chat: {
    name: 'Chat Support',
    description: 'Handle live chat with customers and drivers',
    permissions: ['view_chats', 'respond_to_chats', 'escalate_issues'],
    icon: MessageSquare,
    applications: [
      { name: 'Live Chat Console', description: 'Access live customer chats', path: '/live-chat' },
      { name: 'Chat History', description: 'View previous chat conversations', path: '/chat-history' },
      { name: 'Knowledge Base', description: 'Access support articles and FAQs', path: '/knowledge-base' }
    ]
  },
  query: {
    name: 'Query Analyst',
    description: 'Perform data queries and analysis',
    permissions: ['run_queries', 'view_reports', 'export_data', 'view_analytics'],
    icon: Search,
    applications: [
      { name: 'Query Builder', description: 'Create and run custom data queries', path: '/query-builder' },
      { name: 'Analytics Dashboard', description: 'View business analytics', path: '/analytics' },
      { name: 'Data Export', description: 'Export data for analysis', path: '/data-export' }
    ]
  },
  tracking: {
    name: 'Tracking Manager',
    description: 'Monitor and track rides and riders in real-time',
    permissions: ['view_live_tracking', 'track_rides', 'track_riders', 'view_ride_history'],
    icon: MapPin,
    applications: [
      { name: 'Live Map', description: 'Track rides in real-time', path: '/live-map' },
      { name: 'Ride History', description: 'View historical ride data', path: '/ride-history' },
      { name: 'Rider Tracking', description: 'Track rider locations', path: '/rider-tracking' }
    ]
  },
  technical: {
    name: 'Technical Support',
    description: 'Solve technical issues for drivers and riders',
    permissions: ['view_tickets', 'resolve_tickets', 'view_technical_issues', 'view_drivers', 'view_riders', 'access_system_logs'],
    icon: Wrench,
    applications: [
      { name: 'Technical Tickets', description: 'View and resolve technical tickets', path: '/technical-tickets' },
      { name: 'System Diagnostics', description: 'Run diagnostics on app and device issues', path: '/system-diagnostics' },
      { name: 'App Troubleshooting', description: 'Help users with app-related problems', path: '/app-troubleshooting' },
      { name: 'Device Issues', description: 'Resolve hardware and device problems', path: '/device-issues' },
      { name: 'Knowledge Base', description: 'Access technical documentation', path: '/technical-knowledge-base' }
    ],
    subRoles: {
      app: {
        name: 'App Technical Support',
        description: 'Resolve application-related technical issues',
        permissions: ['view_tickets', 'resolve_tickets', 'view_technical_issues']
      },
      device: {
        name: 'Device Technical Support',
        description: 'Resolve hardware and device-related issues',
        permissions: ['view_tickets', 'resolve_tickets', 'view_technical_issues']
      },
      system: {
        name: 'System Administrator',
        description: 'Manage system-level technical issues',
        permissions: ['view_tickets', 'resolve_tickets', 'view_technical_issues', 'access_system_logs']
      }
    }
  },
  safety: {
    name: 'Safety Team',
    description: 'Monitor and respond to safety incidents',
    permissions: ['view_safety_reports', 'manage_emergencies', 'contact_authorities', 'view_drivers', 'view_riders'],
    icon: AlertTriangle,
    applications: [
      { name: 'Safety Dashboard', description: 'Monitor safety incidents', path: '/safety-dashboard' },
      { name: 'Emergency Response', description: 'Manage emergency responses', path: '/emergency-response' },
      { name: 'Incident Reports', description: 'View and manage incident reports', path: '/incident-reports' }
    ]
  },
  emergency: {
    name: 'Emergency Response',
    description: 'Handle SOS and emergency situations',
    permissions: ['view_emergencies', 'manage_emergencies', 'contact_authorities', 'view_drivers', 'view_riders'],
    icon: HeartPulse,
    applications: [
      { name: 'SOS Console', description: 'Monitor and respond to SOS signals', path: '/sos-console' },
      { name: 'Emergency Contacts', description: 'Access emergency contacts', path: '/emergency-contacts' },
      { name: 'Authority Coordination', description: 'Coordinate with authorities', path: '/authority-coordination' }
    ]
  },
  callcenter: {
    name: 'Call Center',
    description: 'Handle customer phone inquiries',
    permissions: ['receive_calls', 'make_calls', 'view_tickets', 'create_tickets', 'view_drivers', 'view_riders'],
    icon: PhoneCall,
    applications: [
      { name: 'Call Console', description: 'Manage incoming and outgoing calls', path: '/call-console' },
      { name: 'Customer Lookup', description: 'Search for customer information', path: '/customer-lookup' },
      { name: 'Call History', description: 'View call history and logs', path: '/call-history' }
    ]
  },
};
