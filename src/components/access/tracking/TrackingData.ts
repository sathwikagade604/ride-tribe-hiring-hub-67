
// Mock data for rides
export const mockActiveRides = [
  { id: 'R1001', driver: 'Amit Kumar', rider: 'Priya Singh', pickup: 'Connaught Place', destination: 'Nehru Place', status: 'In Progress', estimatedTime: '15 mins' },
  { id: 'R1002', driver: 'Rahul Sharma', rider: 'Neha Patel', pickup: 'IGI Airport T3', destination: 'Vasant Kunj', status: 'Just Started', estimatedTime: '28 mins' },
  { id: 'R1003', driver: 'Vikram Singh', rider: 'Anjali Gupta', pickup: 'Saket Metro', destination: 'Cyber Hub', status: 'In Progress', estimatedTime: '22 mins' },
];

export const mockRideHistory = [
  { id: 'R0998', driver: 'Sanjay Mehra', rider: 'Karan Shah', pickup: 'Saket', destination: 'Gurgaon', status: 'Completed', date: '2025-05-21', duration: '35 mins' },
  { id: 'R0999', driver: 'Deepak Verma', rider: 'Isha Khanna', pickup: 'Noida Sector 18', destination: 'Greater Kailash', status: 'Completed', date: '2025-05-21', duration: '42 mins' },
  { id: 'R1000', driver: 'Raj Kapoor', rider: 'Maya Reddy', pickup: 'Lajpat Nagar', destination: 'Hauz Khas', status: 'Cancelled', date: '2025-05-22', duration: '0 mins' },
];

// Mock data for users to track
export const mockUsers = [
  { id: 'D1001', name: 'Amit Kumar', type: 'Driver', currentLocation: 'Connaught Place', status: 'On Trip', vehicle: 'DL 01 AB 1234' },
  { id: 'D1002', name: 'Rahul Sharma', type: 'Driver', currentLocation: 'IGI Airport', status: 'On Trip', vehicle: 'DL 02 CD 5678' },
  { id: 'R2001', name: 'Priya Singh', type: 'Rider', currentLocation: 'Connaught Place', status: 'On Trip', lastActivity: '15 mins ago' },
  { id: 'R2002', name: 'Neha Patel', type: 'Rider', currentLocation: 'IGI Airport', status: 'On Trip', lastActivity: '5 mins ago' },
];
