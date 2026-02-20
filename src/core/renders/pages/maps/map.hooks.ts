import { useRef, useState } from "react";
import { Map as LeafletMap } from "leaflet";
import { LatLngPoint } from "./map.types";
import { USER_LOCATION_ZOOM } from "./map.constants";

export function useMarkers() {
  const [markers, setMarkers] = useState<LatLngPoint[]>([]);

  function addMarker(latlng: LatLngPoint) {
    setMarkers((prev) => [...prev, latlng]);
  }

  return { markers, addMarker };
}

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLngPoint | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  function locate(map: LeafletMap | null) {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latlng = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setUserLocation(latlng);

        map?.flyTo(latlng, USER_LOCATION_ZOOM, {
          animate: true,
          duration: 1.6,
        });

        setTimeout(() => {
          userMarkerRef.current?.openPopup();
        }, 1600);
      },
      () => alert("Não foi possível obter sua localização."),
      { enableHighAccuracy: true, timeout: 20000 },
    );
  }

  return { userLocation, locate, userMarkerRef };
}
