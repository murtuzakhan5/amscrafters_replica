import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Reviews } from './Reviews';
import { usePopup } from './PopupContext';
import './contact.css';
import './components.css';

export const Packages = () => {
  const [activeTab, setActiveTab] = useState('webdesign');
  const [activeCardId, setActiveCardId] = useState(null);
  const { showAlert } = usePopup();

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'categories'));
        setCategoriesList(snapshot.docs.map(doc => doc.data().name));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        isRead: false,
        createdAt: serverTimestamp()
      });
      showAlert('Thank you! Your inquiry has been submitted successfully.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form: ", error);
      showAlert('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'logo', label: 'Logo Design' },
    { id: 'webdesign', label: 'Web Design' },
    { id: 'ecommerce', label: 'Ecommerce' },
    { id: 'branding', label: 'Branding' },
    { id: 'animation', label: 'Video Animation' },
    { id: 'seo', label: 'SEO' },
    { id: 'socialmedia', label: 'Social Media Marketing' },
    { id: 'combo', label: 'Combo Packages' }
  ];

  const packagesData = {
    logo: [
      {
        id: 'startup-logo',
        title: 'Startup logo',
        price: '$59',
        oldPrice: '$120',
        popular: false,
        features: [
          '3 Custom Logo Design Concepts',
          'By 2 Designers',
          'LIMITED Revisions',
          '24 Hours TAT',
          'Rush Delivery Available (Extra Charges)',
          'Vector Formats (PSD, EPS, PNG, GIF, JPG, PDF)',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'professional-logo',
        title: 'Professional logo',
        price: '$120',
        oldPrice: '$240',
        popular: true,
        features: [
          '6 Logo Design Concepts',
          '4 Dedicated Designers',
          'UNLIMITED Revisions',
          '24 Hours TAT',
          'Business Card Design (complementary)',
          'Letterhead Design (complementary)',
          'Envelope Design (complementary)',
          'Vector Formats (PSD, EPS, PNG, GIF, JPG, PDF)',
          'Rush Delivery Available',
          'Satisfaction Guaranteed',
          'Unique Design Guaranteed',
          'Money Back Guarantee*'
        ]
      },
      {
        id: 'business-logo',
        title: 'Business logo',
        price: '$250',
        oldPrice: '$500',
        popular: false,
        features: [
          'UNLIMITED Logo Design Concepts',
          'By 8 Award Winning Designers',
          'UNLIMITED Revisions',
          '2 Stationary Design Sets (Business Card, Letterhead, Envelope)',
          '24 Hours TAT',
          'Icon Design (complementary)',
          'MS Word Letterhead (complementary)',
          'Email Signature (complementary)',
          'All Final Files Format (AI, PSD, EPS, PNG, GIF, JPG, PDF)',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      }
    ],
    webdesign: [
      {
        id: 'startup-web',
        title: 'Startup Website Package',
        price: '$249',
        oldPrice: '$499',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '5 Page Website',
          '5 Stock Photos',
          '3 Banner Design',
          '1 jQuery Slider Banner',
          'FREE Google Friendly Sitemap',
          'Complete W3C Certified HTML',
          '48 to 72 hours TAT',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *',
          'Mobile Responsive will be Additional $99*',
          'CMS will be Additional $149*'
        ]
      },
      {
        id: 'professional-web',
        title: 'Professional Website Package',
        price: '$599',
        oldPrice: '$1199',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '10 Unique Pages Website',
          'CMS / Admin Panel Support',
          '8 Stock images',
          '5 Banner Designs',
          '1 jQuery Slider Banner',
          'FREE Google Friendly Sitemap',
          'Complete W3C Certified HTML',
          '48 to 72 hours TAT',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          'Complete Deployment',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *',
          'Mobile Responsive will be Additional $99*'
        ]
      },
      {
        id: 'elite-web',
        title: 'Elite Website Package',
        price: '$999',
        oldPrice: '$1999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Upto 15 Unique Pages Website',
          'Conceptual and Dynamic Website',
          'Mobile Responsive',
          'Online Reservation/Appointment Tool (Optional)',
          'Online Payment Integration (Optional)',
          'Custom Forms',
          'Lead Capturing Forms (Optional)',
          'Striking Hover Effects',
          'Newsfeed Integration',
          'Social Media Integration',
          'Search Engine Submission',
          '5 Stock Photos',
          '3 Unique Banner Design',
          '1 jQuery Slider Banner',
          'Complete W3C Certified HTML',
          '48 to 72 hours TAT',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          'Complete Deployment',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'silver-web',
        title: 'Silver Website Package',
        price: '$1599',
        oldPrice: '$3199',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '15 to 20 Pages Website',
          'Custom Made, Interactive, Dynamic & High End Design',
          'Custom WP (or) Custom PHP Development',
          '1 jQuery Slider Banner',
          'Up to 10 Custom Made Banner Designs',
          '10 Stock Images',
          'Unlimited Revisions',
          'Special Hoover Effects',
          'Content Management System (CMS)',
          'Online Appointment/Scheduling/Online Ordering Integration (Optional)',
          'Online Payment Integration (Optional)',
          'Multi Lingual (Optional)',
          'Custom Dynamic Forms (Optional)',
          'Signup Area (For Newsletters, Offers etc.)',
          'Search Bar',
          'Live Feeds of Social Networks integration (Optional)',
          'Mobile Responsive',
          'Free Google Friendly Sitemap',
          'Search Engine Submission',
          'Complete W3C Certified HTML',
          'Industry Specified Team of Expert Designers and Developers',
          'Complete Deployment',
          'Dedicated Accounts Manager',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'business-web',
        title: 'Business Website Package',
        price: '$2499',
        oldPrice: '$4999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '20 to 25 Pages Website',
          'Custom Made, Interactive, Dynamic & High End Design',
          'Custom WP (or) Custom PHP Development',
          '1 jQuery Slider Banner',
          'Up to 10 Custom Made Banner Designs',
          '10 Stock Images',
          'Unlimited Revisions',
          'Special Hoover Effects',
          'Content Management System (CMS)',
          'Online Appointment/Scheduling/Online Ordering Integration (Optional)',
          'Online Payment Integration (Optional)',
          'Multi Lingual (Optional)',
          'Custom Dynamic Forms (Optional)',
          'Signup Area (For Newsletters, Offers etc.)',
          'Search Bar',
          'Live Feeds of Social Networks integration (Optional)',
          'Mobile Responsive',
          '15 Seconds 2D Explainer Video',
          'Voice - Over & Sound Effects',
          'Professional Script Writing',
          'Storyboard',
          'SEO Meta Tags',
          'Free Google Friendly Sitemap',
          'Search Engine Submission',
          'Complete W3C Certified HTML',
          'Industry Specified Team of Expert Designers and Developers',
          'Complete Deployment',
          'Dedicated Accounts Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'crm-portal-web',
        title: 'Custom CRM Portal Website Package',
        price: '$6999',
        oldPrice: '$14000',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Page Website',
          'Unique Pages and UI Design',
          'Complete Custom Development',
          'Newsfeed Integration',
          'CRM (Customer Relation Management System)',
          'Performance and analytics',
          'Customization of Personal Details',
          'Process management',
          'Sales Automation',
          'Team Collaboration',
          'Marketing Automation',
          'Security',
          'Integrations',
          'Sales Reports',
          'Trend Analytics',
          'Forecasting',
          'Territory Management',
          'Account Management',
          'Event Integration',
          'Advanced Data Security',
          'Opportunity Management',
          'Sales Forecasting',
          'Quotes',
          'Contracts',
          'Document Library',
          'Case Management',
          'Analytics and Dashboards',
          'Lead Management',
          'Resource Management',
          'Analytics',
          'Web Intelligence',
          'Automated Emails, Invoices & Estimates',
          'Automated Split invoicing',
          'Automated Combine invoices',
          'Invoice templates',
          'Financial Reports',
          'Generate automated sales reports',
          'Core Features',
          'Reporting',
          'Accounting',
          'Tracking and Visibility',
          'Centralized Modules',
          'Human Resources Management',
          'Business Process Management',
          'Enterprise Analytics',
          'Business Intelligence',
          'Centralized Modules',
          'Accounting',
          'Distribution',
          'Insights',
          'Standardization',
          'Procurement',
          'Reporting and Analytics',
          'Projection',
          'Enterprise-wide integration',
          'Real-Time Operations',
          'Problem definition',
          'Description of the program’s objectives and scope',
          'Assumptions',
          'Implementation costs',
          'Implementation schedule',
          'Development and operational risks',
          'Projected benefits',
          'Team Members',
          'Contracts',
          'Infrastructure Upgrades',
          'Create work plans and timelines',
          'Analyze gaps',
          'Configure parameters',
          'Migrate data',
          'Test system',
          'Document system',
          'Online Payment Solutions (optional)',
          'Advanced Admin Features 2.0',
          'User Signup/Login Functionalities',
          'Advanced User Features',
          'User Profile Management',
          'General Configuration Features',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          'Money Back Guarantee'
        ]
      }
    ],
    ecommerce: [
      {
        id: 'beginners-ecom',
        title: 'Beginners E-Commerce Package',
        price: '$999',
        oldPrice: '$1999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Upto 10 Unique Pages Website',
          'Conceptual and Dynamic Website',
          'Content Management System (CMS)',
          'Mobile Responsive',
          'Easy Product Search',
          'Product Reviews',
          'Up To 50 Products',
          'Up To 5 Categories',
          'Full Shopping Cart Integration',
          'Payment Module Integration',
          'Sales & Inventory Management',
          'Jquery Slider',
          'Free Google Friendly Sitemap',
          'Custom Email Addresses (Optional)',
          'Complete W3C Certified HTML',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          'Complete Deployment',
          'Dedicated Accounts Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee'
        ]
      },
      {
        id: 'corporate-ecom',
        title: 'Corporate E-Commerce Package',
        price: '$1799',
        oldPrice: '$3599',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Unique Pages Website',
          'Conceptual and Dynamic Website',
          'Content Management System (CMS)',
          'Mobile Responsive',
          'Up To 100 Products',
          'Up To 10 Categories',
          'Easy Product Search',
          'Product Reviews',
          'Full Shopping Cart Integration',
          'Payment Module Integration',
          'Sales & Inventory Management',
          'Jquery Slider',
          'Free Google Friendly Sitemap',
          'Custom Email Addresses',
          'Complete W3C Certified HTML',
          'Facebook Page Design (Optional)',
          'Twitter Page Design (Optional)',
          'Youtube Channel Setup (Optional)',
          'Instagram Page Design (Optional)',
          'Complete Deployment',
          'Dedicated Accounts Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee'
        ]
      },
      {
        id: 'elite-ecom',
        title: 'Elite E-Commerce Package',
        price: '$3694',
        oldPrice: '$7388',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'UNLIMITED Logo Design Concepts',
          'By 6 Award Winning Designers',
          'Icon Design',
          'UNLIMITED Revisions',
          'Print Media',
          'Stationary Design (BusinessCard,Letterhead & Envelope)',
          'Invoice Design, Email Signature',
          'Bi-Fold Brochure (OR) 2 Sided Flyer Design',
          'Product Catalog Design',
          'Sign age Design (OR) Label Design',
          'T-Shirt Design (OR) Car Wrap Design',
          'Unlimited Unique Pages Website',
          'E-Commerce Store Design',
          'Product Detail Page Design',
          'Unique Banner Slider',
          'Featured Products Showcase',
          'Full Shopping Cart Integration',
          'Up To 150 Products',
          'Up To 15 Categories',
          'Product Rating & Reviews',
          'Easy Product Search',
          'Payment Gateway Integration',
          'Multi-currency Support',
          'Content Management System',
          'Cutomer Log-in Area',
          'Mobile Responsive',
          'Social Media Plugins Integration',
          'Tell a Friend Feature',
          'Social Media Pages (Facebook, Twitter, YouTube, Pinterest)',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'custom-marketplace',
        title: 'Custom E Commerce Marketplace Package',
        price: '$6999',
        oldPrice: '$14000',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Page Website',
          'Unique Pages and UI Design',
          'Complete Custom Development',
          'Up To 200 Products',
          'Up To 20 Categories',
          'Newsfeed Integration',
          'Social Media Plugins Integration',
          'Advanced Ecommerce Marketplace Features',
          'Inventory Management',
          'CRM System',
          'Advanced Admin Features 2.0',
          'Advanced User Features',
          'Dashboard and Analytics',
          'Seller/Shipping Distribution',
          'Seller Profile Management',
          'User Profile Management',
          'General Configuration Features',
          'Revenue Models',
          'Featured products',
          'Google advertisements',
          'Flash sales Module',
          'Loyalty Rewards Module',
          'Upto 40 Stock images',
          '10 Unique Banner Designs',
          'JQuery Slider',
          'Search Engine Submission',
          'Free Google Friendly Sitemap',
          'Social Media Page Designs',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          'Money Back Guarantee'
        ]
      },
      {
        id: 'automated-ecom',
        title: 'Automated / Interactive E-Commerce Package',
        price: '$9999',
        oldPrice: '$19998',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Page Website',
          'Custom Content Management System (CMS)',
          'Unique Pages and UI Design',
          'Complete Custom Development',
          'Process Automation Tools',
          'Newsfeed Integration',
          'Social Media Plugins Integration',
          'Upto 40 Stock images',
          '10 Unique Banner Designs',
          'JQuery Slider',
          'Search Engine Submission',
          'Free Google Friendly Sitemap',
          'Custom Email Addresses',
          'Social Media Page Designs',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          'Money Back Guarantee',
          'Automated Inventory/Shipping/Supplier Module',
          'Suppliers & Shipper Integration',
          'Order management',
          'Stock Management & Actionable Insights',
          'Automated Invoices & Barcode Scanning',
          'Customer Accounts & Purchase Orders'
        ]
      },
      {
        id: 'crm-erp-portal',
        title: 'Custom CRM/ERP Portal Website Package',
        price: '$15000',
        oldPrice: '$30000',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Page Website',
          'Unique Pages and UI Design',
          'Complete Custom Development',
          'Newsfeed Integration',
          'CRM (Customer Relation Management System)',
          'Performance and analytics',
          'Customization of Personal Details',
          'Process management',
          'Sales Automation & Team Collaboration',
          'Marketing Automation & Security',
          'Sales Reports, Trend Analytics & Forecasting',
          'Advanced Admin Features 2.0',
          '100% Ownership & Money Back Guarantee'
        ]
      }
    ],
    branding: [
      {
        id: 'startup-collateral',
        title: 'Startup Collateral Packages',
        price: '$59',
        oldPrice: '$99',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '3 Stationery Design Set',
          'FREE Fax Template',
          'Print Ready Formats',
          'UNLIMITED Revisions',
          '100% Satisfaction Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'collateral-classic',
        title: 'Collateral Classic Packages',
        price: '$129',
        oldPrice: '$259',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '5 Stationery Design Set',
          'UNLIMITED Revisions',
          'Flyer Design (Optional)',
          'Brochure Design (Bi-fold/Tri-fold) (Optional)',
          '100% Satisfaction Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'premium-collateral',
        title: 'Premium Collateral Packages',
        price: '$199',
        oldPrice: '$399',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '6 Stationery Design Set',
          'Packaging Design',
          'Brochure Design (Bi-fold/Tri-fold)',
          'UNLIMITED Revisions',
          'T-Shirt Design',
          '100% Satisfaction Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'unlimited-collateral',
        title: 'Unlimited Collateral Packages',
        price: '$249',
        oldPrice: '$499',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '8 Stationery Design Set',
          'Menu Card Design',
          'Brochure Design (Bi-fold/Tri-fold)',
          'T-Shirt Design',
          '1 Banner Design',
          '100% Satisfaction Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'complete-branding',
        title: 'Complete Branding Solution',
        price: '$994',
        oldPrice: '$1989',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Custom Logo Design Concepts',
          '6 Dedicated Designers',
          'Upto 10 Pages Website',
          'Mobile Responsive',
          'Icon Design',
          'Business Card, Letterhead, Envelope',
          'MS Word Letterhead',
          '5 Stock Photos + 3 Banner Designs',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          'Facebook Page Design',
          'All Final File Formats',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee'
        ]
      }
    ],
    animation: [
      {
        id: 'startup-video',
        title: 'Startup Video Package',
        price: '$499',
        oldPrice: '$999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '30s Duration',
          'Premium Script Writer',
          'Storyboard Design',
          'Hand drawn illustrations',
          'Animation effects & visualization',
          'Music And Foley',
          'Voice Over All Accents',
          'Unlimited Revisions',
          '4 weeks delivery',
          'Sample themes',
          'Dedicated account manager'
        ]
      },
      {
        id: 'delux-video',
        title: 'Delux Video Package',
        price: '$899',
        oldPrice: '$1798',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '60s Duration - HD 1080',
          'Premium Script Writer',
          'Storyboard Design',
          'Hand drawn illustrations',
          'Animation effects & visualization',
          'Music And Foley',
          'Voice Over All Accents',
          'Unlimited Revisions',
          '4 weeks delivery',
          'Sample themes',
          'Dedicated account manager'
        ]
      },
      {
        id: 'platinum-video',
        title: 'Platinum Video Package',
        price: '$1199',
        oldPrice: '$2398',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '90s Duration - HD 1080',
          'Premium Script Writer',
          'Storyboard Design',
          'Hand drawn illustrations',
          'Animation effects & visualization',
          'Music And Foley',
          'Voice Over All Accents',
          'Unlimited Revisions',
          '6 weeks delivery',
          'Sample themes',
          'Dedicated account manager'
        ]
      },
      {
        id: 'diamond-video',
        title: 'Diamond Video Package',
        price: '$1399',
        oldPrice: '$2798',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '120s Duration - HD 1080',
          'Premium Script Writer',
          'Storyboard Design',
          'Hand drawn illustrations',
          'Character Animation',
          '2D Design Elements',
          'Animation effects & visualization',
          'Music And Foley',
          'Voice Over All Accents',
          'Unlimited Revisions',
          '5 weeks delivery',
          'Sample themes',
          'Dedicated account manager'
        ]
      },
      {
        id: 'startup-3d',
        title: 'Startup 3D Animation',
        price: '$1799',
        oldPrice: '$3598',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '30s Duration - HD 1080',
          'Unlimited Edits/Revisions & Concepts',
          'Premium Script Writer',
          'Custom visuals concept storyboard',
          '3D Modeling',
          'Rigging/Texturing',
          'Animation',
          'Lighting',
          'Camera Setting',
          'Rendering',
          'Compositing and Special VFX',
          'Music and Foley',
          'Custom Setting, Character & Graphics',
          'Voice Over - All accents (M/F)',
          'Dedicated account manager'
        ]
      },
      {
        id: 'advance-3d',
        title: 'Advance 3D Animation',
        price: '$2199',
        oldPrice: '$4398',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '60s Duration - HD 1080',
          'Unlimited Edits/Revisions & Concepts',
          'Professional Script',
          'Custom visuals concept storyboard',
          '3D Modeling',
          'Broadcast quality production values',
          'Rigging/Texturing',
          'Animation',
          'Lighting',
          'Camera Setting',
          'Rendering',
          'Compositing and Special VFX',
          'Music and Foley',
          'Custom Setting, 2 Characters & Graphics',
          'Voice Over - All accents (M/F)',
          'Dedicated account manager'
        ]
      }
    ],
    seo: [
      {
        id: 'startup-seo',
        title: 'Startup SEO Packages',
        price: '$449/ Month',
        oldPrice: '$898',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '5 Keywords',
          'Guaranteed Ranking on Google',
          'Off-site Optimization',
          'Link Building',
          'Social Bookmarking',
          'Basic Analytical Report',
          'In-depth Site Analysis',
          'Content Duplicity Check',
          'Initial Backlinks analysis',
          'Google Penalty Check',
          'Mobile Usability Check',
          'Competition Analysis',
          'Keyword Research',
          'NAP Syndication',
          'Google My Business / Bing Local Listing',
          'Citation Building',
          'Classified Submissions',
          'Google Analytics Analysis Report',
          'SEO Reports',
          'Search Engine Rank Report',
          'Dedicated Accounts Manager',
          'Monthly Action Plan',
          'Activity Report'
        ]
      },
      {
        id: 'identity-seo',
        title: 'Identity SEO Package',
        price: '$849/ Month',
        oldPrice: '$1698',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '10 - 20 Keywords',
          'Guaranteed Ranking on Google',
          'Off-site Optimization',
          'On-site Optimization',
          'Link Building',
          'Social Bookmarking',
          'In-depth Site Analysis',
          'Content Duplicacy Check',
          'Initial Backlinks analysis',
          'Google Penalty Check',
          'Mobile Usability Check',
          'Competition Analysis',
          'Keyword Research',
          'Title & Meta Tags Optimization',
          'Content Optimization',
          'Page Speed Analysis & Optimization',
          'HTML Code Cleanup & Optimization',
          'Internal Link Structuring & Optimization',
          'Pages H tags Optimization',
          'Canonicalization/301 Redirect',
          'Website Page Load Optimization',
          'Schema Markup Implementation',
          'Image & Hyperlink Optimization',
          'Robots.txt Creation/Analysis',
          'Blog Writing (2 - Per Month)',
          'Informational Content Writing & Sharing (1 Per Month)',
          'Press Release Writing & Distribution',
          'Press Release Social Bookmarking',
          'Google Webmaster Tools Setup',
          'Google Analytics Setup & Integration'
        ]
      },
      {
        id: 'elite-seo',
        title: 'Elite SEO Packages',
        price: '$1549/ Month',
        oldPrice: '$3098',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '30 - 50 Keywords',
          'Guaranteed Ranking on Google',
          'Off-site Optimization',
          'On-site Optimization',
          'Link Building',
          'Social Bookmarking',
          'In-depth Site Analysis',
          'Content Duplicacy Check',
          'Initial Backlinks analysis',
          'Google Penalty Check',
          'Mobile Usability Check',
          'Competition Analysis',
          'Keyword Research',
          'Page Speed Analysis & Optimization',
          'Title & Meta Tags Optimization',
          'Content Optimization',
          'HTML Code Cleanup & Optimization',
          'Internal Link Structuring & Optimization',
          'Pages H tags Optimization',
          'Canonicalization/301 Redirect',
          'Website Page Load Optimization',
          'Robots.txt Creation/Analysis',
          'Press Release Writing & Distribution',
          'Press Release Social Bookmarking',
          'Schema Markup Implementation',
          'Image & Hyperlink Optimization',
          'Google Webmaster Tools Setup',
          'Google Analytics Setup & Integration',
          'Blog Writing (2 - Per Month)',
          'Informational Content Writing & Sharing (1 Per Month)'
        ]
      },
      {
        id: 'professional-seo',
        title: 'Professional SEO Packages',
        price: '$2149/ Month',
        oldPrice: '$4298',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '50 - 100 Keywords',
          'Guaranteed Ranking on Google',
          'Off-site Optimization',
          'On-site Optimization',
          'Link Building',
          'Social Bookmarking',
          'In-depth Site Analysis',
          'Content Duplicacy Check',
          'Initial Backlinks analysis',
          'Google Penalty Check',
          'Mobile Usability Check',
          'Competition Analysis',
          'Keyword Research',
          'Page Speed Analysis & Optimization',
          'Title & Meta Tags Optimization',
          'Content Optimization',
          'HTML Code Cleanup & Optimization',
          'Internal Link Structuring & Optimization',
          'Pages H tags Optimization',
          'Canonicalization/301 Redirect',
          'Website Page Load Optimization',
          'Robots.txt Creation/Analysis',
          'Press Release Writing & Distribution',
          'Press Release Social Bookmarking',
          'Schema Markup Implementation',
          'Image & Hyperlink Optimization',
          'Google Webmaster Tools Setup',
          'Google Analytics Setup & Integration',
          'Blog Writing (4 - Per Month)',
          'Informational Content Writing & Sharing (2 Per Month)'
        ]
      }
    ],
    socialmedia: [
      {
        id: 'silver-marketing',
        title: 'Silver Marketing Package',
        price: '$499/ Month',
        oldPrice: '$699',
        popular: false,
        features: [
          '2 Social Media Channels (Facebook / Instagram)',
          '2 postings per week (per network)',
          '1 Cover Picture',
          'Social Account Setup',
          'Business Page Optimization',
          'Social Media Strategy',
          'Increase in followers (Organic)',
          'Account Management',
          'Monthly Progress report',
          'No Setup Fee',
          'Cancel any time'
        ]
      },
      {
        id: 'gold-marketing',
        title: 'Gold Marketing Package',
        price: '$999/ Month',
        oldPrice: '$1500',
        popular: true,
        features: [
          '2 Social Media Channels (Facebook / Instagram)',
          'Social media account setup',
          'Complete Account Management',
          '4 Posts per week (per network)',
          '2 videos/reels in a month',
          'Custom Editorial calendar (Review before publishing)',
          'Dedicated account manager',
          'Dedicated Budget For Paid Advertising (TBD)'
        ]
      },
      {
        id: 'platinum-marketing',
        title: 'Platinum Marketing Package',
        price: '$2500/ Month',
        oldPrice: '$3500',
        popular: false,
        features: [
          '4 Social Media Channels (Facebook / Twitter / Pinterest / Instagram)',
          'Social media account setup',
          'Complete Account Management',
          '12 Posts per week (per network)',
          '4 videos/reels in a month',
          'Custom Editorial calendar (Review before publishing)',
          'Call to Action Integration',
          'End of Term Report',
          'Dedicated Account Manager',
          'Dedicated Budget For Paid Advertising'
        ]
      }
    ],
    combo: [
      {
        id: 'basic-combo',
        title: 'Basic Combo Packages',
        price: '$449',
        oldPrice: '$898',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          '5 Custom Logo Design Concepts',
          'By 2 Designers',
          'Icon Design',
          'Business Card, Letterhead, Envelope, Fax Template',
          'MS Word Letterhead',
          '5 Page Website',
          'Mobile Responsive',
          'Team of Expert Designers & Developers',
          '8 Stock images',
          '5 Banner Designs',
          'jQuery Sliders',
          'Free Google Friendly Sitemap',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          'Facebook Page Design',
          'Twitter Page Design',
          'Youtube Channel Setup',
          'All Final File Formats',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'startup-combo',
        title: 'Startup Combo Package',
        price: '$999',
        oldPrice: '$1999',
        popular: true,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Logo Design Concepts',
          'Social Media Design',
          'Mobile Responsive',
          '3 Dedicated Designers',
          'Icon Design',
          'Business Card, Letterhead, Envelope',
          'MS Word Letterhead',
          'UNLIMITED Pages Website',
          'Content Management System (CMS)',
          '5 Stock Photos + 3 Banner Designs',
          'Complete W3C Certified HTML',
          'Complete Deployment',
          'Facebook Page Design',
          'Twitter Page Design',
          'Youtube Channel Setup',
          'All Final File Formats',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'professional-combo',
        title: 'Professional Combo Packages',
        price: '$1399',
        oldPrice: '$2799',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Logo Concepts',
          '8 Dedicated Designers',
          'Icon Design',
          '2 Free Custom Stationary Designs',
          'MS Word Letterhead',
          'Trifold Brochure Design',
          'Presentation Folder Design',
          'Conceptual and Dynamic Liquid Website',
          'Team of Expert Designers & Developers',
          'Mobile Responsive',
          'Online Reservation/Appointment Tool (Optional)',
          'Custom Forms',
          'Lead Capturing Forms (Optional)',
          'Newsfeed Integration',
          'Social Media Integration',
          'Search Engine Submission',
          '15 Stock images',
          '8 Unique Banner Designs',
          'jQuery Sliders',
          'Free Google Friendly Sitemap',
          'Complete W3C Certified HTML',
          'Facebook Page Design',
          'Twitter Page Design',
          'Youtube Channel Setup',
          'Google+ Page Design',
          'All Final File Formats',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'corporate-combo',
        title: 'Corporate Combo Packages',
        price: '$1999',
        oldPrice: '$3999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Unlimited Logo Concepts',
          '8 Dedicated Designers',
          'Icon Design',
          '2 Free Custom Stationary Designs',
          'MS Word Letterhead',
          'Invoice Design',
          'Product Catalog Design',
          'Unlimited Pages Website',
          'Conceptual and Dynamic Website',
          'Content Management System (CMS)',
          'Easy Product Search',
          'Product Reviews',
          'Unlimited Products',
          'Unlimited Categories',
          'Promotional Product Showcase',
          'New Product Showcase',
          'Full Shopping Cart Integration',
          'Payment Module Integration',
          'Sales & Inventory Management',
          'Custom Forms',
          'Lead Capturing Forms (Optional)',
          'Newsfeed Integration',
          'Social Media Integration',
          'Search Engine Submission',
          'Team of Dedicated Designers, Developers and Brand Experts',
          '20 Stock images',
          '6 Unique Banner Designs',
          'jQuery Slider',
          'Free Google Friendly Sitemap',
          'Complete W3C Certified HTML',
          'Facebook Page Design',
          'Twitter Page Design',
          'Youtube Channel Setup',
          'Google+ Page Design',
          'Pinterest Page Design',
          'All Final File Formats',
          'Dedicated Account Manager',
          '100% Ownership Rights',
          '100% Satisfaction Guarantee',
          '100% Unique Design Guarantee',
          '100% Money Back Guarantee *'
        ]
      },
      {
        id: 'elite-combo',
        title: 'Elite Combo Packages',
        price: '$2999',
        oldPrice: '$5999',
        popular: false,
        addOn: 'ADD ON : $500 for 24 hours rush delivery',
        features: [
          'Complete Custom Design & Development',
          'Client/User Dashboard Area',
          'Custom Coding',
          'Custom PHP Development',
          'Content Management System (CMS)',
          'Online Appointment/Scheduling/Online Ordering Integration (Optional)',
          'Online Payment Integration (Optional)',
          'Multi Lingual (Optional)',
          'Custom Dynamic Forms (Optional)',
          'Signup Area (For Newsletters, Offers etc.)',
          'Search Bar',
          'Live Feeds of Social Networks integration (Optional)',
          'Mobile Responsive Web',
          'Search Engine Submission',
          'Module-wise Architecture',
          'Extensive Admin Panel',
          'Award Winning Team of Expert Designers and Developers',
          'Complete Deployment',
          'Facebook Page Design',
          'Twitter Page Design',
          'Youtube Channel Setup',
          '100% Custom Designs - No Templates',
          '100% Satisfaction Guarantee'
        ]
      }
    ]
  };

  const currentPackages = packagesData[activeTab] || [];

  return (
    <div className="packages-page" style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Boxed Animated Hero Banner */}
      <div className="hero-section" style={{ minHeight: '440px', paddingTop: '130px', paddingBottom: '60px' }}>
        <div className="hero-glow"></div>
        
        {/* Animated Grid Lines */}
        <div className="animated-line-h" style={{ top: '100px', animation: 'moveRight 7s linear infinite' }}></div>
        <div className="animated-line-h" style={{ top: '240px', animation: 'moveRight 9s linear infinite 3s' }}></div>
        <div className="animated-line-v" style={{ left: '250px', animation: 'moveDown 6s linear infinite 0.5s' }}></div>
        <div className="animated-line-v" style={{ left: '550px', animation: 'moveDown 10s linear infinite 4s' }}></div>

        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Cost Effective Solutions</span>
          </div>
          
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', letterSpacing: '-1.5px', marginBottom: '16px' }}>
            GET THE MOST AFFORDABLE <br className="desktop-only" />
            <span className="text-gradient">DESIGN &amp; DEVELOPMENT PACKAGES</span>
          </h1>
          
          <p className="hero-subtitle" style={{ maxWidth: '680px', margin: '0 auto 24px', fontSize: '16px' }}>
            We bring to you cost effective, professional design and development packages tailored to give your business an international digital presence.
          </p>
        </div>
      </div>

      {/* Main Packages Section */}
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px' }}>
        
        {/* Category Tabs Pill Bar */}
        <div 
          className="packages-tabs-wrapper" 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '56px',
            padding: '10px',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setActiveCardId(null);
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '14px',
                border: 'none',
                background: activeTab === cat.id ? 'linear-gradient(135deg, #3180b2, #1d5375)' : 'transparent',
                color: activeTab === cat.id ? '#ffffff' : 'var(--muted)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === cat.id ? '0 6px 20px rgba(49, 128, 178, 0.35)' : 'none'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Package Cards Grid - Uniform Height for ALL Cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', 
            gap: '32px',
            alignItems: 'stretch'
          }}
        >
          {currentPackages.map((pkg) => {
            const isFeatured = pkg.popular;
            const isActive = activeCardId === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setActiveCardId(pkg.id)}
                className={`package-card-item ${isFeatured ? 'featured-card' : ''} ${isActive ? 'active-card' : ''}`}
              >
                {isFeatured && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '24px',
                      background: 'linear-gradient(135deg, #a855f7, #7e22ce)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      padding: '5px 16px',
                      borderRadius: '99px',
                      boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    BEST SELLER
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.5px' }}>
                    {pkg.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
                    <span className="price-subtext" style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>Starting at</span>
                    <span className="price-amount" style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1.5px' }}>
                      {pkg.price}
                    </span>
                    {pkg.oldPrice && (
                      <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '18px', fontWeight: 600 }}>
                        {pkg.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Scrollable Features List Container (Strictly 5-6 visible points, scroll down for rest) */}
                  <div className="package-features-scroll">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="feat-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', lineHeight: 1.5 }}>
                          <span className="point-bullet-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {pkg.addOn && (
                    <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {pkg.addOn}
                    </p>
                  )}

                  <Link
                    to="/consultation"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      padding: '14px 20px',
                      borderRadius: '14px',
                      background: 'var(--fg)',
                      color: 'var(--bg)',
                      fontWeight: 800,
                      fontSize: '15px',
                      textDecoration: 'none',
                      marginBottom: '16px',
                      transition: 'transform 0.2s ease, opacity 0.2s ease'
                    }}
                  >
                    Buy Now
                  </Link>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px', fontSize: '12px' }}>
                    <Link to="/contact" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>
                      Share your idea?
                    </Link>
                    <Link to="/consultation" style={{ color: '#3180b2', textDecoration: 'none', fontWeight: 700 }}>
                      Want to discuss? Live Chat Now &rarr;
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Testimonials Section (With Marquee Scroll Animation) */}
      <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <Reviews compact={false} />
      </div>

      {/* Replica Contact Form Section (Matching User Reference Image - Brand Blue Theme) */}
      <div style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border)', padding: '70px 24px 90px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Heading & CTA */}
          <div>
            <div style={{ display: 'inline-block', fontSize: '14px', fontWeight: 700, color: 'var(--fg)', borderBottom: '2px solid #3180b2', paddingBottom: '4px', marginBottom: '24px', letterSpacing: '0.05em' }}>
              Let's Create Together
            </div>
            
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: '32px', color: 'var(--fg)' }}>
              Planning to build websites for a better return on investments?
            </h2>

            <Link
              to="/consultation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000000',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 700,
                padding: '14px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease, opacity 0.2s ease'
              }}
            >
              Let's Chat
            </Link>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ background: 'var(--bg)', padding: '36px 32px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '24px', color: 'var(--fg)' }}>
              Tell Us More About It!
            </h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                  required
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter Email / Address"
                  required
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  required
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                >
                  <option value="" disabled>Select Services</option>
                  {categoriesList.length > 0 ? (
                    categoriesList.map(c => <option key={c} value={c}>{c}</option>)
                  ) : (
                    <option value="Web Design">Web Design</option>
                  )}
                  <option value="Other">Other</option>
                </select>
              </div>

              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Message Here"
                required
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--fg)', fontSize: '14px', outline: 'none', resize: 'vertical' }}
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                style={{
                  alignSelf: 'flex-start',
                  background: 'linear-gradient(135deg, #3180b2, #1d5375)',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '12px 36px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'opacity 0.2s ease'
                }}
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};
