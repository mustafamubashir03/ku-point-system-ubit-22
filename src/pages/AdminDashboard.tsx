
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  Settings, 
  BarChart3, 
  MessageCircle, 
  Shield, 
  LogOut,
  UserCheck,
  AlertTriangle,
  Map
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AdminGoogleMap from "@/components/AdminGoogleMap";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import FleetManagement from "@/components/admin/FleetManagement";
import DriverManagement from "@/components/admin/DriverManagement";
import SupportManagement from "@/components/admin/SupportManagement";
import EmergencyManagement from "@/components/admin/EmergencyManagement";
import AnalyticsManagement from "@/components/admin/AnalyticsManagement";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [buses, setBuses] = useState([
    { id: '1', number: 'KU-01', driver: 'Ahmed Ali', route: 'Route A', status: 'Active', capacity: 45, lastMaintenance: '2024-01-15' },
    { id: '2', number: 'KU-02', driver: 'Hassan Khan', route: 'Route A', status: 'Active', capacity: 45, lastMaintenance: '2024-01-20' },
    { id: '3', number: 'KU-03', driver: 'Usman Sheikh', route: 'Route B', status: 'Maintenance', capacity: 45, lastMaintenance: '2024-01-10' },
  ]);

  const [drivers, setDrivers] = useState([
    { id: '1', name: 'Ahmed Ali', phone: '+92 300 1234567', license: 'ABC123', experience: '5 years', status: 'Active' },
    { id: '2', name: 'Hassan Khan', phone: '+92 301 2345678', license: 'DEF456', experience: '3 years', status: 'Active' },
    { id: '3', name: 'Usman Sheikh', phone: '+92 302 3456789', license: 'GHI789', experience: '7 years', status: 'On Leave' },
  ]);

  const [emergencyAlerts, setEmergencyAlerts] = useState([
    { id: '1', message: 'Emergency alert from Main Gate', time: '5 min ago', status: 'Unresolved' },
    { id: '2', message: 'Emergency alert from Library', time: '2 hours ago', status: 'Resolved' },
  ]);

  const [supportQueries, setSupportQueries] = useState([
    { id: '1', subject: 'Bus tracking not working', status: 'Open', date: '2024-01-25' },
    { id: '2', subject: 'Wrong ETA shown', status: 'Resolved', date: '2024-01-24' },
  ]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <AdminHeader user={user} emergencyAlerts={emergencyAlerts} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-6">
        <AdminStats buses={buses} drivers={drivers} emergencyAlerts={emergencyAlerts} />

        <Tabs defaultValue="fleet" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 mb-6 bg-green-50 w-full overflow-x-auto">
            <TabsTrigger value="fleet" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <Bus className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Fleet</span>
            </TabsTrigger>
            <TabsTrigger value="drivers" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <UserCheck className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Drivers</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <Map className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Live Map</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <AlertTriangle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fleet" className="space-y-6">
            <FleetManagement buses={buses} setBuses={setBuses} />
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <DriverManagement drivers={drivers} setDrivers={setDrivers} />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <AdminGoogleMap height="600px" showControls={true} />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <SupportManagement supportQueries={supportQueries} setSupportQueries={setSupportQueries} />
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <EmergencyManagement emergencyAlerts={emergencyAlerts} setEmergencyAlerts={setEmergencyAlerts} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
