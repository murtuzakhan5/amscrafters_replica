import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const servicesData = {
  'mobile-app': {
    title: 'Custom Mobile Apps That Drive Growth',
    subtitle: 'Transform your business with powerful, user-friendly mobile applications.',
    overview: 'We create stunning mobile experiences that engage users, streamline operations, and deliver measurable results for your business across iOS and Android platforms.',
    features: [
      { title: 'Native iOS & Android Apps', desc: 'High-performance applications built specifically for each platform using Swift, Kotlin, or React Native.' },
      { title: 'Cross-Platform Solutions', desc: 'Single codebase applications that run seamlessly on both iOS and Android devices.' },
      { title: 'UI/UX Mobile Design', desc: 'Intuitive, user-friendly interfaces designed specifically for mobile interactions and gestures.' },
      { title: 'App Integration', desc: 'Seamless integration with existing systems, APIs, and third-party services.' }
    ],
    banner: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070'
  },
  'crm-solutions': {
    title: 'Smart CRM Systems For Business Growth',
    subtitle: 'Transform customer relationships and drive sales with our custom CRM solutions.',
    overview: 'We build comprehensive CRM systems that streamline your sales process, enhance customer service, and provide valuable insights to grow your business effectively.',
    features: [
      { title: 'Custom CRM Development', desc: 'Tailored CRM solutions designed specifically for your business processes and workflow.' },
      { title: 'Sales Automation', desc: 'Automate repetitive tasks to increase sales team productivity and efficiency.' },
      { title: 'Customer Analytics', desc: 'Deep insights into customer behavior, preferences, and engagement patterns.' },
      { title: 'Integration & Migration', desc: 'Seamlessly integrate with existing tools or migrate from legacy systems.' }
    ],
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426'
  },
  'social-media-marketing': {
    title: 'Social Media Marketing Experts',
    subtitle: 'Transforming Businesses into Brands!',
    overview: 'Boost your brand presence with our expert social media strategies and engagement techniques. We create customized campaigns that drive real results and business growth.',
    features: [
      { title: 'Social Media Excellence', desc: 'Transforming Brands Digitally with high-impact visuals and strategy.' },
      { title: 'Content Strategy & Creation', desc: 'Engaging content tailored for platforms like Facebook, Instagram, and LinkedIn.' },
      { title: 'Community Management', desc: 'Fostering deep connections and managing your audience with rapid response.' },
      { title: 'Paid Advertising', desc: 'Highly targeted ad campaigns engineered to maximize ROI.' }
    ],
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974'
  },
  'shopify': {
    title: 'Professional Shopify Development',
    subtitle: 'Transform Your E-commerce Vision into Reality!',
    overview: 'Build high-converting, scalable Shopify stores that drive sales and grow your business. Our expert developers create stunning e-commerce solutions tailored to your unique needs.',
    features: [
      { title: 'Shopify Store Set-up', desc: 'Our experts will build your Shopify store from scratch and make it up and running in no time.' },
      { title: 'Shopify Migration Services', desc: 'Migrate your existing store to Shopify seamlessly with zero downtime and data preservation.' },
      { title: 'Shopify Integration Service', desc: 'Integrate third-party apps, payment gateways, and shipping providers for enhanced functionality.' },
      { title: 'Shopify SEO', desc: 'Optimize your store for search engines to increase visibility and drive organic traffic.' }
    ],
    banner: 'https://images.unsplash.com/photo-1664278488344-9844bb5f0d8e?q=80&w=2070'
  },
  'ecommerce': {
    title: 'Advanced E-commerce Solutions',
    subtitle: 'Transforming Businesses into Digital Success Stories!',
    overview: 'Build high-converting, scalable e-commerce stores that drive sales and grow your business. Our expert developers create stunning online shopping experiences tailored to your unique needs.',
    features: [
      { title: 'E-Commerce Consulting Services', desc: 'We provide market research, competitor analysis, website analytics, and user experience design.' },
      { title: 'E-Commerce Development Services', desc: 'We help you build a high-performance, user-friendly E-Commerce platform optimized for conversions.' },
      { title: 'E-Commerce Testing Services', desc: 'Ensure your online store functions flawlessly; we offer rigorous testing to guarantee performance.' },
      { title: 'Custom Architecture', desc: 'From Shopify and WooCommerce to advanced headless commerce tailored for larger businesses.' }
    ],
    banner: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950'
  },
  'seo': {
    title: 'Professional SEO Services',
    subtitle: 'Dominate search engine rankings with our comprehensive SEO strategies.',
    overview: 'We help businesses increase organic traffic, generate quality leads, and drive sustainable growth. Focusing on the things that make an impact, we elevate your online visibility.',
    features: [
      { title: 'Keyword & Competitor Analysis', desc: 'In-depth research to target the right audience and outperform competitors.' },
      { title: 'On-Page Optimization', desc: 'Enhancing website structure, content, and metadata to boost organic authority.' },
      { title: 'Link Building', desc: 'Acquiring high-quality backlinks to establish trust and domain authority.' },
      { title: 'Performance Tracking', desc: 'Transparent reporting and continuous adjustments to ensure sustainable growth.' }
    ],
    banner: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074'
  }
};

export const ServiceDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const service = servicesData[id];

  if (!service) {
    return (
      <div style={{ padding: '120px 40px', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '24px' }}>Service Not Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>The service you are looking for does not exist or is currently being updated.</p>
        <Link to="/services" className="sp-btn-secondary" style={{ display: 'inline-flex' }}>Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="sp-wrapper" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Banner Section */}
      <div style={{ width: '100%', height: '70vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={service.banner} 
          alt={service.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)' }}></div>
        
        <div style={{ position: 'absolute', bottom: '80px', left: '40px', right: '40px', maxWidth: '1200px', margin: '0 auto', zIndex: 2 }}>
          <div className="sp-badge-pill" style={{ marginBottom: '16px' }}>
            <span className="sp-dot"></span>
            <span className="sp-badge-text">Service Specialization</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '0 0 16px 0', letterSpacing: '-2px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            {service.title}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: 0, lineHeight: 1.4, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {service.subtitle}
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '40px', letterSpacing: '-1px', margin: '0 0 20px 0' }}>Overview</h2>
          <div style={{ width: '60px', height: '4px', background: '#ff6a00', borderRadius: '2px' }}></div>
        </div>
        <div style={{ flex: '2', minWidth: '300px' }}>
          <p style={{ fontSize: '20px', lineHeight: 1.8, color: 'var(--muted)', margin: 0 }}>
            {service.overview}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 100px auto', padding: '0 40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '40px', textAlign: 'center' }}>What We Deliver</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {service.features.map((feat, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px 32px', borderRadius: '16px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(255,106,0,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#ff6a00' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{feat.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid var(--border)', padding: '60px 40px', borderRadius: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', letterSpacing: '-1px' }}>Ready to scale your business?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px auto' }}>Let's discuss how our {service.title} services can help you achieve your goals faster.</p>
          <Link to="/contact" className="sp-btn-primary" style={{ display: 'inline-flex', padding: '16px 32px', fontSize: '16px' }}>Get in Touch Today</Link>
        </div>
      </div>

    </div>
  );
};
