import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SEO } from './SEO';

const servicesData = {
  '360-marketing': {
    title: 'Full-Funnel 360° Digital Marketing Solutions USA',
    subtitle: 'Data-driven campaign strategies, omni-channel acquisition, and brand acceleration engineered for high growth.',
    overview: 'At AMS Crafters, our 360 marketing methodology bridges every customer touchpoint — from social performance and search acquisition to conversion optimization and lifecycle retention. We craft holistic, measurable marketing engines that turn curiosity into revenue for American brands.',
    features: [
      { title: 'Omni-Channel Campaign Strategy', desc: 'Cohesive multi-platform messaging across search, paid social, display, and email marketing.' },
      { title: 'High-Converting Paid Media', desc: 'Precision targeting across Google Ads, Meta, TikTok, and LinkedIn with ROI-focused bidding.' },
      { title: 'Brand Storytelling & Creative Direction', desc: 'Persuasive copywriting and thumb-stopping visual assets that captivate audiences.' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Frictionless landing page design, A/B testing, and behavioral funnel optimization.' },
      { title: 'Advanced Analytics & Attribution', desc: 'Granular attribution tracking, real-time ROI dashboards, and revenue modeling.' },
      { title: 'Lifecycle Email & SMS Marketing', desc: 'Automated nurture workflows, segment retention, and customer lifetime value expansion.' }
    ],
    banner: '/services/360-marketing.webp'
  },
  'website-design': {
    title: 'Award-Winning Custom Website Design & UI/UX',
    subtitle: 'Bespoke, high-converting digital storefronts and web platforms designed to outshine competitors.',
    overview: "Your website is your brand's digital flagship. AMS Crafters architects cutting-edge, mobile-first web experiences combining jaw-dropping aesthetics, lightning performance, and conversion-optimized architectures.",
    features: [
      { title: 'Custom UI/UX Design System', desc: 'Tailored visual hierarchy, interactive prototypes, and atomic design systems tailored to your brand.' },
      { title: 'Responsive Front-End Engineering', desc: 'Flawless mobile, tablet, and desktop performance built on modern React and CSS frameworks.' },
      { title: '3D & Micro-Interactions', desc: 'Immersive animations, sleek micro-interactions, and visual depth that keeps visitors engaged.' },
      { title: 'CMS & Headless Architecture', desc: 'Scalable content management integrations with Next.js, React, and custom headless CMSs.' },
      { title: 'Performance & Core Web Vitals', desc: 'Sub-second page speeds, clean code architecture, and 95+ Google PageSpeed performance scores.' },
      { title: 'Conversion Architecture', desc: 'Strategic user journeys, clear value propositions, and frictionless lead capture forms.' }
    ],
    banner: '/services/website-design.webp'
  },
  'mobile-app': {
    title: 'Enterprise Mobile App Development (iOS & Android)',
    subtitle: 'Scalable, native and cross-platform mobile apps built for engagement and retention.',
    overview: 'From disruptive startup MVPs to enterprise mobile ecosystems, AMS Crafters delivers high-performance mobile applications on iOS and Android engineered with sleek UX, seamless offline capabilities, and secure cloud integrations.',
    features: [
      { title: 'Native iOS & Android Apps', desc: 'High-performance applications built specifically for each platform using Swift, Kotlin, or React Native.' },
      { title: 'Cross-Platform Solutions', desc: 'Single codebase applications that run seamlessly on both iOS and Android devices.' },
      { title: 'UI/UX Mobile Design', desc: 'Intuitive, user-friendly interfaces designed specifically for mobile interactions and gestures.' },
      { title: 'App Integration & APIs', desc: 'Seamless integration with existing systems, cloud databases, and third-party services.' },
      { title: 'Real-Time Sync & Offline Storage', desc: 'Reliable offline database sync ensuring continuous user productivity without connection drops.' },
      { title: 'App Store Optimization (ASO)', desc: 'Complete deployment to the Apple App Store and Google Play Store with top ranking optimization.' }
    ],
    banner: '/services/app-development.webp'
  },
  'app-development': {
    title: 'Enterprise Mobile App Development (iOS & Android)',
    subtitle: 'Scalable, native and cross-platform mobile apps built for engagement and retention.',
    overview: 'From disruptive startup MVPs to enterprise mobile ecosystems, AMS Crafters delivers high-performance mobile applications on iOS and Android engineered with sleek UX, seamless offline capabilities, and secure cloud integrations.',
    features: [
      { title: 'Native iOS & Android Apps', desc: 'High-performance applications built specifically for each platform using Swift, Kotlin, or React Native.' },
      { title: 'Cross-Platform Solutions', desc: 'Single codebase applications that run seamlessly on both iOS and Android devices.' },
      { title: 'UI/UX Mobile Design', desc: 'Intuitive, user-friendly interfaces designed specifically for mobile interactions and gestures.' },
      { title: 'App Integration & APIs', desc: 'Seamless integration with existing systems, cloud databases, and third-party services.' },
      { title: 'Real-Time Sync & Offline Storage', desc: 'Reliable offline database sync ensuring continuous user productivity without connection drops.' },
      { title: 'App Store Optimization (ASO)', desc: 'Complete deployment to the Apple App Store and Google Play Store with top ranking optimization.' }
    ],
    banner: '/services/app-development.webp'
  },
  'software-development': {
    title: 'Custom Software Engineering & Cloud SaaS Platforms',
    subtitle: 'Robust, scalable enterprise software solutions tailored to complex business workflows.',
    overview: 'AMS Crafters builds mission-critical custom software, bespoke SaaS applications, and automated internal platforms that solve intricate business challenges, automate operational bottlenecks, and scale with high transaction volumes.',
    features: [
      { title: 'Custom SaaS Architecture', desc: 'Multi-tenant SaaS architectures with automated billing, licensing, and security built for US enterprises.' },
      { title: 'API & Microservices Engineering', desc: 'High-throughput RESTful and GraphQL APIs built for maximum reliability and low latency.' },
      { title: 'Database Design & Optimization', desc: 'High-performance SQL and NoSQL database schemas engineered for massive throughput and safety.' },
      { title: 'Enterprise Security & Compliance', desc: 'Role-based access controls, SOC2/GDPR compliance frameworks, and state-of-the-art encryption.' },
      { title: 'Cloud Infrastructure & DevOps', desc: 'Docker, Kubernetes, AWS/GCP cloud deployments with CI/CD automation and 99.9% uptime.' },
      { title: 'Legacy System Modernization', desc: 'Seamless migration from legacy monolithic systems into agile, modern cloud stacks.' }
    ],
    banner: '/services/software-development.webp'
  },
  'seo': {
    title: 'Professional Search Engine Optimization (SEO) USA',
    subtitle: 'Dominate Google search results and drive qualified organic revenue across US markets.',
    overview: 'We do not just chase vanity keyword rankings; we drive qualified revenue. AMS Crafters deploys data-backed organic search campaigns covering technical audits, authoritative link equity, and intent-driven content strategies that turn search engines into your #1 lead channel.',
    features: [
      { title: 'High-Intent Keyword Intelligence', desc: 'Deep competitor gap analysis, search intent mapping, and US buyer journey targeting.' },
      { title: 'Technical SEO & Core Web Vitals', desc: 'Crawling audits, schema markup implementation, indexation fixes, and speed acceleration.' },
      { title: 'On-Page Content Authority', desc: 'High-converting landing page optimization, keyword clustering, and editorial content.' },
      { title: 'High-Authority Link Building', desc: 'White-hat digital PR, editorial citations, and domain authority elevation.' },
      { title: 'Local & Nationwide US SEO', desc: 'Google Business Profile optimization, localized landing pages, and geo-targeted rankings.' },
      { title: 'Transparent Analytics & Reporting', desc: 'Real-time keyword tracking, conversion attribution, and monthly strategic insights.' }
    ],
    banner: '/services/seo.webp'
  },
  'branding': {
    title: 'Strategic Brand Identity & Creative Direction',
    subtitle: 'Unforgettable brand identities that command premium value and resonate with your audience.',
    overview: 'A powerful brand is the foundation of every thriving business. AMS Crafters distills your vision into an iconic brand identity — from distinctive logo design and color psychology to comprehensive typography guidelines and brand voice.',
    features: [
      { title: 'Distinctive Logo Design', desc: 'Versatile primary, secondary, and sub-mark logos crafted for digital and print perfection.' },
      { title: 'Brand Strategy & Positioning', desc: 'Core brand mission, value propositions, competitive positioning, and unique voice.' },
      { title: 'Typography & Color Systems', desc: 'Scientifically chosen color palettes and accessible typographic hierarchy.' },
      { title: 'Comprehensive Brand Guidelines', desc: 'Complete brand book detailing rules, spacing, tone, and visual standards for consistency.' },
      { title: 'Digital & Print Brand Collateral', desc: 'Business cards, stationery, pitch decks, merchandise, and social media kits.' },
      { title: 'Brand Evolution & Rebranding', desc: 'Modernizing established brands while retaining core legacy equity and customer loyalty.' }
    ],
    banner: '/services/branding.webp'
  },
  'graphic-design': {
    title: 'High-Impact Graphic Design & Visual Media',
    subtitle: 'Visual storytelling that stops the scroll, captivates users, and accelerates conversions.',
    overview: 'From high-converting social media creatives and digital ad sets to premium packaging and marketing collateral, our graphic design team delivers visually striking assets that turn passive viewers into active customers.',
    features: [
      { title: 'Social Media Content Suites', desc: 'Engaging carousel posts, reels graphics, stories, and platform-optimized visual assets.' },
      { title: 'Digital Advertising Creatives', desc: 'High-CTR banner ads, display banners, and promotional campaign artwork for ad networks.' },
      { title: 'Marketing Collateral & Print', desc: 'Brochures, flyers, trade show booths, catalogs, and pitch presentation decks.' },
      { title: 'Infographics & Visual Data', desc: 'Transforming complex business data into intuitive, shareable visual graphics.' },
      { title: 'Vector Illustrations & Iconography', desc: 'Custom branded icon sets and digital illustrations unique to your brand.' },
      { title: 'Rapid Creative Turnaround', desc: 'Agile design sprints ensuring your campaigns launch on schedule without quality loss.' }
    ],
    banner: '/services/graphic-design.webp'
  },
  'product-photography': {
    title: 'High-End E-Commerce & Product Photography',
    subtitle: 'Crisp, studio-grade product imagery and lifestyle visuals that maximize online sales.',
    overview: 'High-quality product photos build immediate consumer trust and drive purchase decisions. AMS Crafters creates crystal-clear studio captures, 360-degree product showcases, and inspiring lifestyle imagery engineered to elevate e-commerce conversion rates.',
    features: [
      { title: 'Studio White Background Photography', desc: 'Amazon, Shopify, and e-commerce compliant pristine product captures with pure white infinity.' },
      { title: 'Contextual Lifestyle Photography', desc: 'Real-world environment shoots showcasing your products in aspirational, daily use.' },
      { title: '360° Interactive Product Views', desc: 'Interactive rotating photography providing customers full visual confidence before buying.' },
      { title: 'Ghost Mannequin & Apparel', desc: 'Professional fashion, apparel, and accessory photography with realistic dimensional depth.' },
      { title: 'High-End Retouching & Color Grading', desc: 'Dust removal, reflections correction, color accuracy, and composite enhancement.' },
      { title: 'Multi-Platform Export Packages', desc: 'Optimized image dimensions for web, mobile, social, and print packaging.' }
    ],
    banner: '/services/product-photography.webp'
  },
  'crm-solutions': {
    title: 'Smart CRM Systems & Automation Solutions',
    subtitle: 'Streamline sales funnels, automate customer touchpoints, and unlock revenue growth.',
    overview: 'Stop losing leads to disconnected spreadsheets and manual follow-ups. AMS Crafters architects tailored CRM ecosystems and sales automations that empower your team to close deals faster and nurture long-term customer relationships.',
    features: [
      { title: 'Custom CRM Architecture & Setup', desc: 'Tailored pipelines, custom lead scoring, and automated task workflows built for your sales cycle.' },
      { title: 'Sales Pipeline Automation', desc: 'Automated follow-ups, deal stage triggers, and team productivity tracking.' },
      { title: 'Omnichannel Customer Analytics', desc: 'Deep 360-degree customer profiles with lifetime value, communication records, and engagement history.' },
      { title: 'Third-Party Tool Integrations', desc: 'Native integrations with HubSpot, Salesforce, Zoho, Zapier, and custom proprietary APIs.' },
      { title: 'Automated Email & SMS Sequences', desc: 'Behavior-triggered communication sequences that re-engage dormant prospects effortlessly.' },
      { title: 'Legacy CRM Data Migration', desc: 'Zero-downtime data migration with full field mapping and record validation guaranteed.' }
    ],
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426'
  },
  'shopify': {
    title: 'Professional Shopify & Shopify Plus Development',
    subtitle: 'Custom Shopify storefronts engineered for high conversions and rapid scaling.',
    overview: "Whether you're launching a direct-to-consumer brand or migrating an enterprise catalog, AMS Crafters builds custom, lightning-fast Shopify stores with tailored Liquid code, custom app integrations, and conversion-optimized checkouts.",
    features: [
      { title: 'Custom Shopify Theme Engineering', desc: '100% bespoke Liquid themes built for rapid speed and unique brand identity.' },
      { title: 'Shopify Plus Enterprise Scalability', desc: 'Custom checkout extensibility, B2B wholesale portals, and internationalization.' },
      { title: 'Painless Platform Migration', desc: 'Zero-downtime migration from Magento, WooCommerce, or BigCommerce with SEO protection.' },
      { title: 'Custom Shopify App Development', desc: 'Bespoke backend functionality, inventory synchronization, and custom API integrations.' },
      { title: 'Mobile Commerce Optimization', desc: 'Frictionless one-click mobile checkout, Apple Pay, and Google Pay integrations.' },
      { title: 'High-Performance Conversion Audits', desc: 'Speed optimization, UX audits, cart abandonment reduction, and A/B testing.' }
    ],
    banner: 'https://images.unsplash.com/photo-1664278488344-9844bb5f0d8e?q=80&w=2070'
  },
  'ecommerce': {
    title: 'Advanced E-Commerce Platforms & Headless Commerce',
    subtitle: 'High-performance online shopping experiences built to maximize customer lifetime value.',
    overview: 'From headless commerce architectures to tailored multi-vendor marketplaces, AMS Crafters develops scalable e-commerce platforms engineered with rapid load times, frictionless checkouts, and enterprise-grade security.',
    features: [
      { title: 'Headless Commerce Architecture', desc: 'Decoupled frontends with Next.js/React delivering instant sub-second page transitions.' },
      { title: 'Secure Payment Gateway Integrations', desc: 'Stripe, PayPal, Authorize.Net, and multi-currency international checkouts.' },
      { title: 'Advanced Inventory & Catalog Management', desc: 'Automated stock tracking, multi-warehouse routing, and product variants.' },
      { title: 'Conversion-Optimized UX & Cart Funnels', desc: 'Streamlined one-step checkouts, smart upsells, and cart recovery triggers.' },
      { title: 'Omnichannel Order Fulfillment', desc: 'Integration with ShipStation, 3PL providers, and automated ERP workflows.' },
      { title: 'Rigorous Quality & Security Audits', desc: 'PCI-DSS compliance testing, load testing, and automated security monitoring.' }
    ],
    banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950'
  },
  'social-media-marketing': {
    title: 'Data-Driven Social Media Marketing & Paid Growth',
    subtitle: 'Transform followers into loyal customers with high-converting social campaigns.',
    overview: 'Build an engaged community and scale your customer acquisition through viral content strategies, high-ROAS paid ads, and continuous community engagement across Instagram, LinkedIn, TikTok, and YouTube.',
    features: [
      { title: 'Strategic Content Creation & Curation', desc: 'Custom video reels, carousels, and high-impact visual narratives.' },
      { title: 'High-ROAS Paid Social Advertising', desc: 'Precision ad campaigns on Meta Ads, TikTok Ads, and LinkedIn Campaign Manager.' },
      { title: 'Active Community Management', desc: 'Prompt responses, active engagement, and brand reputation management.' },
      { title: 'Influencer & Creator Partnerships', desc: 'Vetted creator collaborations that drive authentic word-of-mouth momentum.' },
      { title: 'Multi-Platform Growth Strategy', desc: 'Tailored content cadences for B2B LinkedIn vs. D2C TikTok and Instagram.' },
      { title: 'Performance Analytics & Attribution', desc: 'In-depth weekly tracking on engagement, click-through rates, and customer acquisition cost.' }
    ],
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974'
  }
};

export const ServiceDetailPage = () => {
  const { id } = useParams();
  const [customService, setCustomService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch custom thumbnail or details if updated from admin
    if (id) {
      getDoc(doc(db, 'services', id))
        .then(snap => {
          if (snap.exists()) {
            setCustomService(snap.data());
          }
        })
        .catch(err => console.warn("Could not fetch custom service details:", err));
    }
  }, [id]);

  const service = servicesData[id];

  if (!service) {
    return (
      <div style={{ padding: '140px 24px', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Service Not Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>
          The service you are looking for does not exist or may have been moved.
        </p>
        <Link to="/services" className="sp-btn-primary" style={{ display: 'inline-flex' }}>
          Explore All Services
        </Link>
      </div>
    );
  }

  const activeBanner = customService?.thumbnail || service.banner;

  return (
    <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <SEO 
        title={`${customService?.title || service.title} | AMS Crafters USA`}
        description={`${(customService?.desc || service.overview).substring(0, 155)}... Top-tier digital solutions for American businesses.`}
        keywords={`${customService?.title || service.title}, digital agency USA, top developers US, AMS Crafters United States`}
        path={`/services/${id}`}
      />
      
      {/* Hero Banner Section */}
      <div style={{ width: '100%', minHeight: '65vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' }}>
        <img 
          src={activeBanner} 
          alt={customService?.title || service.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 1 }} 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426';
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, rgba(9,13,21,0.7) 50%, rgba(9,13,21,0.85) 100%)', zIndex: 2 }}></div>
        
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '140px 24px 0 24px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px', color: 'var(--muted)' }}>
            <Link to="/services" style={{ color: '#4fa3d8', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </div>

          <div className="sp-badge-pill" style={{ marginBottom: '16px' }}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">USA Service Specialization</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', margin: '0 0 16px 0', letterSpacing: '-1.5px', lineHeight: 1.1, color: 'var(--fg)', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
            {service.title}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', color: 'rgba(255,255,255,0.85)', maxWidth: '780px', margin: '0 0 28px 0', lineHeight: 1.5, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {service.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/consultation" className="sp-btn-primary" style={{ display: 'inline-flex' }}>
              Book Free Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '6px' }}><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </Link>
            <Link to="/contact" className="sp-btn-secondary" style={{ display: 'inline-flex' }}>
              Request Proposal
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', minWidth: '280px' }}>
          <div className="sp-badge-pill" style={{ marginBottom: '12px' }}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">Strategic Overview</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1px', margin: '0 0 16px 0' }}>How We Deliver Impact</h2>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #3180b2, #4fa3d8)', borderRadius: '2px' }}></div>
        </div>
        <div style={{ flex: '2', minWidth: '280px' }}>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
            {service.overview}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 100px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="sp-badge-pill-center" style={{ margin: '0 auto 16px' }}>
            <span className="sp-dot"></span>
            Deliverables & Capabilities
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-1px', margin: 0 }}>
            What We <span className="text-gradient">Deliver</span>
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {service.features.map((feat, i) => (
            <div 
              key={i} 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--border)', 
                padding: '36px 28px', 
                borderRadius: '18px', 
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(79, 163, 216, 0.4)';
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{ width: '44px', height: '44px', background: 'rgba(49, 128, 178, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4fa3d8' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '19px', margin: '8px 0 0 0', fontWeight: 700 }}>{feat.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          background: 'radial-gradient(ellipse at center, rgba(49,128,178,0.18) 0%, rgba(9,13,21,0.95) 75%)', 
          border: '1px solid rgba(49, 128, 178, 0.35)', 
          padding: '60px 32px', 
          borderRadius: '24px', 
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px', letterSpacing: '-1px' }}>
            Ready to Accelerate Your <span className="text-gradient">Growth?</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', maxWidth: '620px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            Connect with our US strategy team today to review your project scope, discover custom solutions, and receive a comprehensive roadmap.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/consultation" className="sp-btn-primary" style={{ display: 'inline-flex', padding: '14px 28px' }}>
              Book Free Strategy Session
            </Link>
            <Link to="/packages" className="sp-btn-secondary" style={{ display: 'inline-flex', padding: '14px 28px' }}>
              View Pricing Packages
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
