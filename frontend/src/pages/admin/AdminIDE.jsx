import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, Download, ArrowLeft, Upload, CheckCircle2, AlertCircle, FileUp } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminIDE = () => {
  const { token } = useAuth();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingIDE, setEditingIDE] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRefs = useRef({});
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    platform: "",
    download_url: "#",
    size: "Pending",
    description: "",
  });

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const response = await axios.get(`${API}/ide-downloads`);
      setDownloads(response.data);
    } catch (error) {
      console.error("Failed to load IDE downloads:", error);
      toast.error("Failed to load IDE downloads");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ide) => {
    setEditingIDE(ide);
    setFormData(ide);
    setShowDialog(true);
  };

  const handleAdd = () => {
    setEditingIDE(null);
    setFormData({
      name: "TrusteD-V IDE — Jarvyn",
      version: "1.2.0",
      platform: "",
      download_url: "#",
      size: "Pending",
      description: "",
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingIDE) {
        await axios.put(`${API}/admin/ide-downloads/${editingIDE.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("IDE download updated successfully");
      } else {
        await axios.post(`${API}/admin/ide-downloads`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("IDE download added successfully");
      }
      setShowDialog(false);
      loadDownloads();
    } catch (error) {
      console.error("Failed to save IDE download:", error);
      toast.error("Failed to save IDE download");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this IDE download?")) return;

    try {
      await axios.delete(`${API}/admin/ide-downloads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("IDE download deleted successfully");
      loadDownloads();
    } catch (error) {
      console.error("Failed to delete IDE download:", error);
      toast.error("Failed to delete IDE download");
    }
  };

  const handleFileUpload = async (ideId, file) => {
    if (!file) return;

    setUploadingId(ideId);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API}/admin/ide-downloads/${ideId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      toast.success(`Binary uploaded successfully! Size: ${response.data.size}`);
      loadDownloads();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.response?.data?.detail || "Failed to upload binary");
    } finally {
      setUploadingId(null);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = (ideId) => {
    if (fileInputRefs.current[ideId]) {
      fileInputRefs.current[ideId].click();
    }
  };

  const getPlatformIcon = (platform) => {
    if (platform.toLowerCase().includes("windows")) return "🪟";
    if (platform.toLowerCase().includes("mac")) return "🍎";
    return "🐧";
  };

  const hasUploadedBinary = (ide) => {
    return ide.download_url && ide.download_url !== "#" && ide.filename;
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
              IDE Downloads
            </h1>
            <p className="text-muted-foreground">
              Manage IDE versions and upload binary files for Windows, macOS, and Linux
            </p>
          </div>
          <Button
            data-testid="add-ide-btn"
            onClick={handleAdd}
            className="h-11 px-6 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add IDE Version
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloads.map((ide) => (
            <Card
              key={ide.id}
              data-testid={`ide-item-${ide.id}`}
              className="bg-card border border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-2xl">
                    {getPlatformIcon(ide.platform)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      data-testid={`edit-ide-btn-${ide.id}`}
                      onClick={() => handleEdit(ide)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      data-testid={`delete-ide-btn-${ide.id}`}
                      onClick={() => handleDelete(ide.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{ide.platform}</h3>
                  <Badge variant="secondary" className="text-xs">v{ide.version}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {ide.description}
                </p>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium text-foreground">{ide.size}</span>
                </div>

                {/* Binary Status */}
                <div className="border-t border-border pt-4 mt-4">
                  {hasUploadedBinary(ide) ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Binary uploaded</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-amber-600 mb-3">
                      <AlertCircle className="w-4 h-4" />
                      <span>No binary uploaded</span>
                    </div>
                  )}

                  {/* Upload Progress */}
                  {uploadingId === ide.id && (
                    <div className="mb-3">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  {/* File Input (hidden) */}
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[ide.id] = el)}
                    className="hidden"
                    accept=".exe,.dmg,.pkg,.deb,.rpm,.tar.gz,.zip,.AppImage"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(ide.id, file);
                      e.target.value = "";
                    }}
                  />

                  {/* Upload Button */}
                  <Button
                    variant={hasUploadedBinary(ide) ? "outline" : "default"}
                    size="sm"
                    className="w-full"
                    disabled={uploadingId === ide.id}
                    onClick={() => triggerFileInput(ide.id)}
                  >
                    {uploadingId === ide.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="w-4 h-4 mr-2" />
                        {hasUploadedBinary(ide) ? "Replace Binary" : "Upload Binary"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {downloads.length === 0 && (
          <Card className="bg-card border border-border">
            <CardContent className="p-16 text-center">
              <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No IDE downloads configured</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add IDE versions for Windows, macOS, and Linux
              </p>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingIDE ? "Edit IDE Download" : "Add IDE Download"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="TrusteD-V IDE — Jarvyn"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Version *</label>
                  <Input
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="1.2.0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Platform *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Select platform</option>
                    <option value="Windows">Windows</option>
                    <option value="macOS">macOS</option>
                    <option value="Linux">Linux</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete IDE with Rust toolchain, debugger, and RISC-V emulator"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                After saving, use the "Upload Binary" button on the card to upload the installer file.
              </p>
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

export default AdminIDE;
