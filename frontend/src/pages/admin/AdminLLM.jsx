import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Brain, Key, ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLLM = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [providers, setProviders] = useState([]);
  const [currentSettings, setCurrentSettings] = useState(null);
  
  const [selectedProvider, setSelectedProvider] = useState("gemini");
  const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");
  const [apiKeyType, setApiKeyType] = useState("emergent");
  const [customApiKey, setCustomApiKey] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [providersRes, settingsRes] = await Promise.all([
        axios.get(`${API}/llm-providers`),
        axios.get(`${API}/admin/llm-settings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setProviders(providersRes.data.providers);
      setCurrentSettings(settingsRes.data);

      // Set form values from current settings
      if (settingsRes.data) {
        setSelectedProvider(settingsRes.data.provider || "gemini");
        setSelectedModel(settingsRes.data.model || "gemini-3-flash-preview");
        setApiKeyType(settingsRes.data.api_key_type || "emergent");
      }
    } catch (error) {
      console.error("Failed to load LLM settings:", error);
      toast.error("Failed to load LLM settings");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (providerId) => {
    setSelectedProvider(providerId);
    // Set default model for the provider
    const provider = providers.find((p) => p.id === providerId);
    if (provider && provider.models.length > 0) {
      setSelectedModel(provider.models[0].id);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(
        `${API}/admin/llm-settings`,
        {
          provider: selectedProvider,
          model: selectedModel,
          api_key_type: apiKeyType,
          custom_api_key: apiKeyType === "custom" ? customApiKey : null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("LLM settings saved successfully");
      loadData();
    } catch (error) {
      console.error("Failed to save LLM settings:", error);
      toast.error("Failed to save LLM settings");
    } finally {
      setSaving(false);
    }
  };

  const getCurrentProvider = () => {
    return providers.find((p) => p.id === selectedProvider);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            LLM Configuration
          </h1>
          <p className="text-muted-foreground">
            Configure the AI model used for code generation
          </p>
        </div>

        {/* Current Status */}
        <Card className="bg-card border border-border mb-6">
          <CardHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Current Configuration</h3>
                <p className="text-sm text-muted-foreground">Active LLM settings for code generation</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Provider</p>
                <p className="font-medium text-foreground capitalize">{currentSettings?.provider || "Not set"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Model</p>
                <p className="font-medium text-foreground">{currentSettings?.model || "Not set"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">API Key</p>
                <Badge variant={currentSettings?.api_key_type === "emergent" ? "default" : "secondary"}>
                  {currentSettings?.api_key_type === "emergent" ? "Emergent Key" : "Custom Key"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Form */}
        <Card className="bg-card border border-border">
          <CardHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">LLM Settings</h3>
                <p className="text-sm text-muted-foreground">Configure the AI provider and model</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Provider Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">AI Provider</label>
              <RadioGroup
                value={selectedProvider}
                onValueChange={handleProviderChange}
                className="grid grid-cols-3 gap-3"
              >
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedProvider === provider.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={provider.id} id={provider.id} className="sr-only" />
                    <label htmlFor={provider.id} className="cursor-pointer">
                      <p className="font-medium text-foreground">{provider.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {provider.models.length} models available
                      </p>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {getCurrentProvider()?.models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* API Key Configuration */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">API Key</label>
              <RadioGroup
                value={apiKeyType}
                onValueChange={setApiKeyType}
                className="space-y-2"
              >
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    apiKeyType === "emergent"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="emergent" id="emergent" className="mt-1" />
                    <label htmlFor="emergent" className="cursor-pointer flex-1">
                      <p className="font-medium text-foreground">Use Emergent LLM Key</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Use the platform's built-in API key (recommended)
                      </p>
                    </label>
                    <Badge variant="default" className="text-xs">Recommended</Badge>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    apiKeyType === "custom"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="custom" id="custom" className="mt-1" />
                    <label htmlFor="custom" className="cursor-pointer flex-1">
                      <p className="font-medium text-foreground">Use Custom API Key</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Use your own API key from the selected provider
                      </p>
                    </label>
                  </div>
                </div>
              </RadioGroup>

              {apiKeyType === "custom" && (
                <div className="pt-2">
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="pl-10 h-11"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your API key will be encrypted and stored securely
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="h-11 px-8"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLLM;
