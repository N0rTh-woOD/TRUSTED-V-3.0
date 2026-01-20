import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Send,
  Bot,
  User,
  Cpu,
  Package,
  Download,
  Save,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SmartProjectBuilder = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(
    () =>
      `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef(null);

  // Project configuration
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedHardware, setSelectedHardware] = useState(null);
  const [selectedMiddleware, setSelectedMiddleware] = useState([]);
  const [selectedPeripherals, setSelectedPeripherals] = useState([]);

  // Data
  const [hardware, setHardware] = useState([]);
  const [middleware, setMiddleware] = useState([]);
  const [suggestedHardware, setSuggestedHardware] = useState([]);
  const [compatibleMiddleware, setCompatibleMiddleware] = useState([]);

  useEffect(() => {
    loadData();
    setMessages([
      {
        role: "assistant",
        content:
          "Welcome to the **Smart Project Builder**! 🎯\n\nI'll help you configure the perfect RISC-V project.\n\n**Tell me about your project:**\n• What are you building? (IoT device, edge AI, industrial controller, etc.)\n• What features do you need? (WiFi, camera, display, sensors, etc.)\n• Any performance requirements?\n\nI'll analyze your needs and suggest the best hardware and middleware!",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedHardware) {
      loadCompatibleMiddleware(selectedHardware.core);
    }
  }, [selectedHardware]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadData = async () => {
    try {
      const [hwRes, mwRes] = await Promise.all([
        axios.get(`${API}/hardware`),
        axios.get(`${API}/middleware`),
      ]);
      setHardware(hwRes.data);
      setMiddleware(mwRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load catalog data");
    }
  };

  const loadCompatibleMiddleware = async (core) => {
    try {
      const response = await axios.get(`${API}/middleware/compatible/${core}`);
      setCompatibleMiddleware(response.data);
    } catch (error) {
      console.error("Failed to load compatible middleware:", error);
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
    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        {
          message: input,
          session_id: sessionId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiMessage = {
        role: "assistant",
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Update suggested hardware
      if (response.data.suggested_hardware) {
        setSuggestedHardware(response.data.suggested_hardware);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
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
    setSelectedPeripherals(hw.peripherals.map((p) => p.name));
    toast.success(`Selected: ${hw.name}`);
  };

  const handleMiddlewareToggle = (mwId) => {
    setSelectedMiddleware((prev) =>
      prev.includes(mwId) ? prev.filter((id) => id !== mwId) : [...prev, mwId]
    );
  };

  const handlePeripheralToggle = (peripheral) => {
    setSelectedPeripherals((prev) =>
      prev.includes(peripheral)
        ? prev.filter((p) => p !== peripheral)
        : [...prev, peripheral]
    );
  };

  const handleSaveProject = async () => {
    if (!projectName || !selectedHardware || selectedMiddleware.length === 0) {
      toast.error("Please complete the project configuration");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/projects`,
        {
          name: projectName,
          description: projectDescription,
          hardware_id: selectedHardware.id,
          middleware_ids: selectedMiddleware,
          peripherals: selectedPeripherals,
          requirements: messages
            .filter((m) => m.role === "user")
            .map((m) => m.content)
            .join("\n"),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error("Failed to save project");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* AI Chat Sidebar */}
      <div className="w-[400px] border-r border-border/40 flex flex-col bg-card/30">
        <div className="p-6 border-b border-border/40">
          <h2 className="font-mono font-bold uppercase tracking-tight text-lg text-foreground/90">
            AI Assistant
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Describe your requirements
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              data-testid={`message-${msg.role}-${index}`}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[280px] ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50"
                } rounded-sm p-3`}
              >
                <div className="text-xs leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-sm bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted/50 rounded-sm p-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border/40">
          <div className="flex gap-2">
            <Input
              data-testid="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your project..."
              disabled={loading}
              className="bg-muted/20 border-border/50 font-mono text-xs focus:ring-1 focus:ring-primary rounded-sm h-10"
            />
            <Button
              data-testid="send-message-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              size="sm"
              className="rounded-sm font-mono h-10 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Configuration Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-8">
          {/* Project Details */}
          <div className="mb-8">
            <h1 className="font-mono font-bold uppercase tracking-tight text-3xl text-foreground/90 mb-4">
              Configure Your Project
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Project Name
                </label>
                <Input
                  data-testid="project-name-input"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My RISC-V Project"
                  className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-10"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Description
                </label>
                <Input
                  data-testid="project-description-input"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="IoT sensor node with WiFi"
                  className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-10"
                />
              </div>
            </div>
          </div>

          {/* Hardware Selection */}
          <Card className="bg-card border border-border/50 rounded-sm mb-6">
            <CardHeader className="border-b border-border/40 p-6">
              <h3 className="font-mono font-bold uppercase tracking-tight text-base text-foreground/90 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                Select Hardware Board
              </h3>
              {suggestedHardware.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  AI suggested: {suggestedHardware.map((h) => h.name).join(", ")}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup
                value={selectedHardware?.id}
                onValueChange={(value) => {
                  const hw = hardware.find((h) => h.id === value);
                  if (hw) handleHardwareSelect(hw);
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {(suggestedHardware.length > 0
                    ? suggestedHardware
                    : hardware
                  ).map((hw) => (
                    <div
                      key={hw.id}
                      data-testid={`hardware-card-${hw.id}`}
                      className={`relative border rounded-sm p-4 cursor-pointer transition-all duration-200 ${
                        selectedHardware?.id === hw.id
                          ? "border-primary bg-primary/5 shadow-[0_0_10px_rgba(183,65,14,0.2)]"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                      onClick={() => handleHardwareSelect(hw)}
                    >
                      <RadioGroupItem
                        value={hw.id}
                        id={hw.id}
                        className="absolute top-4 right-4"
                      />

                      {hw.image_url && (
                        <div className="w-full h-32 mb-3 rounded-sm overflow-hidden bg-muted">
                          <img
                            src={hw.image_url}
                            alt={hw.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <h4 className="font-mono font-bold text-sm text-foreground/90 mb-1">
                        {hw.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {hw.manufacturer}
                      </p>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Core:</span>
                          <span className="font-mono text-foreground">
                            {hw.core}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Speed:</span>
                          <span className="font-mono text-foreground">
                            {hw.clock_speed}
                          </span>
                        </div>
                        {hw.price && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-mono text-primary">
                              {hw.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Middleware Selection */}
          {selectedHardware && (
            <Card className="bg-card border border-border/50 rounded-sm mb-6">
              <CardHeader className="border-b border-border/40 p-6">
                <h3 className="font-mono font-bold uppercase tracking-tight text-base text-foreground/90 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Select Middleware
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Compatible with {selectedHardware.core}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {compatibleMiddleware.map((mw) => (
                    <div
                      key={mw.id}
                      data-testid={`middleware-item-${mw.id}`}
                      className={`border rounded-sm p-4 cursor-pointer transition-all duration-200 ${
                        selectedMiddleware.includes(mw.id)
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                      onClick={() => handleMiddlewareToggle(mw.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedMiddleware.includes(mw.id)}
                          onCheckedChange={() => handleMiddlewareToggle(mw.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-mono font-bold text-sm text-foreground/90">
                              {mw.name}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              v{mw.version}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {mw.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {mw.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Peripherals */}
          {selectedHardware && (
            <Card className="bg-card border border-border/50 rounded-sm mb-6">
              <CardHeader className="border-b border-border/40 p-6">
                <h3 className="font-mono font-bold uppercase tracking-tight text-base text-foreground/90">
                  Customize Peripherals
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {selectedHardware.peripherals.map((peripheral, index) => (
                    <div
                      key={index}
                      data-testid={`peripheral-${index}`}
                      className={`border rounded-sm p-3 cursor-pointer transition-all duration-200 ${
                        selectedPeripherals.includes(peripheral.name)
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                      onClick={() => handlePeripheralToggle(peripheral.name)}
                    >
                      <div className="flex items-start gap-2">
                        <Checkbox
                          checked={selectedPeripherals.includes(peripheral.name)}
                          onCheckedChange={() =>
                            handlePeripheralToggle(peripheral.name)
                          }
                          className="mt-0.5"
                        />
                        <div>
                          <p className="font-mono text-xs font-bold text-foreground/90">
                            {peripheral.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
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

          {/* Action Buttons */}
          {selectedHardware && selectedMiddleware.length > 0 && (
            <div className="flex gap-4 justify-end">
              <Button
                data-testid="save-project-btn"
                onClick={handleSaveProject}
                className="rounded-sm font-mono uppercase tracking-wider text-xs h-11 px-8 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Generate
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartProjectBuilder;
