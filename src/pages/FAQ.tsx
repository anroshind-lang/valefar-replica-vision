import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData: FAQItem[] = [
    {
      question: "What makes Valefar different from other streetwear brands?",
      answer: "Valefar combines luxury craftsmanship with street culture authenticity. We use only premium materials, employ skilled artisans, and focus on limited collections rather than mass production. Each piece is designed to be both a fashion statement and a long-lasting investment.",
      category: "brand"
    },
    {
      question: "How do I determine my size?",
      answer: "We recommend checking our detailed size guide available on each product page. Our sizing tends to run slightly oversized for that authentic streetwear fit. If you're between sizes, we suggest sizing down for a more fitted look or sizing up for an oversized aesthetic.",
      category: "sizing"
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a 30-day return window for unworn items with original tags. Exchanges are free within India, and we also accept returns for store credit. Items must be in original condition with all packaging and tags attached.",
      category: "returns"
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping within India takes 3-7 business days. Express shipping (1-3 business days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination country.",
      category: "shipping"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International shipping costs and delivery times vary by destination. All international orders may be subject to customs duties and taxes, which are the responsibility of the customer.",
      category: "shipping"
    },
    {
      question: "Are your products sustainably made?",
      answer: "Sustainability is core to our brand values. We use organic and recycled materials whenever possible, work with ethical manufacturers, and focus on creating timeless pieces that won't quickly go out of style. We're constantly working to improve our environmental impact.",
      category: "sustainability"
    },
    {
      question: "How should I care for my Valefar products?",
      answer: "Each product comes with specific care instructions on the label. Generally, we recommend washing in cold water, air drying, and avoiding harsh chemicals. For premium pieces, consider dry cleaning to maintain the best quality and longevity.",
      category: "care"
    },
    {
      question: "Do you restock sold-out items?",
      answer: "Some items may be restocked depending on popularity and material availability. However, many of our pieces are limited edition and won't be reproduced. We recommend signing up for restock notifications on product pages or following our newsletter for updates.",
      category: "inventory"
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's progress. You can also check your order status by logging into your account on our website.",
      category: "shipping"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, UPI, and various digital wallets. All payments are processed securely through encrypted checkout systems.",
      category: "payment"
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer a 10% student discount. Verify your student status through our partner verification service during checkout. The discount can be applied to most regular-priced items (exclusions may apply during sales).",
      category: "discounts"
    },
    {
      question: "How can I collaborate with Valefar?",
      answer: "We're always open to collaborations with artists, designers, and influencers who align with our brand values. Please reach out through our contact page with your proposal, portfolio, and collaboration ideas.",
      category: "collaboration"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'brand', name: 'About Brand' },
    { id: 'sizing', name: 'Sizing' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns' },
    { id: 'payment', name: 'Payment' },
    { id: 'care', name: 'Product Care' },
    { id: 'sustainability', name: 'Sustainability' },
  ];

  const filteredFAQs = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground text-center mt-4">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="border border-border">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
              >
                <h3 className="font-medium text-lg pr-4">{item.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center p-8 bg-muted">
          <h2 className="text-2xl font-playfair font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-luxury">
              Contact Support
            </a>
            <a href="mailto:support@valefar.com" className="btn-outline">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;