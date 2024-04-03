import { StringNullableChain } from "lodash";

export interface CCConfig
{
    cityName: string;                           // City name (i.e. "Colouring {City Name}")
    projectBlurb: string;                       // Description used on homepage
    
    githubURL: string;                          // URL of the project's GitHub repository
    manualURL: string;                          // Link to the project's page in the Open Manual (i.e. https://github.com/colouring-cities/manual/wiki/M3.-COLOURING-BRITAIN)
    privacyStatement: string;                   // Privacy statement, including where data is stored
    
    initialMapPosition: [number, number];       // Initial location of the map [latitude, longitude]
    initialZoomLevel: number;                   // Initial Zoom Level 

    postcode: string;                           // Alternative for "Postcode" text (i.e. "Zip Code")
    energy_rating: string;                      // Official Environmental Energy Rating (BREEAM Rating in UK)

    bbox: [number, number, number, number];     // Bounding box of generated tiles, in CRS epsg:3857 in form: [w, s, e, n]
    basemapTileUrl: string;
    baseAttribution: string;
}

