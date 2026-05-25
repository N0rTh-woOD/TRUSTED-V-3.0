import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    loadChatHistory();
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`${API}/chat/history/${sessionId}`);
      if (response.data.messages && response.data.messages.length > 0) {
        setMessages(response.data.messages);
      } else {
        // Show welcome message
        setMessages([{
          role: "assistant",
          content: "Welcome to the RISC-V Rust AI Assistant! I can help you:\n\n• Find the perfect RISC-V hardware for your project\n• Recommend suitable middleware and RTOS\n• Generate project templates with drivers and bootloaders\n\n**Tell me about your project requirements to get started!**",
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
    }
  };
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/chat`, {
        message: input,
        session_id: sessionId
      });
      
      const aiMessage = {
        role: "assistant",
        content: response.data.response,
        timestamp: new Date().toISOString(),
        detected_hardware: response.data.detected_hardware,
        detected_middleware: response.data.detected_middleware
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (response.data.detected_hardware && response.data.detected_hardware.length > 0) {
        toast.success(`Detected hardware: ${response.data.detected_hardware.join(", ")}`);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
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
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col py-6 px-6 md:px-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-mono font-bold uppercase tracking-tight text-3xl md:text-4xl text-foreground/90 mb-2">
            AI Requirements Analyzer
          </h1>
          <p className="text-muted-foreground text-sm">
            Describe your embedded systems project and get intelligent hardware and middleware recommendations
          </p>
        </div>
        
        {/* Chat Messages */}
        <Card className="flex-1 bg-card border border-border/50 rounded-sm mb-4 flex flex-col">
          <CardContent className="p-6 flex-1 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
              <div 
                key={index}
                data-testid={`message-${msg.role}-${index}`}
                className={`flex gap-4 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50"
                } rounded-sm p-4`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  
                  {msg.detected_hardware && msg.detected_hardware.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.detected_hardware.map((hw, i) => (
                        <Badge 
                          key={i} 
                          data-testid={`detected-hardware-${i}`}
                          variant="secondary" 
                          className="font-mono text-xs"
                        >
                          {hw}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {msg.detected_middleware && msg.detected_middleware.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.detected_middleware.map((mw, i) => (
                        <Badge 
                          key={i}
                          data-testid={`detected-middleware-${i}`}
                          variant="outline" 
                          className="font-mono text-xs"
                        >
                          {mw}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-sm bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-sm p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>
        
        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            data-testid="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your embedded systems project..."
            disabled={loading}
            className="bg-muted/20 border-border/50 font-mono text-sm focus:ring-1 focus:ring-primary rounded-sm h-12"
          />
          <Button
            data-testid="send-message-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="rounded-sm font-mono uppercase tracking-wider text-xs h-12 px-6 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;