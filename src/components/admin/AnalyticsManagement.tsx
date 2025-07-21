
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsManagement = () => {
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-green-800">System Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Average Delay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">3.2 min</div>
            <p className="text-sm text-gray-600">Average bus delay time</p>
            <div className="mt-4 text-sm text-red-600">↑ 0.5 min from last week</div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">87%</div>
            <p className="text-sm text-gray-600">Average fleet utilization</p>
            <div className="mt-4 text-sm text-green-600">↑ 5% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Recent Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Bus KU-01 maintenance completed", user: "System", time: "2 hours ago" },
              { action: "Driver schedule updated", user: "Admin User", time: "4 hours ago" },
              { action: "Emergency alert resolved", user: "Admin User", time: "1 day ago" },
              { action: "New route added", user: "Admin User", time: "2 days ago" }
            ].map((log, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-green-50 rounded-lg gap-2">
                <div>
                  <p className="text-sm font-medium text-green-800">{log.action}</p>
                  <p className="text-xs text-green-600">by {log.user}</p>
                </div>
                <p className="text-xs text-gray-500">{log.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsManagement;
