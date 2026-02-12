import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Send,
  Bot,
  User,
  Cpu,
  Package,
  Download,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Database,
  FileCode,
  FolderGit2,
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SmartProjectBuilder = () => {
  const { token } = useAuth();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionId] = useState(
    () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef(null);

  // Project configuration
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [selectedHardware, setSelectedHardware] = useState(null);
  const [selectedMiddleware, setSelectedMiddleware] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);

  // Data
  const [hardware, setHardware] = useState([]);
  const [middleware, setMiddleware] = useState([]);
  const [softwareComponents, setSoftwareComponents] = useState([]);
  const [compatibleMiddleware, setCompatibleMiddleware] = useState([]);
  const [compatibleSoftware, setCompatibleSoftware] = useState([]);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedProject, setGeneratedProject] = useState(null);

  useEffect(() => {
    loadData();
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedHardware) {
      loadCompatibleComponents(selectedHardware.core, selectedHardware.id);
    }
  }, [selectedHardware]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Welcome to the TrusteD-V Project Builder! 🚀

I'll help you create a production-ready RISC-V Rust project.

**Tell me about your project:**
• What are you building? (IoT device, edge AI, industrial controller, etc.)
• What features do you need? (WiFi, sensors, display, motor control, etc.)
• Any specific performance or power requirements?

I'll analyze your needs and suggest the best hardware and software stack!`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

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
    }
  };

  const loadCompatibleComponents = async (core, hardwareId) => {
    try {
      const [mwRes, swRes] = await Promise.all([
        axios.get(`${API}/middleware/compatible/${encodeURIComponent(core)}`),
        axios.get(`${API}/software-components/compatible/${hardwareId}`).catch(() => ({ data: softwareComponents.filter(s => s.compatible_cores.includes(core)) })),
      ]);
      setCompatibleMiddleware(mwRes.data);
      setCompatibleSoftware(swRes.data || softwareComponents.filter(s => s.compatible_cores.includes(core)));
    } catch (error) {
      console.error("Failed to load compatible components:", error);
      // Fallback to filtering locally
      setCompatibleMiddleware(middleware.filter(m => m.compatible_cores.includes(core)));
      setCompatibleSoftware(softwareComponents.filter(s => s.compatible_cores.includes(core)));
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setChatLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        { message: input, session_id: sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = {
        role: "assistant",
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // If AI suggests hardware, highlight them
      if (response.data.suggested_hardware) {
        toast.info("AI has suggested some hardware options for you!");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleHardwareSelect = (hw) => {
    setSelectedHardware(hw);
    setSelectedMiddleware([]);
    setSelectedSoftware([]);
    setSelectedPeripherals(hw.peripherals?.map((p) => p.name) || []);
    toast.success(`Selected: ${hw.name}`);
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

  const canProceedToStep = (step) => {
    switch (step) {
      case 2:
        return projectName.trim() && projectDescription.trim();
      case 3:
        return selectedHardware !== null;
      case 4:
        return selectedMiddleware.length > 0 || selectedSoftware.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateProject = async () => {
    if (!projectName || !selectedHardware) {
      toast.error("Please complete the project configuration");
      return;
    }

    setGenerating(true);
    setGenerationProgress(0);

    // Simulate progress for better UX
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
          description: projectDescription,
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
      toast.success(`Project generated successfully! Version ${response.data.version}`);
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
      link.setAttribute("download", `${projectName.toLowerCase().replace(/\s+/g, "_")}_v${generatedProject.version}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Project downloaded successfully!");
    } catch (error) {
      console.error("Failed to download project:", error);
      toast.error("Failed to download project");
    }
  };

  const steps = [
    { number: 1, title: "Describe", icon: Bot },
    { number: 2, title: "Configure", icon: FileCode },
    { number: 3, title: "Hardware", icon: Cpu },
    { number: 4, title: "Software", icon: Package },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-background">
      {/* Left Sidebar - AI Chat */}
      <div className="w-[400px] border-r border-border flex flex-col bg-card">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Describe your requirements</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              data-testid={`message-${msg.role}-${index}`}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[300px] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {chatLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              data-testid="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your project..."
              disabled={chatLoading}
              className="h-10"
            />
            <Button
              data-testid="send-message-btn"
              onClick={sendMessage}
              disabled={chatLoading || !input.trim()}
              size="sm"
              className="h-10 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Step Progress */}
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-green-500/10 text-green-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 mx-2 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="max-w-4xl mx-auto p-8">
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Describe Your Project
                  </h2>
                  <p className="text-muted-foreground">
                    Tell us about your RISC-V embedded project
                  </p>
                </div>

                <Card className="bg-card border border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Project Name *
                      </label>
                      <Input
                        data-testid="project-name-input"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="My RISC-V IoT Device"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Description *
                      </label>
                      <Textarea
                        data-testid="project-description-input"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Describe what your project does, its main features, and target use case..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Additional Requirements (Optional)
                      </label>
                      <Textarea
                        data-testid="additional-requirements-input"
                        value={additionalRequirements}
                        onChange={(e) => setAdditionalRequirements(e.target.value)}
                        placeholder="Any specific coding patterns, libraries, or features you need..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Hardware Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Select Hardware
                  </h2>
                  <p className="text-muted-foreground">
                    Choose the RISC-V development board for your project
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {hardware.map((hw) => (
                    <Card
                      key={hw.id}
                      data-testid={`hardware-card-${hw.id}`}
                      className={`bg-card border cursor-pointer transition-all ${
                        selectedHardware?.id === hw.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleHardwareSelect(hw)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Cpu className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm truncate">
                              {hw.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {hw.manufacturer}
                            </p>
                            <div className="mt-2 space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Core:</span>
                                <span className="font-medium text-foreground">{hw.core}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Speed:</span>
                                <span className="font-medium text-foreground">{hw.clock_speed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Memory:</span>
                                <span className="font-medium text-foreground">{hw.memory}</span>
                              </div>
                            </div>
                          </div>
                          {selectedHardware?.id === hw.id && (
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Software Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Select Software Stack
                  </h2>
                  <p className="text-muted-foreground">
                    Choose middleware and software components for {selectedHardware?.name}
                  </p>
                </div>

                {/* Middleware */}
                <Card className="bg-card border border-border">
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">RTOS & Middleware</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {compatibleMiddleware.length > 0 ? (
                      <div className="space-y-2">
                        {compatibleMiddleware.map((mw) => (
                          <div
                            key={mw.id}
                            data-testid={`middleware-item-${mw.id}`}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              selectedMiddleware.includes(mw.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleMiddlewareToggle(mw.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedMiddleware.includes(mw.id)}
                                onCheckedChange={() => handleMiddlewareToggle(mw.id)}
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm text-foreground">
                                    {mw.name}
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    v{mw.version}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {mw.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No compatible middleware found for this hardware
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Software Components */}
                <Card className="bg-card border border-border">
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold text-foreground">Software Components</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {compatibleSoftware.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {compatibleSoftware.map((sw) => (
                          <div
                            key={sw.id}
                            data-testid={`software-item-${sw.id}`}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              selectedSoftware.includes(sw.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleSoftwareToggle(sw.id)}
                          >
                            <div className="flex items-start gap-2">
                              <Checkbox
                                checked={selectedSoftware.includes(sw.id)}
                                onCheckedChange={() => handleSoftwareToggle(sw.id)}
                                className="mt-0.5"
                              />
                              <div>
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-medium text-xs text-foreground">
                                    {sw.name}
                                  </span>
                                  <Badge variant="outline" className="text-[10px]">
                                    {sw.type}
                                  </Badge>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                                  {sw.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No compatible software components found
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Peripherals & Generate */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Peripherals & Generate
                  </h2>
                  <p className="text-muted-foreground">
                    Select peripherals to initialize and generate your project
                  </p>
                </div>

                {/* Peripherals */}
                {selectedHardware?.peripherals?.length > 0 && (
                  <Card className="bg-card border border-border">
                    <CardHeader className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Hardware Peripherals</h3>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-2">
                        {selectedHardware.peripherals.map((peripheral, index) => (
                          <div
                            key={index}
                            data-testid={`peripheral-${index}`}
                            className={`border rounded-lg p-2 cursor-pointer transition-all ${
                              selectedPeripherals.includes(peripheral.name)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handlePeripheralToggle(peripheral.name)}
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={selectedPeripherals.includes(peripheral.name)}
                                onCheckedChange={() => handlePeripheralToggle(peripheral.name)}
                              />
                              <div>
                                <p className="text-xs font-medium text-foreground">
                                  {peripheral.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {peripheral.interface}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Summary */}
                <Card className="bg-card border border-border">
                  <CardHeader className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Project Summary</h3>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Project Name:</span>
                      <span className="font-medium text-foreground">{projectName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hardware:</span>
                      <span className="font-medium text-foreground">{selectedHardware?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Middleware:</span>
                      <span className="font-medium text-foreground">
                        {selectedMiddleware.length} selected
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Software Components:</span>
                      <span className="font-medium text-foreground">
                        {selectedSoftware.length} selected
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Peripherals:</span>
                      <span className="font-medium text-foreground">
                        {selectedPeripherals.length} selected
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Generation Progress */}
                {generating && (
                  <Card className="bg-card border border-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">Generating Project...</h4>
                          <p className="text-sm text-muted-foreground">
                            AI is creating your RISC-V Rust project
                          </p>
                        </div>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </CardContent>
                  </Card>
                )}

                {/* Generated Project */}
                {generatedProject && !generating && (
                  <Card className="bg-green-500/5 border border-green-500/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <FolderGit2 className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              Project Generated Successfully!
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Version {generatedProject.version} • {generatedProject.files_generated} files
                            </p>
                          </div>
                        </div>
                        <Button
                          data-testid="download-project-btn"
                          onClick={downloadProject}
                          className="h-11 px-6"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download ZIP
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-card border-t border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="h-11"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedToStep(currentStep + 1)}
                className="h-11 px-8"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                data-testid="generate-project-btn"
                onClick={generateProject}
                disabled={generating || !selectedHardware}
                className="h-11 px-8 shadow-lg shadow-primary/25"
              >
                {generating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartProjectBuilder;
