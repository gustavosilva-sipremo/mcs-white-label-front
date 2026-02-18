"use client";

import { JSX, useEffect, useRef, useState } from "react";
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
import { MapPdfViewerModal } from "@/components/others/MapPdfViewerModal";
import { Button } from "@/components/ui/button";

import { FileText } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               MAP SETTINGS                                 */
/* -------------------------------------------------------------------------- */

const PORTO_SUAPE: [number, number] = [-8.3719, -34.9501];
const DEFAULT_ZOOM = 15;
const MIN_ZOOM = 2;
const MAX_ZOOM = 18;

const WORLD_BOUNDS = new LatLngBounds(
    [-90, -180],
    [90, 180]
);

/* -------------------------------------------------------------------------- */
/*                               MARKER ICON                                  */
/* -------------------------------------------------------------------------- */

const defaultMarkerIcon = new Icon({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
});

/* -------------------------------------------------------------------------- */
/*                              PLACEHOLDER                                   */
/* -------------------------------------------------------------------------- */

function MapPlaceholder(): JSX.Element {
    return (
        <>
            <BackgroundPattern opacity={0.1} size={64} />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
                Carregando mapa...
            </div>
        </>
    );
}

/* -------------------------------------------------------------------------- */
/*                            MAP INTERACTIONS                                 */
/* -------------------------------------------------------------------------- */

interface MapInteractionProps {
    onAddMarker: (latlng: { lat: number; lng: number }) => void;
}

function MapInteraction({ onAddMarker }: MapInteractionProps): null {
    useMapEvents({
        click: (e) => onAddMarker(e.latlng),
    });

    return null;
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function MapsRenderer(): JSX.Element {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
    const [openPdf, setOpenPdf] = useState(false);

    const mapRef = useRef<LeafletMap | null>(null);

    /* ----------------------------- Marker logic ---------------------------- */

    function addMarker(latlng: { lat: number; lng: number }) {
        setMarkers((prev) => [...prev, latlng]);
    }

    /* -------------------------- Map configuration -------------------------- */

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        map.setMinZoom(MIN_ZOOM);
        map.setMaxZoom(MAX_ZOOM);
        map.setMaxBounds(WORLD_BOUNDS);

        map.on("move", () => {
            const center = map.getCenter();

            if (!WORLD_BOUNDS.contains(center)) {
                map.panTo(
                    [
                        Math.max(Math.min(center.lat, 90), -90),
                        Math.max(Math.min(center.lng, 180), -180),
                    ],
                    { animate: true, duration: 0.3 }
                );
            }
        });
    }, [mapLoaded]);

    /* ------------------------------- Render -------------------------------- */

    return (
        <div className="relative w-full px-4 py-6 flex justify-center">
            <BackgroundPattern opacity={0.1} size={64} />
            <div className="relative w-full max-w-6xl h-[360px] sm:h-[60vh] md:h-[736px] overflow-hidden rounded-lg border bg-[#f2f4f7] shadow-lg z-[9]">
                {/* Botão dentro do mapa */}
                <div className="absolute top-4 left-4 z-[1001]">
                    <Button
                        size="sm"
                        className="gap-2 shadow-md backdrop-blur text-primary bg-background/90 hover:bg-background/80"
                        onClick={() => setOpenPdf(true)}
                    >
                        <FileText className="h-4 w-4" />
                        Mapa em PDF
                    </Button>
                </div>

                {!mapLoaded && <MapPlaceholder />}

                <MapContainer
                    ref={mapRef}
                    center={PORTO_SUAPE}
                    zoom={DEFAULT_ZOOM}
                    minZoom={MIN_ZOOM}
                    maxZoom={MAX_ZOOM}
                    scrollWheelZoom
                    zoomControl={false}
                    maxBounds={WORLD_BOUNDS}
                    maxBoundsViscosity={0.8}
                    whenReady={() => setMapLoaded(true)}
                    className="w-full h-full cursor-grab"
                >
                    <MapInteraction onAddMarker={addMarker} />

                    <ZoomControl position="topright" />
                    <ScaleControl position="bottomleft" />

                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        subdomains={["a", "b", "c", "d"]}
                        attribution='&copy; OpenStreetMap &copy; CARTO'
                    />

                    {markers.map((pos, idx) => (
                        <Marker key={idx} position={pos} icon={defaultMarkerIcon}>
                            <Popup>
                                Marcador {idx + 1}
                                <br />
                                Lat: {pos.lat.toFixed(5)}
                                <br />
                                Lng: {pos.lng.toFixed(5)}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <MapPdfViewerModal
                    open={openPdf}
                    onOpenChange={setOpenPdf}
                    pdfUrl="/documents/mapa_especializado_suape.pdf"
                />
            </div>
        </div>
    );
}
