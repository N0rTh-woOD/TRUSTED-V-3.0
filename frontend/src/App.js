import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";

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

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Protected Pages
import SmartProjectBuilder from "@/pages/SmartProjectBuilder";
import MyProjects from "@/pages/MyProjects";
import AccountSettings from "@/pages/AccountSettings";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminHardware from "@/pages/admin/AdminHardware";
import AdminMiddleware from "@/pages/admin/AdminMiddleware";
import AdminSoftware from "@/pages/admin/AdminSoftware";
import AdminIDE from "@/pages/admin/AdminIDE";
import AdminLLM from "@/pages/admin/AdminLLM";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="trusted-v-theme">
      <AuthProvider>
        <div className="App min-h-screen bg-background">
          <BrowserRouter>
            <Navigation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/product-suite" element={<ProductSuite />} />
              <Route path="/developer-portal" element={<DeveloperPortal />} />
              <Route path="/hardware-catalog" element={<HardwareCatalog />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partner-registration" element={<PartnerRegistration />} />
              <Route path="/download-ide" element={<IDEDownloads />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Legacy routes - redirect to new paths */}
              <Route path="/hardware" element={<HardwareCatalog />} />
              <Route path="/ide" element={<IDEDownloads />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route
                path="/solution-builder"
                element={
                  <ProtectedRoute>
                    <SmartProjectBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <SmartProjectBuilder />
                  </ProtectedRoute>
                }
              />
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
              
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/hardware"
                element={
                  <AdminRoute>
                    <AdminHardware />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/middleware"
                element={
                  <AdminRoute>
                    <AdminMiddleware />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/software"
                element={
                  <AdminRoute>
                    <AdminSoftware />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/ide"
                element={
                  <AdminRoute>
                    <AdminIDE />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/llm"
                element={
                  <AdminRoute>
                    <AdminLLM />
                  </AdminRoute>
                }
              />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
