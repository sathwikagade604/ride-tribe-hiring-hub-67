
import { MessageSquare, Shield, Users, Car, Search, MapPin } from 'lucide-react';

// Define access levels for each role
export const roleAccessLevels = {
  employee: {
    name: 'Employee',
    description: 'Manage drivers and general operations',
    permissions: ['view_drivers', 'edit_drivers', 'view_reports'],
    icon: Users,
  },
  support: {
    name: 'Support',
    description: 'Handle customer and driver issues',
    permissions: ['view_tickets', 'resolve_tickets', 'view_drivers'],
    icon: Shield,
  },
  service: {
    name: 'Vehicle Service',
    description: 'Manage vehicle maintenance and repairs',
    permissions: ['view_vehicles', 'schedule_service', 'update_vehicle_status'],
    icon: Car,
  },
  chat: {
    name: 'Chat Support',
    description: 'Handle live chat with customers and drivers',
    permissions: ['view_chats', 'respond_to_chats', 'escalate_issues'],
    icon: MessageSquare,
  },
  query: {
    name: 'Query Analyst',
    description: 'Perform data queries and analysis',
    permissions: ['run_queries', 'view_reports', 'export_data', 'view_analytics'],
    icon: Search,
  },
  tracking: {
    name: 'Tracking Manager',
    description: 'Monitor and track rides and riders in real-time',
    permissions: ['view_live_tracking', 'track_rides', 'track_riders', 'view_ride_history'],
    icon: MapPin,
  },
};

export type RoleKey = keyof typeof roleAccessLevels;
