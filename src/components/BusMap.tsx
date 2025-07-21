
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Bus } from 'lucide-react';

interface BusLocation {
  id: string;
  number: string;
  lat: number;
  lng: number;
  eta: number;
  capacity: number;
  occupied: number;
}

interface BusMapProps {
  height?: string;
  showControls?: boolean;
}

const BusMap: React.FC<BusMapProps> = ({ height = "400px", showControls = true }) => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [buses, setBuses] = useState<BusLocation[]>([
    { id: '1', number: 'KU-01', lat: 24.9226, lng: 67.1040, eta: 5, capacity: 45, occupied: 32 },
    { id: '2', number: 'KU-02', lat: 24.9200, lng: 67.1020, eta: 12, capacity: 45, occupied: 28 },
    { id: '3', number: 'KU-03', lat: 24.9250, lng: 67.1060, eta: 8, capacity: 45, occupied: 41 },
  ]);
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);

  useEffect(() => {
    // Simulate real-time bus movement
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          eta: Math.max(1, bus.eta + Math.floor(Math.random() * 3) - 1),
          occupied: Math.min(bus.capacity, Math.max(0, bus.occupied + Math.floor(Math.random() * 3) - 1))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Karachi University location
          setUserLocation({ lat: 24.9226, lng: 67.1040 });
        }
      );
    } else {
      // Default to Karachi University location
      setUserLocation({ lat: 24.9226, lng: 67.1040 });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-green-800">Live Bus Tracking</h3>
          <Button
            onClick={getCurrentLocation}
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Update Location
          </Button>
        </div>
      )}
      
      <Card className="overflow-hidden">
        <div 
          className="map-container bg-gradient-to-br from-green-50 to-green-100 relative"
          style={{ height }}
        >
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-green-50">
            <div className="w-full h-full relative overflow-hidden">
              {/* Grid pattern to simulate map */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="absolute border-green-200" style={{
                    left: `${i * 5}%`,
                    top: 0,
                    bottom: 0,
                    borderLeftWidth: '1px'
                  }} />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="absolute border-green-200" style={{
                    top: `${i * 6.67}%`,
                    left: 0,
                    right: 0,
                    borderTopWidth: '1px'
                  }} />
                ))}
              </div>

              {/* User Location */}
              {userLocation && (
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <div className="relative">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Your Location
                    </div>
                  </div>
                </div>
              )}

              {/* Buses */}
              {buses.map((bus, index) => (
                <div 
                  key={bus.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${30 + index * 15}%`
                  }}
                  onClick={() => setSelectedBus(selectedBus?.id === bus.id ? null : bus)}
                >
                  <div className="relative">
                    <Bus className="h-8 w-8 text-green-600 hover:text-green-700 transition-colors" />
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {bus.number.split('-')[1]}
                    </div>
                    {selectedBus?.id === bus.id && (
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-30">
                        <div className="font-semibold">{bus.number}</div>
                        <div>ETA: {bus.eta} min</div>
                        <div>{bus.occupied}/{bus.capacity} seats</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Bus Stops */}
              {[
                { name: 'Main Gate', x: '20%', y: '60%' },
                { name: 'Library', x: '40%', y: '30%' },
                { name: 'Cafeteria', x: '60%', y: '70%' },
                { name: 'Hostel', x: '80%', y: '40%' }
              ].map((stop, index) => (
                <div 
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: stop.x, top: stop.y }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                    {stop.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Bus List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>Capacity: {bus.occupied}/{bus.capacity}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(bus.occupied / bus.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusMap;
