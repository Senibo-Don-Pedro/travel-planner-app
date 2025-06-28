"use client";

import { Location } from "@/app/generated/prisma";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in Next.js (optional, but recommended)
// delete (L.Icon.Default.prototype as any)._getIconUrl;
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const center =
    itineraries.length > 0
      ? [itineraries[0].lat, itineraries[0].lng]
      : [0, 0];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {itineraries.map((location, key) => (
        <Marker
          key={key}
          position={[location.lat, location.lng]}
        >
          <Popup>
            {location.locationTitle}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
