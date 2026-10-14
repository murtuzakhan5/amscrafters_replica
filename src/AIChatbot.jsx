import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import './chatbot.css';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Interactive lead form state inside chat
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design',
    preferredTime: '',
    message: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I'm the **AMS Crafters AI Assistant**. How can I help grow your brand today?",
      time: 'Just now',
      showFormAction: false
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping, showLeadForm]);

  // Comprehensive Common-Sense Knowledge Base & NLP Intent Parsing
  const getSmartKnowledgeResponse = (userText) => {
    const text = userText.toLowerCase().trim();

    // 1. EXPLICIT MEETING / BOOKING / HIRE / CALL / CONSULTATION REQUESTS
    // Only trigger lead form when user explicitly intends to book, schedule, talk to a human, or start a project
    const isBookingIntent =
      (text.includes('book') && (text.includes('meet') || text.includes('call') || text.includes('session') || text.includes('appointment') || text.includes('slot'))) ||
      text.includes('schedule') ||
      text.includes('appointment') ||
      text.includes('consultation form') ||
      (text.includes('meeting') && !text.includes('kya') && !text.includes('kaise')) ||
      text.includes('call me') ||
      text.includes('mujhe call') ||
      text.includes('baat karni hai') ||
      text.includes('phone pe baat') ||
      text.includes('talk to human') ||
      text.includes('talk to agent') ||
      text.includes('hire you') ||
      text.includes('hire us') ||
      text.includes('start project') ||
      text.includes('project shuru') ||
      text.includes('project start') ||
      text.includes('deal finalize') ||
      text.includes('kaam karwana hai') ||
      text.includes('website banwani hai') ||
      text.includes('app banwani hai');

    if (isBookingIntent) {
      return {
        reply: "Awesome! We'd love to collaborate on your project. 🚀\n\nI can schedule a **free 1-on-1 strategy consultation** with our senior US digital architects. Please provide your details in the quick form below so our team can reach out at your preferred time:",
        triggerForm: true
      };
    }

    // 2. COMPANY FOUNDING / HISTORY / "KAB BUILD HOI" / "KAB BANI" / "FOUNDED"
    if (
      text.includes('kab build') ||
      text.includes('kab bani') ||
      text.includes('kab start') ||
      text.includes('kab shuru') ||
      text.includes('kab wajood') ||
      text.includes('build hoi') ||
      text.includes('build hui') ||
      text.includes('bani thi') ||
      text.includes('founded') ||
      text.includes('history') ||
      text.includes('established') ||
      text.includes('since when') ||
      text.includes('how old') ||
      text.includes('kab se') ||
      text.includes('started in') ||
      text.includes('when did you start') ||
      text.includes('company background')
    ) {
      return {
        reply: "🏛️ **About AMS Crafters & Our History:**\n\n" +
          "AMS Crafters was founded in **2020** in the United States! 🇺🇸\n\n" +
          "Over the past **5+ years**, we have grown from an elite boutique design lab into a full-service digital engineering, branding, and growth marketing powerhouse. Today, we have successfully completed **500+ client projects** and scaled **50+ active brands** across the United States, United Kingdom, and globally.\n\n" +
          "Our corporate headquarters is located at **421 Fayetteville St, Raleigh, North Carolina, USA** with a regional hub in **New York City**.\n\n" +
          "Would you like to know more about our portfolio, core services, or technologies?",
        triggerForm: false
      };
    }

    // 3. OWNER / FOUNDER / CEO / LEADERSHIP / TEAM STRUCTURE
    if (
      text.includes('owner') ||
      text.includes('founder') ||
      text.includes('ceo') ||
      text.includes('boss') ||
      text.includes('malik') ||
      text.includes('who owns') ||
      text.includes('kiski company') ||
      text.includes('who founded') ||
      text.includes('leadership') ||
      text.includes('team size') ||
      text.includes('kitne log') ||
      text.includes('kitni team')
    ) {
      return {
        reply: "👥 **Leadership & Executive Team:**\n\n" +
          "AMS Crafters is an executive-managed digital agency founded and led by senior technology architects, creative brand directors, and growth strategists with over a decade of collective Silicon Valley and top-tier US agency experience.\n\n" +
          "Our core team consists of **30+ full-time specialists**, including full-stack engineers (React, Node, Python), UI/UX product designers, cloud architects, Google-certified SEO specialists, and performance marketers.\n\n" +
          "Every client project is directly supervised by a dedicated Senior Project Director to guarantee elite craftsmanship and transparent communication.",
        triggerForm: false
      };
    }

    // 4. TECH STACK / LANGUAGES / "KIS LANGUAGE PR BANI HAI" / TOOLS
    if (
      text.includes('kis language') ||
      text.includes('which language') ||
      text.includes('tech stack') ||
      text.includes('technology') ||
      text.includes('technologies') ||
      text.includes('stack') ||
      text.includes('framework') ||
      text.includes('tools') ||
      text.includes('languages') ||
      text.includes('coding')
    ) {
      return {
        reply: "💻 **Our Engineering Tech Stack:**\n\n" +
          "We build exclusively with modern, enterprise-grade technologies — zero bloated site builders or slow templates:\n\n" +
          "• **Frontend:** React 18, Next.js, Vite, TypeScript, Tailwind CSS, Framer Motion\n" +
          "• **Backend & APIs:** Node.js, Express, Python (Django/FastAPI), RESTful & GraphQL\n" +
          "• **Databases & Cloud:** Firebase Firestore, PostgreSQL, MongoDB, AWS, Vercel\n" +
          "• **Mobile Applications:** React Native & Flutter (cross-platform iOS & Android)\n" +
          "• **E-Commerce:** Shopify Plus Liquid, Headless Shopify, WooCommerce, Stripe\n" +
          "• **Design & Prototyping:** Figma, Adobe Creative Cloud, Blender 3D\n\n" +
          "Do you have a specific tech stack requirement for your upcoming project?",
        triggerForm: false
      };
    }

    // 5. LOCATION / ADDRESS / CONTACT DETAILS / OFFICES
    if (
      text.includes('kahan') ||
      text.includes('kaha') ||
      text.includes('location') ||
      text.includes('address') ||
      text.includes('office') ||
      text.includes('headquarter') ||
      text.includes('hq') ||
      text.includes('city') ||
      text.includes('country') ||
      text.includes('usa') ||
      text.includes('phone') ||
      text.includes('number') ||
      text.includes('email') ||
      text.includes('contact')
    ) {
      return {
        reply: "📍 **AMS Crafters US Offices & Contact:**\n\n" +
          "We operate under official US business standards:\n\n" +
          "🏢 **Headquarters:** 421 Fayetteville St, Suite 1100, Raleigh, NC 27601, USA\n" +
          "🏙️ **New York Branch:** 500 7th Ave, 8th Floor, New York, NY 10018, USA\n" +
          "📞 **Direct Phone:** +1 (919) 808-5526\n" +
          "✉️ **Official Support:** support@amscrafters.com\n" +
          "⏰ **Working Hours:** Mon–Fri 9:00 AM – 6:00 PM EST (AI Assistant active 24/7)\n\n" +
          "Feel free to give us a call or shoot us an email anytime!",
        triggerForm: false
      };
    }

    // 6. PRICING / CHARGES / RATES / PACKAGES / "KITNA KHARCHA"
    if (
      text.includes('charge') ||
      text.includes('price') ||
      text.includes('pricing') ||
      text.includes('cost') ||
      text.includes('rate') ||
      text.includes('package') ||
      text.includes('kitna') ||
      text.includes('kitne paise') ||
      text.includes('kharcha') ||
      text.includes('fees') ||
      text.includes('budget') ||
      text.includes('discount') ||
      text.includes('sasta')
    ) {
      return {
        reply: "💰 **Transparent Pricing & Packages:**\n\n" +
          "We believe in high-value, transparent pricing with **0% hidden fees**:\n\n" +
          "• **Brand Identity & Logo:** Starting from **$59** (3 concepts, vectors, 24-48h turnaround)\n" +
          "• **Custom Website Design:** Starting from **$299** (Starter) up to **$699+** (Full Custom Web App)\n" +
          "• **Shopify & E-Commerce Store:** Starting from **$799** (Turnkey store with payment gateways)\n" +
          "• **Mobile App Development:** Starting from **$1,499** (iOS & Android)\n" +
          "• **SEO Growth Monthly Sprint:** Starting from **$399/month** (Rank #1 on Google)\n" +
          "• **360 Digital Marketing:** Starting from **$499/month** (Paid campaigns & social growth)\n\n" +
          "Every project is customized to your exact goals. Would you like a custom estimate tailored to your scope?",
        triggerForm: false
      };
    }

    // 7. SPECIFIC SERVICE: WEB DESIGN / DEVELOPMENT
    if (
      text.includes('web') ||
      text.includes('website') ||
      text.includes('frontend') ||
      text.includes('backend') ||
      text.includes('react') ||
      text.includes('next') ||
      text.includes('landing page')
    ) {
      return {
        reply: "🌐 **Custom Website & Web Application Services:**\n\n" +
          "We build world-class, ultra-fast websites engineered to convert visitors into loyal customers:\n\n" +
          "• Custom UI/UX wireframes & modern Figma designs\n" +
          "• Fast React & Next.js frontend architecture\n" +
          "• 100% mobile, tablet, and ultra-wide desktop responsiveness\n" +
          "• On-page SEO optimization & Core Web Vitals score of 95+\n" +
          "• Seamless CMS integrations & secure payment gateways\n\n" +
          "Packages start at **$299**. Would you like to review sample sites or discuss your project specifications?",
        triggerForm: false
      };
    }

    // 8. SPECIFIC SERVICE: MOBILE APP
    if (
      text.includes('app') ||
      text.includes('mobile') ||
      text.includes('android') ||
      text.includes('ios') ||
      text.includes('flutter') ||
      text.includes('react native')
    ) {
      return {
        reply: "📱 **Mobile App Development (iOS & Android):**\n\n" +
          "From MVP concept to App Store launch, we engineer high-performance mobile apps:\n\n" +
          "• Native & Cross-Platform (React Native & Flutter)\n" +
          "• Intuitive user onboarding & fluid 60fps animations\n" +
          "• Secure cloud backend & offline data sync\n" +
          "• Push notifications, in-app purchases & analytics\n" +
          "• Full submission assistance to Apple App Store & Google Play\n\n" +
          "Tell me about your app idea — what core features are you envisioning?",
        triggerForm: false
      };
    }

    // 9. SPECIFIC SERVICE: SHOPIFY / E-COMMERCE
    if (
      text.includes('shopify') ||
      text.includes('ecommerce') ||
      text.includes('e-commerce') ||
      text.includes('store') ||
      text.includes('dukaan') ||
      text.includes('dropshipping')
    ) {
      return {
        reply: "🛍️ **Shopify & E-Commerce Engineering:**\n\n" +
          "We build high-converting storefronts that drive millions in revenue:\n\n" +
          "• Custom bespoke Shopify Liquid theme development\n" +
          "• Conversion Rate Optimization (CRO) designed product pages\n" +
          "• 1-Click checkout & frictionless upsells\n" +
          "• Multi-currency, Stripe, PayPal & Apple Pay integration\n" +
          "• Inventory & ERP synchronization\n\n" +
          "Turnkey stores start at **$799**. Are you launching a new brand or redesigning an existing store?",
        triggerForm: false
      };
    }

    // 10. SPECIFIC SERVICE: SEO
    if (
      text.includes('seo') ||
      text.includes('ranking') ||
      text.includes('rank') ||
      text.includes('google') ||
      text.includes('search engine') ||
      text.includes('traffic') ||
      text.includes('keywords')
    ) {
      return {
        reply: "📈 **Search Engine Optimization (SEO):**\n\n" +
          "We help your business dominate Google search results in the USA and globally:\n\n" +
          "• Comprehensive technical audits & Core Web Vitals remediation\n" +
          "• High-intent commercial keyword clustering\n" +
          "• Rich schema markup & structured data implementation\n" +
          "• White-hat authoritative US backlink outreach\n" +
          "• Monthly live ROI dashboards & rank tracking\n\n" +
          "Monthly dedicated SEO growth sprints start from **$399/mo**.",
        triggerForm: false
      };
    }

    // 11. SPECIFIC SERVICE: BRANDING & LOGO
    if (
      text.includes('logo') ||
      text.includes('brand') ||
      text.includes('branding') ||
      text.includes('graphic') ||
      text.includes('design') ||
      text.includes('identity')
    ) {
      return {
        reply: "🎨 **Brand Identity & Creative Design:**\n\n" +
          "A premium brand commands premium pricing. Our branding lab delivers:\n\n" +
          "• 3 to 5 unique logo concepts crafted from scratch\n" +
          "• Complete brand guidelines (colors, typography, spacing)\n" +
          "• Business stationary, pitch decks & packaging design\n" +
          "• Complete vector source files (AI, SVG, EPS, PNG, PDF)\n" +
          "• Full commercial copyright ownership transfer\n\n" +
          "Starter identity packages start at just **$59** with a 24-48 hour turnaround!",
        triggerForm: false
      };
    }

    // 12. GENERAL SERVICES OVERVIEW / "KYA KAAM KARTE HO"
    if (
      text.includes('service') ||
      text.includes('kya karte') ||
      text.includes('kya karti') ||
      text.includes('what do you do') ||
      text.includes('kaam') ||
      text.includes('offer') ||
      text.includes('special')
    ) {
      return {
        reply: "🚀 **AMS Crafters Complete Services Suite:**\n\n" +
          "We are a full-service digital agency providing:\n\n" +
          "1. **Custom Web Development & UI/UX** (React, Next.js)\n" +
          "2. **Mobile App Engineering** (iOS & Android Native/Flutter)\n" +
          "3. **Shopify & Custom E-Commerce** (Turnkey high-converting stores)\n" +
          "4. **Custom Software & SaaS** (Enterprise cloud applications)\n" +
          "5. **Search Engine Optimization (SEO)** (Google Top Rankings)\n" +
          "6. **360 Digital Marketing** (Paid Ads, PPC, Growth Campaigns)\n" +
          "7. **Brand Identity & Logo Design** (Complete brand kits)\n" +
          "8. **Graphic Design & Creative Media** (Marketing collateral)\n" +
          "9. **Product Photography** (Studio-grade commercial imagery)\n" +
          "10. **CRM & Business Automation** (Salesforce, HubSpot, Custom APIs)\n\n" +
          "Which of these services are you looking for today?",
        triggerForm: false
      };
    }

    // 13. TIMELINE / DURATION / "KITNA TIME LAGEGA"
    if (
      text.includes('time') ||
      text.includes('duration') ||
      text.includes('delivery') ||
      text.includes('kitne din') ||
      text.includes('kitna time') ||
      text.includes('kab tak') ||
      text.includes('deadline') ||
      text.includes('days') ||
      text.includes('weeks')
    ) {
      return {
        reply: "⏱️ **Turnaround Times & Delivery Milestones:**\n\n" +
          "We follow disciplined, fast-paced sprint cycles:\n\n" +
          "• **Logo & Identity:** 24 to 48 Hours\n" +
          "• **Websites & Landing Pages:** 1 to 3 Weeks\n" +
          "• **Shopify & E-Commerce Stores:** 2 to 4 Weeks\n" +
          "• **Mobile Apps & SaaS Platforms:** 4 to 8 Weeks\n\n" +
          "Need expedited or rush delivery? We offer dedicated sprint accelerators for urgent product launches!",
        triggerForm: false
      };
    }

    // 14. PROCESS / WORKFLOW / "KAISE KAAM KARTE HO"
    if (
      text.includes('process') ||
      text.includes('workflow') ||
      text.includes('kaise kaam') ||
      text.includes('how do you work') ||
      text.includes('steps') ||
      text.includes('procedure')
    ) {
      return {
        reply: "🛠️ **Our 4-Step Agile Delivery Process:**\n\n" +
          "1. **Discovery & Architecture:** We analyze your market goals and build a clear sprint blueprint.\n" +
          "2. **Design & Prototyping:** Interactive Figma prototypes with unlimited revisions.\n" +
          "3. **Agile Engineering:** Fast, clean code with bi-weekly live staging previews.\n" +
          "4. **QA, Launch & 30-Day Support:** Rigorous multi-device testing, deployment, and 30 days of free ongoing support.",
        triggerForm: false
      };
    }

    // 15. PORTFOLIO / PREVIOUS WORK / SAMPLES
    if (
      text.includes('portfolio') ||
      text.includes('sample') ||
      text.includes('past work') ||
      text.includes('previous work') ||
      text.includes('projects') ||
      text.includes('kaam dekhna') ||
      text.includes('dikhao')
    ) {
      return {
        reply: "🏆 **Our Proven Track Record:**\n\n" +
          "Over 5+ years, we've delivered **500+ successful digital solutions** and helped brands achieve over **$25M+ in revenue**.\n\n" +
          "You can check out live interactive case studies on our **Portfolio** page (`/portfolio`), including SaaS dashboards, fintech platforms, luxury retail stores, and mobile apps.\n\n" +
          "Would you like to see examples in a specific industry?",
        triggerForm: false
      };
    }

    // 16. GUARANTEE / REVISIONS / TRUST
    if (
      text.includes('guarantee') ||
      text.includes('revision') ||
      text.includes('trust') ||
      text.includes('safe') ||
      text.includes('refund') ||
      text.includes('kyun choose') ||
      text.includes('why choose')
    ) {
      return {
        reply: "🛡️ **The AMS Crafters Guarantee:**\n\n" +
          "✓ **100% Satisfaction Guarantee:** We iterate on designs until you are completely satisfied.\n" +
          "✓ **100% IP Ownership:** All code, vector assets, and files are transferred to you with full legal rights.\n" +
          "✓ **30-Day Free Post-Launch Warranty:** We fix any bugs or issues free of charge after launch.\n" +
          "✓ **US Contract Standards:** NDA protection, milestone billing, and total transparency.",
        triggerForm: false
      };
    }

    // 17. CAREERS / HIRING / JOBS
    if (
      text.includes('job') ||
      text.includes('career') ||
      text.includes('hiring') ||
      text.includes('intern') ||
      text.includes('cv') ||
      text.includes('resume') ||
      text.includes('vacancy')
    ) {
      return {
        reply: "💼 **Careers at AMS Crafters:**\n\n" +
          "We are always scouting exceptional software engineers, UI/UX artists, and growth marketers! Check out open positions on our **Careers** page (`/careers`) or submit your resume and portfolio directly to **careers@amscrafters.com**.",
        triggerForm: false
      };
    }

    // 18. GREETINGS
    if (
      text.includes('hello') ||
      text.includes('hi') ||
      text.includes('hey') ||
      text.includes('salam') ||
      text.includes('aoa') ||
      text.includes('kese ho') ||
      text.includes('kaise ho') ||
      text.includes('how are you')
    ) {
      return {
        reply: "Hello! 👋 I'm the **AMS Crafters AI Assistant**, active 24/7. Glad to connect with you!\n\nI can help answer questions about our company history, services, pricing, tech stack, or schedule a free strategy call with our US team. How can I help you today?",
        triggerForm: false
      };
    }

    // 19. COURTESY / THANKS
    if (
      text.includes('thank') ||
      text.includes('shukriya') ||
      text.includes('great') ||
      text.includes('nice') ||
      text.includes('good') ||
      text.includes('ok') ||
      text.includes('theek') ||
      text.includes('acha') ||
      text.includes('perfect')
    ) {
      return {
        reply: "You're very welcome! 😊 If you have any other questions about AMS Crafters, our services, or want to start a project, just let me know. We're here to help!",
        triggerForm: false
      };
    }

    // 20. INTELLIGENT FALLBACK (WITHOUT FORCING APPOINTMENT FORM!)
    return {
      reply: "Thank you for reaching out! AMS Crafters is a premier full-service digital agency based in Raleigh, North Carolina, USA. We engineer custom websites, mobile apps, Shopify stores, SEO campaigns, and complete brand identities.\n\nCould you tell me a little more about what you're looking for? Or if you'd like to speak directly with our team, feel free to ask for a free strategy call!",
      triggerForm: false
    };
  };

  const handleBotResponse = async (userText) => {
    setIsTyping(true);

    setTimeout(async () => {
      const { reply, triggerForm } = getSmartKnowledgeResponse(userText);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showFormAction: triggerForm
        }
      ]);

      if (triggerForm) {
        setShowLeadForm(true);
      }

      setIsTyping(false);
    }, 500);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputVal('');
    handleBotResponse(userText);
  };

  // Submit Lead to Firestore Collection `chat_leads`
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email || !leadData.phone) {
      alert("Please provide your Name, Email, and Phone so we can contact you.");
      return;
    }

    setSubmittingLead(true);
    try {
      await addDoc(collection(db, 'chat_leads'), {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        service: leadData.service,
        preferredTime: leadData.preferredTime || 'As soon as possible',
        message: leadData.message || 'Submitted via 24/7 AI Chatbot',
        status: 'New',
        source: 'Website 24/7 AI Chatbot',
        chatTranscript: messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n'),
        createdAt: serverTimestamp()
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `🎉 **Thank you, ${leadData.name}!**\n\nYour meeting & project inquiry has been securely submitted to our US strategy department.\n\nOne of our senior team members will call or email you at **${leadData.phone}** shortly to confirm your consultation!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error("Error saving lead from chat:", err);
      alert("Failed to submit request. Please try again or call us at +1 (919) 808-5526.");
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleChipClick = (chipText) => {
    setInputVal(chipText);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: chipText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    handleBotResponse(chipText);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Chat reset! How can I assist you with AMS Crafters services or packages today?",
        time: 'Just now',
        showFormAction: false
      }
    ]);
    setShowLeadForm(false);
    setLeadSubmitted(false);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div style={{ position: 'relative' }}>
          {showTooltip && (
            <div className="chatbot-preview-tooltip">
              <span>👋 Need a quick quote or meeting? Let's chat!</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
              >
                ✕
              </button>
            </div>
          )}

          <button 
            className="chatbot-trigger-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open AMS AI Assistant"
            title="Chat with AMS Crafters AI Assistant"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {hasUnread && <span className="chatbot-trigger-badge"></span>}
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                AI
              </div>
              <div>
                <h4 className="chatbot-title">AMS AI Assistant</h4>
                <div className="chatbot-status">
                  <span className="chatbot-status-dot"></span>
                  Active 24/7 • US Team
                </div>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button className="chatbot-icon-btn" onClick={resetChat} title="Restart conversation">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button className="chatbot-icon-btn" onClick={() => setIsOpen(false)} title="Close Chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg-row ${msg.sender}`}>
                <div className="chatbot-bubble">
                  {msg.text.split('\n').map((line, lIdx) => (
                    <p key={lIdx} style={{ margin: line ? '0 0 6px 0' : '0' }}>
                      {line.startsWith('• ') ? (
                        <span style={{ display: 'block', paddingLeft: '8px' }}>{line}</span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                  {msg.showFormAction && !showLeadForm && !leadSubmitted && (
                    <button 
                      type="button" 
                      onClick={() => setShowLeadForm(true)} 
                      className="chatbot-bubble-action-btn"
                    >
                      📅 Open Strategy Call Form
                    </button>
                  )}
                  <span className="chatbot-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg-row bot">
                <div className="chatbot-bubble" style={{ fontStyle: 'italic', color: 'var(--muted)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span>AMS AI is typing</span>
                  <span className="chatbot-status-dot"></span>
                </div>
              </div>
            )}

            {/* In-Chat Interactive Lead & Meeting Form */}
            {showLeadForm && !leadSubmitted && (
              <form onSubmit={handleLeadSubmit} className="chatbot-lead-form">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#4fa3d8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📅 Free Strategy Consultation Request
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setShowLeadForm(false)} 
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px', padding: '2px 6px' }}
                    title="Dismiss Form"
                  >
                    ✕ Close
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="Your Full Name *" 
                  required 
                  className="chatbot-form-input" 
                  value={leadData.name} 
                  onChange={e => setLeadData({ ...leadData, name: e.target.value })} 
                />
                <input 
                  type="email" 
                  placeholder="Your Email Address *" 
                  required 
                  className="chatbot-form-input" 
                  value={leadData.email} 
                  onChange={e => setLeadData({ ...leadData, email: e.target.value })} 
                />
                <input 
                  type="tel" 
                  placeholder="Your Phone Number *" 
                  required 
                  className="chatbot-form-input" 
                  value={leadData.phone} 
                  onChange={e => setLeadData({ ...leadData, phone: e.target.value })} 
                />
                <select 
                  className="chatbot-form-input"
                  value={leadData.service}
                  onChange={e => setLeadData({ ...leadData, service: e.target.value })}
                  style={{ background: '#131b2e' }}
                >
                  <option value="Website Design">Website Design & UI/UX</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Custom Software Development">Custom Software & SaaS</option>
                  <option value="360 Marketing">360 Marketing Campaign</option>
                  <option value="SEO">SEO Strategy</option>
                  <option value="Branding">Brand Identity & Logo</option>
                  <option value="Shopify & E-Commerce">Shopify & E-Commerce</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Preferred Call Date / Time (Optional)" 
                  className="chatbot-form-input" 
                  value={leadData.preferredTime} 
                  onChange={e => setLeadData({ ...leadData, preferredTime: e.target.value })} 
                />
                <button type="submit" disabled={submittingLead} className="chatbot-form-btn">
                  {submittingLead ? 'Submitting Request...' : 'Submit & Book Discovery Call →'}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="chatbot-chips">
            <button className="chatbot-chip" onClick={() => handleChipClick('When was AMS Crafters founded and what is your history?')}>
              🏛️ About & History
            </button>
            <button className="chatbot-chip" onClick={() => handleChipClick('What are your service packages and pricing?')}>
              💰 Packages & Pricing
            </button>
            <button className="chatbot-chip" onClick={() => handleChipClick('What digital services do you offer?')}>
              🚀 Services Suite
            </button>
            <button className="chatbot-chip" onClick={() => handleChipClick('What tech stack and programming languages do you use?')}>
              💻 Tech Stack
            </button>
            <button className="chatbot-chip" onClick={() => handleChipClick('I want to schedule a strategy meeting with your team')}>
              📅 Book Meeting
            </button>
            <button className="chatbot-chip" onClick={() => handleChipClick('What is your US office address and phone number?')}>
              📍 US Office & Contact
            </button>
          </div>

          {/* Input Bar */}
          <form className="chatbot-input-bar" onSubmit={handleSend}>
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Ask anything or request a quote..." 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
            />
            <button 
              type="submit" 
              className="chatbot-send-btn" 
              disabled={!inputVal.trim()}
              title="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
