import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Edit, Trash2, Database, ArrowLeft, Filter } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COMPONENT_TYPES = ["RTOS", "BSP", "SDK", "Driver", "Bootloader", "Framework", "Library"];

const typeColors = {
  RTOS: "bg-purple-100 text-purple-700",
  BSP: "bg-blue-100 text-blue-700",
  SDK: "bg-green-100 text-green-700",
  Driver: "bg-orange-100 text-orange-700",
  Bootloader: "bg-red-100 text-red-700",
  Framework: "bg-teal-100 text-teal-700",
  Library: "bg-yellow-100 text-yellow-700",
};
const typeLabel = (type) => (type === "SDK" ? "AI Engines" : type);

const AdminSoftware = () => {
  const { token } = useAuth();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    type: "SDK",
    version: "",
    description: "",
    compatible_cores: [],
    compatible_hardware: [],
    features: [],
    logo_url: "",
    download_url: "",
    documentation_url: "",
  });

  useEffect(() => {
    loadComponents();
  }, [filterType]);

  const loadComponents = async () => {
    try {
      const url = filterType === "all" 
        ? `${API}/software-components`
        : `${API}/software-components?component_type=${filterType}`;
      const response = await axios.get(url);
      setComponents(response.data);
    } catch (error) {
      toast.error("Failed to load software components");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setFormData({
      ...component,
      compatible_cores: component.compatible_cores || [],
      compatible_hardware: component.compatible_hardware || [],
      features: component.features || [],
    });
    setShowDialog(true);
  };

  const handleAdd = () => {
    setEditingComponent(null);
    setFormData({
      name: "",
      type: "SDK",
      version: "",
      description: "",
      compatible_cores: [],
      compatible_hardware: [],
      features: [],
      logo_url: "",
      download_url: "",
      documentation_url: "",
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        compatible_cores: typeof formData.compatible_cores === 'string' 
          ? formData.compatible_cores.split(',').map(s => s.trim()).filter(Boolean)
          : formData.compatible_cores,
        features: typeof formData.features === 'string'
          ? formData.features.split(',').map(s => s.trim()).filter(Boolean)
          : formData.features,
      };

      if (editingComponent) {
        await axios.put(`${API}/admin/software-components/${editingComponent.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Component updated successfully");
      } else {
        await axios.post(`${API}/admin/software-components`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Component added successfully");
      }
      setShowDialog(false);
      loadComponents();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to save component");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this component?")) return;

    try {
      await axios.delete(`${API}/admin/software-components/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Component deleted successfully");
      loadComponents();
    } catch (error) {
      toast.error("Failed to delete component");
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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Software Components
            </h1>
            <p className="text-muted-foreground">
              Manage BSPs, AI Engines, Drivers, Bootloaders, and Libraries
            </p>
          </div>
          <Button
            data-testid="add-software-btn"
            onClick={handleAdd}
            className="h-11 px-6 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Component
          </Button>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {COMPONENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{typeLabel(type)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {components.map((component) => (
            <Card
              key={component.id}
              data-testid={`software-item-${component.id}`}
              className="bg-card border border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {component.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          v{component.version}
                        </Badge>
                        <Badge className={`text-xs ${typeColors[component.type] || 'bg-gray-100 text-gray-700'}`}>
                          {typeLabel(component.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {component.description}
                      </p>
                      
                      {component.features?.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {component.features.map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {component.compatible_cores?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Compatible Cores:</p>
                          <div className="flex flex-wrap gap-1">
                            {component.compatible_cores.map((core, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {core}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      data-testid={`edit-btn-${component.id}`}
                      onClick={() => handleEdit(component)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-btn-${component.id}`}
                      onClick={() => handleDelete(component.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {components.length === 0 && (
          <Card className="bg-card border border-border">
            <CardContent className="p-16 text-center">
              <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No software components found</p>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingComponent ? "Edit Component" : "Add Component"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Code Engine"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type *</label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPONENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{typeLabel(type)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Version *</label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="5.1.2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="IoT Development Framework for ESP32..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Compatible Cores (comma-separated)</label>
                <Input
                  value={Array.isArray(formData.compatible_cores) ? formData.compatible_cores.join(", ") : formData.compatible_cores}
                  onChange={(e) => setFormData({ ...formData, compatible_cores: e.target.value })}
                  placeholder="RISC-V E31, RISC-V Single Core 32-bit"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Features (comma-separated)</label>
                <Input
                  value={Array.isArray(formData.features) ? formData.features.join(", ") : formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="WiFi stack, BLE support, RTOS integration"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Download URL</label>
                  <Input
                    value={formData.download_url || ""}
                    onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Documentation URL</label>
                  <Input
                    value={formData.documentation_url || ""}
                    onChange={(e) => setFormData({ ...formData, documentation_url: e.target.value })}
                    placeholder="https://docs.example.com/..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminSoftware;
