import { JSX, useState, useRef, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    ScaleControl,
    ZoomControl,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import { Icon, Map as LeafletMap, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { BackgroundPattern } from "@/components/others/BackgroundPattern";

// --------------------
// Configurações do Mapa
// --------------------
const PORTO_SUAPE: [number, number] = [-8.3719, -34.9501];
const DEFAULT_ZOOM = 15;
const MIN_ZOOM = 2;
const MAX_ZOOM = 18;

// Limites do mundo para o mapa
const WORLD_BOUNDS: LatLngBounds = new LatLngBounds(
    [-90, -180], // sudoeste
    [90, 180]    // nordeste
);

// --------------------
// Ícone padrão para marcador
// --------------------
const defaultMarkerIcon = new Icon({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
});

// --------------------
// Placeholder de carregamento
// --------------------
function MapPlaceholder(): JSX.Element {
    return (
        <>
            <BackgroundPattern opacity={0.1} size={64} />
            <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
                Carregando mapa...
            </div>
        </>
    );
}

// --------------------
// Eventos de clique para adicionar marcadores
// --------------------
interface MapInteractionProps {
    addMarker: (latlng: { lat: number; lng: number }) => void;
}

function MapInteraction({ addMarker }: MapInteractionProps): null {
    useMapEvents({
        click: (e) => addMarker(e.latlng),
    });
    return null;
}

// --------------------
// Componente principal do mapa
// --------------------
export function MapsRenderer(): JSX.Element {
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
    const mapRef = useRef<LeafletMap | null>(null);

    // --------------------
    // Adiciona marcador
    // --------------------
    const addMarker = (latlng: { lat: number; lng: number }): void => {
        setMarkers((prev) => [...prev, latlng]);
    };

    // --------------------
    // Configurações do mapa após carregar
    // --------------------
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        // Define limites e zoom
        map.setMinZoom(MIN_ZOOM);
        map.setMaxZoom(MAX_ZOOM);
        map.setMaxBounds(WORLD_BOUNDS);

        // Suaviza o efeito de "bounce back"
        map.on("move", () => {
            const center = map.getCenter();
            if (!WORLD_BOUNDS.contains(center)) {
                const clampedLat = Math.max(Math.min(center.lat, 90), -90);
                const clampedLng = Math.max(Math.min(center.lng, 180), -180);
                map.panTo([clampedLat, clampedLng], { animate: true, duration: 0.3 });
            }
        });

    }, [mapLoaded]);

    return (
        <div className="relative w-full flex flex-col items-center px-4 py-6">
            <div className="relative w-full max-w-full sm:max-w-6xl h-[60vh] sm:h-[736px] rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
                {/* Placeholder por cima do mapa */}
                {!mapLoaded && <MapPlaceholder />}

                <MapContainer
                    center={{ lat: PORTO_SUAPE[0], lng: PORTO_SUAPE[1] }}
                    zoom={DEFAULT_ZOOM}
                    minZoom={MIN_ZOOM}
                    maxZoom={MAX_ZOOM}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    className="w-full h-full cursor-grab"
                    ref={mapRef}
                    whenReady={() => setMapLoaded(true)}
                    maxBounds={WORLD_BOUNDS}
                    maxBoundsViscosity={0.8} // efeito mais suave de "bounce"
                >
                    {/* Interações do mapa */}
                    <MapInteraction addMarker={addMarker} />

                    {/* Controles */}
                    <ZoomControl position="topright" />
                    <ScaleControl position="bottomleft" />

                    {/* Tile Layer moderno */}
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        subdomains={["a", "b", "c", "d"]}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                    />

                    {/* Marcadores */}
                    {markers.map((pos, idx) => (
                        <Marker key={idx} position={pos} icon={defaultMarkerIcon}>
                            <Popup>
                                Marcador {idx + 1}: <br />
                                Lat: {pos.lat.toFixed(5)}, Lng: {pos.lng.toFixed(5)}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
