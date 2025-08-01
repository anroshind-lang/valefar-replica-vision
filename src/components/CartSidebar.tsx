import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  const subtotal = getCartTotal();
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length})</h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-muted transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some products to get started</p>
              <Link 
                to="/shop" 
                onClick={closeCart}
                className="btn-luxury"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                    )}
                    <p className="text-sm font-medium">₹{item.price.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1), item.size, item.color)}
                        className="p-1 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm min-w-[2ch] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        className="p-1 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-xs text-red-600 hover:text-red-700 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-medium text-base border-t border-border pt-2">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link 
                to="/cart" 
                onClick={closeCart}
                className="w-full btn-outline block text-center"
              >
                View Cart
              </Link>
              <Link 
                to="/checkout" 
                onClick={closeCart}
                className="w-full btn-luxury block text-center"
              >
                Checkout
              </Link>
            </div>
            
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;