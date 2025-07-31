import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { initiateRazorpayPayment, generateOrderId } from '@/services/razorpayService';
import { sendOrderConfirmationEmail } from '@/services/emailService';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'card',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing) return;
    
    // Validate form
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'pincode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const amount = total;

      // Initiate Razorpay payment
      await initiateRazorpayPayment(
        {
          amount,
          currency: 'INR',
          orderId,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        },
        async (response) => {
          // Payment successful
          console.log('Payment successful:', response);
          
          try {
            // Send order confirmation email
            await sendOrderConfirmationEmail({
              customerName: `${formData.firstName} ${formData.lastName}`,
              customerEmail: formData.email,
              orderId: response.razorpay_order_id || orderId,
              items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price * item.quantity,
              })),
              totalAmount: amount,
              shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
              phone: formData.phone,
            });
          } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue even if email fails
          }

          // Clear cart and redirect to thank you page
          clearCart();
          navigate(`/thank-you?orderId=${response.razorpay_order_id || orderId}&amount=${amount}`);
        },
        (error) => {
          // Payment failed
          console.error('Payment failed:', error);
          alert('Payment failed. Please try again.');
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop" className="btn-luxury">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-playfair font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-background p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-playfair font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-playfair font-bold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select State</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="delhi">Delhi</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="gujarat">Gujarat</option>
                      {/* Add more states */}
                    </select>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="PIN code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-playfair font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-border cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <CreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 border border-border cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded text-xs flex items-center justify-center font-bold">U</span>
                    <span>UPI</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 border border-border cursor-pointer hover:bg-muted">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <Truck className="h-5 w-5" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-luxury text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Complete Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-background p-6 lg:p-8 h-fit">
            <h2 className="text-xl font-playfair font-bold mb-6">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.size} • {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg pt-6">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Shield className="h-4 w-4" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over ₹5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;