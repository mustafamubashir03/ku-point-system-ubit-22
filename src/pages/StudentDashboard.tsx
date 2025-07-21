
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  MapPin, 
  Bell, 
  MessageCircle, 
  Star, 
  Search, 
  AlertTriangle, 
  LogOut,
  Navigation,
  Clock,
  Route,
  User,
  Package
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bus KU-01 arriving in 3 minutes", time: "2 min ago", type: "info" },
    { id: 2, message: "Route change: Bus KU-03 will skip Library stop", time: "1 hour ago", type: "warning" }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/student/login');
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

  const sendEmergencyAlert = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Admin has been notified of your emergency",
      variant: "destructive",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/8df6e828-0286-47ca-b8ca-595cbdc1ba49.png" 
              alt="Karachi University Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold text-green-800">Student Dashboard</h1>
              <p className="text-sm text-green-600">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={sendEmergencyAlert}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 mb-6 bg-green-50">
            <TabsTrigger value="tracking" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <MapPin className="h-4 w-4 mr-2" />
              Live Tracking
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Route className="h-4 w-4 mr-2" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="lost-found" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Lost & Found
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Live Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GoogleMap height="500px" />
              </div>
              <div className="space-y-4">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">{notif.message}</p>
                        <p className="text-xs text-green-600 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Next Arrivals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium">KU-01</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">3 min</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium">KU-02</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">8 min</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-medium">KU-03</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">12 min</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Route A - Main Campus",
                  buses: ["KU-01", "KU-02"],
                  stops: ["Main Gate", "Library", "Engineering Block", "Cafeteria", "Hostel"],
                  duration: "25 min"
                },
                {
                  name: "Route B - Medical Campus",
                  buses: ["KU-03", "KU-04"],
                  stops: ["Main Gate", "Medical Block", "Hospital", "Parking"],
                  duration: "15 min"
                },
                {
                  name: "Route C - Hostel Express",
                  buses: ["KU-05"],
                  stops: ["Main Gate", "Boys Hostel", "Girls Hostel"],
                  duration: "10 min"
                }
              ].map((route, index) => (
                <Card key={index} className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">{route.name}</CardTitle>
                    <CardDescription>Duration: {route.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-green-700 mb-2">Active Buses:</h4>
                        <div className="flex gap-2">
                          {route.buses.map((bus) => (
                            <Badge key={bus} variant="outline" className="border-green-600 text-green-600">
                              {bus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-green-700 mb-2">Stops:</h4>
                        <div className="space-y-1">
                          {route.stops.map((stop, stopIndex) => (
                            <div key={stopIndex} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              {stop}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Submit Feedback</CardTitle>
                  <CardDescription>Rate your bus experience and help us improve</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-green-700">Bus Number</label>
                    <Input placeholder="e.g., KU-01" className="border-green-200 focus:border-green-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Rating</label>
                    <div className="flex space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-yellow-400 cursor-pointer hover:text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Comments</label>
                    <Textarea 
                      placeholder="Share your experience..."
                      className="border-green-200 focus:border-green-400"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Submit Feedback</Button>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { bus: "KU-01", rating: 4, comment: "Clean and on time!", date: "2 days ago" },
                    { bus: "KU-02", rating: 5, comment: "Excellent service", date: "1 week ago" },
                    { bus: "KU-03", rating: 3, comment: "Could be more punctual", date: "2 weeks ago" }
                  ].map((feedback, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            {feedback.bus}
                          </Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-green-600">{feedback.date}</span>
                      </div>
                      <p className="text-sm text-green-800">{feedback.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lost & Found Tab */}
          <TabsContent value="lost-found" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Report Lost Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Item name" className="border-green-200 focus:border-green-400" />
                  <Input placeholder="Bus number (if applicable)" className="border-green-200 focus:border-green-400" />
                  <Textarea 
                    placeholder="Describe the item and where you think you lost it..."
                    className="border-green-200 focus:border-green-400"
                  />
                  <Button className="w-full bg-green-600 hover:bg-green-700">Report Lost Item</Button>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Browse Found Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Search items..." className="border-green-200 focus:border-green-400" />
                      <Button variant="outline" size="icon" className="border-green-600 text-green-600">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { item: "Blue Notebook", bus: "KU-01", date: "Yesterday" },
                        { item: "Black Umbrella", bus: "KU-02", date: "2 days ago" },
                        { item: "Red Water Bottle", bus: "KU-03", date: "1 week ago" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-medium text-green-800">{item.item}</p>
                            <p className="text-sm text-green-600">Found in {item.bus} • {item.date}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-green-600 text-green-600">
                            Claim
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Help & Support</CardTitle>
                <CardDescription>Get help or report issues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-medium text-green-700">Send a Message</h3>
                    <Input placeholder="Subject" className="border-green-200 focus:border-green-400" />
                    <Textarea 
                      placeholder="Describe your issue or question..."
                      className="border-green-200 focus:border-green-400"
                      rows={4}
                    />
                    <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-green-700">Chat History</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {[
                        { message: "Bus tracking not working", response: "We've reset your location. Please try again.", date: "2 days ago" },
                        { message: "Wrong ETA shown", response: "Thank you for reporting. We've updated the system.", date: "1 week ago" }
                      ].map((chat, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">{chat.message}</p>
                          <p className="text-sm text-green-600 mt-1">{chat.response}</p>
                          <p className="text-xs text-gray-500 mt-2">{chat.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-700">Full Name</label>
                    <Input value={user.name} className="border-green-200 focus:border-green-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Email</label>
                    <Input value={user.email} className="border-green-200 focus:border-green-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Student ID</label>
                    <Input value={user.studentId || ''} className="border-green-200 focus:border-green-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Phone Number</label>
                    <Input value={user.phone || ''} className="border-green-200 focus:border-green-400" />
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
