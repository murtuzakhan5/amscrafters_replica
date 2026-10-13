import { useEffect } from 'react';

export const SEO = ({
  title = "AMS Crafters | Top Digital Agency & Software Solutions USA",
  description = "AMS Crafters is a premier full-service digital agency in the USA specializing in 360 marketing, custom web design, mobile apps, software development, and brand strategy for growing businesses.",
  keywords = "digital agency USA, top web design company United States, custom software development US, 360 marketing agency USA, mobile app development America, branding agency, UI UX design studio USA",
  path = "",
  schema = null
}) => {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${path}`;

    // Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'author', 'AMS Crafters');
    
    // US Geo-Targeting Tags (Explicitly for USA search)
    setMetaTag('name', 'geo.region', 'US');
    setMetaTag('name', 'geo.placename', 'United States');
    setMetaTag('name', 'language', 'English');
    setMetaTag('name', 'rating', 'General');

    // OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'AMS Crafters');
    setMetaTag('property', 'og:locale', 'en_US');
    setMetaTag('property', 'og:image', `${baseUrl}/cta-vr-man.png`);

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', `${baseUrl}/cta-vr-man.png`);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Schema.org Structured Data
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "AMS Crafters",
      "image": `${baseUrl}/cta-vr-man.png`,
      "url": fullUrl,
      "telephone": "+1 9198085526",
      "email": "support@amscrafters.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "421 Fayetteville St, Suite 1100",
        "addressLocality": "Raleigh",
        "addressRegion": "NC",
        "postalCode": "27601",
        "addressCountry": "US"
      },
      "priceRange": "$$",
      "description": description,
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "knowsAbout": [
        "Web Design & Development",
        "Mobile App Development",
        "360 Marketing Strategy",
        "Brand Identity Design",
        "Custom Software Engineering",
        "Search Engine Optimization (SEO)"
      ]
    };

    const activeSchema = schema || defaultSchema;
    let schemaScript = document.getElementById('seo-json-ld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-json-ld';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(activeSchema);

  }, [title, description, keywords, path, schema]);

  return null;
};
