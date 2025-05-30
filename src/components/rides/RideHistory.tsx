
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { formatCurrency } from '@/utils/fareCalculator';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Ride {
  id: string;
  pickup_address: string;
  destination_address: string;
  fare_amount: number;
  vehicle_type: string;
  ride_status: string;
  requested_at: string;
  completed_at?: string;
  driver_rating?: number;
}

const RideHistory = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('rider_id', user.user.id)
        .order('requested_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching ride history:', error);
        toast.error('Failed to load ride history');
        return;
      }

      setRides(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load ride history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRebook = (ride: Ride) => {
    toast.success('Rebooking feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No rides yet</h3>
          <p className="text-muted-foreground">Your ride history will appear here once you book your first ride.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Ride History</h2>
      
      {rides.map((ride) => (
        <Card key={ride.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(ride.ride_status)}>
                    {ride.ride_status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground capitalize">
                    {ride.vehicle_type}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{ride.pickup_address}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 ml-1.5"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{ride.destination_address}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(ride.fare_amount)}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(ride.requested_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {ride.driver_rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{ride.driver_rating}</span>
                  </div>
                )}
              </div>
              
              {ride.ride_status === 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRebook(ride)}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Rebook
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RideHistory;
