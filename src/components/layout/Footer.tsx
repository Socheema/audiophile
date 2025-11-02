import React from 'react';
import { Container } from './Container';
import { Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#101010] text-white mt-24">
      <Container>
        <div className="py-12">
          {/* Logo and Nav */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div className="flex flex-col gap-8">
              <button
                onClick={() => onNavigate('home')}
                className="tracking-wider"
              >
                audiophile
              </button>
              
              {/* Navigation Links */}
              <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
                <button
                  onClick={() => onNavigate('home')}
                  className="text-left hover:text-primary transition-colors tracking-widest"
                >
                  HOME
                </button>
                <button
                  onClick={() => onNavigate('headphones')}
                  className="text-left hover:text-primary transition-colors tracking-widest"
                >
                  HEADPHONES
                </button>
                <button
                  onClick={() => onNavigate('speakers')}
                  className="text-left hover:text-primary transition-colors tracking-widest"
                >
                  SPEAKERS
                </button>
                <button
                  onClick={() => onNavigate('earphones')}
                  className="text-left hover:text-primary transition-colors tracking-widest"
                >
                  EARPHONES
                </button>
              </nav>
            </div>

            {/* Social Media - Desktop Only */}
            <div className="hidden md:flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Description and Copyright */}
          <div className="mt-8 flex flex-col md:flex-row md:justify-between gap-8">
            <p className="text-white/50 max-w-[540px]">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
              and sound specialists who are devoted to helping you get the most out of personal audio. 
              Come and visit our demo facility - we're open 7 days a week.
            </p>
            
            <div className="md:self-end">
              <p className="text-white/50">Copyright 2024. All Rights Reserved</p>
            </div>
          </div>

          {/* Social Media - Mobile */}
          <div className="md:hidden flex gap-4 mt-8 justify-center">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
