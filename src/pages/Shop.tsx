import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import productHoodie from '@/assets/product-hoodie-1.jpg';
import productTshirt from '@/assets/product-tshirt-1.jpg';
import productJacket from '@/assets/product-jacket-1.jpg';
import productPants from '@/assets/product-pants-1.jpg';
import productAccessories from '@/assets/product-accessories-1.jpg';
import productShoes from '@/assets/product-shoes-1.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  sizes: string[];
  colors: string[];
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const products: Product[] = [
    {
      id: 'luxury-hoodie-1',
      name: 'Premium Oversized Hoodie',
      price: 8999,
      image: productHoodie,
      category: 'hoodies',
      isNew: true,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Grey', 'Navy'],
    },
    {
      id: 'essential-tee-1',
      name: 'Essential Cotton Tee',
      price: 3999,
      image: productTshirt,
      category: 't-shirts',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Grey'],
    },
    {
      id: 'denim-jacket-1',
      name: 'Vintage Denim Jacket',
      price: 12999,
      image: productJacket,
      category: 'jackets',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
    },
    {
      id: 'cargo-pants-1',
      name: 'Technical Cargo Pants',
      price: 7999,
      salePrice: 5999,
      isSale: true,
      image: productPants,
      category: 'pants',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Black', 'Olive', 'Khaki'],
    },
    {
      id: 'luxury-accessories-1',
      name: 'Premium Chain Set',
      price: 4999,
      image: productAccessories,
      category: 'accessories',
      isNew: true,
      sizes: ['One Size'],
      colors: ['Gold', 'Silver'],
    },
    {
      id: 'designer-sneakers-1',
      name: 'High-Top Sneakers',
      price: 15999,
      image: productShoes,
      category: 'shoes',
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black', 'Grey'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'pants', name: 'Pants' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'shoes', name: 'Shoes' },
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'name', name: 'Name: A to Z' },
    { id: 'newest', name: 'Newest First' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      const productPrice = product.isSale && product.salePrice ? product.salePrice : product.price;
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.isSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.isSale && b.salePrice ? b.salePrice : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.isSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.isSale && b.salePrice ? b.salePrice : b.price;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center">
            Shop Collection
          </h1>
          <p className="text-lg text-muted-foreground text-center mt-4">
            Discover our complete range of luxury streetwear
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left text-sm py-2 px-3 transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">₹{priceRange[0].toLocaleString()}</span>
                    <span className="text-sm">-</span>
                    <span className="text-sm">₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-outline inline-flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <span className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} products
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  isSale={product.isSale}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
                />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 50000]);
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
