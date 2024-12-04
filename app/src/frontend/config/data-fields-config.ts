import { Category } from './categories-config';
import { CCConfig } from '../../cc-config';
let ccconfig: CCConfig = require('../../cc-config.json')

/*
 * Common list of Source Types, used in multiple menus
*/
export const commonSourceTypes = [
    "Assessed by eye/personal knowledge of the building",
    "Assessed using professional knowledge of building or building type",
    "Assessed using streetview photographs, satellite imagery or maps",
    "Assessed by specialist emergency group",
    "Central government record/online database",
    "Local government record/online database",
    "Live streamed from a government source",
    "Open database (non-profit)",
    "Open database (commercial)",
    "Website (non-profit)",
    "Website (commercial)",
    "Inferred computationally from CCRP data",
    "Inferred by eye from CCRP data",
    "Synthetic data",
    "Other"
];

const freeTextDisclaimer : string = 
    "<br/><br/>(For security reasons, we are not currently allowing free-text input and are looking into other ways of collecting this data).";

/**
 * This interface is used only in code which uses dataFields, not in the dataFields definition itself
 * Cannot make dataFields an indexed type ({[key: string]: DataFieldDefinition}),
 * because then we wouldn't have type-checking for whether a given key exists on dataFields,
 * e.g. dataFields.foo_bar would not be highlighted as an error.
 */
export interface DataFieldDefinition {
    /**
     * The primary category to which the field belongs.
     * 
     * A field could be displayed in several categories, but this value will be used
     * when a single category needs to be shown in the context of a field, e.g.
     * in the case of edit history or the copy-paste tool (multi-edit)
     *  */
    category: Category;

    /**
     * The human-readable title of the field to be displayed as label.
     */
    title: string;

    /**
     * Text to be displayed in the hint tooltip next to the input field.
     * 
     * This supports a simple Markdown-like syntax for embedding clickable URLs in the hint
     * for example "see [here](http://example.com/info.html) for more information"
     */
    tooltip?: string;

    /**
     * If the defined type is an array, this describes the fields of each array item.
     * The nested fields don't currently need a category field to be defined.
     */
    items?: { [key: string]: Omit<DataFieldDefinition, 'category'> };


    /**
     * If the defined type is a dictionary, this describes the types of the dictionary's fields
     */
    fields?: { [key: string]: Omit<DataFieldDefinition, 'category'> }

    /**
     * The example is used to determine the runtime type in which the attribute data is stored (e.g. number, string, object)
     * This gives the programmer auto-complete of all available building attributes when implementing a category view.
     * 
     * E.g. if the field is a text value, an empty string ("") is the simplest example.
     * 
     * Making it semantically correct is useful but not necessary.
     * E.g. for building attachment form, you could use "Detached" as example
     * 
     * This field is later processed by AttributesBasedOnExample
     */
    example: any;

    /**
     * Whether the field is a field that has an independent value for each user.
     * For example, user building likes are one of such fields.
     * By default this is false - fields are treated as not user-specific.
     */
    perUser?: boolean;
}

export const buildingUserFields = {
    community_like: {
        perUser: true,
        category: Category.Community,
        title: "Do you like this building and think it contributes to the city?",
        tooltip: "In your opinion, does this specific building contribute something to the city?",
        example: true,
    },
    community_type_worth_keeping: {
        perUser: true,
        category: Category.Community,
        title: "Do you think this **type** of building contributes to the city?",
        tooltip: "In your opinion, does this type of building contribute something to the city?",
        example: true,
    },
    community_type_worth_keeping_reasons: {
        perUser: true,
        category: Category.Community,
        title: 'Please tick one or more boxes below',
        fields: {
            external_design: {
                title: "Because the external design contributes to the streetscape"
            },
            internal_design: {
                title: 'Because the internal layout works well'
            },
            adaptable: {
                title: 'Because the building can be easily adapted and reused'
            },
            using_outside_space: {
                title: 'Because the building incorporates outside space'
            },
            durable: {
                title: 'Because the construction method and materials are likely to be long-lasting'
            },
            other: {
                title: 'other'
            }
        },
        example: {
            external_design: true,
            internal_design: true,
            adaptable: false,
            using_outside_space: true,
            durable: true,
            other: false
        }
    },
    community_building_worth_keeping: {
        perUser: true,
        category: Category.Community,
        title: "Do you have any other comments on this **type** of building?",
        tooltip: "Please tick the box if you think this kind of building should be kept by our towns and cities for the future?",
        example: true,
    },
    community_building_worth_keeping_reasons: {
        perUser: true,
        category: Category.Community,
        title: 'I think that: (Please tick all that apply)',
        fields: {
            internal_layout: {
                title: 'The internal layout works well.'
            },
            building_feel: {
                title: "The building feels nice to be in/use."
            },
            near_greenery: {
                title: 'The building is near greenery.'
            },
            adaptable: {
                title: 'This kind of building is very adaptable.'
            },
            durable: {
                title: 'This kind of building is well built and long lasting.'
            },
            building_other: {
                title: 'Other'
            }
        },
        example: {
            internal_layout: true,
            building_feel: true,
            near_greenery: false,
            adaptable: true,
            durable: true,
            building_other: false
        }
    },
    community_building_worth_keeping_based_on: {
        perUser: true,
        category: Category.Community,
        title: "How well do you know this building and its streetscape?",
        tooltip: "What are your answers to the questions below based on, please select an answer.",
        example: "",
        items: [
            "Local knowledge",
            "Professional interest",
            "A general impression from passing through the area",
            "Seeing an image"
        ]
    },
    community_streetscape_worth_keeping: {
        perUser: true,
        category: Category.Community,
        title: "Do you have any other comments on this **type** of streetscape?",
        tooltip: "Please tick the box if you think this kind of streetscape should be kept by our towns and cities for the future?",
        example: true,
    },
    community_streetscape_worth_keeping_reasons: {
        perUser: true,
        category: Category.Community,
        title: 'I think that: (Please tick all that apply)',
        fields: {
            street_feel: {
                title: "The street feels nice to walk down."
            },
            feels_safe: {
                title: 'The layout and type of buildings makes the street feels safe.'
            },
            interesting: {
                title: 'There are interesting things to look at.'
            },
            greenery: {
                title: 'The street has greenery.'
            },
            public_art: {
                title: 'The street has public art.'
            },
            streetscape_other: {
                title: 'Other'
            }
        },
        example: {
            street_feel: true,
            feels_safe: true,
            interesting: false,
            greenery: true,
            public_art: true,
            streetscape_other: false
        }
    },
    community_streetscape_worth_keeping_based_on: {
        perUser: true,
        category: Category.Community,
        title: "Are your answers above based on:",
        tooltip: "What are your answers to the above questions based on, please select an answer.",
        example: "",
        items: [
            "Local knowledge of the street",
            "Professional interest in this kind of building",
            "A general impression from passing through the area",
            "Seeing an image of the streetscape"
        ]
    },
    community_school_project_data: {
        perUser: true,
        category: Category.Community,
        title: "Are you entering this data as part of a school project?",
        tooltip: "Please tick here if data is being entered as part of a school project.",
        example: true,
    },

    community_local_significance: {
        perUser: true,
        category: Category.Community,
        title: "Do you think this building should be recorded as being of special local interest?",
        tooltip: "In your opinion, is this building of special local interest?",
        example: true
    },
    community_expected_planning_application: {
        perUser: true,
        category: Category.Community,
        title: "Do you think that this building may be subject to a planning application, involving demolition, over the next six months?",
        tooltip: "Are you aware of any upcoming planning applications relating to this building?",
        example: true
    },
    
    community_building_hominess: {
        category: Category.Community,
        title: "Hominess of the building’s exterior.",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
    community_building_coherence: {
        category: Category.Community,
        title: "Coherence of the building's exterior",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
    community_building_fascination: {
        category: Category.Community,
        title: "Fascination of the building's exterior",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
    community_streetscape_hominess: {
        category: Category.Community,
        title: "Hominess of the surrounding streetscape.",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
    community_streetscape_coherence: {
        category: Category.Community,
        title: "Coherence of the surrounding streetscape.",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
    community_streetscape_fascination: {
        category: Category.Community,
        title: "Fascination of the surrounding streetscape.",
        tooltip: `Based on <a href="https://www.sciencedirect.com/science/article/pii/S0010945220300332?casa_token=WiBFU-E3AGcAAAAA:6qOymtPLh1gxvgLXiVSD8OAhbOY37-ErO3NehKj4vEnhZr-uR2lCU-vFcbGDE8IN8UkI8Ug">Coburn et. al</a>.`,
        example: 3,
    },
};


export const dataFields = { /* eslint-disable @typescript-eslint/camelcase */
    location_name: {
        category: Category.Location,
        title: "Building name (non-residential)",
        tooltip: "The name of the building." + freeTextDisclaimer,
        example: "Broadcasting House",
    },
    location_name_link: {
        category: Category.Location,
        title: "Building name link (non-residential) - Wikipedia or other",
        tooltip: "Link to a website with the name of the building.",
        example: "https://en.wikipedia.org/wiki/Palace_of_Westminster",
    },
    location_residential_name_link: {
        category: Category.Location,
        title: "Building name link (residential) - Wikipedia or other",
        tooltip: "Link to a website with the name of the building.",
        example: "https://en.wikipedia.org/wiki/221B_Baker_Street",
    },
    location_number: {
        category: Category.Location,
        title: "Building number",
        example: '12b',
        tooltip: 'Numbers with an optional lowercase letter are accepted, e.g. 141 or 12b'
    },
    location_street: {
        category: Category.Location,
        title: "Street name",
        example: "Gower Street",
        tooltip: "The name of the street on which the building is located." + freeTextDisclaimer,
    },
    location_line_two: {
        category: Category.Location,
        title: "Address line 2",
        example: "Flat 21",
        tooltip: "Second line of the address." + freeTextDisclaimer,
    },
    location_town: {
        category: Category.Location,
        title: "Town/City",
        example: "London",
        tooltip: "Name of the town or city where the building is located." + freeTextDisclaimer,
    },
    location_postcode: {
        category: Category.Location,
        title: "Area code/"+ccconfig.postcode,
        example: "W1W 6TR",
        tooltip: "Correctly formatted UK postcode, i.e. NW1 2FB",
    },
    location_address_source: {
        category: Category.Location,
        title: "Source type",
        example: "",
        tooltip: "Source of address data.",
        items: commonSourceTypes
    },
    location_address_links: {
        category: Category.Location,
        title: "Source link(s)",
        tooltip: "URL(s) for building address data source(s).",
        example: ["", "", ""],
    },
    ref_toid: {
        category: Category.Location,
        title: "Open building footprint ID",
        tooltip: "Ordnance Survey Topography Layer ID (TOID)",
        example: "",
    },
    location_alternative_footprint_links: {
        category: Category.Location,
        title: "Alternative open building footprint links",
        tooltip: "Links to alternative building footprint datasets (include the direct link to the footprint of this building where possible).",
        example: ["", "", ""],
    },
    location_subdivided: {
        category: Category.Location,
        title: 'Is this building subdivided',
        tooltip: 'Does this building comprise multiple, smaller properties?',
        example: true,
    },
    location_num_subdivisions: {
        category: Category.Location,
        title: "How many properties are within this building?",
        tooltip: "For example, if a former house has been converted into three flats, put '3'",
        example: 3,
    },
    location_subdivisions_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type for the building data above",
        items: commonSourceTypes,
        example: "",
    },
    location_subdivisions_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "URL for data reference",
        example: ["", "", ""],
    },
    
    /**
     * UPRNs is not part of the buildings table, but the string fields 
     * are included here for completeness
     */
    uprns: {
        category: Category.Location,
        title: "Open Unique Property Reference Number(s) (UPRN)",
        tooltip: "Unique Property Reference Number(s) (UPRN) (derived automatically).<br/><br/>License information: <a href='https://www.ordnancesurvey.co.uk/business-government/tools-support/open-mastermap-programme/open-id-policy'>here</a>",
        example: [{ uprn: "", parent_uprn: "" }, { uprn: "", parent_uprn: "" }],
    },

    planning_data: {
        category: Category.Location,
        title: "PLANNING DATA",
        tooltip: "PLANNING DATA",
        example: [{ uprn: "", building_id: 1, data_source: "" },
        { uprn: "", building_id: 1, data_source: "", status: "", status_before_aliasing: "", decision_date: "", description: "", planning_application_link: "", registered_with_local_authority_date: "", last_synced_date: "", data_source_link: "", address: "" },
        ],
    },

    ref_osm_id: {
        category: Category.Location,
        title: "OpenStreetMap ID",
        tooltip: "OpenStreetMap building ('way') ID - Numerical string of up to 9 characters",
        example: "",
    },
    location_latitude: {
        category: Category.Location,
        title: "Building latitude coordinate",
        tooltip: "Latitude of building, using WGS 84 (EPSG:4326). Building geometry is reduced to a point representing it.",
        example: 12.4564,
    },
    location_longitude: {
        category: Category.Location,
        title: "Building longitude coordinate",
        tooltip: "Longitude of building, using WGS 84 (EPSG:4326). Building geometry is reduced to a point representing it.",
        example: 0.12124,
    },
    location_coordinates_source: {
        category: Category.Location,
        title: "Source type",
        example: "",
        tooltip: "Source of coordinate data.",
        items: commonSourceTypes
    },
    location_coordinates_links: {
        category: Category.Location,
        title: "Source link(s)",
        tooltip: "URL(s) for building coordinate data source(s).",
        example: ["", "", ""],
    },
    current_landuse_group: {
        category: Category.LandUse,
        title: "Current land use(s)",
        tooltip: "Land use Groups as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: ["", ""],
    },
    current_landuse_order: {
        category: Category.LandUse,
        title: "Current land use (order)",
        tooltip: "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification). Derived automatically from the data above.",
        example: "",
    },
    current_landuse_source: {
        category: Category.LandUse,
        title: "Source type",
        tooltip: "Source for the current land use",
        example: "",
        items: commonSourceTypes
    },
    current_landuse_source_detail: {
        category: Category.LandUse,
        title: "Source details",
        tooltip: "References for current land use source (max 500 characters)",
        example: "",
    },
    current_landuse_link: {
        category: Category.LandUse,
        title: "Source link(s)",
        tooltip: "URL(s) for current land use reference",
        example: ["", "", ""],
    },
    current_landuse_verified: {
        category: Category.LandUse,
        title: 'Has this land use been manually verified?',
        example: true,
    },
    building_attachment_form: {
        category: Category.TypologySize,
        title: "Which description best explains the way the building is attached to others?",
        tooltip: "We have pre-populated these based on their current attachment. A building can either be detached, semi-detached or part of a terrace (middle or end)",
        example: "",
        items: [
            "Detached",
            "Semi-Detached",
            "End-Terrace",
            "Mid-Terrace"
        ]
    },
    building_attachment_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type for the building subdivision data",
        items: commonSourceTypes,
        example: "",
    },
    building_attachment_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "URL for source of building subdivision data",
        example: ["", "", ""],
    },
    size_roof_shape: {
        category: Category.TypologySize,
        title: "Roof type",
        example: "",
        //tooltip: ,
    },
    date_year: {
        category: Category.AgeHistory,
        title: "Year construction started (best estimate)",
        tooltip: "Best estimate for the year that construction began on this building.",
        example: 1924,
    },
    date_year_completed: {
        category: Category.AgeHistory,
        title: "Year construction completed (best estimate)",
        tooltip: "Best estimate for the year that construction completed on this building.",
        example: 1925,
    },
    date_lower: {
        category: Category.AgeHistory,
        title: "Year construction started (best estimate)",
        tooltip: "Best estimate for the earliest year in which construction could have started.",
        example: 1900,
    },
    date_upper: {
        category: Category.AgeHistory,
        title: "Latest possible start year",
        tooltip: "This should be the latest year in which building could have started.",
        example: 2000,
    },
    facade_year: {
        category: Category.AgeHistory,
        title: "Date of front of building (best estimate)",
        tooltip: "Best estimate for when the front/facade of the building was constructed.",
        example: 1900,
    },
    date_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type for the building dates above, more specific historical source types listed below.",
        items: commonSourceTypes,
        example: "",
    },
    date_source_links: {
        category: Category.AgeHistory,
        title: "Alternative Source link(s)",
        tooltip: "URL(s) for historical data source(s) - Alternative data source(s)",
        example: ["", "", ""],
    },
    size_storeys_core: {
        category: Category.ConstructionDesign,
        title: "Core number of floors",
        tooltip: "How many floors are there between the pavement and start of roof?",
        example: 10,
    },
    size_storeys_attic: {
        category: Category.ConstructionDesign,
        title: "Number of floors within roof space",
        tooltip: "How many floors above start of roof?",
        example: 1,
    },
    size_storeys_basement: {
        category: Category.ConstructionDesign,
        title: "Number of floors beneath ground level",
        tooltip: "How many floors below pavement level?",
        example: 1,
    },
    size_storeys_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of building floors data",
        example: "",
        items: commonSourceTypes
    },
    size_storeys_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for building floors data source(s)",
        example: ["", "", ""],
    },
    size_height_apex: {
        category: Category.ConstructionDesign,
        title: "Height to apex (m)",
        example: 100.5,
        tooltip: "i.e. the highest part of the roof (in meters).",
    },
    size_height_apex_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of building height (apex) data",
        example: "",
        items: commonSourceTypes
    },
    size_height_apex_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for building height (apex) source(s)",
        example: ["", "", ""],
    },
    size_height_eaves: {
        category: Category.ConstructionDesign,
        title: "Height to eaves (m)",
        example: 20.33,
        tooltip: "i.e. to where the top of the wall meets the roof (in meters)",
    },
    size_height_eaves_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of building height (eaves) data",
        example: "",
        items: commonSourceTypes
    },
    size_height_eaves_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for building height (eaves) source(s)",
        example: ["", "", ""],
    },
    size_floor_area_ground: {
        category: Category.ConstructionDesign,
        title: "Ground floor area (m²)",
        example: 1245.6,
        tooltip: "Area of the ground floor of the building in m²",
    },
    size_floor_area_total: {
        category: Category.ConstructionDesign,
        title: "Total floor area (m²)",
        example: 2001.7,
        tooltip: "Total floor area of the building in m²",
    },
    size_floor_area_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of floor area data",
        example: "",
        items: commonSourceTypes
    },
    size_floor_area_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for floor area data source(s)",
        example: ["", "", ""],
    },
    size_width_frontage: {
        category: Category.ConstructionDesign,
        title: "Frontage width (m)",
        example: 12.2,
        tooltip: "Size of the frontage of the building (in meters)",
    },
    size_width_frontage_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of building frontage data",
        example: "",
        items: commonSourceTypes
    },
    size_width_frontage_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for building frontage source(s)",
        example: ["", "", ""],
    },

    size_configuration: {
        category: Category.ConstructionDesign,
        title: "Configuration (semi/detached, end/terrace)",
        example: "",
        //tooltip: ,
    },

    size_plot_area_total: {
        category: Category.RetrofitCondition,
        title: "Total area of plot (m²)",
        example: 123.02,
        tooltip: "Total area of plot (m²)",
    },
    size_plot_area_total_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of plot area data",
        example: "",
        items: commonSourceTypes
    },
    size_plot_area_total_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for plot area data source(s)",
        example: ["", "", ""],
    },
    size_far_ratio: {
        category: Category.RetrofitCondition,
        title: "FAR ratio (percentage of plot covered by building)",
        example: 60.0,
        tooltip: "The measurement of a building's floor area in relation to the size of the lot/parcel.",
    },
    size_far_ratio_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of FAR ratio data",
        example: "",
        items: commonSourceTypes
    },
    size_far_ratio_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for FAR ratio data source(s)",
        example: ["", "", ""],
    },
    size_parcel_geometry: {
        category: Category.RetrofitCondition,
        title: "Land parcel geometry link",
        example: "https://",
        tooltip: "Please provide a link to the land parcel geometry for this building (<a href='https://www.gov.uk/guidance/inspire-index-polygons-spatial-data'>INSPIRE Polygons</a>)",
    },
    size_parcel_geometry_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of parcel geometry data",
        example: "",
        items: commonSourceTypes
    },
    size_parcel_geometry_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for parcel geometry data source(s)",
        example: ["", "", ""],
    },

    construction_core_material: {
        category: Category.PlanningConservation,
        title: "What is the main structural material thought to be?",
        tooltip: "The main structural material used in the building.",
        example: "",
        items: [
            'Wood',
            'Stone',
            'Brick',
            'Steel',
            'Reinforced Concrete',
            'Other Metal',
            'Other Natural Material',
            'Other Man-Made Material'
        ]
    },
    construction_core_material_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of main structural material data",
        example: "",
        items: commonSourceTypes
    },
    construction_core_material_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for main structural material data source(s)",
        example: ["", "", ""],
    },

    construction_secondary_materials: {
        category: Category.PlanningConservation,
        title: "Main secondary construction material/s",
        tooltip: "Other construction materials",
        example: "",
    },

    construction_roof_covering: {
        category: Category.PlanningConservation,
        title: "What is the main roof covering?",
        tooltip: "What material covers the majority of the building's roof?",
        example: "",
        items: [
            'Slate',
            'Clay Tile',
            'Wood',
            'Asphalt',
            'Iron or Steel',
            'Other Metal',
            'Other Natural Material',
            'Other Man-Made Material'
        ]
    },
    construction_roof_covering_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of roof covering data",
        example: "",
        items: commonSourceTypes
    },
    construction_roof_covering_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for roof covering data source(s)",
        example: ["", "", ""],
    },
    construction_structural_system: {
        category: Category.PlanningConservation,
        title: "What type of structural system does the building appear to have?",
        tooltip: "Refer to GEM Taxonomy [<a href='https://github.com/gem/gem_taxonomy'>LINK</a>]",
        example: "Solid masonry walls supporting the roof",
        items: [
            "Solid masonry walls supporting the roof",
            "A lateral load resisting structure (e.g. concrete or wooden frame)",
            "Other"
        ]
    },
    construction_structural_system_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of structural system data",
        example: "",
        items: commonSourceTypes
    },
    construction_structural_system_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for structural system data source(s)",
        example: ["", "", ""],
    },
    construction_foundation: {
        category: Category.PlanningConservation,
        title: "What is the foundation system thought to be",
        tooltip: "Refer to GEM Taxonomy [<a href='https://taxonomy.openquake.org/terms/foundation-system'>LINK</a>]",
        example: "Deep Foundations with lateral support",
        items: [
            "Shallow foundations with no lateral support",
            "Shallow foundations with lateral support",
            "Deep foundations with no lateral support",
            "Deep Foundations with lateral support",
            "Other"
        ]
    },
    construction_foundation_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of foundation system data",
        example: "",
        items: commonSourceTypes
    },
    construction_foundation_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for foundation system data source(s)",
        example: ["", "", ""],
    },
    construction_roof_shape: {
        category: Category.PlanningConservation,
        title: "What kind of roof shape does the building have?",
        tooltip: "Refer to GEM Taxonomy [<a href='https://taxonomy.openquake.org/terms/roof-shape'>LINK</a>]",
        example: "Pitched with gable ends",
        items: [
            "Flat",
            "Pitched with gable ends",
            "Pitched and hipped",
            "Pitched with dormers",
            "Monopitch",
            "Sawtooth",
            "Curved",
            "Complex regular",
            "Complex irregular",
            "Other"
        ]
    },
    construction_roof_shape_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of roof shape data",
        example: "",
        items: commonSourceTypes
    },
    construction_roof_shape_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for roof shape data source(s)",
        example: ["", "", ""],
    },
    construction_irregularities: {
        category: Category.PlanningConservation,
        title: "Are there any irregularities in the shape of the building?",
        tooltip: "i.e. Is one side higher than other? - Refer to GEM Taxonomy [<a href='https://github.com/gem/gem_taxonomy'>LINK</a>]",
        example: "No irregularities",
        items: [
            "Vertical irregularities",
            "Horizontal irregularities",
            "No irregularities"
        ]
    },
    construction_irregularities_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of irregularity data",
        example: "",
        items: commonSourceTypes
    },
    construction_irregularities_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for irregularity data source(s)",
        example: ["", "", ""],
    },
    construction_decorative_features: {
        category: Category.PlanningConservation,
        title: "Are there decorative features/mouldings integrated into the facade?",
        tooltip: "Any features that are part of the facade that are purely decorative.",
        example: true,
    },
    construction_decorative_feature_materials: {
        category: Category.PlanningConservation,
        title: "What are these decorative features mainly made of?",
        tooltip: "What material are the main/majority of decorative features constructed from?",
        example: "Concrete",
        items: [
            "Wood",
            "Clay",
            "Concrete",
            "Glass",
            "Metal",
            "Other"
        ]
    },
    construction_decorative_feature_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of decorative features data",
        example: "",
        items: commonSourceTypes
    },
    construction_decorative_feature_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for decorative features data source(s)",
        example: ["", "", ""],
    },
    construction_internal_wall: {
        category: Category.PlanningConservation,
        title: "What is the main internal wall material thought to be?",
        tooltip: "The material that comprises the majority of the internal walls of the property.",
        example: "",
        items: [
            'Brick',
            'Stone',
            'Concrete blocks',
            'Concrete slabs/panels',
            'Wood',
            'Metal',
            'Adobe/Earth',
            'Glass',
            'Plastic',
            'Stucco on light framing',
            'Vegetative (straw, matting etc)',
            'Cement based boards',
            'Other'
        ]
    },
    construction_internal_wall_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of internal wall data",
        example: "",
        items: commonSourceTypes
    },
    construction_internal_wall_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for internal wall data source(s)",
        example: ["", "", ""],
    },
    construction_external_wall: {
        category: Category.PlanningConservation,
        title: "What is the main external wall material thought to be?",
        tooltip: 'The material that comprises the majority of the external walls of the property.',
        example: "",
        items: [
            'Brick',
            'Stone',
            'Concrete blocks',
            'Concrete slabs/panels',
            'Wood',
            'Metal',
            'Adobe/Earth',
            'Glass',
            'Plastic',
            'Stucco on light framing',
            'Vegetative (straw, matting etc)',
            'Cement based boards',
            'Other'
        ]
    },
    construction_external_wall_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of external wall data",
        example: "",
        items: commonSourceTypes
    },
    construction_external_wall_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for external wall data source(s)",
        example: ["", "", ""],
    },
    construction_ground_floor: {
        category: Category.PlanningConservation,
        title: "What is the main ground floor material thought to be?",
        tooltip: "The material that comprises the majority of the ground floor of the property.",
        example: "",
        items: [
            'Masonry',
            'Earthen',
            'Concrete',
            'Wood',
            'Metal',
            'Other',
        ]
    },
    construction_ground_floor_source_type: {
        category: Category.PlanningConservation,
        title: "Source type",
        tooltip: "Source of ground floor material data",
        example: "",
        items: commonSourceTypes
    },
    construction_ground_floor_source_links: {
        category: Category.PlanningConservation,
        title: "Source links",
        tooltip: "URL(s) for ground floor material data source(s)",
        example: ["", "", ""],
    },

    sust_breeam_rating: {
        category: Category.WaterGreenInfrastructure,
        title: "Official environmental quality rating",
        tooltip: ccconfig.energy_rating,
        example: "",
    },
    sust_breeam_rating_source_type: {
        category: Category.WaterGreenInfrastructure,
        title: "Source type",
        tooltip: "Source of environmental quality rating",
        example: "",
        items: commonSourceTypes
    },
    sust_breeam_rating_source_link: {
        category: Category.WaterGreenInfrastructure,
        title: "Source link",
        tooltip: "Link to environmental quality rating",
        example: "",
    },
    sust_dec: {
        category: Category.WaterGreenInfrastructure,
        title: "Non-residential Building Energy Rating",
        tooltip: "Display Energy Certificate (DEC) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use",
        example: "G",
    },
    sust_aggregate_estimate_epc: {
        category: Category.WaterGreenInfrastructure,
        title: "Residential Building Energy Rating",
        tooltip: "Energy Performance Certificate (EPC) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher may be rented",
        example: "",
    },
    sust_energy_rating_source_type: {
        category: Category.WaterGreenInfrastructure,
        title: "Source type",
        tooltip: "Source of energy rating",
        example: "",
        items: commonSourceTypes
    },
    sust_energy_rating_source_link: {
        category: Category.WaterGreenInfrastructure,
        title: "Source link",
        tooltip: "Link to energy rating",
        example: "",
    },
    sust_retrofit_date: {
        category: Category.WaterGreenInfrastructure,
        title: "Last significant retrofit",
        tooltip: "Date of last major building refurbishment",
        example: 1920,
    },
    sust_retrofit_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of last significant retrofit data",
        example: "",
        items: commonSourceTypes
    },
    sust_retrofit_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for last significant retrofit data source(s)",
        example: ["", "", ""],
    },
    sust_life_expectancy: {
        category: Category.WaterGreenInfrastructure,
        title: "Expected lifespan for typology",
        example: 123,
        //tooltip: ,
    },

    survival_status: {
        category: Category.AgeHistory,
        title: "Survival status",
        tooltip: "Survival and Loss tracked using Historical Maps",
        items: [
            "Same as Historical Map (Unchanged)",
            "Similar to Historical Map (Some Changes)",
            "Historical Building(s) Demolished",
            "Current Building on Previous Green Space"
        ],
        example: "",
    },

    survival_source: {
        category: Category.AgeHistory,
        title: "Method type",
        tooltip: "Source for the survival status",
        items: [
            "Matched by comparing maps",
            "Checked using streetview images",
            "Historical publication or archive document",
            "Expert knowledge",
            "Other"
        ],
        example: "",
    },

    survival_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "Links to sources of survival/historical information on this building",
        example: ["", "", ""],
    },

    edit_history: {
        category: Category.UrbanInfrastructure,
        title: "PLANNING DATA",
        tooltip: "PLANNING DATA",
        example: [{}],
    },

    planning_portal_link: {
        category: Category.UrbanInfrastructure,
        title: "Local authority planning application link",
        example: "",
        //tooltip: ,
    },
    planning_in_conservation_area_url: {
        category: Category.UrbanInfrastructure,
        title: "Please provide a link to information about the conservation area.",
        tooltip: "Link to a website containing information about the conservation area that the building is in.",
        example: "",
    },
    planning_crowdsourced_site_completion_status: {
        category: Category.UrbanInfrastructure,
        title: "Has the work on this site been completed?",
        tooltip: "Select 'yes' if all work has been completed, 'no' if work is still ongoing.",
        example: true,
    },
    planning_crowdsourced_site_completion_year: {
        category: Category.UrbanInfrastructure,
        title: "Year of completion (best estimate)",
        tooltip: "Year when the work was completed, if known",
        example: 2022,
    },
    planning_crowdsourced_site_completion_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for work complete data",
        example: "",
        items: commonSourceTypes
    },
    planning_crowdsourced_site_completion_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for work complete  data",
        example: ["", "", ""],
    },
    planning_crowdsourced_planning_id: {
        category: Category.UrbanInfrastructure,
        title: "If you know of a planning application that has been recently submitted for this site, and is not listed in the blue box above, please enter its planning application ID below:",
        example: "1112/QWERTY",
        //tooltip: ,
    },
    planning_in_conservation_area: {
        category: Category.UrbanInfrastructure,
        title: "Is the building in a conservation area?",
        tooltip: "Is the building in any kind of special conservation area, such as...?",
        example: true,
    },
    planning_in_conservation_area_id: {
        category: Category.UrbanInfrastructure,
        title: "Conservation Area identifier",
        example: "",
        //tooltip: ,
    },
    planning_conservation_area_name: {
        category: Category.UrbanInfrastructure,
        title: "Conservation Area Name",
        example: "",
        //tooltip: ,
    },
    planning_listed: {
        category: Category.UrbanInfrastructure,
        title: "Is this a listed building?",
        tooltip: "Is the building a listed building according to <a href=\"https://historicengland.org.uk/advice/hpg/has/whs/\" target=\"_blank\">Historic England</a>",
        example: true,
    },
    planning_list_id: {
        category: Category.UrbanInfrastructure,
        title: "If the building is on a national heritage register, please add the ID:",
        example: "121436",
        tooltip: "e.g. National Heritage List for England (NHLE)",
    },
    planning_list_grade: {
        category: Category.UrbanInfrastructure,
        title: "What is its protection rating?",
        tooltip: "What level of protection rating applies to this building?",
        example: "II",
        items: [
            'I',
            'II*',
            'II',
        ]
    },
    planning_heritage_at_risk_url: {
        category: Category.UrbanInfrastructure,
        title: "If the building is on a heritage at risk register, please provide a link to the entry on the register.",
        tooltip: "Please provide the full link to the building's entry on the register, if possible.",
        example: "",
    },
    planning_world_heritage_site: {
        category: Category.UrbanInfrastructure,
        title: "Is the building on a World Heritage Site?",
        tooltip: "Is the building on a UNESCO <a href=\"https://www.unesco.org/en\" target=\"_blank\">World Heritage Site</a>",
        example: true,
    },
    planning_world_list_id: {
        category: Category.UrbanInfrastructure,
        title: "Please add the World Heritage Site ID:",
        tooltip: "Add the ID of the building/site on the UNESCO World Heritage Site registry. A link to the relevant resource will be generated automatically.",
        example: "488",
    },
    planning_glher_url: {
        category: Category.UrbanInfrastructure,
        title: "Is it recorded on any historic environment records?",
        example: "",
        //tooltip: ,
    },
    planning_in_apa: {
        category: Category.UrbanInfrastructure,
        title: "Is the building in an area of archaeological priority?",
        tooltip: "If the building is in an area of archaeological priority, select 'yes'.",
        example: true,
    },
    planning_in_apa_url: {
        category: Category.UrbanInfrastructure,
        title: "Area of archaeological priority link",
        tooltip: "Please provide a link to more information about the area of archaeological priority.",
        example: "",
    },
    planning_local_list: {
        category: Category.UrbanInfrastructure,
        title: "Is the building a locally listed heritage asset?",
        tooltip: "Examples of locally-listed heritage assets include...",
        example: true,
    },
    planning_local_list_url: {
        category: Category.UrbanInfrastructure,
        title: "Please provide a link to the heritage asset registry.",
        tooltip: "A website containing information about the asset registry, ideally a link to the buildings entry on that registry.",
        example: "",
    },
    planning_historic_area_assessment: {
        category: Category.UrbanInfrastructure,
        title: "Does the building have any other type of designation?",
        tooltip: "Select yes if the building has any other type of special designation that does not fit into the categories above.",
        example: true,
    },
    planning_historic_area_assessment_url: {
        category: Category.UrbanInfrastructure,
        title: "Links to other designation type:",
        tooltip: "Please provide a link describing the other special types of designation that apply to this building.",
        example: "",
    },
    planning_demolition_proposed: {
        category: Category.UrbanInfrastructure,
        title: "Is the building proposed for demolition?",
        example: true,
        //tooltip: ,
    },
    planning_missing_data: {
        category: Category.UrbanInfrastructure,
        title: "Is information on a planning application relating to this building missing?",
        tooltip: "Is information on a planning application relating to this building missing?",
        example: true,
    },
    planning_missing_data_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for missing planning information",
        example: ["", "", ""],
    },
    planning_heritage_at_risk: {
        category: Category.UrbanInfrastructure,
        title: "Is the building on a heritage at risk register?",
        tooltip: "Examples of a heritage at risk register include...",
        example: true,
    },
    planning_scientific_interest: {
        category: Category.UrbanInfrastructure,
        title: "Is the building on a site of special scientific interest?",
        tooltip: "Is this building located in an area of special scientific interest.",
        example: true,
    },
    planning_scientific_interest_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for site of special scientific interest data",
        example: "",
        items: commonSourceTypes
    },
    planning_scientific_interest_source_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for site of special scientific interest data",
        example: ["", "", ""],
    },
    planning_flood_zone: {
        category: Category.UrbanInfrastructure,
        title: "Is the building inside a Flood Zone?",
        tooltip: "the GLA official description: \"All areas with more than a 1 in 1,000 annual probability of either river or sea flooding.\"",
        example: true,
    },
    planning_housing_zone: {
        category: Category.UrbanInfrastructure,
        title: "Is the building in a Housing Zone?",
        tooltip: "the GLA official description: \"Housing zones are areas funded by the Mayor and government to attract developers and relevant partners to build new homes.\"",
        example: true,
    },
    planning_enterprise_zone: {
        category: Category.UrbanInfrastructure,
        title: "Is the building in a Creative Enterprise Zone?",
        tooltip: "GLA official description: \"Creative Enterprise Zones are a new Mayoral initiative to designate areas of London where artists and creative businesses can find permanent affordable space to work; are supported to start-up and grow; and where local people are helped to learn creative sector skills and find new jobs.\"",
        example: true,
    },
    planning_protected_vista: {
        category: Category.UrbanInfrastructure,
        title: "Is the building within a Protected Vista?",
        tooltip: "GLA official description: \"The Protected Vistas are established in the London Plan with more detailed guidance provided in the London View Management Framework (LVMF). The London Plan seeks to protect the significant views which help to define London, including the panoramas, linear views and townscape views in this layer.\"",
        example: true,
    },
    

    is_domestic: {
        category: Category.EnergyPerformance,
        title: "Is the building a home/residential building?",
        tooltip: "Note: Homes used as offices for working from home should be classified as residential.",
        example: "mixed domestic/non-domestic",
        items: [
            "Yes",
            "No",
            "Mixed domestic/non-domestic"
        ]
    },
    is_domestic_source: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source of residential/non-residential data",
        example: "",
        items: commonSourceTypes
    },
    is_domestic_links: {
        category: Category.EnergyPerformance,
        title: "Source links",
        tooltip: "URL(s) for residential/non-residential data source(s)",
        example: ["", "", ""],
    },
    likes_total: {
        category: Category.Community,
        title: "Total number of likes",
        example: 100,
        tooltip: "People who like the building and think it contributes to the city.",
    },
    community_type_worth_keeping_total: {
        category: Category.Community,
        title: "People who think this type of building contributes to the city.",
        example: 100,
    },
    community_building_worth_keeping_total: {
        category: Category.Community,
        title: "People who think this type of building contributes to the city.",
        example: 100,
    },
    community_streetscape_worth_keeping_total: {
        category: Category.Community,
        title: "People who think this type of building contributes to the city.",
        example: 100,
    },
    community_local_significance_total: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_building_hominess_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_building_coherence_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_building_fascination_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_hominess_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_coherence_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_fascination_count: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_building_hominess_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 3,
    },
    community_building_coherence_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 3,
    },
    community_building_fascination_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 3,
    },
    community_building_neuroaesthetic_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 3,
    },
    community_streetscape_hominess_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_coherence_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_fascination_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },
    community_streetscape_neuroaesthetic_avg: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 3,
    },

    community_expected_planning_application_total: {
        category: Category.Community,
        title: "People who think the building will be affected by a planning application in the near future",
        example: 100,
    },

    community_activities_current: {
        category: Category.Community,
        title: "Is this building currently used for community activities?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    community_activities: {
        category: Category.Community,
        title: "If not, has it been used for community activities in the past?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    community_activities_always: {
        category: Category.Community,
        title: "If yes, has it always been used for community activities?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    community_public_ownership: {
        category: Category.Community,
        title: "Is the building in public/community ownership?",
        tooltip: "What type of body owns the building, is it privately-, publicly- or community-owned?",
        example: "Privately owned (non-corporate)",
        items: [
            "Public/State body",
            "Public body with Private company",
            "Charity",
            "Community group/Cooperative",
            "Other non-profit body",
            "Privately owned company",
            "Privately owned offshore company",
            "Private individual",
            "Other",
        ]
    },
    community_public_ownership_source_type: {
        category: Category.UrbanInfrastructure,
        title: "Source type",
        tooltip: "Source type for land ownership data",
        example: "",
        items: commonSourceTypes
    },
    community_public_ownership_sources: {
        category: Category.Community,
        title: "Community ownership source link(s)",
        tooltip: "Community ownership source link(s)",
        example: ["https://example.com"]
    },

    dynamics_has_demolished_buildings: {
        category: Category.DisasterManagement,
        title: 'Were any other buildings ever built on this site?',
        example: true,
    },

    demolished_buildings: {
        category: Category.DisasterManagement,
        title: 'Past (demolished) buildings on this site',
        items: {
            year_constructed: {
                title: 'Construction year',
                example: { min: 1989, max: 1991 },
            },
            year_demolished: {
                title: 'Demolition year',
                example: { min: 1993, max: 1994 },
            },
            lifespan: {
                title: 'Lifespan',
                example: "2-5",
            },
            overlap_present: {
                title: 'Roughly what percentage of this building was inside the current site boundary?',
                tooltip: '',
                example: "25%"
            },
            links: {
                title: 'Links / sources',
                example: ["", ""]
            }
        },
        example: [
            {
                year_constructed: { min: 1989, max: 1991 },
                year_demolished: { min: 1993, max: 1994 },
                lifespan: "2-5", overlap_present: "50%", links: ["", ""]
            }
        ]
    },
    has_extension: {
        category: Category.EnergyPerformance,
        title: "Does this information relate to the original main building?",
        tooltip: "If the data in this section relates to the original main building, select \"yes\". If the data relates to a later extension/ redevelopment, select \"no\".",
        example: false
    },
    extension_year: {
        category: Category.EnergyPerformance,
        title: "Year extension built (best estimate)",
        tooltip: "This field is the same as 'Year built (best estimate)' in the Age category'",
        tooltip_extension: "This should be the year the extension was built, not the original building",
        example: 2020
    },
    extension_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for extension data",
        example: "",
        items: commonSourceTypes
    },
    extension_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for extension data",
        example: ["", "", ""],
    },
    developer_type: {
        category: Category.EnergyPerformance,
        title: "What type of developer built the building?",
        tooltip: "The original developer involved in the construction of the main building.",
        example: "",
        items: [
            "State",
            "Charity",
            "Community/Cooperative",
            "Other non-profit body",
            "Private (individual)",
            "Commercial (company/estate)",
            "Religious body",
            "Other"
        ]
    },
    developer_name: {
        category: Category.EnergyPerformance,
        title: "Who were the developer(s)?",
        tooltip: "Name(s) of the building's developers." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    developer_links: {
        category: Category.EnergyPerformance,
        title: "Developer link(s)",
        tooltip: "Link(s) to webpage(s) explaining who developed the building.",
        example: ["", "", ""],
    },
    developer_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for developer data",
        example: "",
        items: commonSourceTypes
    },
    developer_source_link: {
        category: Category.EnergyPerformance,
        title: "Source links for developer(s)",
        tooltip: "URL for source for developer(s)",
        example: ["", "", ""],
    },
    extension_developer_type: {
        category: Category.EnergyPerformance,
        title: "What type of developer built the extension?",
        tooltip: "The main developer involved in the construction of the extension of the  building.",
        example: "",
        items: [
            "State",
            "Charity",
            "Community/Cooperative",
            "Other non-profit body",
            "Private (individual)",
            "Commercial (company/estate)",
            "Religious body",
            "Other"
        ]
    },
    extension_developer_name: {
        category: Category.EnergyPerformance,
        title: "Who were the developer(s)?",
        tooltip: "Name(s) of the extension's developers." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    extension_developer_links: {
        category: Category.EnergyPerformance,
        title: "Developer link(s)",
        tooltip: "Link(s) to webpage(s) explaining who developed the extension.",
        example: ["", "", ""],
    },
    extension_developer_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for developer data",
        example: "",
        items: commonSourceTypes
    },
    extension_developer_source_link: {
        category: Category.EnergyPerformance,
        title: "Source links for developer(s)",
        tooltip: "URL for source for developer(s)",
        example: ["", "", ""],
    },
    landowner: {
        category: Category.EnergyPerformance,
        title: "Landowner(s) at time of construction",
        tooltip: "Land owner when the building was constructed.<br/><br/>For info on current land ownership, see 'Planning Controls'." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    landowner_links: {
        category: Category.EnergyPerformance,
        title: "Landowner link(s)",
        tooltip: "Link(s) to webpage(s) explaining who owned the land when when the building was built.",
        example: ["", "", ""],
    },
    landowner_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for landowner data",
        example: "",
        items: commonSourceTypes
    },
    landowner_source_link: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "URL(s) for source for landowner data",
        example: ["", "", ""],
    },
    designers: {
        category: Category.EnergyPerformance,
        title: "Who were the main designer(s)?",
        tooltip: "Who were the designers/architects involved in the original construction of the main building." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    designers_links: {
        category: Category.EnergyPerformance,
        title: "Designer link(s)",
        tooltip: "Link(s) to webpage(s) explaining who designed the building.",
        example: ["", "", ""],
    },
    designers_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for designer data",
        example: "",
        items: commonSourceTypes
    },
    designers_source_link: {
        category: Category.EnergyPerformance,
        title: "Source links for designer(s)",
        tooltip: "URL for source for designer(s)",
        example: ["", "", ""],
    },
    lead_designer_type: {
        category: Category.EnergyPerformance,
        title: "Which title best describes the lead designer?",
        tooltip: "The original designer/architect involved in the construction of the main building.",
        example: "",
        items: [
            "Landowner",
            "Speculative builder",
            "Government architecture department",
            "Architect/ architectural firm",
            "Engineer/ Engineering firm",
            "Other"
        ]
    },
    extension_designers: {
        category: Category.EnergyPerformance,
        title: "Who were the main designer(s) of the extension?",
        tooltip: "Designer(s)/Architect(s) of the extension to the property." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    extension_designers_links: {
        category: Category.EnergyPerformance,
        title: "Designer link(s)",
        tooltip: "Link(s) to webpage(s) explaining who designed the extension.",
        example: ["", "", ""],
    },
    extension_designers_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for designer data",
        example: "",
        items: commonSourceTypes
    },
    extension_designers_source_link: {
        category: Category.EnergyPerformance,
        title: "Source links for designer(s)",
        tooltip: "URL for source for designer(s)",
        example: ["", "", ""],
    },
    extension_lead_designer_type: {
        category: Category.EnergyPerformance,
        title: "Which title best describes the lead designer?",
        tooltip: "The original designer/architect involved in the extension of the building.",
        example: "",
        items: [
            "Landowner",
            "Speculative builder",
            "Government architecture department",
            "Architect/ architectural firm",
            "Engineer/ Engineering firm",
            "Other"
        ]
    },
    designer_awards: {
        category: Category.EnergyPerformance,
        title: "Has the building won any awards?",
        tooltip: "Any design awards or other awards that have been awarded to the building or any of the developers.",
        example: false
    },
    awards_source_link: {
        category: Category.EnergyPerformance,
        title: "Source link(s) for building award(s)",
        tooltip: "URL for source for building award(s)",
        example: ["", "", ""],
    },
    builder: {
        category: Category.EnergyPerformance,
        title: "Name of builder/construction team.",
        tooltip: "Who were the builders/construction team involved in the original construction of the main building." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    builder_links: {
        category: Category.EnergyPerformance,
        title: "Builder link(s)",
        tooltip: "Link(s) to webpage(s) explaining who built the building.",
        example: ["", "", ""],
    },
    builder_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for builder data",
        example: "",
        items: commonSourceTypes
    },
    builder_source_link: {
        category: Category.EnergyPerformance,
        title: "Source for builder/construction team",
        tooltip: "Source for builder/construction team",
        example: ["", "", ""],
    },
    extension_builder: {
        category: Category.EnergyPerformance,
        title: "Name of builder/construction team.",
        tooltip: "Who were the builders/construction team involved in the construction of the extension to the building." + freeTextDisclaimer,
        example: ["", "", ""],
    },
    extension_builder_links: {
        category: Category.EnergyPerformance,
        title: "Builder link(s)",
        tooltip: "Link(s) to webpage(s) explaining who built the building.",
        example: ["", "", ""],
    },
    extension_builder_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for builder data",
        example: "",
        items: commonSourceTypes
    },
    extension_builder_source_link: {
        category: Category.EnergyPerformance,
        title: "Source for builder/construction team",
        tooltip: "Source for builder/construction team",
        example: ["", "", ""],
    },
    other_team: {
        category: Category.EnergyPerformance,
        title: "Other significant members of the team",
        example: ["", "", ""],
    },
    other_team_source_link: {
        category: Category.EnergyPerformance,
        title: "Source other significant team members",
        example: ["", "", ""],
    },
    building_client: {
        category: Category.EnergyPerformance,
        title: "Original building client link(s)",
        tooltip: "Link(s) describing the client who commissioned the original building?" + freeTextDisclaimer,
        example: ["", "", ""]
    },
    building_client_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for building client data",
        example: "",
        items: commonSourceTypes
    },
    building_client_source_link: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "URL(s) for source for building client data",
        example: ["", "", ""],
    },
    extension_client: {
        category: Category.EnergyPerformance,
        title: "Extension client link(s)",
        tooltip: "Link(s) describing the client who commissioned the most significant extension to the building?" + freeTextDisclaimer,
        example: ["", "", ""]
    },
    extension_client_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for extension client data",
        example: "",
        items: commonSourceTypes
    },
    extension_client_source_link: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "URL(s) for source for extension client data",
        example: ["", "", ""],
    },
    disaster_type: {
        category: Category.DisasterManagement,
        title: "Disaster type",
        tooltip: "What type of disaster has taken place that may have affected/damaged this building?",
        example: "Flood",
        items: [
            'Flood',
            'Earthquake',
            'Hurricane',
            'Fire',
            'Extreme heat',
            'Political/war damage',
            'Other human (blast damage/spills etc.)',
            'Other'
        ]
    },
    disaster_severity: {
        category: Category.DisasterManagement,
        title: "How severe do you assess the damage to be?",
        tooltip: "What is your best estimate for the severity of damage to the building",
        example: "Building destroyed",
        items: [
            'Building destroyed',
            'Very severe',
            'Severe',
            'Moderate',
            'Minimal',
            'No damage visible',
        ]
    },
    disaster_assessment_method: {
        category: Category.DisasterManagement,
        title: "Damage assessment type",
        tooltip: "How was the damage to the building assessed?",
        example: "Citizen/Passerby by eye",
        items: commonSourceTypes
    },
    disaster_source_link: {
        category: Category.DisasterManagement,
        title: "Damage assessment source link(s)",
        tooltip: "Please add a source link(s) to official documentation/photographic evidence where applicable",
        example: ["", "", ""],
    },
    disaster_start_date: {
        category: Category.DisasterManagement,
        title: "Start date",
        tooltip: "What was the start date of the disaster?",
        example: "01/04/2023"
    },
    disaster_end_date: {
        category: Category.DisasterManagement,
        title: "End date",
        tooltip: "What was the end date of the disaster? (if different to start date)",
        example: "03/04/2023"
    },

    context_front_garden: {
        category: Category.RetrofitCondition,
        title: "Does the building have a front garden with greenery?",
        tooltip: "Is the front garden mainly green/planted?",
        example: true,
    },
    context_back_garden: {
        category: Category.RetrofitCondition,
        title: "Does the building have a back garden with greenery?",
        tooltip: "Is the back garden mainly green/planted?",
        example: true
    },
    context_flats_garden: {
        category: Category.RetrofitCondition,
        title: "Does this building contain flats and have a dedicated green space?",
        tooltip: "If the building is a block of flats, does it have a dedicated garden area/green space?",
        example: true
    },
    context_garden_source_type: {
        category: Category.RetrofitCondition,
        title: "Source type",
        tooltip: "Source type for garden data",
        example: "",
        items: commonSourceTypes
    },
    context_garden_source_links: {
        category: Category.RetrofitCondition,
        title: "Source link(s)",
        tooltip: "Source link(s) for garden data source(s)",
        example: ["", "", ""],
    },
    context_street_width: {
        category: Category.EnergyPerformance,
        title: "Average street width (m)",
        tooltip: "Average width of the street in metres.",
        example: 10
    },
    context_street_width_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for street width data",
        example: "",
        items: commonSourceTypes
    },
    context_street_width_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for street width data",
        example: ["", "", ""],
    },
    context_pavement_width: {
        category: Category.EnergyPerformance,
        title: "Average pavement width (m)",
        tooltip: "Average width of the pavement in metres.",
        example: 10
    },
    context_pavement_width_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for pavement width data",
        example: "",
        items: commonSourceTypes
    },
    context_pavement_width_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for pavement width data",
        example: ["", "", ""],
    },
    context_walkability_index: {
        category: Category.EnergyPerformance,
        title: "Walkability index",
        tooltip: "How walkable is the area...?",
        example: 10
    },
    context_green_space_distance: {
        category: Category.EnergyPerformance,
        title: "Distance to nearest green space (m)",
        tooltip: "Approximate distance from the front door of the building to the nearest public green space (in meters).",
        example: 10
    },
    context_green_space_distance_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for green space data",
        example: "",
        items: commonSourceTypes
    },
    context_green_space_distance_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for green space data",
        example: ["", "", ""],
    },
    context_tree_distance: {
        category: Category.EnergyPerformance,
        title: "Distance to nearest tree (m)",
        tooltip: "Approximate distance from the front door of the building to the nearest tree in meters.",
        example: 10
    },
    context_tree_distance_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for tree data",
        example: "",
        items: commonSourceTypes
    },
    context_tree_distance_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for tree data",
        example: ["", "", ""],
    },
    context_street_geometry: {
        category: Category.EnergyPerformance,
        title: "Street network geometry link",
        tooltip: "Link to a website with the name of the building..",
        example: "https://en.wikipedia.org/",
    },
    context_street_geometry_source_type: {
        category: Category.EnergyPerformance,
        title: "Source type",
        tooltip: "Source type for tree data",
        example: "",
        items: commonSourceTypes
    },
    context_street_geometry_source_links: {
        category: Category.EnergyPerformance,
        title: "Source link(s)",
        tooltip: "Source link(s) for tree data",
        example: ["", "", ""],
    },
    age_cladding_date: {
        category: Category.AgeHistory,
        title: "Cladding date (best estimate)",
        tooltip: null,
        example: 1970
    },
    age_cladding_date_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type cladding data",
        example: "",
        items: commonSourceTypes
    },
    age_cladding_date_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "Source link(s) cladding data",
        example: ["", "", ""],
    },
    age_extension_date: {
        category: Category.AgeHistory,
        title: "Date of significant extensions (best estimate)",
        tooltip: null,
        example: 1970
    },
    age_extension_date_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type extension data",
        example: "",
        items: commonSourceTypes
    },
    age_extension_date_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "Source link(s) extension data",
        example: ["", "", ""],
    },
    age_retrofit_date: {
        category: Category.AgeHistory,
        title: "Date of last significant retrofit (best estimate)",
        tooltip: null,
        example: 1970
    },
    age_retrofit_date_source_type: {
        category: Category.AgeHistory,
        title: "Source type",
        tooltip: "Source type for retrofit data",
        example: "",
        items: commonSourceTypes
    },
    age_retrofit_date_source_links: {
        category: Category.AgeHistory,
        title: "Source link(s)",
        tooltip: "Source link(s) for retrofit data",
        example: ["", "", ""],
    },
    age_historical_raster_map_links: {
        category: Category.AgeHistory,
        title: "Historical maps links",
        tooltip: "Links to rasterised historical maps",
        example: ["", "", ""],
    },
    age_historical_vectorised_footprint_links: {
        category: Category.AgeHistory,
        title: "Extracted vectorised historical footprints links",
        tooltip: "Extracted vectorised historical footprints links",
        example: ["", "", ""],
    },

    energy_solar: {
        category: Category.WaterGreenInfrastructure,
        title: "Does the building have solar panels?",
        tooltip: "Are there any kinds of solar panels on the roof of the building?",
        example: true
    },
    energy_solar_source_type: {
        category: Category.WaterGreenInfrastructure,
        title: "Source type",
        tooltip: "Source type for solar panel data",
        example: "",
        items: commonSourceTypes
    },
    energy_solar_source_links: {
        category: Category.WaterGreenInfrastructure,
        title: "Source link(s)",
        tooltip: "Source link(s) for solar panel data",
        example: ["", "", ""],
    },
    energy_green_roof: {
        category: Category.WaterGreenInfrastructure,
        title: "Does the building have green walls/green roof?",
        tooltip: "Are there any green walls, or a green roof, on the building?",
        example: true
    },
    energy_green_roof_source_type: {
        category: Category.WaterGreenInfrastructure,
        title: "Source type",
        tooltip: "Source type for green roof data",
        example: "",
        items: commonSourceTypes
    },
    energy_green_roof_source_links: {
        category: Category.WaterGreenInfrastructure,
        title: "Source link(s)",
        tooltip: "Source link(s) for green roof data",
        example: ["", "", ""],
    },

    typology_classification: {
        category: Category.TypologySize,
        title: "Which description best suits the building and its context?",
        tooltip: "HINT: Adapted from building type classifications developed in urban morphology. See <a href=\"https://www.smog.chalmers.se/\">https://www.smog.chalmers.se/</a> 'Space Matrix' for further information.",
        example: "8+ storeys: Detached",
        items: [
            'Low-rise: Not part of a group/cluster (1-3 core floors- excluding extensions)',
            'Low-rise: Part of dense block/row/terrace',
            'Low-rise: Part of group of widely spaced blocks (includes semi-detached houses)',
            'Mid-rise: Not part of a group/cluster (4-7 core floors)',
            'Mid-rise: Part of group of densely spaced blocks',
            'Mid-rise: Part of group of widely spaced blocks',
            'High rise: Not part of a group/cluster',
            'High-rise: Part of group of densely spaced blocks (8 + core floors)',
            'High-rise: Part of group of widely spaced blocks',
        ]
    },
    typology_classification_source_type: {
        category: Category.TypologySize,
        title: "Source type",
        tooltip: "Source type for classification data",
        example: "",
        items: commonSourceTypes
    },
    typology_classification_source_links: {
        category: Category.TypologySize,
        title: "Source link(s)",
        tooltip: "Source link(s) for classification data",
        example: ["", "", ""],
    },
    typology_style_period: {
        category: Category.TypologySize,
        title: "Which description best suits the building's architectural style/historical period?",
        tooltip: "Which description best suits the building's architectural style/historical period?",
        example: "Georgian (1714-1837)",
        items: [
            '43AD-410 (Roman)',
            '410-1485 (Medieval)',
            '1485-1603 (Tudor)',
            '1603-1714 (Stuart)',
            '1714-1837 (Georgian)',
            '1837-1901 (Victorian)',
            '1901-1914 (Edwardian)',
            '1914-1945 (WWI-WWII)',,
            '1946-1979 (Post war)',
            '1980-1999 (Late 20th Century)',
            '2000-2025 (Early 21st Century)',
        ]
    },
    typology_style_period_source_type: {
        category: Category.TypologySize,
        title: "Source type",
        tooltip: "Source type for style & period data",
        example: "",
        items: commonSourceTypes
    },
    typology_style_period_source_links: {
        category: Category.TypologySize,
        title: "Source link(s)",
        tooltip: "Source link(s) for style & period data",
        example: ["", "", ""],
    },
    typology_dynamic_classification: {
        category: Category.TypologySize,
        title: "Which description best suits the building's plot?",
        tooltip: "HINT: Based on a dynamic classification system for urban tissue developed by Brenda Case Scheer. For further information click <a href=\"https://github.com/colouring-cities/manual/wiki/X08.-London-prototype:-Dynamics-data-capture-and-urban-morphology#14-building-typologies-and-dynamic-classifications\">here</a>.",
        example: "Large plots with internal roads",
        items: [
            'Small, often repetitive plots, mainly residential',
            'Linear non-domestic, i.e. high streets',
            'Large plots with internal roads',
        ]
    },
    typology_dynamic_classification_source_type: {
        category: Category.TypologySize,
        title: "Source type",
        tooltip: "Source type for dynamic classification data",
        example: "",
        items: commonSourceTypes
    },
    typology_dynamic_classification_source_links: {
        category: Category.TypologySize,
        title: "Source link(s)",
        tooltip: "Source link(s) for dynamic classification data",
        example: ["", "", ""],
    },
    typology_original_use: {
        category: Category.TypologySize,
        title: "Which land use best describes the purpose for which the building was built?",
        tooltip: "Land use Groups as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: ["", ""],
    },
    typology_original_use_verified: {
        category: Category.LandUse,
        title: 'Has this land use been manually verified?',
        example: true,
    },
    typology_original_use_order: {
        category: Category.TypologySize,
        title: "Original land use (order)",
        tooltip: "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification). Derived automatically from the data above.",
        example: "",
    },
    typology_original_use_source_type: {
        category: Category.TypologySize,
        title: "Source type",
        tooltip: "Source type for original land use data",
        example: "",
        items: commonSourceTypes
    },
    typology_original_use_source_links: {
        category: Category.TypologySize,
        title: "Source link(s)",
        tooltip: "Source link(s) for original land use data",
        example: ["", "", ""],
    },
};

export const allFieldsConfig = { ...dataFields, ...buildingUserFields };