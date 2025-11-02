import React, { useState } from 'react';
import { Container } from './Container';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { CartModal } from '../cart/CartModal';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { getItemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  const navLinks = [
    { label: 'HOME', page: 'home' },
    { label: 'HEADPHONES', page: 'headphones' },
    { label: 'SPEAKERS', page: 'speakers' },
    { label: 'EARPHONES', page: 'earphones' },
  ];

  return (
    <header className="bg-[#101010] border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between py-8">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-white" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white w-[250px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <button
                    key={link.page}
                    onClick={() => {
                      onNavigate(link.page);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-white tracking-wider"
          >
            audiophile
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`tracking-widest transition-colors ${
                  currentPage === link.page
                    ? 'text-primary'
                    : 'text-white hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </Container>

      {/* Cart Modal */}
      <CartModal 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
}
