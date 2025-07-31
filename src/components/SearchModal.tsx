import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// Import product images
import productTshirt from '@/assets/product-tshirt-1.jpg';
import productHoodie from '@/assets/product-hoodie-1.jpg';
import productJacket from '@/assets/product-jacket-1.jpg';
import productPants from '@/assets/product-pants-1.jpg';
import productShoes from '@/assets/product-shoes-1.jpg';
import productAccessories from '@/assets/product-accessories-1.jpg';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const products = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 2999,
    image: productTshirt,
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
  },
  {
    id: '2',
    name: 'Luxury Hoodie',
    price: 6999,
    image: productHoodie,
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
  },
  {
    id: '3',
    name: 'Designer Jacket',
    price: 12999,
    image: productJacket,
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Navy'],
  },
  {
    id: '4',
    name: 'Premium Pants',
    price: 8999,
    image: productPants,
    category: 'clothing',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Navy', 'Khaki'],
  },
  {
    id: '5',
    name: 'Luxury Sneakers',
    price: 15999,
    image: productShoes,
    category: 'footwear',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'White', 'Grey'],
  },
  {
    id: '6',
    name: 'Designer Watch',
    price: 25999,
    image: productAccessories,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Silver', 'Gold'],
  },
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-background w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-playfair font-bold">Search Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-4">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} onClick={onClose}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords
              </p>
              <Link 
                to="/shop" 
                className="btn-luxury inline-block"
                onClick={onClose}
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;