import React, { useEffect, useRef } from 'react';
import { ItineraryItem } from '../types';

interface TripMapProps {
  items: ItineraryItem[];
  className?: string;
}

declare global {
  interface Window {
    L: any;
  }
}

// Distance Utility for Map Labels
const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return (d * 1.3).toFixed(1) + 'km';
};

const TripMap: React.FC<TripMapProps> = ({ items, className }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layerGroupRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const L = window.L;
    if (!L) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomSnap: 0.5,
        fadeAnimation: true,
        markerZoomAnimation: true,
        zoomControl: false
      }).setView([25.0330, 121.5654], 12);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; Lion Travel',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        pane: 'shadowPane'
      }).addTo(mapRef.current);

      layerGroupRef.current = L.layerGroup().addTo(mapRef.current);
      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
    }

    const layerGroup = layerGroupRef.current;
    if (!layerGroup) return;

    layerGroup.clearLayers();
    mapRef.current.invalidateSize();

    if (items.length === 0) {
      mapRef.current.setView([25.0330, 121.5654], 12);
      return;
    }

    const dayColors: Record<number, string> = {
      1: '#dc2626',
      2: '#2563eb',
      3: '#16a34a'
    };

    const bounds = L.latLngBounds([]);
    const dayGroups: Record<number, ItineraryItem[]> = {};

    items.forEach(item => {
      if (!dayGroups[item.day]) dayGroups[item.day] = [];
      dayGroups[item.day].push(item);
    });

    Object.keys(dayGroups).forEach(dayKey => {
      const day = parseInt(dayKey);
      const groupItems = dayGroups[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
      const dayColor = dayColors[day] || '#4b5563';
      const points: any[] = [];

      groupItems.forEach((item, idx) => {
        const latLng = L.latLng(item.lat, item.lng);
        points.push(latLng);
        bounds.extend(latLng);

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${dayColor};
              color: white;
              width: 32px; height: 32px;
              border-radius: 50%;
              border: 3px solid white;
              display: flex; align-items: center; justify-content: center;
              font-weight: 900; font-size: 14px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              transform: translateY(-5px);
            ">
              ${idx + 1}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        L.marker(latLng, { icon })
          .bindTooltip(`<b>${item.name}</b><br/><span style="font-size:10px;">Day ${item.day} - ${item.startTime}</span>`, {
            direction: 'top',
            offset: [0, -18]
          })
          .addTo(layerGroup);

        // Add distance label between points
        if (idx > 0) {
          const prevItem = groupItems[idx - 1];
          const distLabel = calculateDistanceKm(prevItem.lat, prevItem.lng, item.lat, item.lng);
          const midLat = (prevItem.lat + item.lat) / 2;
          const midLng = (prevItem.lng + item.lng) / 2;
          
          const labelIcon = L.divIcon({
            className: 'distance-label',
            html: `<div style="background:white; border:1px solid ${dayColor}; color:${dayColor}; font-size:9px; font-weight:bold; padding:1px 4px; border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2); white-space:nowrap;">~${distLabel}</div>`,
            iconSize: [0, 0],
            iconAnchor: [15, 5]
          });
          L.marker([midLat, midLng], { icon: labelIcon }).addTo(layerGroup);
        }
      });

      if (points.length > 1) {
        L.polyline(points, {
          color: dayColor,
          weight: 4,
          opacity: 0.6,
          dashArray: '8, 8'
        }).addTo(layerGroup);
      }
    });

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [60, 60], animate: true });
    }
  }, [items]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`w-full h-full ${className} bg-gray-100 rounded-xl overflow-hidden`} 
      style={{ isolation: 'isolate' }}
    />
  );
};

export default TripMap;
