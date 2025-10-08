import { X } from 'lucide-react';

interface LegalPageProps {
  page: 'privacy' | 'terms' | 'shipping' | 'returns';
  onClose: () => void;
}

export default function LegalPage({ page, onClose }: LegalPageProps) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'January 1, 2025',
      sections: [
        {
          heading: 'Information We Collect',
          content: `We collect information that you provide directly to us, including:
• Name, email address, phone number, and shipping address when you place an order
• Payment information processed securely through our payment processor
• Communication preferences and correspondence with our customer service team
• Information about your purchases and customization preferences`
        },
        {
          heading: 'How We Use Your Information',
          content: `We use the information we collect to:
• Process and fulfill your orders
• Communicate with you about your orders, products, and services
• Send you promotional communications (with your consent)
• Improve our products and services
• Comply with legal obligations`
        },
        {
          heading: 'Information Sharing',
          content: `We do not sell your personal information. We may share your information with:
• Service providers who help us operate our business (shipping, payment processing)
• Legal authorities when required by law
• Business partners with your explicit consent`
        },
        {
          heading: 'Data Security',
          content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`
        },
        {
          heading: 'Your Rights',
          content: `You have the right to:
• Access and receive a copy of your personal data
• Correct inaccurate or incomplete data
• Request deletion of your data
• Opt-out of marketing communications
• Lodge a complaint with a supervisory authority`
        },
        {
          heading: 'Cookies',
          content: `We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.`
        },
        {
          heading: 'Contact Us',
          content: `If you have questions about this Privacy Policy, please contact us at privacy@garysstore.net`
        }
      ]
    },
    terms: {
      title: 'Terms and Conditions',
      lastUpdated: 'January 1, 2025',
      sections: [
        {
          heading: 'Acceptance of Terms',
          content: `By accessing and using garysstore.net, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.`
        },
        {
          heading: 'Use of Website',
          content: `You may use our website for lawful purposes only. You agree not to:
• Use the site in any way that violates applicable laws or regulations
• Attempt to gain unauthorized access to our systems
• Interfere with the proper functioning of the website
• Transmit any harmful code or malware`
        },
        {
          heading: 'Product Information',
          content: `We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Custom tailored items are made to your specifications and may vary from standard sizing.`
        },
        {
          heading: 'Orders and Payment',
          content: `All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be received in full before we begin production of custom items. Prices are subject to change without notice.`
        },
        {
          heading: 'Custom Orders',
          content: `Custom tailored items are made specifically for you based on measurements and preferences you provide. Due to their custom nature, these items cannot be returned or exchanged unless there is a manufacturing defect or error on our part.`
        },
        {
          heading: 'Intellectual Property',
          content: `All content on this website, including text, graphics, logos, and images, is the property of Gary's Store and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.`
        },
        {
          heading: 'Limitation of Liability',
          content: `To the fullest extent permitted by law, Gary's Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.`
        },
        {
          heading: 'Governing Law',
          content: `These Terms and Conditions are governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved in the courts of the United States.`
        },
        {
          heading: 'Changes to Terms',
          content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of modified terms.`
        }
      ]
    },
    shipping: {
      title: 'Shipping Policy',
      lastUpdated: 'January 1, 2025',
      sections: [
        {
          heading: 'Processing Time',
          content: `Custom tailored items require time to create:
• Standard items: 2-4 weeks for production
• Complex customizations: 4-6 weeks for production
• Rush orders: Available for an additional fee (contact us for availability)

Processing time begins after we receive your measurements and complete order information.`
        },
        {
          heading: 'Shipping Methods',
          content: `We offer several shipping options:
• Standard Shipping: 5-7 business days ($15)
• Express Shipping: 2-3 business days ($35)
• Overnight Shipping: 1 business day ($65)

Shipping times are estimates and begin after production is complete.`
        },
        {
          heading: 'Domestic Shipping',
          content: `We ship to all 50 United States, including Alaska and Hawaii. PO Boxes are accepted for most items. Additional charges may apply for Alaska and Hawaii.`
        },
        {
          heading: 'International Shipping',
          content: `International shipping is available to select countries. Rates vary by destination. Customers are responsible for all customs duties, taxes, and fees. Delivery times vary by location and customs processing.`
        },
        {
          heading: 'Order Tracking',
          content: `Once your order ships, you will receive a tracking number via email. You can track your package through the carrier's website.`
        },
        {
          heading: 'Lost or Damaged Items',
          content: `If your package appears lost or damaged, please contact us immediately. We will work with the shipping carrier to resolve the issue. We may require photos of damaged items and packaging.`
        },
        {
          heading: 'Address Changes',
          content: `Please ensure your shipping address is correct before completing your order. We cannot change the address once the order has shipped. Contact us immediately if you need to update your address before shipment.`
        }
      ]
    },
    returns: {
      title: 'Returns and Refund Policy',
      lastUpdated: 'January 1, 2025',
      sections: [
        {
          heading: 'Custom Items',
          content: `Due to the custom nature of our tailored clothing, custom orders are generally not eligible for return or exchange. Each piece is made specifically for you based on your measurements and specifications.`
        },
        {
          heading: 'Manufacturing Defects',
          content: `If your custom item has a manufacturing defect or does not match your approved specifications, please contact us within 7 days of receipt. We will:
• Repair the item at no charge
• Remake the item to correct specifications
• Issue a full refund

Photos and detailed description of the issue are required.`
        },
        {
          heading: 'Standard Items',
          content: `Non-custom, standard-sized items may be returned within 30 days of receipt if:
• Item is unworn and in original condition with tags attached
• Original packaging is included
• You provide proof of purchase

Refunds will be issued to the original payment method within 5-10 business days of receiving the returned item.`
        },
        {
          heading: 'Return Process',
          content: `To initiate a return:
1. Contact our customer service team at returns@garysstore.net
2. Provide your order number and reason for return
3. Receive return authorization and shipping instructions
4. Ship the item using a trackable shipping method

Customers are responsible for return shipping costs unless the return is due to our error.`
        },
        {
          heading: 'Exchanges',
          content: `We do not offer direct exchanges. If you need a different size or style, please return the original item for a refund and place a new order.`
        },
        {
          heading: 'Non-Returnable Items',
          content: `The following items cannot be returned:
• Custom tailored items without manufacturing defects
• Items marked as final sale
• Gift cards
• Items damaged due to misuse or neglect`
        },
        {
          heading: 'Refund Processing',
          content: `Refunds are processed within 5-10 business days of receiving and inspecting the returned item. Original shipping charges are non-refundable. If you received free shipping, the actual shipping cost will be deducted from your refund.`
        },
        {
          heading: 'Contact Us',
          content: `For questions about returns or refunds, please contact us at returns@garysstore.net or call our customer service team.`
        }
      ]
    }
  };

  const pageContent = content[page];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageContent.title}</h1>
              <p className="text-sm text-gray-600 mt-1">Last Updated: {pageContent.lastUpdated}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {pageContent.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              For questions or concerns, please contact us at support@garysstore.net
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
