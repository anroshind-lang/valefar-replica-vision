// Razorpay Payment Integration Service

// TODO: Replace with your actual Razorpay Test Key
const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_HERE'; // Replace with your Razorpay Test Key ID

interface PaymentOptions {
  amount: number; // Amount in paisa (multiply by 100)
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initiateRazorpayPayment = async (
  options: PaymentOptions,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
) => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Razorpay options
    const razorpayOptions = {
      key: RAZORPAY_KEY_ID,
      amount: options.amount * 100, // Convert to paisa
      currency: options.currency,
      name: 'Valefar',
      description: `Order #${options.orderId}`,
      order_id: options.orderId, // This should be created from your backend
      handler: (response: RazorpayResponse) => {
        console.log('Payment successful:', response);
        onSuccess(response);
      },
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerPhone,
      },
      notes: {
        address: options.customerAddress,
      },
      theme: {
        color: '#000000', // Valefar brand color
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal closed');
        },
      },
    };

    // Create and open Razorpay payment modal
    const razorpay = new window.Razorpay(razorpayOptions);
    
    razorpay.on('payment.failed', (response: any) => {
      console.error('Payment failed:', response.error);
      onError(response.error);
    });

    razorpay.open();
  } catch (error) {
    console.error('Error initiating payment:', error);
    onError(error);
  }
};

// Generate a simple order ID (in production, this should come from your backend)
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `VALEFAR_${timestamp}_${random}`;
};

/* 
TODO: Razorpay Setup Instructions

1. Sign up at https://razorpay.com/
2. Go to Dashboard > Settings > API Keys
3. Generate Test API Keys (Key ID and Key Secret)
4. Replace RAZORPAY_KEY_ID above with your actual Test Key ID
5. For production, replace with Live API Keys

Note: In a production app, you should:
- Create orders from your backend using Razorpay Orders API
- Verify payment signatures on your backend
- Store order details in your database
- Handle webhooks for payment status updates

For now, we're using a simplified test integration.
*/