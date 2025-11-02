import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from './CartItem';
import { Button } from '../ui/button';
import { formatPrice } from '../../lib/utils';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function CartModal({ open, onClose, onNavigate }: CartModalProps) {
  const { items, clearCart, getTotals } = useCart();
  const totals = getTotals();

  const handleCheckout = () => {
    onClose();
    onNavigate('checkout');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[380px] bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Cart ({items.length})</DialogTitle>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-foreground/50 hover:text-primary underline"
              >
                Remove all
              </button>
            )}
          </div>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-8 text-center text-foreground/50">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-6 max-h-[300px] overflow-auto">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground/50 uppercase">Total</span>
                <span>{formatPrice(totals.grandTotal)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-accent text-white"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
