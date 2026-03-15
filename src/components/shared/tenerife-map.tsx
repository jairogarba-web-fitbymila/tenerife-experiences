'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface MapPin {
  name: string
  slug: string
  category: string
  lat: number
  lng: number
  image?: string
  rating?: number
}

interface TenerifeMapProps {
  items: MapPin[]
}

const categoryColors: Record<string, string> = {
  experiences: '#f97316',
  beaches: '#3b82f6',
  nature: '#22c55e',
  food: '#ef4444',
  culture: '#a855f7',
  nightlife: '#ec4899',
  family: '#f59e0b',
  wellness: '#14b8a6',
}

function createCategoryIcon(category: string) {
  const color = categoryColors[category] || '#f97316'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
    <circle cx="14" cy="14" r="6" fill="#fff"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: 'custom-map-pin',
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  })
}

const categoryLabels: Record<string, string> = {
  experiences: 'Experiences',
  beaches: 'Beaches',
  nature: 'Nature',
  food: 'Food & Drink',
  culture: 'Culture',
  nightlife: 'Nightlife',
  family: 'Family',
  wellness: 'Wellness',
}

export default function TenerifeMap({ items }: TenerifeMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-[350px] md:h-[500px] rounded-2xl bg-slate-800/50 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .custom-map-pin {
          background: none !important;
          border: none !important;
        }
        .map-popup .leaflet-popup-content-wrapper {
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .map-popup .leaflet-popup-tip {
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .map-popup .leaflet-popup-content {
          margin: 12px 16px;
          font-size: 14px;
        }
      `}</style>
      <MapContainer
        center={[28.2916, -16.6291]}
        zoom={10}
        scrollWheelZoom={false}
        className="w-full h-[350px] md:h-[500px] rounded-2xl z-0"
        style={{ background: '#1e293b' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          <Marker
            key={`${item.slug}-${item.lat}-${item.lng}`}
            position={[item.lat, item.lng]}
            icon={createCategoryIcon(item.category)}
          >
            <Popup className="map-popup">
              <div className="flex flex-col gap-2">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                )}
                <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white w-fit"
                  style={{ backgroundColor: categoryColors[item.category] || '#f97316' }}
                >
                  {categoryLabels[item.category] || item.category}
                </span>
                {item.rating && (
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <span>&#9733;</span> {item.rating}/5
                  </div>
                )}
                <a
                  href={`/${item.slug}`}
                  className="text-orange-400 hover:text-orange-300 text-xs font-medium mt-1"
                >
                  View details &rarr;
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}
