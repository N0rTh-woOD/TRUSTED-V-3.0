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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="risc-v-theme">
      <AuthProvider>
        <div className="App dark min-h-screen bg-background">
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
            </Routes>
            <Toaster />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;