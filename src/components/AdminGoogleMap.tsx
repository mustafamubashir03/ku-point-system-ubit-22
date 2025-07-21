
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, MapPin, Phone, Clock } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface BusLocation {
  id: string;
  number: string;
  driver: string;
  driverPhone: string;
  lat: number;
  lng: number;
  eta: number;
  capacity: number;
  status: 'active' | 'delayed' | 'maintenance';
  route: string;
  area: string;
}

interface AdminGoogleMapProps {
  height?: string;
  showControls?: boolean;
}

declare global {
  interface Window {
    google: any;
  }
}

const AdminGoogleMap: React.FC<AdminGoogleMapProps> = ({ height = "600px", showControls = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const routeLinesRef = useRef<any[]>([]);

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [buses, setBuses] = useState<BusLocation[]>([
    { 
      id: '1', 
      number: 'KU-01', 
      driver: 'Ahmed Ali',
      driverPhone: '+92 300 1234567',
      lat: 24.8607, 
      lng: 67.0011, 
      eta: 25, 
      capacity: 45,
      status: 'active',
      route: 'Shah Faisal Colony Route',
      area: 'Shah Faisal Colony'
    },
    { 
      id: '2', 
      number: 'KU-02', 
      driver: 'Hassan Khan',
      driverPhone: '+92 301 2345678',
      lat: 24.8607, 
      lng: 67.0275, 
      eta: 30, 
      capacity: 45,
      status: 'active',
      route: 'Saddar Route',
      area: 'Saddar'
    },
    { 
      id: '3', 
      number: 'KU-03', 
      driver: 'Usman Sheikh',
      driverPhone: '+92 302 3456789',
      lat: 24.9341, 
      lng: 67.1785, 
      eta: 35, 
      capacity: 45,
      status: 'delayed',
      route: 'Gulshan-e-Maymar Route',
      area: 'Gulshan-e-Maymar'
    },
    { 
      id: '4', 
      number: 'KU-04', 
      driver: 'Ali Raza',
      driverPhone: '+92 303 4567890',
      lat: 24.9265, 
      lng: 67.1362, 
      eta: 15, 
      capacity: 45,
      status: 'active',
      route: 'NIPA Route',
      area: 'NIPA'
    },
    { 
      id: '5', 
      number: 'KU-05', 
      driver: 'Muhammad Tariq',
      driverPhone: '+92 304 5678901',
      lat: 24.9056, 
      lng: 67.1011, 
      eta: 20, 
      capacity: 45,
      status: 'active',
      route: 'Jail Chowrangi Route',
      area: 'Jail Chowrangi'
    },
  ]);
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);

  // University location (Karachi University)
  const universityLocation = { lat: 24.9226, lng: 67.1040 };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const karachi = { lat: 24.9000, lng: 67.1000 };
    
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: karachi,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ color: '#f8fafc' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e0f2fe' }]
        },
        {
          featureType: 'poi.school',
          elementType: 'geometry',
          stylers: [{ color: '#f0fdf4' }]
        }
      ]
    });

    // Add university marker
    new window.google.maps.Marker({
      position: universityLocation,
      map: mapInstanceRef.current,
      title: 'Karachi University',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: '#dc2626',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 4
      }
    });

    // Add university buildings/stops
    const universityStops = [
      { name: 'Main Gate', lat: 24.9226, lng: 67.1040 },
      { name: 'Central Library', lat: 24.9200, lng: 67.1020 },
      { name: 'Cafeteria', lat: 24.9250, lng: 67.1060 },
      { name: 'Boys Hostel', lat: 24.9280, lng: 67.1080 },
      { name: 'Girls Hostel', lat: 24.9180, lng: 67.1100 }
    ];

    universityStops.forEach(stop => {
      new window.google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map: mapInstanceRef.current,
        title: stop.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#dc2626',
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
    });

    updateBusMarkers();
    drawRouteLines();
  };

  const drawRouteLines = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing route lines
    routeLinesRef.current.forEach(line => line.setMap(null));
    routeLinesRef.current = [];

    // Draw route lines from each bus to university
    buses.forEach(bus => {
      const routeLine = new window.google.maps.Polyline({
        path: [
          { lat: bus.lat, lng: bus.lng },
          universityLocation
        ],
        geodesic: true,
        strokeColor: '#2563eb',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        icons: [{
          icon: {
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 3,
            strokeColor: '#2563eb'
          },
          offset: '50%'
        }]
      });

      routeLine.setMap(mapInstanceRef.current);
      routeLinesRef.current.push(routeLine);
    });
  };

  const updateBusMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing bus markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add enhanced bus markers with custom bus icon
    buses.forEach(bus => {
      const busColor = bus.status === 'active' ? '#16a34a' : bus.status === 'delayed' ? '#f59e0b' : '#dc2626';
      
      const marker = new window.google.maps.Marker({
        position: { lat: bus.lat, lng: bus.lng },
        map: mapInstanceRef.current,
        title: `${bus.number} - ${bus.driver}`,
        icon: {
          url: '/lovable-uploads/0e71db48-f83c-432b-b47a-a4fd74e72b5e.png',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: system-ui;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; color: ${busColor}; font-size: 16px; font-weight: 600;">${bus.number}</h3>
              <span style="margin-left: 8px; padding: 2px 8px; background: ${busColor}; color: white; border-radius: 12px; font-size: 11px; text-transform: uppercase;">${bus.status}</span>
            </div>
            <div style="color: #374151; font-size: 14px; line-height: 1.4;">
              <p style="margin: 4px 0;"><strong>Driver:</strong> ${bus.driver}</p>
              <p style="margin: 4px 0;"><strong>Phone:</strong> ${bus.driverPhone}</p>
              <p style="margin: 4px 0;"><strong>Area:</strong> ${bus.area}</p>
              <p style="margin: 4px 0;"><strong>Route:</strong> ${bus.route}</p>
              <p style="margin: 4px 0;"><strong>ETA:</strong> ${bus.eta} minutes</p>
              <p style="margin: 4px 0;"><strong>Capacity:</strong> ${bus.capacity} seats</p>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        setSelectedBus(bus);
      });

      markersRef.current.push(marker);
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          if (mapInstanceRef.current && window.google) {
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }

            userMarkerRef.current = new window.google.maps.Marker({
              position: location,
              map: mapInstanceRef.current,
              title: 'Admin Location',
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 4
              }
            });

            mapInstanceRef.current.setCenter(location);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation({ lat: 24.9226, lng: 67.1040 });
        }
      );
    } else {
      setUserLocation({ lat: 24.9226, lng: 67.1040 });
    }
  };

  useEffect(() => {
    const loadMap = () => {
      if (window.google) {
        initializeMap();
      } else {
        setTimeout(loadMap, 100);
      }
    };
    
    loadMap();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    updateBusMarkers();
    drawRouteLines();
  }, [buses]);

  useEffect(() => {
    // Simulate real-time bus movement and updates
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.002,
          lng: bus.lng + (Math.random() - 0.5) * 0.002,
          eta: Math.max(1, bus.eta + Math.floor(Math.random() * 3) - 1)
        }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'delayed': return 'bg-yellow-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {showControls && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-green-800">Live Fleet Tracking</h3>
            <p className="text-sm text-gray-600">{buses.length} buses covering Karachi city areas</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Button
              onClick={getCurrentLocation}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Update Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Routes
            </Button>
          </div>
        </div>
      )}
      
      <Card className="overflow-hidden border-green-200">
        <div 
          ref={mapRef}
          className="w-full"
          style={{ height }}
        />
      </Card>

      {/* Enhanced Bus Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-4 border-green-200 hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(bus.status)}`}></div>
                <h4 className="font-semibold text-green-800">{bus.number}</h4>
              </div>
              <Badge variant="outline" className="text-xs">
                {bus.eta} min ETA
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="font-medium">Driver:</span>
                <span className="ml-1">{bus.driver}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Phone className="h-3 w-3 mr-1" />
                <span className="text-xs">{bus.driverPhone}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="text-xs">{bus.area}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGoogleMap;
