
// Fare calculation utilities for Indian ride-sharing app
export interface FareBreakdown {
  basePrice: number;
  distanceCharge: number;
  timeCharge: number;
  peakHourSurcharge: number;
  platformFee: number;
  taxes: number;
  total: number;
  currency: string;
}

export interface VehicleType {
  id: string;
  name: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  description: string;
  capacity: number;
  estimatedTime: string;
}

export const vehicleTypes: VehicleType[] = [
  {
    id: 'bike',
    name: 'Bike',
    basePrice: 15,
    pricePerKm: 8,
    pricePerMinute: 1,
    description: 'Quick and affordable',
    capacity: 1,
    estimatedTime: '2-5 min'
  },
  {
    id: 'auto',
    name: 'Auto Rickshaw',
    basePrice: 25,
    pricePerKm: 12,
    pricePerMinute: 1.5,
    description: 'Convenient 3-wheeler',
    capacity: 3,
    estimatedTime: '3-8 min'
  },
  {
    id: 'mini',
    name: 'Mini',
    basePrice: 35,
    pricePerKm: 15,
    pricePerMinute: 2,
    description: 'Compact car',
    capacity: 4,
    estimatedTime: '5-10 min'
  },
  {
    id: 'sedan',
    name: 'Sedan',
    basePrice: 50,
    pricePerKm: 18,
    pricePerMinute: 2.5,
    description: 'Comfortable ride',
    capacity: 4,
    estimatedTime: '5-12 min'
  },
  {
    id: 'suv',
    name: 'SUV',
    basePrice: 75,
    pricePerKm: 25,
    pricePerMinute: 3,
    description: 'Spacious vehicle',
    capacity: 6,
    estimatedTime: '8-15 min'
  },
  {
    id: 'premium',
    name: 'Premium',
    basePrice: 100,
    pricePerKm: 30,
    pricePerMinute: 4,
    description: 'Luxury experience',
    capacity: 4,
    estimatedTime: '10-15 min'
  }
];

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function calculateEstimatedTime(distanceKm: number, vehicleType: string): number {
  // Average speeds in km/h for different vehicle types
  const speeds = {
    bike: 25,
    auto: 20,
    mini: 30,
    sedan: 35,
    suv: 30,
    premium: 40
  };
  
  const speed = speeds[vehicleType as keyof typeof speeds] || 30;
  return Math.round((distanceKm / speed) * 60); // Return time in minutes
}

export function isPeakHour(): boolean {
  const hour = new Date().getHours();
  // Peak hours: 8-10 AM and 6-9 PM
  return (hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 21);
}

export function calculateFare(
  distance: number, 
  timeMinutes: number, 
  vehicleTypeId: string,
  isScheduled: boolean = false
): FareBreakdown {
  const vehicleType = vehicleTypes.find(v => v.id === vehicleTypeId);
  if (!vehicleType) {
    throw new Error('Invalid vehicle type');
  }

  const basePrice = vehicleType.basePrice;
  const distanceCharge = distance * vehicleType.pricePerKm;
  const timeCharge = timeMinutes * vehicleType.pricePerMinute;
  
  // Peak hour surcharge (1.5x during peak hours)
  const peakMultiplier = isPeakHour() && !isScheduled ? 1.5 : 1;
  const peakHourSurcharge = (basePrice + distanceCharge + timeCharge) * (peakMultiplier - 1);
  
  // Platform fee (₹5)
  const platformFee = 5;
  
  // Calculate subtotal
  const subtotal = basePrice + distanceCharge + timeCharge + peakHourSurcharge + platformFee;
  
  // GST (18%)
  const taxes = subtotal * 0.18;
  
  const total = Math.round(subtotal + taxes);

  return {
    basePrice: Math.round(basePrice),
    distanceCharge: Math.round(distanceCharge),
    timeCharge: Math.round(timeCharge),
    peakHourSurcharge: Math.round(peakHourSurcharge),
    platformFee,
    taxes: Math.round(taxes),
    total,
    currency: '₹'
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount}`;
}
