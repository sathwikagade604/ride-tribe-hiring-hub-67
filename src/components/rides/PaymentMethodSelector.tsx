
import React from 'react';
import { Button } from '@/components/ui/button';

type PaymentMethod = 'cash' | 'card' | 'wallet' | 'upi';

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange,
}) => {
  const paymentMethods = [
    { id: 'cash' as const, label: 'Cash', icon: '💵' },
    { id: 'card' as const, label: 'Card', icon: '💳' },
    { id: 'wallet' as const, label: 'Wallet', icon: '👛' },
    { id: 'upi' as const, label: 'UPI', icon: '📱' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Payment Method</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {paymentMethods.map((method) => (
          <Button
            key={method.id}
            variant={paymentMethod === method.id ? 'default' : 'outline'}
            onClick={() => onPaymentMethodChange(method.id)}
            className="h-12"
          >
            <span className="mr-2">{method.icon}</span>
            {method.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
