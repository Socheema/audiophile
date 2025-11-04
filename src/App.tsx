import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { OrderPage } from './components/pages/OrderPage';
import { getProductBySlug } from './data/products';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './contexts/CartContext';

type Page = 'home' | 'headphones' | 'speakers' | 'earphones' | 'product' | 'checkout' | 'order-confirmation' | 'order';

interface NavigationState {
  page: Page;
  slug?: string;
  orderId?: string;
}

function App() {
  const [navigationState, setNavigationState] = useState<NavigationState>({ page: 'home' });
  const [history, setHistory] = useState<NavigationState[]>([{ page: 'home' }]);

  // Handle hash-based navigation for email links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash.startsWith('order-')) {
        const orderId = hash.replace('order-', '');
        navigate('order', orderId);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigationState]);

  const navigate = (page: string, slugOrOrderId?: string) => {
    const newState: NavigationState = { page: page as Page };

    if (page === 'product') {
      newState.slug = slugOrOrderId;
    } else if (page === 'order-confirmation' || page === 'order') {
      newState.orderId = slugOrOrderId;
    }

    setNavigationState(newState);
    setHistory(prev => [...prev, newState]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setNavigationState(newHistory[newHistory.length - 1]);
    } else {
      navigate('home');
    }
  };

  const renderPage = () => {
    switch (navigationState.page) {
      case 'home':
        return <HomePage onNavigate={navigate} />;

      case 'headphones':
        return <CategoryPage category="headphones" onNavigate={navigate} />;

      case 'speakers':
        return <CategoryPage category="speakers" onNavigate={navigate} />;

      case 'earphones':
        return <CategoryPage category="earphones" onNavigate={navigate} />;

      case 'product': {
        if (!navigationState.slug) {
          navigate('home');
          return null;
        }
        const product = getProductBySlug(navigationState.slug);
        if (!product) {
          navigate('home');
          return null;
        }
        return (
          <ProductDetailPage
            product={product}
            onNavigate={navigate}
            onBack={goBack}
          />
        );
      }

      case 'checkout':
        return <CheckoutPage onNavigate={navigate} onBack={goBack} />;

      case 'order-confirmation': {
        if (!navigationState.orderId) {
          navigate('home');
          return null;
        }
        return (
          <OrderConfirmationPage
            orderId={navigationState.orderId}
            onNavigate={navigate}
          />
        );
      }

      case 'order': {
        if (!navigationState.orderId) {
          navigate('home');
          return null;
        }
        return (
          <OrderPage
            orderId={navigationState.orderId}
            onNavigate={navigate}
            onBack={goBack}
          />
        );
      }

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={navigate} currentPage={navigationState.page} />
        {/* removed test CheckoutButton to eliminate white gap between header and pages */}
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer onNavigate={navigate} />
        <Toaster position="top-right" />
      </div>
    </CartProvider>
  );
}

export default App;
