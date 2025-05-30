
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FareBreakdown as FareBreakdownType, formatCurrency } from '@/utils/fareCalculator';

interface FareBreakdownProps {
  fare: FareBreakdownType;
}

const FareBreakdown: React.FC<FareBreakdownProps> = ({ fare }) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Fare Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span>{formatCurrency(fare.basePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Distance (5.2 km):</span>
            <span>{formatCurrency(fare.distanceCharge)}</span>
          </div>
          <div className="flex justify-between">
            <span>Time (15 min):</span>
            <span>{formatCurrency(fare.timeCharge)}</span>
          </div>
          {fare.peakHourSurcharge > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Peak Hour Surcharge:</span>
              <span>{formatCurrency(fare.peakHourSurcharge)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>{formatCurrency(fare.platformFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>{formatCurrency(fare.taxes)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span>{formatCurrency(fare.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FareBreakdown;
