/**
 * An enumeration of all categories in the system.
 * The string value is also the category URL slug.
 */
export enum Category {
    Location = 'location',
    LandUse = 'land-use',
    Typology = 'typology',
    Size = 'size',
    Construction = 'construction',
    Age = 'age',
    StreetContext = 'street-context',
    Team = 'team',
    Planning = 'planning',
    EnergyPerformance = 'energy-performance',
    Resilience = 'resilience',
    Community = 'community',
}

/**
 * This is the sole configuration variable that defines the order of the categories
 * in the category grid. The order in the enum definition or the other configs does
 * not affect the order of the grid.
 */
export const categoriesOrder: Category[] = [
    Category.Location,
    Category.LandUse,
    Category.Typology,
    Category.Size,
    Category.Construction,
    Category.Age,
    Category.StreetContext,
    Category.Team,
    Category.Planning,
    Category.EnergyPerformance,
    Category.Resilience,
    Category.Community,
];

interface CategoryDefinition {
    inactive?: boolean;
    slug: string;
    name: string;
    aboutUrl: string;
    intro: string;
}

export const categoriesConfig: {[key in Category]: CategoryDefinition} = {
    [Category.Age]: {
        slug: 'age',
        name: 'Age & History',
        aboutUrl: 'https://pages.colouring.london/age',
        intro: 'This section provides open data on the age of buildings and the history of buildings and sites.',
    },
    [Category.Size]: {
        slug: 'size',
        name: 'Size',
        aboutUrl: 'https://pages.colouring.london/shapeandsize',
        intro: 'This section provides open data on the dimensions of buildings.',
    },
    [Category.Team]: {
        slug: 'team',
        name: 'Team',
        aboutUrl: 'https://pages.colouring.london/team',
        intro: 'This section provides open data on the teams designing and constructing the buildings.',
    },
    [Category.Construction]: {
        slug: 'construction',
        name: 'Construction',
        aboutUrl: 'https://pages.colouring.london/construction',
        intro: 'This section provides open data on building materials and construction systems.',
    },
    [Category.Location]: {
        slug: 'location',
        name: 'Location',
        aboutUrl: 'https://pages.colouring.london/location',
        intro: 'This section provides open data on building locations and building IDs.',
    },
    [Category.Community]: {
        slug: 'community',
        name: 'Community',
        aboutUrl: 'https://pages.colouring.london/community',
        intro: 'This section collects data on how well citizens think specific *types* of building work. This will help us save/reuse as many useful buildings as possible, and help improve urban design quality in future.',
    },
    [Category.Planning]: {
        slug: 'planning',
        name: 'Planning Controls',
        aboutUrl: 'https://pages.colouring.london/planning',
        intro: 'This section provides open data on current and anticipated planning applications for buildings, planning zones and whether the building is protected.',
    },
    [Category.EnergyPerformance]: {
        slug: 'energy-performance',
        name: 'Energy Performance',
        aboutUrl: 'https://pages.colouring.london/sustainability',
        intro: 'This section provides open data on the energy performance of buildings, and on retrofit.',
    },
    [Category.Typology]: {
        slug: 'typology',
        name: 'Typology',
        aboutUrl: 'https://pages.colouring.london/buildingtypology',
        intro: 'Note: This section is currently under development, we are working to activate it as soon as possible. This section provides open data on the typology of the building.',
    },
    [Category.LandUse]: {
        slug: 'land-use',
        name: 'Land Use',
        aboutUrl: 'https://pages.colouring.london/use',
        intro: 'How are buildings used, and how does use change over time?',
    },
    [Category.StreetContext]: {
        slug: 'street-context',
        name: 'Street Context',
        aboutUrl: 'https://pages.colouring.london/greenery',
        intro: "This section provides open data, and links to open data on streets, pavements, street blocks, land parcels and greenery/green spaces.",
    },
    [Category.Resilience]: {
        slug: 'resilience',
        name: 'Resilience',
        aboutUrl: 'https://pages.colouring.london/dynamics',
        intro: 'This section provides a tool that allows for live collection of data in disaster situations and collates data relating to building resilience.'
    },
};
