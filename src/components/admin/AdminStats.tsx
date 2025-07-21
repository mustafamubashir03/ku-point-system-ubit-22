
import { Card, CardContent } from "@/components/ui/card";
import { Bus, UserCheck, AlertTriangle } from "lucide-react";

interface AdminStatsProps {
  buses: any[];
  drivers: any[];
  emergencyAlerts: any[];
}

const AdminStats = ({ buses, drivers, emergencyAlerts }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
      <Card className="border-green-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Buses</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800">{buses.length}</p>
            </div>
            <Bus className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-green-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Drivers</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800">{drivers.filter(d => d.status === 'Active').length}</p>
            </div>
            <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-red-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Emergency Alerts</p>
              <p className="text-xl sm:text-2xl font-bold text-red-800">{emergencyAlerts.filter(alert => alert.status === 'Unresolved').length}</p>
            </div>
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
