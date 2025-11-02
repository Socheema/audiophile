import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { products } from '../../data/products';

interface HomePageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProduct = products.find(p => p.slug === 'xx99-mark-ii-headphones');
  const speakerZx9 = products.find(p => p.slug === 'zx9-speaker');
  const speakerZx7 = products.find(p => p.slug === 'zx7-speaker');
  const earphoneYx1 = products.find(p => p.slug === 'yx1-earphones');

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-[#101010] -mt-8">
        <Container>
          <div className="py-20 md:py-32 text-center md:text-left">
            <div className="max-w-[400px] mx-auto md:mx-0 space-y-6">
              <p className="text-white/50 tracking-[0.6em] uppercase">New Product</p>
              <h1 className="text-white uppercase">
                XX99 Mark II<br />Headphones
              </h1>
              <p className="text-white/75">
                Experience natural, lifelike audio and exceptional build quality made for the 
                passionate music enthusiast.
              </p>
              <Button
                onClick={() => onNavigate('product', featuredProduct?.slug)}
                className="bg-primary hover:bg-accent text-white"
              >
                See Product
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Categories Section */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Headphones */}
          <div className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="h-40 flex items-center justify-center mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                alt="Headphones"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="uppercase mb-4">Headphones</h3>
            <button
              onClick={() => onNavigate('headphones')}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speakers */}
          <div className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="h-40 flex items-center justify-center mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200"
                alt="Speakers"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="uppercase mb-4">Speakers</h3>
            <button
              onClick={() => onNavigate('speakers')}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Earphones */}
          <div className="bg-secondary rounded-lg p-6 text-center group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="h-40 flex items-center justify-center mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200"
                alt="Earphones"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="uppercase mb-4">Earphones</h3>
            <button
              onClick={() => onNavigate('earphones')}
              className="text-foreground/50 hover:text-primary inline-flex items-center gap-2 uppercase tracking-wider"
            >
              Shop <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* Featured Products */}
      <Container>
        <div className="mt-24 space-y-12">
          {/* ZX9 Speaker Feature */}
          <div className="bg-primary rounded-lg overflow-hidden p-12 md:p-20 text-center md:text-left">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={speakerZx9?.images.desktop || ''}
                  alt="ZX9 Speaker"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-white uppercase">ZX9<br />Speaker</h2>
                <p className="text-white/75">
                  Upgrade to premium speakers that are phenomenally built to deliver 
                  truly remarkable sound.
                </p>
                <Button
                  onClick={() => onNavigate('product', speakerZx9?.slug)}
                  className="bg-[#101010] hover:bg-[#4C4C4C] text-white"
                >
                  See Product
                </Button>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker Feature */}
          <div className="relative bg-secondary rounded-lg overflow-hidden p-12 md:p-20">
            <div className="space-y-6">
              <h3 className="uppercase">ZX7 Speaker</h3>
              <Button
                onClick={() => onNavigate('product', speakerZx7?.slug)}
                variant="outline"
                className="border-2 border-[#101010] hover:bg-[#101010] hover:text-white"
              >
                See Product
              </Button>
            </div>
          </div>

          {/* YX1 Earphones Feature */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg overflow-hidden h-64">
              <ImageWithFallback
                src={earphoneYx1?.images.desktop || ''}
                alt="YX1 Earphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-secondary rounded-lg p-12 flex flex-col justify-center space-y-6">
              <h3 className="uppercase">YX1 Earphones</h3>
              <Button
                onClick={() => onNavigate('product', earphoneYx1?.slug)}
                variant="outline"
                className="border-2 border-[#101010] hover:bg-[#101010] hover:text-white w-fit"
              >
                See Product
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container>
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="uppercase">
              Bringing you the <span className="text-primary">best</span> audio gear
            </h2>
            <p className="text-foreground/50">
              Located at the heart of New York City, Audiophile is the premier store for high end 
              headphones, earphones, speakers, and audio accessories. We have a large showroom and 
              luxury demonstration rooms available for you to browse and experience a wide range of 
              our products. Stop by our store to meet some of the fantastic people who make 
              Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1545127398-14699f92334b?w=800"
              alt="Best audio gear"
              className="rounded-lg w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
