import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getProductsByCategory } from '../../data/products';

interface CategoryPageProps {
  category: 'headphones' | 'speakers' | 'earphones';
  onNavigate: (page: string, slug?: string) => void;
}

export function CategoryPage({ category, onNavigate }: CategoryPageProps) {
  const products = getProductsByCategory(category);

  return (
    <div className="pb-24">
      {/* Category Header */}
      <div className="bg-[#101010]">
        <Container>
          <div className="py-16 text-center">
            <h1 className="text-white uppercase tracking-wider">{category}</h1>
          </div>
        </Container>
      </div>

      {/* Products List */}
      <Container>
        <div className="mt-16 space-y-24">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Product Image */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <ImageWithFallback
                  src={product.images.desktop}
                  alt={product.name}
                  className="w-full rounded-lg h-[350px] object-cover bg-secondary"
                />
              </div>

              {/* Product Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                {product.new && (
                  <p className="text-primary tracking-[0.6em] uppercase">New Product</p>
                )}
                <h2 className="uppercase">{product.name}</h2>
                <p className="text-foreground/50">{product.description}</p>
                <Button
                  onClick={() => onNavigate('product', product.slug)}
                  className="bg-primary hover:bg-accent text-white"
                >
                  See Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Categories Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {['headphones', 'speakers', 'earphones'].map((cat) => (
            <div
              key={cat}
              className="bg-secondary rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate(cat)}
            >
              <div className="h-40 flex items-center justify-center mb-4">
                <ImageWithFallback
                  src={
                    cat === 'headphones'
                      ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
                      : cat === 'speakers'
                      ? 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200'
                      : 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200'
                  }
                  alt={cat}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <h3 className="uppercase mb-4">{cat}</h3>
              <span className="text-foreground/50 hover:text-primary uppercase tracking-wider">
                Shop
              </span>
            </div>
          ))}
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
