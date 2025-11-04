import React, { useEffect, useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatPrice } from '../../lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface OrderPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function OrderPage({ orderId, onNavigate, onBack }: OrderPageProps) {
  const [loading, setLoading] = useState(true);

  // Query order from Convex
  const order = useQuery(api.orders.getOrderById, { orderId });

  useEffect(() => {
    if (order !== undefined) {
      setLoading(false);
    }
  }, [order]);

  if (loading) {
    return (
      <Container>
        <div className="py-24 text-center">
          <p>Loading order details...</p>
        </div>
      </Container>
    );
  }

  if (!order) {
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
    <div className="py-8 md:py-16">
      <Container>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>

        <div className="max-w-[800px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="uppercase mb-4">Order Details</h1>
            <p className="text-foreground/50">
              View your order information and status
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg p-6 md:p-8 space-y-8 mb-8">
            {/* Order ID and Status */}
            <div className="flex justify-between items-start gap-4 pb-6 border-b">
              <div>
                <p className="text-sm text-foreground/50 uppercase mb-1">Order Number</p>
                <p className="font-medium">{order.orderId}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-foreground/50 uppercase mb-1">Order Date</p>
                <p className="font-medium">{new Date(order.timestamp).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/50 uppercase mb-1">Status</p>
                <p className="text-primary uppercase font-medium">{order.status}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-8 pb-6 border-b">
              <div>
                <h3 className="uppercase mb-4">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p>{order.customer.name}</p>
                  <p className="text-foreground/50">{order.customer.email}</p>
                  <p className="text-foreground/50">{order.customer.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="uppercase mb-4">Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.zip}</p>
                  <p>{order.shipping.country}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="pb-6 border-b">
              <h3 className="uppercase mb-6">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
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
                <span>{formatPrice(order.totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50 uppercase">Shipping</span>
                <span>{formatPrice(order.totals.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50 uppercase">VAT (Included)</span>
                <span>{formatPrice(order.totals.vat)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="uppercase">Grand Total</span>
                <span className="text-primary">{formatPrice(order.totals.grandTotal)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6 border-t">
              <p className="text-sm text-foreground/50 uppercase mb-2">Payment Method</p>
              <p className="capitalize">{order.paymentMethod?.replace('-', ' ') || 'Not specified'}</p>
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
            <h3 className="uppercase mb-4">Order Status Information</h3>
            <div className="space-y-3 text-sm text-foreground/50">
              <p>
                • Your order is currently <strong className="text-primary">{order.status}</strong>
              </p>
              <p>
                • You will receive updates via email as your order progresses
              </p>
              <p>
                • Estimated delivery time is 2-3 business days from processing
              </p>
              <p>
                • If you have any questions, please contact our customer support with your order number
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
