/**
 * An enumeration of all categories in the system.
 * The string value is also the category URL slug.
 */
export enum Category {
    Location = 'location',
    LandUse = 'use',
    Type = 'type',
    Age = 'age',
    Size = 'size',
    Construction = 'construction',
    Streetscape = 'streetscape',
    Team = 'team',
    Planning = 'planning',
    Sustainability = 'sustainability',
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
    Category.Type,
    Category.Size,
    Category.Construction,
    Category.Age,
    Category.Streetscape,
    Category.Team,
    Category.Planning,
    Category.Sustainability,
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
        intro: 'Building age data can support energy analysis and help predict long-term change.',
    },
    [Category.Size]: {
        slug: 'size',
        name: 'Size & Form',
        aboutUrl: 'https://pages.colouring.london/shapeandsize',
        intro: 'How big are buildings?',
    },
    [Category.Team]: {
        slug: 'team',
        name: 'Team',
        aboutUrl: 'https://pages.colouring.london/team',
        intro: 'Who built the buildings?',
    },
    [Category.Construction]: {
        slug: 'construction',
        name: 'Construction',
        aboutUrl: 'https://pages.colouring.london/construction',
        intro: 'How are buildings built?',
    },
    [Category.Location]: {
        slug: 'location',
        name: 'Location',
        aboutUrl: 'https://pages.colouring.london/location',
        intro: 'Where are the buildings? Address, location and cross-references.',
    },
    [Category.Community]: {
        slug: 'community',
        name: 'Community',
        aboutUrl: 'https://pages.colouring.london/community',
        intro: 'How does this building work for the local community?',
    },
    [Category.Planning]: {
        slug: 'planning',
        name: 'Planning Controls',
        aboutUrl: 'https://pages.colouring.london/planning',
        intro: 'Planning controls relating to protection and reuse.',
    },
    [Category.Sustainability]: {
        slug: 'sustainability',
        name: 'Energy Performance',
        aboutUrl: 'https://pages.colouring.london/sustainability',
        intro: 'Are buildings energy efficient?',
    },
    [Category.Type]: {
        slug: 'type',
        name: 'Typology',
        aboutUrl: 'https://pages.colouring.london/buildingtypology',
        intro: 'How were buildings previously used?',
    },
    [Category.LandUse]: {
        slug: 'use',
        name: 'Land Use',
        aboutUrl: 'https://pages.colouring.london/use',
        intro: 'How are buildings used, and how does use change over time?',
    },
    [Category.Streetscape]: {
        inactive: true,
        slug: 'streetscape',
        name: 'Street Context',
        aboutUrl: 'https://pages.colouring.london/greenery',
        intro: "What's the building's context? Coming soon…",
    },
    [Category.Resilience]: {
        slug: 'resilience',
        name: 'Resilience',
        aboutUrl: 'https://pages.colouring.london/dynamics',
        intro: 'How has the site of this building changed over time?'
    },
};
