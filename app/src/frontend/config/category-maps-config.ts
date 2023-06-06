import { Category } from './categories-config';
import { BuildingMapTileset } from './tileserver-config';

export type LegendElement = {
    color: string;
    border?: string;
    text: string;
} | {
    subtitle: string;
};

export interface LegendConfig {
    title: string;
    description?: string;
    disclaimer?: string;
    elements: LegendElement[];
}

export interface CategoryMapDefinition {
    mapStyle: BuildingMapTileset;
    legend: LegendConfig;
}

export const defaultMapCategory = Category.Age;

export const categoryMapsConfig: {[key in Category]: CategoryMapDefinition[]} = {
    [Category.Age]: [
        {
            mapStyle: 'date_year',
            legend: {
                title: 'Age',
                elements: [
                    { color: '#fff9b8', text: '>2020' },
                    { color: '#fae269', text: '2000-2019' },
                    { color: '#fbaf27', text: '1980-1999' },
                    { color: '#e6711d', text: '1960-1979' },
                    { color: '#cc1212', text: '1940-1959' },
                    { color: '#8f0303', text: '1920-1939' },
                    { color: '#8f5385', text: '1900-1919' },
                    { color: '#c3e1eb', text: '1880-1899' },
                    { color: '#6a9dba', text: '1860-1879' },
                    { color: '#3b74a3', text: '1840-1859' },
                    { color: '#95ded8', text: '1820-1839' },
                    { color: '#68aba5', text: '1800-1819' },
                    { color: '#acc98f', text: '1750-1799' },
                    { color: '#6d8a51', text: '1700-1749' },
                    { color: '#d0c291', text: '<1700' },
                ]
            },
        },
        {
            mapStyle: 'survival_status',
            legend: {
                title: 'Survival status',
                elements: [
                    { color: '#6ded45', text: 'Same as Historical Map (Unchanged)' },
                    { color: '#f7c725', text: 'Similar to Historical Map (Some Changes)' },
                    { color: '#ff2121', text: 'Historical Building(s) Demolished' },
                    { color: '#CF26DF', text: 'Current Building on Previous Green Space' },
                ]
            }
        },
    ],
    [Category.Size]: [
        {
            mapStyle: 'size_height',
            legend: {
                title: 'Height to apex',
                elements: [
                    { color: '#f7f4f9', text: '0-5.55'},
                    { color: '#e7e1ef', text: '5.55-7.73'},
                    { color: '#d4b9da', text: '7.73-11.38'},
                    { color: '#c994c7', text: '11.38-18.45'},
                    { color: '#df65b0', text: '18.45-35.05'},
                    { color: '#e7298a', text: '35.05-89.30'},
                    { color: '#ce1256', text: '89.30-152'},
                    { color: '#980043', text: '≥152'}
                ]
            },
        }
    ],
    [Category.Team]: [{
        mapStyle: 'team',
        legend: {
            title: 'Team',
            description: '% data collected',
            elements: [
                { color: '#994d00', text: '≥80%' },
                { color: '#e67300', text: '60–80%' },
                { color: '#ff9933', text: '40–60%' },
                { color: '#ffbf80', text: '20–40%' },
                { color: '#ffe6cc', text: '<20%' }
            ]
        },
    }],
    [Category.Construction]: [{
        mapStyle: 'construction_core_material',
        legend: {
            title: 'Construction',
            elements: [
                { color: "#b5a859", text: "Wood" },
                { color: "#ffffe3", text: "Stone" },
                { color: "#f5d96b", text: "Brick" },
                { color: "#beffe8", text: "Steel" },
                { color: "#fca89d", text: "Reinforced Concrete" },
                { color: "#5c8970", text: "Other Metal" },
                { color: "#96613b", text: "Other Natural Material" },
                { color: "#c48a85", text: "Other Man-Made Material" }
            ]
        },
    }],
    [Category.Location]: [{
        mapStyle: 'location',
        legend: {
            title: 'Location',
            description: '% data collected',
            elements: [
                { color: '#084081', text: '≥80%' },
                { color: '#0868ac', text: '60–80%' },
                { color: '#43a2ca', text: '40–60%' },
                { color: '#7bccc4', text: '20–40%' },
                { color: '#bae4bc', text: '<20%' }
            ]
        },
    }],
    [Category.Community]: [
        /*
        {
            mapStyle: 'likes',
            legend: {
                title: 'Like Me',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        */
        {
            mapStyle: 'typology_likes',
            legend: {
                title: 'Liked non-residential buildings',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        {
            mapStyle: 'community_local_significance_total',
            legend: {
                title: 'Local Interest',
                description: 'People who think the building is of a local interest',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Expected planning applications',
                disclaimer: 'Sites identified by users as likely to be subject to planning application over the next six months',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'community_in_public_ownership',
            legend: {
                title: 'Public Ownership',
                description: 'Is the building in some form of public/community ownership',
                elements: [
                    {color: '#1166ff', text: 'Yes'},
                    {color: '#ffaaa0', text: 'No'}
                ]
            }
        }
    ],
    [Category.Planning]: [
        {
            // this database commad allows to see statistics about decision dates per year
            // SELECT COUNT(*), date_part('year', decision_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            // SELECT COUNT(*), date_part('year', registered_with_local_authority_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            mapStyle: 'planning_applications_status_all',
            legend: {
                title: 'All planning applications available from GLA (official data)',
                disclaimer: 'The map shows official data available from the GLA Planning London Datahub. What you are looking at is mainly applications from 2019 onwards.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_recent',
            legend: {
                title: 'The last 12 months - planning applications submissions/decisions (official data)',
                disclaimer: 'The map shows applications where the submission or decision data falls within the last 12 months.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_very_recent',
            legend: {
                title: 'Last 30 days - planning applications submissions/decisions (official data)',
                disclaimer: 'The map shows applications where the submission or decision data falls within last 30 days.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Expected planning applications (crowdsourced data)',
                disclaimer: 'Sites identified by users as likely to be subject to planning application over the next six months',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'planning_combined',
            legend: {
                title: 'Designation/protection (official and crowdsourced data)',
                disclaimer: 'All data relating to designated buildings should be checked against the National Heritage List for England and local authority websites. Designation data is currently incomplete. We are aiming for 100% coverage by December 2023.',
                elements: [
                    { color: '#95beba', text: 'In Conservation Area'},
                    { color: '#c72e08', text: 'Grade I Listed'},
                    { color: '#e75b42', text: 'Grade II* Listed'},
                    { color: '#ffbea1', text: 'Grade II Listed'},
                    { color: '#85ffd4', text: 'Heritage at Risk'},
                    { color: '#858ed4', text: 'Locally Listed'},
                    { color: '#858eff', text: 'In World Heritage Site'},
                    { color: '#8500d4', text: 'In Archaeological Priority Area'},
                ]
            },
        }
    ],
    [Category.EnergyPerformance]: [{
        mapStyle: 'sust_dec',
        legend: {
            title: 'Sustainability',
            description: 'DEC Rating',
            elements: [
                { color: "#007f3d", text: 'A' },
                { color: "#2c9f29", text: 'B' },
                { color: "#9dcb3c", text: 'C' },
                { color: "#fff200", text: 'D' },
                { color: "#f7af1d", text: 'E' },
                { color: "#ed6823", text: 'F' },
                { color: "#e31d23", text: 'G' },
            ]
        },
    }],
    [Category.Typology]: [{
        mapStyle: 'building_attachment_form',
        legend: {
            title: 'Adjacency/Configuration',
            elements: [
                { color: "#f2a2b9", text: "Detached" },
                { color: "#ab8fb0", text: "Semi-Detached" },
                { color: "#3891d1", text: "End-Terrace" },
                { color: "#226291", text: "Mid-Terrace" }
            ]
        },
    }],
    [Category.LandUse]: [
        {
            mapStyle: 'landuse',
            legend: {
                title: 'Land Use',
                elements: [
                    { color: '#e5050d', text: 'Mixed Use' },
                    { subtitle: 'Single use:'},
                    { color: '#252aa6', text: 'Residential (unverified)' },
                    { color: '#7025a6', text: 'Residential (verified)' },
                    { color: '#ff8c00', text: 'Retail' },
                    { color: '#f5f58f', text: 'Industry & Business' },
                    { color: '#fa667d', text: 'Community Services' },
                    { color: '#ffbfbf', text: 'Recreation & Leisure' },
                    { color: '#b3de69', text: 'Transport' },
                    { color: '#cccccc', text: 'Utilities & Infrastructure' },
                    { color: '#898944', text: 'Defence' },
                    { color: '#73ccd1', text: 'Agriculture' },
                    { color: '#45cce3', text: 'Minerals' },
                    { color: '#ffffff', text: 'Vacant & Derelict' },
                    { color: '#6c6f8e', text: 'Unclassified, presumed non-residential' }
                ]
            },
        },
        {
            mapStyle: 'is_domestic',
            legend: {
                title: 'Domestic building',
                elements: [
                    { color: '#f7ec25', text: 'Domestic' },
                    { color: '#fc9b2a', text: 'Mixed' },
                    { color: '#ff2121', text: 'Non-domestic' },
                ]
            }
        }
    ],
    [Category.StreetContext]: [{
        mapStyle: undefined,
        legend: {
            title: 'Street Context',
            elements: []
        },
    }],
    [Category.Resilience]: [
        {
            mapStyle: 'disaster_severity',
            legend: {
                title: 'Severity of damage',
                description: 'Severity of damage to building',
                elements: [
                    {
                        text: 'Building destroyed',
                        color: '#bd0026',
                    }, {
                        text: 'Very severe',
                        color: '#e31a1c',
                    }, {
                        text: 'Severe',
                        color: '#fc4e2a',
                    }, {
                        text: 'Moderate',
                        color: '#fd8d3c',
                    }, {
                        text: 'Minimal ',
                        color: '#feb24c',
                    }, {
                        text: 'No damage visible',
                        color: '#fed976',
                    },
                ],
            },
        },
        {
            mapStyle: 'dynamics_demolished_count',
            legend: {
                title: 'Resilience',
                description: 'Demolished buildings on the same site',
                elements: [
                    {
                        text: '7+',
                        color: '#bd0026',
                    }, {
                        text: '6',
                        color: '#e31a1c',
                    }, {
                        text: '5',
                        color: '#fc4e2a',
                    }, {
                        text: '4',
                        color: '#fd8d3c',
                    }, {
                        text: '3',
                        color: '#feb24c',
                    }, {
                        text: '2',
                        color: '#fed976',
                    }, {
                        text: '1',
                        color: '#ffe8a9',
                    }, {
                        text: 'None',
                        color: '#0C7BDC'
                    }
                ],
            },
        }
    ]
    
};
