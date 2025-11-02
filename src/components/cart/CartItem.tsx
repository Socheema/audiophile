import React from 'react';
import { CartItem as CartItemType, useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { Minus, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CartItemProps {
  item: CartItemType;
  // allow key to be passed from list rendering (JSX special prop)
  key?: React.Key;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4">
      <ImageWithFallback
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded object-cover"
      />

      <div className="flex-1 min-w-0">
        <p className="truncate">{item.name}</p>
        <p className="text-sm text-foreground/50">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-3 bg-secondary px-3 py-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="text-foreground/50 hover:text-primary transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-4 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="text-foreground/50 hover:text-primary transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
