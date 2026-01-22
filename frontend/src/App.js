import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SmartProjectBuilder from "@/pages/SmartProjectBuilder";
import HardwareCatalog from "@/pages/HardwareCatalog";
import MyProjects from "@/pages/MyProjects";
import IDEDownloads from "@/pages/IDEDownloads";
import AccountSettings from "@/pages/AccountSettings";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminHardware from "@/pages/admin/AdminHardware";
import AdminMiddleware from "@/pages/admin/AdminMiddleware";
import AdminSoftware from "@/pages/admin/AdminSoftware";
import AdminIDE from "@/pages/admin/AdminIDE";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="risc-v-theme">
      <AuthProvider>
        <div className="App min-h-screen bg-background">
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hardware" element={<HardwareCatalog />} />
              <Route path="/ide" element={<IDEDownloads />} />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <SmartProjectBuilder />
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
            </Routes>
            <Toaster />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;