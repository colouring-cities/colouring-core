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

export const defaultMapCategory = Category.AgeHistory;

export const ageLegend = [
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

export const knownDemolishedCountLegend = [
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
]

export const categoryMapsConfig: {[key in Category]: CategoryMapDefinition[]} = {
    [Category.AgeHistory]: [
        {
            mapStyle: 'date_year',
            legend: {
                title: 'Age',
                elements: ageLegend,
            },
        },
        {
            mapStyle: 'typology_style_period',
            legend: {
                title: 'Historical Period',
                elements: [
                    { color: '#fae269', text: '2000-2025 (Early C21)' },
                    { color: '#fbaf27', text: '1980-1999 (Late C20)' },
                    { color: '#cc1212', text: '1946-1979 (Post war)' },
                    { color: '#8f5385', text: '1914-1945 (WWI-WWII)' },
                    { color: '#c3e1eb', text: '1901-1914 (Edwardian)' },
                    { color: '#6a9dba', text: '1837-1901 (Victorian)' },
                    { color: '#acc98f', text: '1714-1837 (Georgian)' },
                    { color: '#6d8a51', text: '1603-1714 (Stuart)' },
                    { color: '#d0c291', text: '1485-1603 (Tudor)' },
                    { color: '#a9a695', text: '410-1485 (Medieval)' },
                    { color: '#dadada', text: '43AD-410 (Roman)' },
                ]
            }
        },
        {
            mapStyle: 'cladding_year',
            legend: {
                title: 'Cladding Date',
                elements: ageLegend,
            },
        },
        {
            mapStyle: 'extension_year',
            legend: {
                title: 'Extension Date',
                elements: ageLegend,
            },
        },
        {
            mapStyle: 'retrofit_year',
            legend: {
                title: 'Retrofit Date',
                elements: ageLegend,
            },
        },
        {
            mapStyle: 'survival_status',
            legend: {
                title: 'Survival Status',
                elements: [
                    { color: '#6ded45', text: 'Same as Historical Map (Unchanged)' },
                    { color: '#f7c725', text: 'Similar to Historical Map (Some Changes)' },
                    { color: '#ff2121', text: 'Historical Building(s) Demolished' },
                    { color: '#CF26DF', text: 'Current Building on Previous Green Space' },
                ]
            }
        },
        {
            mapStyle: 'dynamics_demolished_count',
            legend: {
                title: 'Number of Redevelopments',
                description: 'Number of historical redevelopments for which data has been added',
                elements: knownDemolishedCountLegend,
            },
        }
    ],
    [Category.ConstructionDesign]: [
        {
            mapStyle: 'construction_core_material',
            legend: {
                title: 'Core material',
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
        },
        {
            mapStyle: 'construction_structural_system',
            legend: {
                title: 'Structural system',
                elements: [
                    { color: "#b5a859", text: "Solid masonry walls supporting the roof" },
                    { color: "#ffffe3", text: "A lateral load resisting structure (e.g. concrete or wooden frame)" },
                    { color: "#f5d96b", text: "Other" },
                ]
            },
        },
        {
            mapStyle: 'construction_foundation',
            legend: {
                title: 'Foundations',
                elements: [
                    { color: "#b5a859", text: "Shallow foundations with no lateral support" },
                    { color: "#ffffe3", text: "Shallow foundations with lateral support" },
                    { color: "#f5d96b", text: "Deep foundations with no lateral support" },
                    { color: "#beffe8", text: "Deep Foundations with lateral support" },
                    { color: "#fca89d", text: "Other" },
                ]
            },
        },
        {
            mapStyle: 'construction_roof_shape',
            legend: {
                title: 'Roof shape',
                elements: [
                    { color: "#b5a859", text: "Flat" },
                    { color: "#ffffe3", text: "Pitched with gable ends" },
                    { color: "#f5d96b", text: "Pitched and hipped" },
                    { color: "#beffe8", text: "Pitched with dormers" },
                    { color: "#fca89d", text: "Monopitch" },
                    { color: "#5c8970", text: "Sawtooth" },
                    { color: "#96613b", text: "Curved" },
                    { color: "#c48a85", text: "Complex regular" },
                    { color: "#7bccc4", text: "Complex irregular" },
                    { color: "#bae4bc", text: "Other" }
                ]
            },
        },
        {
            mapStyle: 'construction_roof_covering',
            legend: {
                title: 'Roof covering',
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
        },
        {
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
        },
        {
            mapStyle: 'designer_awards',
            legend: {
                title: 'Awards',
                description: 'Has the building won any awards?',
                elements: [
                    {color: '#f7ec25', text: 'Yes'},
                ]
            },
        },
        {
            mapStyle: 'team_known_designer',
            legend: {
                title: 'Known designer',
                description: 'Buildings with a known architect/designer',
                elements: [
                    {color: '#6bb1e3', text: 'Yes'},
                ]
            },
        },
    ],
    [Category.EnergyPerformance]: [
        {
            mapStyle: 'sust_dec',
            legend: {
                title: 'Energy rating (DEC)',
                description: 'Non-domestic energy rating (DEC Rating)',
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
        },
        {
            mapStyle: 'sust_aggregate_estimate_epc',
            legend: {
                title: 'Energy rating (EPC)',
                description: 'Domestic energy rating (EPC Rating)',
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
        },
        {
            mapStyle: 'energy_solar',
            legend: {
                title: 'Solar panels',
                description: 'Does the building have Solar Panels?',
                elements: [
                    {color: '#6bb1e3', text: 'Yes'},
                ]
            },
        },
    ],
    [Category.PlanningConservation]: [
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
            mapStyle: 'community_building_hominess_avg',
            legend: {
                title: 'Building hominess',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e1fce5', text: '1' },
                    { color: '#a8fab5', text: '2' },
                    { color: '#7dfa92', text: '3' },
                    { color: '#3efa5e', text: '4' },
                    { color: '#00d924', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_building_coherence_avg',
            legend: {
                title: 'Building coherence',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e1ebfc', text: '1' },
                    { color: '#bbd3fa', text: '2' },
                    { color: '#7dabfa', text: '3' },
                    { color: '#3e86fa', text: '4' },
                    { color: '#005efa', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_building_fascination_avg',
            legend: {
                title: 'Building fascination',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#f1e1f7', text: '1' },
                    { color: '#e8bbfa', text: '2' },
                    { color: '#d97dfa', text: '3' },
                    { color: '#c33efa', text: '4' },
                    { color: '#b300fa', text: '5' },
                ]
            }
        },
        // {
        //     mapStyle: 'community_building_neuroaesthetic_avg',
        //     legend: {
        //         title: 'Building neuroaesthetic score',
        //         elements: [
        //             { color: '#fafafa', text: '1' },
        //             { color: '#bbf7fa', text: '2' },
        //             { color: '#7df4fa', text: '3' },
        //             { color: '#3cf0fa', text: '4' },
        //             { color: '#00ced9', text: '5' },
        //         ]
        //     }
        // },
        {
            mapStyle: 'community_streetscape_hominess_avg',
            legend: {
                title: 'Streetscape hominess',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#f0fcde', text: '1' },
                    { color: '#d8faa8', text: '2' },
                    { color: '#c6fa7d', text: '3' },
                    { color: '#acfa3e', text: '4' },
                    { color: '#7fd900', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_streetscape_coherence_avg',
            legend: {
                title: 'Streetscape coherence',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e3fafc', text: '1' },
                    { color: '#bbf5fa', text: '2' },
                    { color: '#7df0fa', text: '3' },
                    { color: '#3eeafa', text: '4' },
                    { color: '#00e5fa', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_streetscape_fascination_avg',
            legend: {
                title: 'Streetscape fascination',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#fce8f0', text: '1' },
                    { color: '#fabbd3', text: '2' },
                    { color: '#fa7dad', text: '3' },
                    { color: '#fa3e86', text: '4' },
                    { color: '#fa0060', text: '5' },
                ]
            }
        },
        // {
        //     mapStyle: 'community_streetscape_neuroaesthetic_avg',
        //     legend: {
        //         title: 'Streetscape neuroaesthetic score',
        //         elements: [
        //             { color: '#fafafa', text: '1' },
        //             { color: '#bbf7fa', text: '2' },
        //             { color: '#7df4fa', text: '3' },
        //             { color: '#3cf0fa', text: '4' },
        //             { color: '#00ced9', text: '5' },
        //         ]
        //     }
        // },
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
    [Category.UrbanInfrastructure]: [
        {
            mapStyle: "context_walkability_index",
            legend: {
                title: 'Walkability Index',
                elements: []
            },
        },
        {
            mapStyle: "context_street_width",
            legend: {
                title: 'Street width',
                elements: []
            },
        }
    ],
    [Category.WaterGreenInfrastructure]: [
        {
            mapStyle: 'context_back_garden',
            legend: {
                title: 'Back gardens',
                description: 'Does the building have a back garden?',
                elements: [
                    {color: '#7cbf39', text: 'Yes'},
                ]
            },
        },
        {
            mapStyle: 'energy_green_roof',
            legend: {
                title: 'Green roof',
                description: 'Does the building have a Green Roof?',
                elements: [
                    {color: '#7cbf39', text: 'Yes'},
                ]
            },
        },
    ],
    [Category.TypologySize]: [
        {
            mapStyle: 'typology_classification',
            legend: {
                title: 'Typology classification',
                elements: [
                    { color: '#0311AB', text: '1-3 storeys: Detached' },
                    { color: '#3845D4', text: '1-3 storeys: Tightly grouped' },
                    { color: '#6D79FD', text: '1-3 storeys: Loosely grouped' },
                    { color: '#FF5D00', text: '4-7 storeys: Detached' },
                    { color: '#FF8000', text: '4-7 storeys: Tightly grouped' },
                    { color: '#FFA200', text: '4-7 storeys: Loosely grouped' },
                    { color: '#AB1303', text: '8+ storeys: Detached' },
                    { color: '#D43A29', text: '8+ storeys: Tightly grouped' },
                    { color: '#FC604F', text: '8+ storeys: Loosely grouped' },
                ]
            }
        },
        /*{
            mapStyle: 'typology_style_period',
            legend: {
                title: 'Architectural style',
                elements: [
                    { color: '#FFF739', text: '43AD-410 (Roman)' },
                    { color: '#C5BD00', text: '410-1485 (Medieval)' },
                    { color: '#FF9A39', text: '1485-1603 (Tudor)' },
                    { color: '#C56000', text: '1603-1714 (Stuart)' },
                    { color: '#EA8072', text: '1714-1837 (Georgian)' },
                    { color: '#A71200', text: '1837-1901 (Victorian)' },
                    { color: '#A272D4', text: '1901-1914 (Edwardian)' },
                    { color: '#3988C5', text: '1914-1945 (WWI-WWII)' },
                    { color: '#5ADFA2', text: '1946-1979 (Post war)' },
                    { color: '#C2F47A', text: '1980-1999 (Late C20)' },
                    { color: '#6FB40A', text: '2000-2025 (Early C21)' },
                ]
            }
        },*/
        {
            mapStyle: 'typology_dynamic_classification',
            legend: {
                title: 'Dynamic classification',
                elements: [
                    { color: '#FF7F11', text: 'Small, often repetitive plots, mainly residential' },
                    { color: '#FF1B1C', text: 'Linear non-domestic, i.e. high streets' },
                    { color: '#40E0D0', text: 'Large plots with internal roads' },
                ]
            }
        },
        {
        mapStyle: 'original_landuse',
            legend: {
                title: 'Original Land Use',
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
            mapStyle: 'building_attachment_form',
            legend: {
                title: 'Attachment/Adjacency',
                elements: [
                    { color: "#f2a2b9", text: "Detached" },
                    { color: "#ab8fb0", text: "Semi-Detached" },
                    { color: "#3891d1", text: "End-Terrace" },
                    { color: "#226291", text: "Mid-Terrace" }
                ]
            },
        },
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
        },
        {
            mapStyle: 'size_total_floors',
            legend: {
                title: 'Total number of floors',
                elements: [
                    { color: '#f7f4f9', text: '1'},
                    { color: '#e7e1ef', text: '2'},
                    { color: '#d4b9da', text: '3 - 4'},
                    { color: '#c994c7', text: '5'},
                    { color: '#df65b0', text: '6 - 10'},
                    { color: '#e7298a', text: '11 - 20'},
                    { color: '#ce1256', text: '21 - 34'},
                    { color: '#980043', text: '35 +'}
                ]
            },
        },
        {
            mapStyle: 'size_storeys_basement',
            legend: {
                title: 'Floors below ground level',
                elements: [
                    { color: '#f7f4f9', text: '1'},
                    { color: '#d4b9da', text: '2'},
                    { color: '#df65b0', text: '3'},
                    { color: '#ce1256', text: '4+'},
                ]
            },
        },
        {
            mapStyle: 'size_floor_area_ground',
            legend: {
                title: 'Ground floor area (m2)',
                elements: [
                    { color: '#f7f4f9', text: '0 - 25'},
                    { color: '#e7e1ef', text: '25 - 50'},
                    { color: '#d4b9da', text: '50 - 100'},
                    { color: '#c994c7', text: '100 - 250'},
                    { color: '#df65b0', text: '250 - 500'},
                    { color: '#e7298a', text: '500 - 1000'},
                    { color: '#ce1256', text: '1000 - 2000'},
                    { color: '#980043', text: '2000 +'}
                ]
            },
        }
    ],
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
                title: 'Residential building',
                elements: [
                    { color: '#f7ec25', text: 'Residential' },
                    { color: '#fc9b2a', text: 'Mixed' },
                    { color: '#ff2121', text: 'Non-residential' },
                ]
            }
        }
    ],
    [Category.RetrofitCondition]: [
        
    ],
    [Category.DisasterManagement]: [
        {
            mapStyle: 'disaster_severity',
            legend: {
                title: 'Damage severity',
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
                elements: knownDemolishedCountLegend,
            },
        }
    ]
    
};
