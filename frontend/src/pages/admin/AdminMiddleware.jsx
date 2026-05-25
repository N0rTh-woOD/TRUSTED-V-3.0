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
import { Loader2, Plus, Edit, Trash2, Layers, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Middleware Management
            </h1>
            <p className="text-muted-foreground">
              Manage RTOS, frameworks, and middleware
            </p>
          </div>
          <Button
            data-testid="add-middleware-btn"
            onClick={handleAdd}
            className="h-11 px-6 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Middleware
          </Button>
        </div>

        <div className="space-y-4">
          {middleware.map((mw) => (
            <Card
              key={mw.id}
              data-testid={`middleware-item-${mw.id}`}
              className="bg-card border border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {mw.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          v{mw.version}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {mw.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
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
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-btn-${mw.id}`}
                      onClick={() => handleDelete(mw.id)}
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

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingMiddleware ? "Edit Middleware" : "Add Middleware"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="FreeRTOS"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type *</label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="RTOS"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Version *</label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="10.5.1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Popular real-time operating system..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Compatible Cores (comma-separated) *</label>
                <Input
                  value={Array.isArray(formData.compatible_cores) ? formData.compatible_cores.join(", ") : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compatible_cores: e.target.value.split(",").map((c) => c.trim()),
                    })
                  }
                  placeholder="RISC-V E31, RISC-V Single Core 32-bit"
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

export default AdminMiddleware;
