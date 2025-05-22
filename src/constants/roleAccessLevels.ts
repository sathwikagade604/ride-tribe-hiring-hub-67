
import { MessageSquare, Shield, Users, Car } from 'lucide-react';
import React from 'react';

// Define access levels for each role
export const roleAccessLevels = {
  employee: {
    name: 'Employee',
    description: 'Manage drivers and general operations',
    permissions: ['view_drivers', 'edit_drivers', 'view_reports'],
    icon: <Users className="h-5 w-5" />,
  },
  support: {
    name: 'Support',
    description: 'Handle customer and driver issues',
    permissions: ['view_tickets', 'resolve_tickets', 'view_drivers'],
    icon: <Shield className="h-5 w-5" />,
  },
  service: {
    name: 'Vehicle Service',
    description: 'Manage vehicle maintenance and repairs',
    permissions: ['view_vehicles', 'schedule_service', 'update_vehicle_status'],
    icon: <Car className="h-5 w-5" />,
  },
  chat: {
    name: 'Chat Support',
    description: 'Handle live chat with customers and drivers',
    permissions: ['view_chats', 'respond_to_chats', 'escalate_issues'],
    icon: <MessageSquare className="h-5 w-5" />,
  },
};

export type RoleKey = keyof typeof roleAccessLevels;
