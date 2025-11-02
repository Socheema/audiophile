import React, { useEffect, useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatPrice } from '../../lib/utils';
import { CartItem } from '../../contexts/CartContext';

interface OrderData {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    country: string;
    zip: string;
  };
  items: CartItem[];
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
  paymentMethod: string;
  timestamp: number;
  status: string;
}

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function OrderConfirmationPage({ orderId, onNavigate }: OrderConfirmationPageProps) {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    const stored = localStorage.getItem(`order-${orderId}`);
    if (stored) {
      try {
        setOrderData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse order data:', e);
      }
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <Container>
        <div className="py-24 text-center">
          <p>Loading order details...</p>
        </div>
      </Container>
    );
  }

  if (!orderData) {
    return (
      <Container>
        <div className="py-24 text-center space-y-6">
          <h2>Order Not Found</h2>
          <p className="text-foreground/50">
            We couldn't find the order you're looking for.
          </p>
          <Button
            onClick={() => onNavigate('home')}
            className="bg-primary hover:bg-accent text-white"
          >
            Back to Home
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <Container>
        <div className="max-w-[800px] mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="uppercase mb-4">Order Confirmed!</h1>
            <p className="text-foreground/50">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg p-6 md:p-8 space-y-8 mb-8">
            {/* Order ID and Status */}
            <div className="flex flex-wrap justify-between gap-4 pb-6 border-b">
              <div>
                <p className="text-sm text-foreground/50 uppercase mb-1">Order Number</p>
                <p>{orderData.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/50 uppercase mb-1">Order Date</p>
                <p>{new Date(orderData.timestamp).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/50 uppercase mb-1">Status</p>
                <p className="text-primary uppercase">{orderData.status}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-8 pb-6 border-b">
              <div>
                <h3 className="uppercase mb-4">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p>{orderData.customer.name}</p>
                  <p className="text-foreground/50">{orderData.customer.email}</p>
                  <p className="text-foreground/50">{orderData.customer.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="uppercase mb-4">Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p>{orderData.shipping.address}</p>
                  <p>{orderData.shipping.city}, {orderData.shipping.zip}</p>
                  <p>{orderData.shipping.country}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="pb-6 border-b">
              <h3 className="uppercase mb-6">Order Items</h3>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{item.name}</p>
                      <p className="text-sm text-foreground/50">{formatPrice(item.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/50">Qty: {item.quantity}</p>
                      <p>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground/50 uppercase">Subtotal</span>
                <span>{formatPrice(orderData.totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50 uppercase">Shipping</span>
                <span>{formatPrice(orderData.totals.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50 uppercase">VAT (Included)</span>
                <span>{formatPrice(orderData.totals.vat)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="uppercase">Grand Total</span>
                <span className="text-primary">{formatPrice(orderData.totals.grandTotal)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6 border-t">
              <p className="text-sm text-foreground/50 uppercase mb-2">Payment Method</p>
              <p className="capitalize">{orderData.paymentMethod.replace('-', ' ')}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('home')}
              className="bg-primary hover:bg-accent text-white"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-2 border-[#101010] hover:bg-[#101010] hover:text-white"
            >
              Print Order
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <h3 className="uppercase mb-4">What's Next?</h3>
            <div className="space-y-3 text-sm text-foreground/50">
              <p>
                • You will receive an email confirmation shortly with your order details.
              </p>
              <p>
                • Your order will be shipped within 2-3 business days.
              </p>
              <p>
                • You can track your order status using the order number provided.
              </p>
              <p>
                • If you have any questions, please contact our customer support.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
