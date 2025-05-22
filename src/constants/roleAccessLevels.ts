
import { MessageSquare, Shield, Users, Car, Search, MapPin } from 'lucide-react';

// Define access levels for each role
export const roleAccessLevels = {
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
    permissions: ['view_tickets', 'resolve_tickets', 'view_drivers'],
    icon: Shield,
    applications: [
      { name: 'Ticket Management', description: 'View and resolve support tickets', path: '/tickets' },
      { name: 'Driver Lookup', description: 'Quick access to driver information', path: '/driver-lookup' },
      { name: 'Customer Support', description: 'Handle customer inquiries', path: '/customer-support' }
    ]
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
};

export type RoleKey = keyof typeof roleAccessLevels;

export interface RoleApplication {
  name: string;
  description: string;
  path: string;
}
