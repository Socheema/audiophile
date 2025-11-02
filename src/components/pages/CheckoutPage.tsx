import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ChevronLeft } from 'lucide-react';
import { useCart, CartItem } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '../ui/dialog';

interface CheckoutPageProps {
  onNavigate: (page: string, orderId?: string) => void;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber: string;
  eMoneyPin: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CheckoutPage({ onNavigate, onBack }: CheckoutPageProps) {
  const { items, getTotals, clearCart } = useCart();
  const totals = getTotals();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    if (formData.paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber.trim()) {
        newErrors.eMoneyNumber = 'e-Money number is required';
      }
      if (!formData.eMoneyPin.trim()) {
        newErrors.eMoneyPin = 'e-Money PIN is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // In a real app, this would save to Supabase
      const orderData = {
        orderId: newOrderId,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip: formData.zip,
        },
        items: items,
        totals: totals,
        paymentMethod: formData.paymentMethod,
        timestamp: Date.now(),
        status: 'pending',
      };

      // Save to localStorage for demo
      localStorage.setItem(`order-${newOrderId}`, JSON.stringify(orderData));

      setOrderId(newOrderId);
      setShowConfirmation(true);

    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    clearCart();
    setShowConfirmation(false);
    onNavigate('order-confirmation', orderId);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h2 className="mb-6">Your cart is empty</h2>
          <Button onClick={() => onNavigate('home')} className="bg-primary hover:bg-accent text-white">
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background py-8 md:py-16">
      <Container>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
              <h1 className="uppercase mb-8">Checkout</h1>

              {/* Billing Details */}
              <div className="mb-8">
                <h3 className="text-primary uppercase tracking-wider mb-4">Billing Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Alexei Ward"
                      className={errors.name ? 'border-destructive' : ''}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-destructive text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="alexei@mail.com"
                      className={errors.email ? 'border-destructive' : ''}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-destructive text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 202-555-0136"
                      className={errors.phone ? 'border-destructive' : ''}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-destructive text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                    
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8">
                <h3 className="text-primary uppercase tracking-wider mb-4">Shipping Info</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="1137 Williams Avenue"
                      className={errors.address ? 'border-destructive' : ''}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {errors.address && (
                      <p id="address-error" className="text-destructive text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      placeholder="10001"
                      className={errors.zip ? 'border-destructive' : ''}
                      aria-invalid={!!errors.zip}
                      aria-describedby={errors.zip ? 'zip-error' : undefined}
                    />
                    {errors.zip && (
                      <p id="zip-error" className="text-destructive text-sm mt-1">
                        {errors.zip}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                      className={errors.city ? 'border-destructive' : ''}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                    />
                    {errors.city && (
                      <p id="city-error" className="text-destructive text-sm mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="United States"
                      className={errors.country ? 'border-destructive' : ''}
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? 'country-error' : undefined}
                    />
                    {errors.country && (
                      <p id="country-error" className="text-destructive text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-primary uppercase tracking-wider mb-4">Payment Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value as 'e-money' | 'cash')}
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary">
                        <RadioGroupItem value="e-money" id="e-money" />
                        <Label htmlFor="e-money" className="cursor-pointer flex-1">
                          e-Money
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="cursor-pointer flex-1">
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentMethod === 'e-money' && (
                    <>
                      <div>
                        <Label htmlFor="eMoneyNumber">e-Money Number</Label>
                        <Input
                          id="eMoneyNumber"
                          value={formData.eMoneyNumber}
                          onChange={(e) => handleInputChange('eMoneyNumber', e.target.value)}
                          placeholder="238521993"
                          className={errors.eMoneyNumber ? 'border-destructive' : ''}
                          aria-invalid={!!errors.eMoneyNumber}
                          aria-describedby={errors.eMoneyNumber ? 'emoney-number-error' : undefined}
                        />
                        {errors.eMoneyNumber && (
                          <p id="emoney-number-error" className="text-destructive text-sm mt-1">
                            {errors.eMoneyNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="eMoneyPin">e-Money PIN</Label>
                        <Input
                          id="eMoneyPin"
                          type="password"
                          value={formData.eMoneyPin}
                          onChange={(e) => handleInputChange('eMoneyPin', e.target.value)}
                          placeholder="6891"
                          className={errors.eMoneyPin ? 'border-destructive' : ''}
                          aria-invalid={!!errors.eMoneyPin}
                          aria-describedby={errors.eMoneyPin ? 'emoney-pin-error' : undefined}
                        />
                        {errors.eMoneyPin && (
                          <p id="emoney-pin-error" className="text-destructive text-sm mt-1">
                            {errors.eMoneyPin}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === 'cash' && (
                    <div className="md:col-span-2">
                      <p className="text-foreground/50 text-sm">
                        The 'Cash on Delivery' option enables you to pay in cash when our delivery courier
                        arrives at your residence. Just make sure your address is correct so that your order
                        will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 md:p-8 sticky top-8">
                <h3 className="uppercase mb-6">Summary</h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm">{item.name}</p>
                        <p className="text-sm text-foreground/50">{formatPrice(item.price)}</p>
                      </div>
                      <span className="text-foreground/50">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-foreground/50 uppercase">Total</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50 uppercase">Shipping</span>
                    <span>{formatPrice(totals.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50 uppercase">VAT (Included)</span>
                    <span>{formatPrice(totals.vat)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-foreground/50 uppercase">Grand Total</span>
                  <span className="text-primary">{formatPrice(totals.grandTotal)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-accent text-white"
                >
                  {isSubmitting ? 'Processing...' : 'Continue & Pay'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Container>

      {/* Order Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-[500px]">
          <div className="flex flex-col space-y-6 ">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center self-end mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-start">
              <h2 className="uppercase mb-4">Thank you<br />for your order</h2>
              <p className="text-foreground/50">You will receive an email confirmation shortly.</p>
            </div>

            <div className="bg-secondary rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                {items.slice(0, 1).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-sm text-foreground/50">{formatPrice(item.price)}</p>
                    </div>
                    <span className="text-foreground/50">x{item.quantity}</span>
                  </div>
                ))}
                {items.length > 1 && (
                  <p className="text-center text-sm text-foreground/50 mt-4 pt-4 border-t">
                    and {items.length - 1} other item{items.length > 2 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="p-6 bg-[#101010] text-white">
                <p className="text-white/50 text-sm uppercase mb-2">Grand Total</p>
                <p>{formatPrice(totals.grandTotal)}</p>
              </div>
            </div>

            <Button
              onClick={handleConfirmationClose}
              className="w-full bg-primary hover:bg-accent text-white"
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
