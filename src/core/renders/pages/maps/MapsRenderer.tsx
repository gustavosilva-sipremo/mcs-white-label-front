"use client";

import { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    ScaleControl,
    ZoomControl,
} from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

import {
    PORTO_SUAPE,
    DEFAULT_ZOOM,
    MIN_ZOOM,
    MAX_ZOOM,
    WORLD_BOUNDS,
    TILE_LAYER,
} from "./map.constants";

import { MapPlaceholder } from "./map.placeholder";
import { MapInteractions } from "./map.interactions";
import { ManualMarkers, UserMarker } from "./map.markers";
import { MapControls } from "./map.controls";
import { useMarkers, useUserLocation } from "./map.hooks";

import { BackgroundPattern } from "@/components/others/BackgroundPattern";
import { MapPdfViewerModal } from "@/components/others/MapPdfViewerModal";
import { MapSuapeAreas } from "./map.fixed-area";

export function MapsRenderer() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [openPdf, setOpenPdf] = useState(false);

    const mapRef = useRef<LeafletMap | null>(null);

    const { markers, addMarker } = useMarkers();
    const { userLocation, locate, userMarkerRef } = useUserLocation();

    /** 🔒 FEATURE FLAG */
    const ENABLE_ADD_MARKERS = false;

    useEffect(() => {
        if (!mapRef.current) return;
        mapRef.current.setMaxBounds(WORLD_BOUNDS);
    }, [mapLoaded]);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;
        const resize = () => map.invalidateSize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div className="relative w-full px-4 py-6 flex justify-center">
            <BackgroundPattern opacity={0.1} size={64} />

            <div
                className="
                    relative w-full max-w-6xl
                    h-[calc(100vh-6rem)]
                    sm:h-[calc(100vh-8rem)]
                    md:h-[736px]
                    rounded-lg border z-[9] overflow-hidden
                "
            >
                <MapControls
                    onOpenPdf={() => setOpenPdf(true)}
                    onLocateUser={() => locate(mapRef.current)}
                />

                {!mapLoaded && <MapPlaceholder />}

                <MapContainer
                    ref={mapRef}
                    center={PORTO_SUAPE}
                    zoom={DEFAULT_ZOOM}
                    minZoom={MIN_ZOOM}
                    maxZoom={MAX_ZOOM}
                    zoomControl={false}
                    whenReady={() => setMapLoaded(true)}
                    className="w-full h-full"
                >
                    {/* ❌ interação desativada */}
                    {ENABLE_ADD_MARKERS && (
                        <MapInteractions onAddMarker={addMarker} />
                    )}

                    <ZoomControl position="topright" />
                    <ScaleControl position="bottomleft" />

                    <TileLayer {...TILE_LAYER} />

                    <MapSuapeAreas />

                    <ManualMarkers markers={markers} />

                    {userLocation && (
                        <UserMarker
                            position={userLocation}
                            markerRef={userMarkerRef}
                        />
                    )}
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