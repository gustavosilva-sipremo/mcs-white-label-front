// map.utils.ts
import { useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";

/* -------------------------------------------------------------------------- */
/*                               TYPES                                        */
/* -------------------------------------------------------------------------- */

export type LatLngPoint = {
  lat: number;
  lng: number;
};

export interface MapInteractionOptions {
  onClick?: (latlng: LatLngPoint) => void;
}

/* -------------------------------------------------------------------------- */
/*                           MAP INTERACTIONS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Hook responsável por lidar com interações do usuário no mapa.
 *
 * OBS:
 * - Leaflet converte touch em click automaticamente
 * - Não é necessário tratar touchstart manualmente
 */
export function useMapInteractions(options: MapInteractionOptions): null {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      options.onClick?.({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}
