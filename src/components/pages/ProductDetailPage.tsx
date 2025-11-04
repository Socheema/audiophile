import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/button';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../lib/utils';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: string, slug?: string) => void;
  onBack: () => void;
}

export function ProductDetailPage({ product, onNavigate, onBack }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="pb-24">
      <Container>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mt-8 mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>

        {/* Product Main Info */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <ImageWithFallback
            src={product.images.desktop}
            alt={product.name}
            className="w-full rounded-lg h-[450px] object-cover bg-secondary"
          />

          <div className="space-y-6">
            {product.new && (
              <p className="text-primary tracking-[0.6em] uppercase">New Product</p>
            )}
            <h1 className="uppercase">{product.name}</h1>
            <p className="text-foreground/50">{product.description}</p>
            <p className="text-lg">{formatPrice(product.price)}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 bg-secondary px-4 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-foreground/50 hover:text-primary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-foreground/50 hover:text-primary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-accent text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Features and In The Box */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <h3 className="uppercase mb-6">Features</h3>
            <div className="text-foreground/50 space-y-4 whitespace-pre-line">
              {product.features}
            </div>
          </div>

          <div>
            <h3 className="uppercase mb-6">In The Box</h3>
            <div className="space-y-2">
              {product.includes.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-primary">{item.quantity}x</span>
                  <span className="text-foreground/50">{item.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
          <ImageWithFallback
            src={product.gallery.first.desktop}
            alt="Product gallery image 1"
            className="w-full h-[200px] md:h-[280px] object-cover rounded-lg"
          />
          <ImageWithFallback
            src={product.gallery.second.desktop}
            alt="Product gallery image 2"
            className="w-full h-[200px] md:h-[280px] object-cover rounded-lg"
          />
          <ImageWithFallback
            src={product.gallery.third.desktop}
            alt="Product gallery image 3"
            className="col-span-2 md:col-span-1 md:row-span-2 w-full h-[200px] md:h-[574px] object-cover rounded-lg"
          />
        </div>

        {/* You May Also Like */}
        <div className="text-center mb-12">
          <h3 className="uppercase">You May Also Like</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.others.map((other) => (
            <div key={other.slug} className="text-center space-y-6">
              <ImageWithFallback
                src={other.image.desktop}
                alt={other.name}
                className="w-full h-[250px] object-cover rounded-lg bg-secondary"
              />
              <h4 className="uppercase">{other.name}</h4>
              <Button
                onClick={() => onNavigate('product', other.slug)}
                className="bg-primary hover:bg-accent text-white"
              >
                See Product
              </Button>
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
