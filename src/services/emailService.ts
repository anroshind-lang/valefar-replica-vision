import emailjs from 'emailjs-com';

// TODO: Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID  
const EMAILJS_USER_ID = 'YOUR_USER_ID'; // Replace with your EmailJS User ID

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
    // Demo mode: Simulate successful email sending
    console.log('Demo mode: Simulating email send...');
    console.log('Order confirmation email would be sent to:', orderData.customerEmail);
    console.log('Order details:', orderData);
    
    // Simulate email processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Demo email sent successfully!');
    return { 
      success: true, 
      result: { 
        status: 200, 
        text: 'Demo email sent successfully',
        demo: true 
      } 
    };
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