/**
 * An enumeration of all categories in the system.
 * The string value is also the category URL slug.
 */
export enum Category {
    Age = 'age',
    Community = 'community',
    Construction = 'construction',
    EnergyPerformance = 'energy-performance',
    LandUse = 'land-use',
    Location = 'location',
    Planning = 'planning',
    Resilience = 'resilience',
    Size = 'size',
    StreetContext = 'street-context',
    Team = 'team',
    Typology = 'typology',
}

/**
 * This is the sole configuration variable that defines the order of the categories
 * in the category grid. The order in the enum definition or the other configs does
 * not affect the order of the grid.
 */
export const categoriesOrder: Category[] = [
    Category.Age,
    Category.Community,
    Category.Construction,
    Category.EnergyPerformance,
    Category.LandUse,
    Category.Location,
    Category.Planning,
    Category.Resilience,
    Category.Size,
    Category.StreetContext,
    Category.Team,
    Category.Typology,
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
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#4-age-and-history',
        intro: 'This section provides open data on the age of buildings and the history of buildings and sites.',
    },
    [Category.Community]: {
        slug: 'community',
        name: 'Community',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#12-community',
        intro: 'This section collects data on how well citizens think specific *types* of building work. This will help us save/reuse as many useful buildings as possible, and help improve urban design quality in future.',
    },
    [Category.Construction]: {
        slug: 'construction',
        name: 'Construction',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#5-construction',
        intro: 'This section provides open data on building materials and construction systems.',
    },
    [Category.EnergyPerformance]: {
        slug: 'energy-performance',
        name: 'Energy Performance',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#10-energy-performance',
        intro: 'This section provides open data on the energy performance of buildings, and on retrofit.',
    },
    [Category.LandUse]: {
        slug: 'land-use',
        name: 'Land Use',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#2-land-use',
        intro: 'How are buildings used, and how does use change over time?',
    },
    [Category.Location]: {
        slug: 'location',
        name: 'Location',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#1-location',
        intro: 'This section provides open data on building locations and building IDs.',
    },
    [Category.Planning]: {
        slug: 'planning',
        name: 'Planning Controls',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#9-planning',
        intro: 'This section provides open data on current and anticipated planning applications for buildings, planning zones and whether the building is protected.',
    },
    [Category.Resilience]: {
        slug: 'resilience',
        name: 'Resilience',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#11-resilience',
        intro: 'This section provides a tool that allows for live collection of data in disaster situations and collates data relating to building resilience.'
    },
    [Category.Size]: {
        slug: 'size',
        name: 'Size',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#6-size',
        intro: 'This section provides open data on the dimensions of buildings.',
    },
    [Category.StreetContext]: {
        slug: 'street-context',
        name: 'Street Context',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#7-street-context',
        intro: "This section provides open data, and links to open data on streets, pavements, street blocks, land parcels and greenery/green spaces.",
    },
    [Category.Team]: {
        slug: 'team',
        name: 'Team',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#8-team',
        intro: 'This section provides open data on the teams designing and constructing the buildings.',
    },
    [Category.Typology]: {
        slug: 'typology',
        name: 'Typology',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#3-typology',
        intro: 'This section provides open data on the typology of the building.',
    },
};
