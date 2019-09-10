/**
 * Export all type declarations available for react-leaflet as types for react-leaflet-universal.
 * This is because the latter doesn't have type declarations published as of 2019-09-09
 * but we can re-use types from react-leaflet as universal is mostly a wrapper, so the types
 * still apply.
 */
declare module 'react-leaflet-universal' {
    export * from 'react-leaflet';
}