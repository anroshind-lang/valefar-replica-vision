import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/ProductCard';
import productHoodie from '@/assets/product-hoodie-1.jpg';
import productTshirt from '@/assets/product-tshirt-1.jpg';
import productJacket from '@/assets/product-jacket-1.jpg';
import productPants from '@/assets/product-pants-1.jpg';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: 'luxury-hoodie-1',
    name: 'Premium Oversized Hoodie',
    price: 8999,
    description: 'Crafted from premium organic cotton fleece, this oversized hoodie embodies the perfect blend of comfort and luxury. Features include a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a contemporary streetwear aesthetic.',
    images: [productHoodie, productTshirt, productJacket],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Grey', value: '#808080' },
      { name: 'Navy', value: '#000080' },
    ],
    features: [
      '100% organic cotton fleece',
      'Heavyweight 450gsm fabric',
      'Pre-shrunk and enzyme washed',
      'Reinforced seams for durability',
      'Unisex sizing',
    ],
    category: 'Hoodies',
    rating: 4.8,
    reviewCount: 127,
    isNew: true,
  };

  const relatedProducts = [
    {
      id: 'essential-tee-1',
      name: 'Essential Cotton Tee',
      price: 3999,
      image: productTshirt,
      category: 'T-Shirts',
    },
    {
      id: 'denim-jacket-1',
      name: 'Vintage Denim Jacket',
      price: 12999,
      image: productJacket,
      category: 'Jackets',
    },
    {
      id: 'cargo-pants-1',
      name: 'Technical Cargo Pants',
      price: 7999,
      image: productPants,
      category: 'Pants',
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    }, quantity);

    alert('Added to cart successfully!');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${
                      index === activeImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badge and Rating */}
            <div className="flex items-center space-x-4">
              {product.isNew && (
                <span className="bg-foreground text-background px-3 py-1 text-sm font-medium">
                  NEW
                </span>
              )}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 border-2 transition-all ${
                      selectedColor === color.name ? 'border-primary' : 'border-muted'
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[3ch] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-luxury"
              >
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </button>
              
              <div className="flex space-x-4">
                <button className="flex-1 btn-outline inline-flex items-center justify-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="btn-outline inline-flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-medium mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping over ₹5,000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;