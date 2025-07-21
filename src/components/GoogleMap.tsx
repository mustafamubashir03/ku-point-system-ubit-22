
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Bus } from 'lucide-react';

interface BusLocation {
  id: string;
  number: string;
  lat: number;
  lng: number;
  eta: number;
  capacity: number;
}

interface GoogleMapProps {
  height?: string;
  showControls?: boolean;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({ height = "400px", showControls = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [buses, setBuses] = useState<BusLocation[]>([
    { id: '1', number: 'KU-01', lat: 24.9226, lng: 67.1040, eta: 5, capacity: 45 },
    { id: '2', number: 'KU-02', lat: 24.9200, lng: 67.1020, eta: 12, capacity: 45 },
    { id: '3', number: 'KU-03', lat: 24.9250, lng: 67.1060, eta: 8, capacity: 45 },
  ]);
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const karachi = { lat: 24.9226, lng: 67.1040 };
    
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: karachi,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9dfef' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#f0f8ff' }]
        }
      ]
    });

    // Add bus stops
    const busStops = [
      { name: 'Main Gate', lat: 24.9226, lng: 67.1040 },
      { name: 'Library', lat: 24.9200, lng: 67.1020 },
      { name: 'Cafeteria', lat: 24.9250, lng: 67.1060 },
      { name: 'Hostel', lat: 24.9280, lng: 67.1080 }
    ];

    busStops.forEach(stop => {
      new window.google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map: mapInstanceRef.current,
        title: stop.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#dc2626',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
    });

    updateBusMarkers();
  };

  const updateBusMarkers = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing bus markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add bus markers with custom icon
    buses.forEach(bus => {
      const marker = new window.google.maps.Marker({
        position: { lat: bus.lat, lng: bus.lng },
        map: mapInstanceRef.current,
        title: `${bus.number} - ETA: ${bus.eta} min`,
        icon: {
          url: '/lovable-uploads/0e71db48-f83c-432b-b47a-a4fd74e72b5e.png',
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 15)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #16a34a;">${bus.number}</h3>
            <p style="margin: 4px 0;">ETA: ${bus.eta} minutes</p>
            <p style="margin: 4px 0;">Capacity: ${bus.capacity} seats</p>
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
            // Remove existing user marker
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }

            // Add new user marker
            userMarkerRef.current = new window.google.maps.Marker({
              position: location,
              map: mapInstanceRef.current,
              title: 'Your Location',
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
              }
            });

            mapInstanceRef.current.setCenter(location);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Karachi University location
          const defaultLocation = { lat: 24.9226, lng: 67.1040 };
          setUserLocation(defaultLocation);
        }
      );
    } else {
      // Default to Karachi University location
      const defaultLocation = { lat: 24.9226, lng: 67.1040 };
      setUserLocation(defaultLocation);
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
  }, [buses]);

  useEffect(() => {
    // Simulate real-time bus movement
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          eta: Math.max(1, bus.eta + Math.floor(Math.random() * 3) - 1)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold text-green-800">Live Bus Tracking</h3>
          <Button
            onClick={getCurrentLocation}
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Update Location
          </Button>
        </div>
      )}
      
      <Card className="overflow-hidden">
        <div 
          ref={mapRef}
          className="w-full"
          style={{ height }}
        />
      </Card>

      {/* Bus List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-4 border-green-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">{bus.number}</h4>
              </div>
              <span className="text-sm font-medium text-green-600">{bus.eta} min</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Capacity: {bus.capacity} seats</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoogleMap;
