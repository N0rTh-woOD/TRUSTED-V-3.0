import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        const navigation = document.querySelector("header");
        const offset = (navigation?.getBoundingClientRect().height || 76) + 24;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

// Public Pages
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import ProductSuite from "@/pages/ProductSuite";
import DeveloperPortal from "@/pages/DeveloperPortal";
import HardwareCatalog from "@/pages/HardwareCatalog";
import Partners from "@/pages/Partners";
import PartnerRegistration from "@/pages/PartnerRegistration";
import IDEDownloads from "@/pages/IDEDownloads";
import Blog from "@/pages/Blog";
import BoardSupportRequest from "@/pages/BoardSupportRequest";
import ContactSales from "@/pages/ContactSales";
import ContactPage from "@/pages/ContactPage";
import Marketplace from "@/pages/Marketplace";
import SecureBootPage from "@/pages/SecureBootPage";
import CryptoStackPage from "@/pages/CryptoStackPage";
import RTOSBenchmarkPage from "@/pages/RTOSBenchmarkPage";
import WebIDEPage from "@/pages/WebIDEPage";
import Services from "@/pages/Services";
import NotFound from "@/pages/NotFound";
import RetiredFeature from "@/pages/RetiredFeature";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Protected Pages
import MyProjects from "@/pages/MyProjects";
import AccountSettings from "@/pages/AccountSettings";

// Site-wide authentication lock - requires any authenticated user
const SITE_LOCK_ENABLED = true; // Set to false to make site publicly accessible

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading TRUSTED-V Platform...</p>
        </div>
      </div>
    );
  }

  // If site lock is enabled and user is not authenticated, show login
  if (SITE_LOCK_ENABLED && !isAuthenticated) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/solution-builder" element={<RetiredFeature />} />
          <Route path="/builder" element={<RetiredFeature />} />
          <Route path="/chat" element={<RetiredFeature />} />
          <Route path="/product/code-engine" element={<RetiredFeature />} />
          <Route path="/admin/*" element={<RetiredFeature />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navigation />
      <main>
      <Routes>
        {/* Public Routes - accessible when site lock is disabled or user is authenticated */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/product-suite" element={<ProductSuite />} />
        <Route path="/developer-portal" element={<DeveloperPortal />} />
        <Route path="/hardware-catalog" element={<Marketplace />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/secure-boot" element={<SecureBootPage />} />
        <Route path="/product/crypto-stack" element={<CryptoStackPage />} />
        <Route path="/product/rtos-benchmark" element={<RTOSBenchmarkPage />} />
        <Route path="/product/code-engine" element={<RetiredFeature />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partner-registration" element={<PartnerRegistration />} />
        <Route path="/download-ide" element={<IDEDownloads />} />
        <Route path="/webide" element={<WebIDEPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/board-support" element={<BoardSupportRequest />} />
        <Route path="/contact-sales" element={<ContactSales />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/engagement-models" element={<Navigate to="/services" replace />} />
        
        {/* Legacy routes - redirect to new paths */}
        <Route path="/hardware" element={<HardwareCatalog />} />
        <Route path="/ide" element={<IDEDownloads />} />
        
        {/* Auth Routes - redirect authenticated users to home */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        
        {/* Protected Routes - require authentication (Projects, etc.) */}
        <Route path="/solution-builder" element={<RetiredFeature />} />
        <Route path="/builder" element={<RetiredFeature />} />
        <Route path="/chat" element={<RetiredFeature />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        
        <Route path="/admin/*" element={<RetiredFeature />} />

        {/* Catch-all — no dead links */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="trusted-v-theme">
      <AuthProvider>
        <div className="App min-h-screen bg-background">
          <AppContent />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
