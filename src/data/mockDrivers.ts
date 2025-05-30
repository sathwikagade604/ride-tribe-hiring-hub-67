
export const mockDrivers = [
  { id: 1, name: 'Raj Kumar', rating: 4.8, city: 'Mumbai', status: 'Active', trips: 542, joinDate: '2023-05-12' },
  { id: 2, name: 'Priya Singh', rating: 4.9, city: 'Delhi', status: 'Active', trips: 328, joinDate: '2023-07-22' },
  { id: 3, name: 'Vikram Patel', rating: 4.7, city: 'Bangalore', status: 'Inactive', trips: 489, joinDate: '2023-04-05' },
  { id: 4, name: 'Anita Sharma', rating: 4.6, city: 'Chennai', status: 'Active', trips: 267, joinDate: '2023-09-18' },
  { id: 5, name: 'Sanjay Gupta', rating: 4.5, city: 'Kolkata', status: 'Active', trips: 356, joinDate: '2023-06-30' },
];

// Export drivers as well for compatibility
export const drivers = mockDrivers;

export type Driver = typeof mockDrivers[0];
