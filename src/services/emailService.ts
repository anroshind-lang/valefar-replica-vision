import emailjs from 'emailjs-com';

// TODO: Replace these with your actual EmailJS credentials
// Get these from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Your EmailJS Template ID  
const EMAILJS_USER_ID = 'your_user_id_here'; // Your EmailJS Public Key

interface OrderData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  phone: string;
}

export const sendOrderConfirmationEmail = async (orderData: OrderData) => {
  try {
    // Check if EmailJS is properly configured
    if (EMAILJS_SERVICE_ID === 'service_xxxxxxx' || 
        EMAILJS_TEMPLATE_ID === 'template_xxxxxxx' || 
        EMAILJS_USER_ID === 'your_user_id_here') {
      
      // Demo mode: Simulate successful email sending
      console.log('Demo mode: EmailJS not configured with real credentials');
      console.log('Order confirmation email would be sent to:', orderData.customerEmail);
      console.log('To send real emails, configure EmailJS credentials in emailService.ts');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        result: { status: 200, text: 'Demo mode - Configure EmailJS for real emails' } 
      };
    }

    // Real EmailJS integration
    emailjs.init(EMAILJS_USER_ID);

    const templateParams = {
      to_name: orderData.customerName,
      to_email: orderData.customerEmail,
      from_name: 'Valefar',
      order_id: orderData.orderId,
      order_items: orderData.items.map(item => 
        `${item.name} (Qty: ${item.quantity}) - ₹${item.price.toLocaleString()}`
      ).join('\n'),
      total_amount: `₹${orderData.totalAmount.toLocaleString()}`,
      shipping_address: orderData.shippingAddress,
      phone: orderData.phone,
      message: `Thank you for your order! Your order #${orderData.orderId} has been confirmed and will be processed soon.`,
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Error in demo email service:', error);
    return { success: false, error };
  }
};

// TODO: Setup Instructions for EmailJS
/*
1. Go to https://www.emailjs.com/ and create a free account
2. Create a new Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with the following variables:
   - {{to_name}} - Customer name
   - {{order_id}} - Order ID
   - {{order_items}} - List of items
   - {{total_amount}} - Total amount
   - {{shipping_address}} - Shipping address
   - {{phone}} - Phone number
   - {{message}} - Thank you message

4. Get your Service ID, Template ID, and User ID from EmailJS dashboard
5. Replace the placeholders above with your actual IDs

Example Email Template:
Subject: Thanks for your order from Valefar! - Order #{{order_id}}

Dear {{to_name}},

Thank you for your order! Here are your order details:

Order ID: {{order_id}}
Items Ordered:
{{order_items}}

Total Amount: {{total_amount}}
Shipping Address: {{shipping_address}}
Phone: {{phone}}

{{message}}

Best regards,
Valefar Team
*/