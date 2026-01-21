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
import { Loader2, Plus, Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

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
      console.error("Failed to load hardware:", error);
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
      console.error("Failed to save hardware:", error);
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
      console.error("Failed to delete hardware:", error);
      toast.error("Failed to delete hardware");
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
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-mono font-bold uppercase tracking-tight text-3xl text-foreground/90 mb-2">
              Hardware Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage RISC-V development boards
            </p>
          </div>
          <Button
            data-testid="add-hardware-btn"
            onClick={handleAdd}
            className="rounded-sm font-mono uppercase tracking-wider text-xs h-10 px-6 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
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
              className="bg-card border border-border/50 rounded-sm"
            >
              <CardHeader className="border-b border-border/40 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-mono font-bold text-base text-foreground/90">
                        {hw.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
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
                      className="rounded-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-btn-${hw.id}`}
                      onClick={() => handleDelete(hw.id)}
                      variant="outline"
                      size="sm"
                      className="rounded-sm text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Core:</span>
                    <span className="font-mono text-foreground">{hw.core}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="font-mono text-foreground">{hw.clock_speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memory:</span>
                    <span className="font-mono text-foreground">{hw.memory}</span>
                  </div>
                  {hw.price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-mono text-primary">{hw.price}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl bg-card border border-border/50 rounded-sm">
            <DialogHeader>
              <DialogTitle className="font-mono font-bold uppercase tracking-tight text-xl">
                {editingHardware ? "Edit Hardware" : "Add Hardware"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="SiFive HiFive1"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Manufacturer *
                  </label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                    placeholder="SiFive"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Core *
                  </label>
                  <Input
                    value={formData.core}
                    onChange={(e) => setFormData({ ...formData, core: e.target.value })}
                    placeholder="RISC-V E31"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Clock Speed *
                  </label>
                  <Input
                    value={formData.clock_speed}
                    onChange={(e) =>
                      setFormData({ ...formData, clock_speed: e.target.value })
                    }
                    placeholder="320 MHz"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Memory *
                  </label>
                  <Input
                    value={formData.memory}
                    onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                    placeholder="16 KB"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Flash *
                  </label>
                  <Input
                    value={formData.flash}
                    onChange={(e) => setFormData({ ...formData, flash: e.target.value })}
                    placeholder="4 MB"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Price
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$59"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Description *
                </label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Arduino-compatible dev board..."
                  className="bg-muted/20 border-border/50 rounded-sm"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Image URL
                </label>
                <Input
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="bg-muted/20 border-border/50 rounded-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="rounded-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="rounded-sm font-mono uppercase tracking-wider text-xs"
              >
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