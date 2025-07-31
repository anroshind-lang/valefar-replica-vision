import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'VALEFAR' + Date.now();
  const amount = searchParams.get('amount') || '0';

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-playfair font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your order has been placed successfully
          </p>
          
          <div className="bg-background p-8 max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-playfair font-bold mb-4">Order Details</h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-semibold">₹{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-green-600">Confirmed</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-8">
            A confirmation email has been sent to your registered email address with all the order details.
            We'll notify you once your order is shipped.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 btn-luxury"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;