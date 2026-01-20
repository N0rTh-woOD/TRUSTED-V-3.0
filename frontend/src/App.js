import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Landing from "@/pages/Landing";
import AIChat from "@/pages/AIChat";
import HardwareCatalog from "@/pages/HardwareCatalog";
import ProjectsDashboard from "@/pages/ProjectsDashboard";
import IDEDownloads from "@/pages/IDEDownloads";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="risc-v-theme">
      <div className="App dark min-h-screen bg-background">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/hardware" element={<HardwareCatalog />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/ide" element={<IDEDownloads />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;