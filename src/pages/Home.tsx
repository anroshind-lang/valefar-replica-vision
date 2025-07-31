import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import heroImage1 from '@/assets/hero-image-1.jpg';
import heroImage2 from '@/assets/hero-image-2.jpg';
import productHoodie from '@/assets/product-hoodie-1.jpg';
import productTshirt from '@/assets/product-tshirt-1.jpg';
import productJacket from '@/assets/product-jacket-1.jpg';
import productPants from '@/assets/product-pants-1.jpg';

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [heroImage1, heroImage2];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const featuredProducts = [
    {
      id: 'luxury-hoodie-1',
      name: 'Premium Oversized Hoodie',
      price: 8999,
      image: productHoodie,
      category: 'Hoodies',
      isNew: true,
    },
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
      isSale: true,
      salePrice: 5999,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHero ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="hero-overlay absolute inset-0" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className={`max-w-4xl mx-auto px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 tracking-wide">
              VALEFAR
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
              Luxury Streetwear Redefined
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/shop"
                className="btn-luxury text-white border-white hover:bg-white hover:text-black inline-flex items-center space-x-2"
              >
                <span>Discover Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="btn-outline text-white border-white hover:bg-white hover:text-black inline-flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Watch Film</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHero ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of premium streetwear pieces, 
              designed for those who appreciate exceptional quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-outline inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                Crafted for the Streets, Designed for Luxury
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Valefar represents the perfect fusion of street culture and luxury fashion. 
                Each piece in our collection is meticulously crafted using premium materials 
                and attention to detail that sets us apart.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that streetwear should be more than just clothing—it should be 
                a statement of individuality, quality, and sophistication.
              </p>
              <Link
                to="/about"
                className="btn-luxury inline-flex items-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={heroImage2}
                alt="About Valefar"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Stay in the Loop
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be the first to know about new drops, exclusive offers, and behind-the-scenes content.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 text-base border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="btn-luxury">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;