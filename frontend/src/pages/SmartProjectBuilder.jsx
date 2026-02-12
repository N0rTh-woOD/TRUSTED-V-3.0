import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Loader2,
  Cpu,
  Package,
  Download,
  Sparkles,
  CheckCircle2,
  Database,
  FileCode,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Search,
  Zap,
  Wifi,
  Camera,
  Monitor,
  Gauge,
  Cog,
  AlertCircle,
  Info,
  X,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Project templates for quick start
const PROJECT_TEMPLATES = [
  {
    id: "iot-sensor",
    name: "IoT Sensor Node",
    icon: Wifi,
    description: "WiFi-enabled sensor with low power consumption",
    defaultPeripherals: ["GPIO", "I2C", "SPI", "UART", "ADC"],
    suggestedHardware: ["esp32-c3"],
    color: "bg-blue-500",
  },
  {
    id: "motor-control",
    name: "Motor Controller",
    icon: Cog,
    description: "PWM-based motor control with feedback",
    defaultPeripherals: ["GPIO", "PWM", "ADC", "UART", "Timer"],
    suggestedHardware: ["hifive1"],
    color: "bg-orange-500",
  },
  {
    id: "display-ui",
    name: "Display & UI",
    icon: Monitor,
    description: "LCD/OLED display with touch interface",
    defaultPeripherals: ["SPI", "I2C", "GPIO", "DMA"],
    suggestedHardware: ["k210"],
    color: "bg-purple-500",
  },
  {
    id: "edge-ai",
    name: "Edge AI Device",
    icon: Sparkles,
    description: "Machine learning inference at the edge",
    defaultPeripherals: ["Camera", "SPI", "I2C", "UART", "DMA"],
    suggestedHardware: ["k210", "visionfive2"],
    color: "bg-green-500",
  },
  {
    id: "industrial",
    name: "Industrial Controller",
    icon: Gauge,
    description: "Real-time control with safety features",
    defaultPeripherals: ["GPIO", "UART", "CAN", "ADC", "Watchdog"],
    suggestedHardware: ["hifive1"],
    color: "bg-red-500",
  },
  {
    id: "custom",
    name: "Custom Project",
    icon: Zap,
    description: "Start from scratch with full control",
    defaultPeripherals: [],
    suggestedHardware: [],
    color: "bg-gray-500",
  },
];

const SmartProjectBuilder = () => {
  const { token } = useAuth();

  // Project configuration
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedHardware, setSelectedHardware] = useState(null);
  const [selectedMiddleware, setSelectedMiddleware] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);
  const [additionalRequirements, setAdditionalRequirements] = useState("");

  // Data
  const [hardware, setHardware] = useState([]);
  const [middleware, setMiddleware] = useState([]);
  const [softwareComponents, setSoftwareComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [hardwareSearch, setHardwareSearch] = useState("");
  const [softwareFilter, setSoftwareFilter] = useState("all");
  const [expandedSections, setExpandedSections] = useState({
    hardware: true,
    middleware: true,
    software: true,
    peripherals: true,
  });

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedProject, setGeneratedProject] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [hwRes, mwRes, swRes] = await Promise.all([
        axios.get(`${API}/hardware`),
        axios.get(`${API}/middleware`),
        axios.get(`${API}/software-components`),
      ]);
      setHardware(hwRes.data);
      setMiddleware(mwRes.data);
      setSoftwareComponents(swRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load catalog data");
    } finally {
      setLoading(false);
    }
  };

  // Filter hardware based on search
  const filteredHardware = useMemo(() => {
    if (!hardwareSearch.trim()) return hardware;
    const search = hardwareSearch.toLowerCase();
    return hardware.filter(
      (hw) =>
        hw.name.toLowerCase().includes(search) ||
        hw.manufacturer.toLowerCase().includes(search) ||
        hw.core.toLowerCase().includes(search)
    );
  }, [hardware, hardwareSearch]);

  // Filter compatible middleware based on selected hardware
  const compatibleMiddleware = useMemo(() => {
    if (!selectedHardware) return middleware;
    return middleware.filter((mw) =>
      mw.compatible_cores?.includes(selectedHardware.core)
    );
  }, [middleware, selectedHardware]);

  // Filter compatible software based on selected hardware
  const compatibleSoftware = useMemo(() => {
    let filtered = softwareComponents;
    if (selectedHardware) {
      filtered = filtered.filter((sw) =>
        sw.compatible_cores?.includes(selectedHardware.core)
      );
    }
    if (softwareFilter !== "all") {
      filtered = filtered.filter((sw) => sw.type === softwareFilter);
    }
    return filtered;
  }, [softwareComponents, selectedHardware, softwareFilter]);

  // Get unique software types
  const softwareTypes = useMemo(() => {
    const types = new Set(softwareComponents.map((sw) => sw.type));
    return ["all", ...Array.from(types)];
  }, [softwareComponents]);

  // Apply template
  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    setProjectDescription(template.description);
    
    // Find and select suggested hardware
    if (template.suggestedHardware.length > 0) {
      const suggestedHw = hardware.find((hw) =>
        template.suggestedHardware.some((s) =>
          hw.name.toLowerCase().includes(s) || hw.id.toLowerCase().includes(s)
        )
      );
      if (suggestedHw) {
        handleHardwareSelect(suggestedHw);
      }
    }
    
    toast.success(`Applied "${template.name}" template`);
  };

  const handleHardwareSelect = (hw) => {
    setSelectedHardware(hw);
    // Auto-select peripherals from hardware
    const peripheralNames = hw.peripherals?.map((p) => p.name) || [];
    
    // If template selected, merge template peripherals
    if (selectedTemplate && selectedTemplate.defaultPeripherals) {
      const merged = new Set([...peripheralNames, ...selectedTemplate.defaultPeripherals]);
      setSelectedPeripherals(Array.from(merged).filter((p) => 
        peripheralNames.includes(p) || selectedTemplate.defaultPeripherals.includes(p)
      ));
    } else {
      setSelectedPeripherals(peripheralNames);
    }
    
    // Clear incompatible middleware/software selections
    setSelectedMiddleware((prev) =>
      prev.filter((id) => {
        const mw = middleware.find((m) => m.id === id);
        return mw?.compatible_cores?.includes(hw.core);
      })
    );
    setSelectedSoftware((prev) =>
      prev.filter((id) => {
        const sw = softwareComponents.find((s) => s.id === id);
        return sw?.compatible_cores?.includes(hw.core);
      })
    );
  };

  const handleMiddlewareToggle = (mwId) => {
    setSelectedMiddleware((prev) =>
      prev.includes(mwId) ? prev.filter((id) => id !== mwId) : [...prev, mwId]
    );
  };

  const handleSoftwareToggle = (swId) => {
    setSelectedSoftware((prev) =>
      prev.includes(swId) ? prev.filter((id) => id !== swId) : [...prev, swId]
    );
  };

  const handlePeripheralToggle = (peripheral) => {
    setSelectedPeripherals((prev) =>
      prev.includes(peripheral)
        ? prev.filter((p) => p !== peripheral)
        : [...prev, peripheral]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const resetConfiguration = () => {
    setProjectName("");
    setProjectDescription("");
    setSelectedTemplate(null);
    setSelectedHardware(null);
    setSelectedMiddleware([]);
    setSelectedSoftware([]);
    setSelectedPeripherals([]);
    setAdditionalRequirements("");
    setGeneratedProject(null);
    toast.info("Configuration reset");
  };

  const canGenerate = projectName.trim() && selectedHardware;

  const generateProject = async () => {
    if (!canGenerate) {
      toast.error("Please enter a project name and select hardware");
      return;
    }

    setGenerating(true);
    setGenerationProgress(0);

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const response = await axios.post(
        `${API}/projects/generate`,
        {
          name: projectName,
          description: projectDescription || `${selectedTemplate?.name || "Custom"} project for ${selectedHardware.name}`,
          hardware_id: selectedHardware.id,
          middleware_ids: selectedMiddleware,
          software_component_ids: selectedSoftware,
          peripherals: selectedPeripherals,
          additional_requirements: additionalRequirements,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      clearInterval(progressInterval);
      setGenerationProgress(100);

      setGeneratedProject(response.data);
      toast.success(`Project generated! Version ${response.data.version}`);
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Failed to generate project:", error);
      toast.error(error.response?.data?.detail || "Failed to generate project");
    } finally {
      setGenerating(false);
    }
  };

  const downloadProject = async () => {
    if (!generatedProject) return;

    try {
      const response = await axios.get(
        `${API}/projects/${generatedProject.project_id}/download/${generatedProject.version}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${projectName.toLowerCase().replace(/\s+/g, "_")}_v${generatedProject.version}.zip`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Project downloaded!");
    } catch (error) {
      console.error("Failed to download project:", error);
      toast.error("Failed to download project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Project Builder
            </h1>
            <p className="text-muted-foreground">
              Configure and generate your RISC-V Rust project
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetConfiguration}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Configuration Area */}
          <div className="col-span-8 space-y-6">
            {/* Project Info Card */}
            <Card className="bg-card border border-border">
              <CardHeader className="p-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Project Details</h2>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Project Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      data-testid="project-name-input"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="my-riscv-project"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Template (Optional)
                    </label>
                    <Select
                      value={selectedTemplate?.id || "none"}
                      onValueChange={(val) => {
                        if (val === "none") {
                          setSelectedTemplate(null);
                        } else {
                          const template = PROJECT_TEMPLATES.find((t) => t.id === val);
                          if (template) applyTemplate(template);
                        }
                      }}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Choose a template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No template</SelectItem>
                        {PROJECT_TEMPLATES.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex items-center gap-2">
                              <template.icon className="w-4 h-4" />
                              {template.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <Textarea
                    data-testid="project-description-input"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project's purpose and features..."
                    className="min-h-[60px] resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            {!selectedTemplate && (
              <div className="grid grid-cols-6 gap-3">
                {PROJECT_TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      data-testid={`template-${template.id}`}
                      onClick={() => applyTemplate(template)}
                      className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-center group"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${template.color}/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`w-5 h-5 ${template.color.replace("bg-", "text-")}`} />
                      </div>
                      <p className="text-xs font-medium text-foreground truncate">
                        {template.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hardware Selection */}
            <Collapsible
              open={expandedSections.hardware}
              onOpenChange={() => toggleSection("hardware")}
            >
              <Card className="bg-card border border-border">
                <CollapsibleTrigger asChild>
                  <CardHeader className="p-4 pb-3 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        <h2 className="font-semibold text-foreground">
                          Hardware Board <span className="text-destructive">*</span>
                        </h2>
                        {selectedHardware && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedHardware.name}
                          </Badge>
                        )}
                      </div>
                      {expandedSections.hardware ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={hardwareSearch}
                        onChange={(e) => setHardwareSearch(e.target.value)}
                        placeholder="Search boards by name, manufacturer, or core..."
                        className="pl-10 h-9"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto">
                      {filteredHardware.map((hw) => (
                        <div
                          key={hw.id}
                          data-testid={`hardware-card-${hw.id}`}
                          onClick={() => handleHardwareSelect(hw)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedHardware?.id === hw.id
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sm text-foreground">
                                {hw.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {hw.manufacturer}
                              </p>
                            </div>
                            {selectedHardware?.id === hw.id && (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Core:</span>
                              <span className="font-medium text-foreground">{hw.core}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Speed:</span>
                              <span className="font-medium text-foreground">{hw.clock_speed}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">RAM:</span>
                              <span className="font-medium text-foreground">{hw.memory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Flash:</span>
                              <span className="font-medium text-foreground">{hw.flash}</span>
                            </div>
                          </div>
                          {hw.price && (
                            <p className="mt-2 text-xs font-medium text-primary">
                              {hw.price}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Middleware Selection */}
            <Collapsible
              open={expandedSections.middleware}
              onOpenChange={() => toggleSection("middleware")}
            >
              <Card className="bg-card border border-border">
                <CollapsibleTrigger asChild>
                  <CardHeader className="p-4 pb-3 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-500" />
                        <h2 className="font-semibold text-foreground">RTOS & Middleware</h2>
                        {selectedMiddleware.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedMiddleware.length} selected
                          </Badge>
                        )}
                      </div>
                      {expandedSections.middleware ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4">
                    {!selectedHardware ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                        <Info className="w-4 h-4" />
                        Select a hardware board first to see compatible middleware
                      </div>
                    ) : compatibleMiddleware.length === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                        <AlertCircle className="w-4 h-4" />
                        No compatible middleware found for {selectedHardware.core}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {compatibleMiddleware.map((mw) => (
                          <div
                            key={mw.id}
                            data-testid={`middleware-item-${mw.id}`}
                            onClick={() => handleMiddlewareToggle(mw.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedMiddleware.includes(mw.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedMiddleware.includes(mw.id)}
                                onCheckedChange={() => handleMiddlewareToggle(mw.id)}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm text-foreground">
                                    {mw.name}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    v{mw.version}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {mw.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {mw.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Software Components */}
            <Collapsible
              open={expandedSections.software}
              onOpenChange={() => toggleSection("software")}
            >
              <Card className="bg-card border border-border">
                <CollapsibleTrigger asChild>
                  <CardHeader className="p-4 pb-3 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-green-500" />
                        <h2 className="font-semibold text-foreground">Software Components</h2>
                        {selectedSoftware.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedSoftware.length} selected
                          </Badge>
                        )}
                      </div>
                      {expandedSections.software ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4">
                    {!selectedHardware ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                        <Info className="w-4 h-4" />
                        Select a hardware board first to see compatible software
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {softwareTypes.map((type) => (
                            <Button
                              key={type}
                              variant={softwareFilter === type ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSoftwareFilter(type)}
                              className="h-7 text-xs"
                            >
                              {type === "all" ? "All" : type}
                            </Button>
                          ))}
                        </div>
                        {compatibleSoftware.length === 0 ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                            <AlertCircle className="w-4 h-4" />
                            No compatible software found
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto">
                            {compatibleSoftware.map((sw) => (
                              <div
                                key={sw.id}
                                data-testid={`software-item-${sw.id}`}
                                onClick={() => handleSoftwareToggle(sw.id)}
                                className={`p-2 rounded-lg border cursor-pointer transition-all ${
                                  selectedSoftware.includes(sw.id)
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <Checkbox
                                    checked={selectedSoftware.includes(sw.id)}
                                    onCheckedChange={() => handleSoftwareToggle(sw.id)}
                                    className="mt-0.5"
                                  />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1 flex-wrap">
                                      <span className="font-medium text-xs text-foreground">
                                        {sw.name}
                                      </span>
                                      <Badge variant="outline" className="text-[10px] px-1">
                                        {sw.type}
                                      </Badge>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                                      {sw.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Peripherals */}
            {selectedHardware?.peripherals?.length > 0 && (
              <Collapsible
                open={expandedSections.peripherals}
                onOpenChange={() => toggleSection("peripherals")}
              >
                <Card className="bg-card border border-border">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="p-4 pb-3 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cog className="w-5 h-5 text-amber-500" />
                          <h2 className="font-semibold text-foreground">Peripherals</h2>
                          <Badge variant="secondary" className="ml-2">
                            {selectedPeripherals.length}/{selectedHardware.peripherals.length}
                          </Badge>
                        </div>
                        {expandedSections.peripherals ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedHardware.peripherals.map((peripheral, index) => (
                          <div
                            key={index}
                            data-testid={`peripheral-${index}`}
                            onClick={() => handlePeripheralToggle(peripheral.name)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all text-sm ${
                              selectedPeripherals.includes(peripheral.name)
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50 text-muted-foreground"
                            }`}
                          >
                            <Checkbox
                              checked={selectedPeripherals.includes(peripheral.name)}
                              onCheckedChange={() => handlePeripheralToggle(peripheral.name)}
                              className="w-3.5 h-3.5"
                            />
                            <span>{peripheral.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )}

            {/* Additional Requirements */}
            <Card className="bg-card border border-border">
              <CardHeader className="p-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h2 className="font-semibold text-foreground">Additional Requirements</h2>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  data-testid="additional-requirements-input"
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Any specific coding patterns, libraries, or features you need in the generated code..."
                  className="min-h-[80px] resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Configuration Summary & Actions */}
          <div className="col-span-4 space-y-4">
            {/* Generate Card - Sticky */}
            <div className="sticky top-4">
              <Card className="bg-card border border-border">
                <CardHeader className="p-4 pb-3 border-b border-border">
                  <h2 className="font-semibold text-foreground">Configuration Summary</h2>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {/* Summary Items */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Project:</span>
                      <span className="font-medium text-foreground truncate ml-2">
                        {projectName || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="font-medium text-foreground">
                        {selectedTemplate?.name || "Custom"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hardware:</span>
                      <span className="font-medium text-foreground truncate ml-2">
                        {selectedHardware?.name || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Middleware:</span>
                      <span className="font-medium text-foreground">
                        {selectedMiddleware.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Software:</span>
                      <span className="font-medium text-foreground">
                        {selectedSoftware.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peripherals:</span>
                      <span className="font-medium text-foreground">
                        {selectedPeripherals.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Validation Messages */}
                  {!projectName && (
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Enter a project name
                    </div>
                  )}
                  {!selectedHardware && (
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Select a hardware board
                    </div>
                  )}

                  {/* Generation Progress */}
                  {generating && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Generating project...
                        </span>
                      </div>
                      <Progress value={generationProgress} className="h-1.5" />
                    </div>
                  )}

                  {/* Generate Button */}
                  <Button
                    data-testid="generate-project-btn"
                    onClick={generateProject}
                    disabled={!canGenerate || generating}
                    className="w-full h-11 shadow-lg shadow-primary/25"
                  >
                    {generating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Generate Project
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Project Card */}
              {generatedProject && !generating && (
                <Card className="mt-4 bg-green-500/5 border border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <FolderGit2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          Project Ready!
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          v{generatedProject.version} • {generatedProject.files_generated} files
                        </p>
                      </div>
                    </div>
                    <Button
                      data-testid="download-project-btn"
                      onClick={downloadProject}
                      className="w-full h-10"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download ZIP
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Selected Hardware Details */}
              {selectedHardware && (
                <Card className="mt-4 bg-card border border-border">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-foreground">
                        {selectedHardware.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setSelectedHardware(null)}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedHardware.manufacturer}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-muted/50 rounded p-2">
                        <p className="text-muted-foreground">Core</p>
                        <p className="font-medium text-foreground">{selectedHardware.core}</p>
                      </div>
                      <div className="bg-muted/50 rounded p-2">
                        <p className="text-muted-foreground">Speed</p>
                        <p className="font-medium text-foreground">{selectedHardware.clock_speed}</p>
                      </div>
                      <div className="bg-muted/50 rounded p-2">
                        <p className="text-muted-foreground">Memory</p>
                        <p className="font-medium text-foreground">{selectedHardware.memory}</p>
                      </div>
                      <div className="bg-muted/50 rounded p-2">
                        <p className="text-muted-foreground">Flash</p>
                        <p className="font-medium text-foreground">{selectedHardware.flash}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                      {selectedHardware.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartProjectBuilder;
