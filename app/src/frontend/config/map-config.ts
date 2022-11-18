interface MapViewport {
    position: [number, number];
    zoom: number;
}

export const initialMapViewport: MapViewport = {
  position: [51.5245255, -0.1338422], // lat,lng
  zoom: 16,
};

export type MapTheme = 'light' | 'night';

export type BoroughEnablementState = 'enabled' | 'disabled';

export type ParcelEnablementState = 'enabled' | 'disabled';

export type FloodEnablementState = 'enabled' | 'disabled';

export type ConservationAreasEnablementState = 'enabled' | 'disabled';

export type HistoricDataEnablementState = 'enabled' | 'disabled';

export const mapBackgroundColor: Record<MapTheme, string> = {
    light: '#F0EEEB',
    night: '#162639'
};
