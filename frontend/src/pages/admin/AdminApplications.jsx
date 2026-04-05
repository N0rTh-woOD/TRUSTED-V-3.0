import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { 
  Loader2, ArrowLeft, Cpu, Building2, CheckCircle2, 
  XCircle, Clock, Eye, Trash2, MessageSquare
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminApplications = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("board-support");
  const [boardRequests, setBoardRequests] = useState([]);
  const [partnerApps, setPartnerApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [boardRes, partnerRes] = await Promise.all([
        axios.get(`${API}/admin/applications/board-support`, { headers }),
        axios.get(`${API}/admin/applications/partnership`, { headers }),
      ]);
      setBoardRequests(boardRes.data);
      setPartnerApps(partnerRes.data);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type, id, status) => {
    const endpoint = type === "board" 
      ? `${API}/admin/applications/board-support/${id}`
      : `${API}/admin/applications/partnership/${id}`;
    try {
      await axios.put(endpoint, { status, admin_notes: adminNotes }, { headers });
      toast.success(`Application ${status}`);
      setShowDialog(false);
      setSelectedItem(null);
      setAdminNotes("");
      loadData();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const deleteItem = async (type, id) => {
    const endpoint = type === "board" 
      ? `${API}/admin/applications/board-support/${id}`
      : `${API}/admin/applications/partnership/${id}`;
    try {
      await axios.delete(endpoint, { headers });
      toast.success("Deleted");
      loadData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      reviewed: "bg-blue-100 text-blue-800 border-blue-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    const icons = {
      pending: Clock,
      reviewed: Eye,
      approved: CheckCircle2,
      rejected: XCircle,
    };
    const Icon = icons[status] || Clock;
    return (
      <Badge className={`${colors[status] || colors.pending} gap-1`}>
        <Icon className="w-3 h-3" />{status}
      </Badge>
    );
  };

  const boardPending = boardRequests.filter(r => r.status === "pending").length;
  const partnerPending = partnerApps.filter(a => a.status === "pending").length;

  if (loading) {
    return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-applications-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Applications</h1>
            <p className="text-muted-foreground">Manage board support requests and partnership applications</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("board-support")}
            data-testid="tab-board-support"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "board-support" ? "bg-primary text-white shadow-md" : "bg-white text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <Cpu className="w-4 h-4" />
            Board Support Requests
            {boardPending > 0 && (
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activeTab === "board-support" ? "bg-white text-primary" : "bg-red-500 text-white"
              }`}>{boardPending}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("partnership")}
            data-testid="tab-partnership"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "partnership" ? "bg-primary text-white shadow-md" : "bg-white text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Partnership Applications
            {partnerPending > 0 && (
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activeTab === "partnership" ? "bg-white text-primary" : "bg-red-500 text-white"
              }`}>{partnerPending}</span>
            )}
          </button>
        </div>

        {/* Board Support Requests */}
        {activeTab === "board-support" && (
          <div className="space-y-4">
            {boardRequests.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No board support requests yet</CardContent></Card>
            ) : (
              boardRequests.map((req) => (
                <Card key={req.id} data-testid={`board-request-${req.id}`} className={`hover:shadow-md transition-shadow ${req.status === "pending" ? "border-l-4 border-l-yellow-400" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{req.board_name}</h3>
                          {getStatusBadge(req.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span><strong>Company:</strong> {req.company_name}</span>
                          <span><strong>Contact:</strong> {req.contact_name}</span>
                          <span><strong>Email:</strong> {req.email}</span>
                          <span><strong>Manufacturer:</strong> {req.board_manufacturer}</span>
                          <span><strong>Submitted:</strong> {new Date(req.submitted_at).toLocaleDateString()}</span>
                        </div>
                        {req.use_case && <p className="text-xs text-muted-foreground mt-2"><strong>Use Case:</strong> {req.use_case}</p>}
                        {req.admin_notes && <p className="text-xs text-blue-600 mt-2"><strong>Admin Notes:</strong> {req.admin_notes}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedItem({...req, type: "board"}); setAdminNotes(req.admin_notes || ""); setShowDialog(true); }}>
                          <MessageSquare className="w-3.5 h-3.5 mr-1" />Review
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50" onClick={() => deleteItem("board", req.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Partnership Applications */}
        {activeTab === "partnership" && (
          <div className="space-y-4">
            {partnerApps.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No partnership applications yet</CardContent></Card>
            ) : (
              partnerApps.map((app) => (
                <Card key={app.id} data-testid={`partner-app-${app.id}`} className={`hover:shadow-md transition-shadow ${app.status === "pending" ? "border-l-4 border-l-yellow-400" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{app.company_name}</h3>
                          {getStatusBadge(app.status)}
                          {app.partnership_type && <Badge variant="outline">{app.partnership_type}</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span><strong>Contact:</strong> {app.contact_name}</span>
                          <span><strong>Email:</strong> {app.email}</span>
                          {app.phone && <span><strong>Phone:</strong> {app.phone}</span>}
                          {app.website && <span><strong>Website:</strong> {app.website}</span>}
                          <span><strong>Submitted:</strong> {new Date(app.submitted_at).toLocaleDateString()}</span>
                        </div>
                        {app.products && <p className="text-xs text-muted-foreground mt-2"><strong>Products:</strong> {app.products}</p>}
                        {app.admin_notes && <p className="text-xs text-blue-600 mt-2"><strong>Admin Notes:</strong> {app.admin_notes}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedItem({...app, type: "partner"}); setAdminNotes(app.admin_notes || ""); setShowDialog(true); }}>
                          <MessageSquare className="w-3.5 h-3.5 mr-1" />Review
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50" onClick={() => deleteItem("partner", app.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground">{selectedItem.type === "board" ? selectedItem.board_name : selectedItem.company_name}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Admin Notes</label>
                <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} placeholder="Add notes about this application..." rows={3} data-testid="admin-notes-input" />
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => updateStatus(selectedItem?.type, selectedItem?.id, "rejected")} data-testid="reject-btn">
              <XCircle className="w-4 h-4 mr-1" />Reject
            </Button>
            <Button variant="outline" onClick={() => updateStatus(selectedItem?.type, selectedItem?.id, "reviewed")} data-testid="mark-reviewed-btn">
              <Eye className="w-4 h-4 mr-1" />Mark Reviewed
            </Button>
            <Button onClick={() => updateStatus(selectedItem?.type, selectedItem?.id, "approved")} data-testid="approve-btn">
              <CheckCircle2 className="w-4 h-4 mr-1" />Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
