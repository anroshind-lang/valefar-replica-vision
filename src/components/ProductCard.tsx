import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  hoverImage, 
  category, 
  isNew, 
  isSale, 
  salePrice 
}: ProductCardProps) => {
  const { addToCart } = useCartContext();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price: isSale && salePrice ? salePrice : price,
      image,
    });
  };

  const displayPrice = isSale && salePrice ? salePrice : price;
  const originalPrice = isSale ? price : null;

  return (
    <Link to={`/product/${id}`} className="product-card group block">
      <div className="relative overflow-hidden aspect-square mb-4">
        <img 
          src={image} 
          alt={name}
          className="product-image group-hover:scale-105"
        />
        {hoverImage && (
          <img 
            src={hoverImage} 
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {isNew && (
            <span className="bg-foreground text-background px-2 py-1 text-xs font-medium">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-medium">
              SALE
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 bg-background text-foreground p-2 shadow-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-muted"
          aria-label="Quick add to cart"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </p>
        <h3 className="font-medium text-sm">
          {name}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm">
            ₹{displayPrice.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;