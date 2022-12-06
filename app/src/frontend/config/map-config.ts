interface MapViewport {
    position: [number, number];
    zoom: number;
}

export const initialMapViewport: MapViewport = {
  position: [51.5245255, -0.1338422], // lat,lng
  zoom: 16,
};

export type MapTheme = 'light' | 'night' | 'night_outlines';

export type LayerEnablementState = 'enabled' | 'disabled';

export const mapBackgroundColor: Record<MapTheme, string> = {
    light: '#F0EEEB',
    night: '#162639',
    night_outlines: '#162639'
};
