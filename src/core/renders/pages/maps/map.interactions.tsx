import { useMapInteractions } from "./map.utils";
import { LatLngPoint } from "./map.types";

export function MapInteractions({
    onAddMarker,
}: {
    onAddMarker: (latlng: LatLngPoint) => void;
}) {
    useMapInteractions({ onClick: onAddMarker });
    return null;
}