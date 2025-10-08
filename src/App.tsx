import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Category, Product } from './lib/types';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LegalPage from './components/LegalPage';

type View = 'home' | 'category' | 'checkout';

function App() {
  const [view, setView] = useState<View>('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'shipping' | 'returns' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (productsRes.data) {
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data.filter(p => p.featured));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    if (slug === 'home') {
      setView('home');
      setSelectedCategory('');
      setFilteredProducts(products.filter(p => p.featured));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const category = categories.find(c => c.slug === slug);
    if (category) {
      setSelectedCategory(slug);
      setView('category');
      const categoryProducts = products.filter(p => p.category_id === category.id);
      setFilteredProducts(categoryProducts);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    setFilteredProducts(products);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Gary's Store...</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header onCartClick={() => setShowCart(true)} onCategoryClick={handleCategoryClick} />

        <main className="pt-20">
          {view === 'home' && (
            <>
              <Hero onShopNow={handleShopNow} />
              <CategorySection categories={categories} onCategoryClick={handleCategoryClick} />
              <ProductGrid
                products={filteredProducts}
                onProductClick={setSelectedProduct}
                title="Featured Products"
              />
            </>
          )}

          {view === 'category' && (
            <div className="py-8">
              <ProductGrid
                products={filteredProducts}
                onProductClick={setSelectedProduct}
                title={
                  selectedCategory
                    ? categories.find(c => c.slug === selectedCategory)?.name
                    : 'All Products'
                }
              />
            </div>
          )}
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Gary's Store</h3>
                <p className="text-gray-400">
                  Custom tailored dresses for men, women, and children. Quality craftsmanship,
                  perfect fit.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryClick('men')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Men's Collection
                  </button>
                  <button
                    onClick={() => handleCategoryClick('women')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Women's Collection
                  </button>
                  <button
                    onClick={() => handleCategoryClick('children')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Children's Collection
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Legal</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setLegalPage('privacy')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setLegalPage('terms')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => setLegalPage('shipping')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping Policy
                  </button>
                  <button
                    onClick={() => setLegalPage('returns')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Returns & Refunds
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Gary's Store. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

        {showCart && <Cart onClose={() => setShowCart(false)} onCheckout={handleCheckout} />}

        {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}

        {legalPage && <LegalPage page={legalPage} onClose={() => setLegalPage(null)} />}
      </div>
    </CartProvider>
  );
}

export default App;
