"use client";

import { GeoJSON, useMap } from "react-leaflet";
import {
    LatLngExpression,
    LatLngBounds,
    circle,
    divIcon,
    marker,
    Layer,
    type Circle,
} from "leaflet";
import type { Feature, GeoJsonObject, Point } from "geojson";

import { SUAPE_GEOJSON } from "./map-geojson.data";

/* -------------------------------------------------------------------------- */
/*                                   CONST                                    */
/* -------------------------------------------------------------------------- */

const DEFAULT_RADIUS_METERS = 600;

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function getPointCenter(feature: Feature<Point>): LatLngExpression {
    const [lng, lat] = feature.geometry.coordinates;
    return [lat, lng];
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export function MapSuapeAreas() {
    const map = useMap();

    return (
        <GeoJSON
            data={SUAPE_GEOJSON as GeoJsonObject}
            pointToLayer={(feature, latlng) => {
                const props = feature.properties as { id?: number };

                /* -------------------------------------------------- */
                /* PONTO CENTRAL COM ID                               */
                /* -------------------------------------------------- */

                return marker(latlng, {
                    icon: divIcon({
                        className: "",
                        html: `
                            <div style="
                                width: 28px;
                                height: 28px;
                                border-radius: 999px;
                                background: #facc15;
                                border: 2px solid #a16207;
                                color: #713f12;
                                font-weight: 700;
                                font-size: 12px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 0 0 2px rgba(250,204,21,0.35);
                            ">
                                ${props?.id ?? ""}
                            </div>
                        `,
                        iconSize: [28, 28],
                        iconAnchor: [14, 14],
                    }),
                });
            }}
            onEachFeature={(feature: Feature, layer: Layer) => {
                if (feature.geometry.type !== "Point") return;

                const center = getPointCenter(
                    feature as Feature<Point>
                );

                const props = feature.properties as {
                    id?: number;
                    nome?: string;
                    categoria?: string;
                    raio_metros?: number;
                };

                /* -------------------------------------------------- */
                /* ÁREA AO REDOR DO PONTO (INVISÍVEL)                 */
                /* -------------------------------------------------- */

                const area: Circle = circle(center, {
                    radius: props.raio_metros ?? DEFAULT_RADIUS_METERS,

                    // 👇 invisível
                    color: "transparent",
                    fillColor: "transparent",
                    fillOpacity: 0,
                    weight: 0,

                    // mantém eventos ativos
                    interactive: false,
                }).addTo(map);

                /* -------------------------------------------------- */
                /* INTERAÇÕES                                         */
                /* -------------------------------------------------- */

                layer.on({
                    mouseover: () => {
                        // opcional: não faz nada visualmente
                    },
                    mouseout: () => {
                        // opcional
                    },
                    click: () => {
                        const bounds: LatLngBounds = area.getBounds();

                        map.flyToBounds(bounds, {
                            padding: [72, 72],
                            maxZoom: 16,
                            duration: 0.7,
                            easeLinearity: 0.3,
                        });
                    },
                });

                /* -------------------------------------------------- */
                /* POPUP                                              */
                /* -------------------------------------------------- */

                layer.bindPopup(`
                    <strong>${props?.nome ?? "Empresa"}</strong><br/>
                    ${props?.categoria ? `Categoria: ${props.categoria}<br/>` : ""}
                    ID: ${props?.id ?? "-"}
                `);
            }}
        />
    );
}