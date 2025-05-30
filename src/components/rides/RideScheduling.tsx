
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface RideSchedulingProps {
  isScheduled: boolean;
  scheduledTime: string;
  onScheduleChange: (isScheduled: boolean) => void;
  onTimeChange: (time: string) => void;
}

const RideScheduling: React.FC<RideSchedulingProps> = ({
  isScheduled,
  scheduledTime,
  onScheduleChange,
  onTimeChange,
}) => {
  return (
    <Tabs defaultValue="now" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="now" onClick={() => onScheduleChange(false)}>
          Ride Now
        </TabsTrigger>
        <TabsTrigger value="schedule" onClick={() => onScheduleChange(true)}>
          Schedule Ride
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="schedule" className="mt-4">
        <div className="relative">
          <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="pl-10"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RideScheduling;
