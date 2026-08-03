import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { Home } from './Home';
import { Contact } from './Contact';
import { ServiceDetailPage } from './ServiceDetailPage';
import { TeamPage } from './TeamPage';
import { StoryPage } from './StoryPage';
import { PortfolioPage } from './PortfolioPage';
import { ProjectDetailPage } from './ProjectDetailPage';
import { AdminLogin } from './AdminLogin';
import { Footer } from './Footer';
import { Careers } from './Careers';
import { ServicesPage } from './ServicesPage';
import { CustomCursor } from './CustomCursor';
import { Consultation } from './Consultation';

// Admin Imports
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminCategories } from './admin/AdminCategories';
import { AdminTeam } from './admin/AdminTeam';
import { AdminClients } from './admin/AdminClients';
import { AdminReviews } from './admin/AdminReviews';
import { AdminInbox } from './admin/AdminInbox';
import { AdminJobs } from './admin/AdminJobs';
import { AdminApplications } from './admin/AdminApplications';
import { AdminConsultations } from './admin/AdminConsultations';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Preloader />
      <CustomCursor />
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/story" element={<StoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/consultation" element={<Consultation />} />
          
          {/* Admin Login (No Layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Protected Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="consultations" element={<AdminConsultations />} />
            <Route path="inbox" element={<AdminInbox />} />
          </Route>
          
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
