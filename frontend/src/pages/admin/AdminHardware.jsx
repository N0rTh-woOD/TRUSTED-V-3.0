import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, Package, ArrowLeft, Upload, Image } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminHardware = () => {
  const { token } = useAuth();
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingHardware, setEditingHardware] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    core: "",
    clock_speed: "",
    memory: "",
    flash: "",
    description: "",
    image_url: "",
    price: "",
    peripherals: [],
  });

  useEffect(() => {
    loadHardware();
  }, []);

  const loadHardware = async () => {
    try {
      const response = await axios.get(`${API}/hardware`);
      setHardware(response.data);
    } catch (error) {
      toast.error("Failed to load hardware");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hw) => {
    setEditingHardware(hw);
    setFormData(hw);
    setShowDialog(true);
  };

  const handleAdd = () => {
    setEditingHardware(null);
    setFormData({
      name: "",
      manufacturer: "",
      core: "",
      clock_speed: "",
      memory: "",
      flash: "",
      description: "",
      image_url: "",
      price: "",
      peripherals: [],
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingHardware) {
        await axios.put(`${API}/admin/hardware/${editingHardware.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Hardware updated successfully");
      } else {
        await axios.post(`${API}/admin/hardware`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Hardware added successfully");
      }
      setShowDialog(false);
      loadHardware();
    } catch (error) {
      toast.error("Failed to save hardware");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hardware?")) return;

    try {
      await axios.delete(`${API}/admin/hardware/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Hardware deleted successfully");
      loadHardware();
    } catch (error) {
      toast.error("Failed to delete hardware");
    }
  };

  const handleImageUpload = async (hwId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${API}/admin/hardware/${hwId}/upload-image`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully");
      loadHardware();
    } catch (error) {
      toast.error("Failed to upload image");
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
              Hardware Management
            </h1>
            <p className="text-muted-foreground">
              Manage RISC-V development boards
            </p>
          </div>
          <Button
            data-testid="add-hardware-btn"
            onClick={handleAdd}
            className="h-11 px-6 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hardware
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hardware.map((hw) => (
            <Card
              key={hw.id}
              data-testid={`hardware-item-${hw.id}`}
              className="bg-card border border-border"
            >
              <CardHeader className="p-6 pb-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {hw.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {hw.manufacturer}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      data-testid={`edit-btn-${hw.id}`}
                      onClick={() => handleEdit(hw)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-btn-${hw.id}`}
                      onClick={() => handleDelete(hw.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Image preview */}
                {hw.image_url && (
                  <div className="mb-4 rounded-lg overflow-hidden h-32 bg-slate-100">
                    <img src={hw.image_url.startsWith("/api") ? `${BACKEND_URL}${hw.image_url}` : hw.image_url} alt={hw.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="space-y-2 text-sm">
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
                  {hw.price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium text-primary">{hw.price}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hw.peripherals.slice(0, 3).map((p, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {p.name}
                    </Badge>
                  ))}
                  {hw.peripherals.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{hw.peripherals.length - 3} more
                    </Badge>
                  )}
                </div>
                {/* Upload image button */}
                <div className="mt-3">
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleImageUpload(hw.id, e.target.files[0])} />
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      <Upload className="w-3.5 h-3.5" />{hw.image_url ? "Change Image" : "Upload Image"}
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingHardware ? "Edit Hardware" : "Add Hardware"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="SiFive HiFive1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Manufacturer *</label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="SiFive"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Core *</label>
                  <Input
                    value={formData.core}
                    onChange={(e) => setFormData({ ...formData, core: e.target.value })}
                    placeholder="RISC-V E31"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Clock Speed *</label>
                  <Input
                    value={formData.clock_speed}
                    onChange={(e) => setFormData({ ...formData, clock_speed: e.target.value })}
                    placeholder="320 MHz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Memory *</label>
                  <Input
                    value={formData.memory}
                    onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                    placeholder="16 KB"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Flash *</label>
                  <Input
                    value={formData.flash}
                    onChange={(e) => setFormData({ ...formData, flash: e.target.value })}
                    placeholder="4 MB"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Price</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$59"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Arduino-compatible dev board..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
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

export default AdminHardware;
