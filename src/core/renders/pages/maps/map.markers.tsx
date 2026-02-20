import { Marker, Popup } from "react-leaflet";
import { LatLngPoint } from "./map.types";
import { defaultMarkerIcon } from "./map.icons";
import type { Marker as LeafletMarker } from "leaflet";

export function ManualMarkers({ markers }: { markers: LatLngPoint[] }) {
    return (
        <>
            {markers.map((pos, idx) => (
                <Marker key={idx} position={pos} icon={defaultMarkerIcon}>
                    <Popup>
                        Marcador {idx + 1}
                        <br />
                        Lat: {pos.lat.toFixed(6)}
                        <br />
                        Lng: {pos.lng.toFixed(6)}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export function UserMarker({
    position,
    markerRef,
}: {
    position: LatLngPoint;
    markerRef: React.RefObject<LeafletMarker | null>;
}) {
    return (
        <Marker position={position} icon={defaultMarkerIcon} ref={markerRef}>
            <Popup>
                <strong>Você está aqui</strong>
                <br />
                Lat: {position.lat.toFixed(6)}
                <br />
                Lng: {position.lng.toFixed(6)}
            </Popup>
        </Marker>
    );
}