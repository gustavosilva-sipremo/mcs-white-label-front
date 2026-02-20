import { LatLngBounds } from "leaflet";

export const PORTO_SUAPE: [number, number] = [-8.3719, -34.9501];

export const DEFAULT_ZOOM = 14;
export const USER_LOCATION_ZOOM = 18;

export const MIN_ZOOM = 2;
export const MAX_ZOOM = 18;

export const WORLD_BOUNDS = new LatLngBounds([-90, -180], [90, 180]);

export const TILE_LAYER = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  subdomains: ["a", "b", "c"],
  attribution: "&copy; OpenStreetMap contributors",
};
