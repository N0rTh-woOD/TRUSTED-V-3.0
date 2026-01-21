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
import { Loader2, Plus, Edit, Trash2, Layers } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminMiddleware = () => {
  const { token } = useAuth();
  const [middleware, setMiddleware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingMiddleware, setEditingMiddleware] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    version: "",
    description: "",
    compatible_cores: [],
    logo_url: "",
  });

  useEffect(() => {
    loadMiddleware();
  }, []);

  const loadMiddleware = async () => {
    try {
      const response = await axios.get(`${API}/middleware`);
      setMiddleware(response.data);
    } catch (error) {
      console.error("Failed to load middleware:", error);
      toast.error("Failed to load middleware");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mw) => {
    setEditingMiddleware(mw);
    setFormData(mw);
    setShowDialog(true);
  };

  const handleAdd = () => {
    setEditingMiddleware(null);
    setFormData({
      name: "",
      type: "",
      version: "",
      description: "",
      compatible_cores: [],
      logo_url: "",
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingMiddleware) {
        await axios.put(`${API}/admin/middleware/${editingMiddleware.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Middleware updated successfully");
      } else {
        await axios.post(`${API}/admin/middleware`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Middleware added successfully");
      }
      setShowDialog(false);
      loadMiddleware();
    } catch (error) {
      console.error("Failed to save middleware:", error);
      toast.error("Failed to save middleware");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this middleware?")) return;

    try {
      await axios.delete(`${API}/admin/middleware/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Middleware deleted successfully");
      loadMiddleware();
    } catch (error) {
      console.error("Failed to delete middleware:", error);
      toast.error("Failed to delete middleware");
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
              Middleware Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage RTOS, frameworks, and middleware
            </p>
          </div>
          <Button
            data-testid="add-middleware-btn"
            onClick={handleAdd}
            className="rounded-sm font-mono uppercase tracking-wider text-xs h-10 px-6 shadow-[0_0_10px_rgba(183,65,14,0.3)] hover:shadow-[0_0_20px_rgba(183,65,14,0.5)] transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Middleware
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {middleware.map((mw) => (
            <Card
              key={mw.id}
              data-testid={`middleware-item-${mw.id}`}
              className="bg-card border border-border/50 rounded-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-sm bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono font-bold text-base text-foreground/90">
                          {mw.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          v{mw.version}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {mw.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {mw.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mw.compatible_cores.map((core, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {core}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      data-testid={`edit-btn-${mw.id}`}
                      onClick={() => handleEdit(mw)}
                      variant="outline"
                      size="sm"
                      className="rounded-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-btn-${mw.id}`}
                      onClick={() => handleDelete(mw.id)}
                      variant="outline"
                      size="sm"
                      className="rounded-sm text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
                {editingMiddleware ? "Edit Middleware" : "Add Middleware"}
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
                    placeholder="FreeRTOS"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                    Type *
                  </label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="RTOS"
                    className="bg-muted/20 border-border/50 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Version *
                </label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="10.5.1"
                  className="bg-muted/20 border-border/50 rounded-sm"
                />
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
                  placeholder="Popular real-time operating system..."
                  className="bg-muted/20 border-border/50 rounded-sm"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-2 block">
                  Compatible Cores (comma-separated) *
                </label>
                <Input
                  value={Array.isArray(formData.compatible_cores) ? formData.compatible_cores.join(", ") : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compatible_cores: e.target.value.split(",").map((c) => c.trim()),
                    })
                  }
                  placeholder="RISC-V E31, RISC-V Single Core 32-bit"
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

export default AdminMiddleware;