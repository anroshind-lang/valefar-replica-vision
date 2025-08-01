import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import SearchModal from './SearchModal';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartItemsCount, openCart } = useCartContext();
  const location = useLocation();

  const cartItemCount = getCartItemsCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl md:text-3xl font-playfair font-bold tracking-wider">
              VALEFAR
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-muted transition-colors"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* User Icon */}
              <Link 
                to="/login"
                className="p-2 hover:bg-muted transition-colors"
                aria-label="Login/Profile"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart Icon */}
              <button 
                onClick={openCart}
                className="relative p-2 hover:bg-muted transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'closed'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-xl font-playfair font-bold">VALEFAR</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 px-4 py-8">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-lg font-medium mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart ({cartItemCount})</span>
              </Link>
              <div className="space-y-4 text-sm text-muted-foreground">
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                <Link to="/returns" onClick={() => setIsMobileMenuOpen(false)}>Returns</Link>
                <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
                <Link to="/terms" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navigation;