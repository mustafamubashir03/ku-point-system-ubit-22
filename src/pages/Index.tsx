
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, MapPin, Users, Shield, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleMap from "@/components/GoogleMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/d29bc0f8-0cbb-46f5-9127-a0b3e3830b0f.png" 
              alt="Karachi University Logo" 
              className="h-12 w-12"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-green-800">KU Point Management</h1>
              <p className="text-sm text-green-600">Karachi University Bus System</p>
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <Link to="/student/login">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-sm sm:text-base px-3 sm:px-4">
                Student Login
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button className="bg-green-600 hover:bg-green-700 text-sm sm:text-base px-3 sm:px-4">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/d29bc0f8-0cbb-46f5-9127-a0b3e3830b0f.png" 
              alt="Karachi University Logo" 
              className="h-16 w-16 sm:h-24 sm:w-24"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Smart Bus Management for Karachi University
          </h2>
          <p className="text-lg sm:text-xl text-green-600 mb-8">
            Real-time tracking, smart notifications, and seamless communication for a better campus transportation experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 w-full sm:w-auto">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/student/login">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 w-full sm:w-auto">
                Student Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Map Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
            Live Bus Tracking
          </h3>
          <p className="text-green-600">
            Track all university buses in real-time across Karachi
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <GoogleMap height="500px" showControls={true} />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-12">
          Why Choose KU Point Management?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track all university buses in real-time with GPS integration and get accurate ETAs for your location.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Smart Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Receive automatic alerts when buses are approaching your location to minimize waiting time.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Admin Control</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive dashboard for managing fleet, drivers, routes, and monitoring system performance.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Bus className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Fleet Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add, update, and monitor buses with driver assignments and schedule management capabilities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Communication Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Seamless communication between admin and drivers with announcements, support chat, and feedback.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-green-800">Route Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete coverage of Karachi with routes to Shah Faisal Colony, Saddar, Gulshan-e-Maymar, and more.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-8 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Transform Your Campus Transportation?</h3>
          <p className="text-lg sm:text-xl mb-8 text-green-100">
            Join thousands of users already using KU Point Management for a smarter commute.
          </p>
          <Link to="/student/register">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3">
              Register Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/8df6e828-0286-47ca-b8ca-595cbdc1ba49.png" 
              alt="Karachi University Logo" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold">KU Point Management</span>
          </div>
          <p className="text-green-200">© 2024 Karachi University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
