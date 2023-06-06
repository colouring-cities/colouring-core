export interface CCConfig
{
    cityName: string;                           // City name (i.e. "Colouring {City Name}")
    projectBlurb: string;                       // Description used on homepage
    githubURL: string;                          // URL of the project's GitHub repository
    privacyStatement: string;                   // Privacy statement, including where data is stored
    
    initialMapPosition: [number, number];       // Initial location of the map [latitude, longitude]
    initialZoomLevel: number;                   // Initial Zoom Level 

    postcode: string;                           // Alternative for "Postcode" text (i.e. "Zip Code")
    energy_rating: string;                      // Official Environmental Energy Rating (BREEAM Rating in UK)
}

