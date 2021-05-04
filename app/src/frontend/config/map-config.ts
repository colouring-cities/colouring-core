export const defaultMapPosition = {
    lat: 51.5245255,
    lng: -0.1338422,
    zoom: 16
};

export type MapTheme = 'light' | 'night';

export const mapBackgroundColor: Record<MapTheme, string> = {
    light: '#F0EEEB',
    night: '#162639'
};
