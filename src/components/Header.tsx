import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

export default function Header({ onCartClick, onCategoryClick }: HeaderProps) {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              onClick={() => onCategoryClick('home')}
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Gary's Store
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onCategoryClick('men')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Men
            </button>
            <button
              onClick={() => onCategoryClick('women')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Women
            </button>
            <button
              onClick={() => onCategoryClick('children')}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Children
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            <button
              onClick={() => {
                onCategoryClick('men');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Men
            </button>
            <button
              onClick={() => {
                onCategoryClick('women');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Women
            </button>
            <button
              onClick={() => {
                onCategoryClick('children');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Children
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
