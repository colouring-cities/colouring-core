import { Category } from './categories-config';
import { CCConfig } from '../../cc-config';
let ccconfig: CCConfig = require('../../cc-config.json')

/*
 * Common list of Source Types, used in multiple menus
*/
export const commonSourceTypes = [
    "Assessed by eye",
    "Assessed using expert knowledge of building or building type",
    "Assessed using streetview photographs or satellite imagery",
    "Assessed by specialist emergency group",
    "Live streamed from a government source",
    "Current government record/dataset",
    "Independently managed public database",
    "Commercial database",
    "Inferred computationally using existing open attribute data",
];

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
        example: true,
    },
    community_type_worth_keeping: {
        perUser: true,
        category: Category.Community,
        title: "Do you think this **type** of building contributes to the city?",
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

    community_local_significance: {
        perUser: true,
        category: Category.Community,
        title: "Do you think this building should be recorded as being of special local interest?",
        example: true
    },
    community_expected_planning_application: {
        perUser: true,
        category: Category.Community,
        title: "Do you think that this building may be subject to a planning application, involving demolition, over the next six months?",
        example: true
    }
};


export const dataFields = { /* eslint-disable @typescript-eslint/camelcase */
    location_name: {
        category: Category.Location,
        title: "Building name (non-domestic)",
        tooltip: "Link to a website with the name of the building.<br/><br/>(For security reasons, we currently only collect the names of non-residential buildings).",
        example: "https://en.wikipedia.org/wiki/Palace_of_Westminster",
    },
    location_number: {
        category: Category.Location,
        title: "Building number",
        example: '12b',
        tooltip: 'Numbers with an optional lowercase letter are accepted, e.g. 141 or 12b'
    },
    location_street: {
        category: Category.Location,
        title: "Street",
        example: "Gower Street",
        //tooltip: ,
    },
    location_line_two: {
        category: Category.Location,
        title: "Address line 2",
        example: "Flat 21",
        //tooltip: ,
    },
    location_town: {
        category: Category.Location,
        title: "Town/City",
        example: "London",
        //tooltip: ,
    },
    location_postcode: {
        category: Category.Location,
        title: "Area code/"+ccconfig.postcode,
        example: "W1W 6TR",
        //tooltip: ,
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
        title: "Building footprint ID",
        tooltip: "Ordnance Survey Topography Layer ID (TOID) [<a href='https://www.ordnancesurvey.co.uk/business-government/products/open-toid'>link</a>]",
        example: "",
    },

    /**
     * UPRNs is not part of the buildings table, but the string fields 
     * are included here for completeness
     */
    uprns: {
        category: Category.Location,
        title: "Unique Property Reference Number(s) (UPRN)",
        tooltip: "Unique Property Reference Numbers (to be filled automatically) [<a href='https://beta.ordnancesurvey.co.uk/products/os-open-uprn'>LINK</a>]",
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
        tooltip: "OpenStreetMap feature ID",
        example: "",
    },
    location_latitude: {
        category: Category.Location,
        title: "Centroid latitude",
        tooltip: "Latitude of building centroid",
        example: 12.4564,
    },
    location_longitude: {
        category: Category.Location,
        title: "Centroid longitude",
        tooltip: "Longitude of building centroid",
        example: 0.12124,
    },
    location_coordinates_source: {
        category: Category.Location,
        title: "Source type",
        example: "",
        tooltip: "Source of lcoordinate data.",
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
        tooltip: "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: "",
    },
    current_landuse_source: {
        category: Category.LandUse,
        title: "Source type",
        tooltip: "Source for the current land use",
        example: "",
        items: [
            "Expert/personal knowledge of building",
            "Online streetview image",
            "Open planning authority dataset",
            "Open property tax dataset",
            "Open housing dataset",
            "Open address dataset",
            "Other"
        ],
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
        category: Category.Typology,
        title: "Attachment type/adjacency",
        tooltip: "We have prepopulated these based on their current attachment. A building can either be detached, semi-detached or part of a terrace (middle or end)",
        example: "",
    },
    date_change_building_use: {
        category: Category.Typology,
        title: "When did use change?",
        tooltip: "This is the date the building stopped being used for for the function it was built for. I.e. if it was Victorian warehouse which is now an office this would be when it became an office or if it was something before that, maybe a garage then the date that happened",
        example: 1920,
    },
    /**
     * original_building_use does not exist in database yet.
     * Slug needs to be adjusted if the db column will be named differently 
     */
    original_building_use: {
        category: Category.Typology,
        title: "Original building use",
        tooltip: "What was the building <u><i>originally</i></u> used for when it was built?",
        example: "",
    },
    size_roof_shape: {
        category: Category.Typology,
        title: "Roof type",
        example: "",
        //tooltip: ,
    },
    date_year: {
        category: Category.Age,
        title: "Year of construction of main building (best estimate)",
        tooltip: "Best estimate for construction of main body of the building.",
        example: 1924,
    },
    date_lower: {
        category: Category.Age,
        title: "Earliest possible start year",
        tooltip: "This should be the earliest year in which construction could have started.",
        example: 1900,
    },
    date_upper: {
        category: Category.Age,
        title: "Latest possible start year",
        tooltip: "This should be the latest year in which building could have started.",
        example: 2000,
    },
    facade_year: {
        category: Category.Age,
        title: "Date of front of building",
        tooltip: "Best estimate",
        example: 1900,
    },
    date_source: {
        category: Category.Age,
        title: "Source type",
        tooltip: "Source type for the building dates above",
        items: [
            "Expert knowledge of building",
            "Expert estimate from image",
            "Survey of London",
            "Pevsner Guides",
            "Victoria County History",
            "Local history publication",
            "Other publication",
            "National Heritage List for England",
            "Other database or gazetteer",
            "Historical map",
            "Other archive document",
            "Film/Video",
            "Other website",
            "Other"
        ],
        example: "",
    },
    date_source_detail: {
        category: Category.Age,
        title: "Source details",
        tooltip: "References for date source (max 500 characters)",
        example: "",
    },
    date_link: {
        category: Category.Age,
        title: "Source link(s)",
        tooltip: "URL for age and date reference",
        example: ["", "", ""],
    },

    size_storeys_core: {
        category: Category.Size,
        title: "Core number of floors",
        tooltip: "How many floors are there between the pavement and start of roof?",
        example: 10,
    },
    size_storeys_attic: {
        category: Category.Size,
        title: "Number of floors within roof space",
        tooltip: "How many floors above start of roof?",
        example: 1,
    },
    size_storeys_basement: {
        category: Category.Size,
        title: "Number of floors beneath ground Level",
        tooltip: "How many floors below pavement level?",
        example: 1,
    },
    size_storeys_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of building floors data",
        example: "",
        items: commonSourceTypes
    },
    size_storeys_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for building floors data source(s)",
        example: ["", "", ""],
    },
    size_height_apex: {
        category: Category.Size,
        title: "Height to apex (m)",
        example: 100.5,
        tooltip: "i.e. the highest part of the roof.",
    },
    size_height_apex_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of building height (apex) data",
        example: "",
        items: commonSourceTypes
    },
    size_height_apex_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for building height (apex) source(s)",
        example: ["", "", ""],
    },
    size_height_eaves: {
        category: Category.Size,
        title: "Height to eaves (m)",
        example: 20.33,
        tooltip: "i.e. to where the top of the wall meets the roof",
    },
    size_height_eaves_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of building height (eaves) data",
        example: "",
        items: commonSourceTypes
    },
    size_height_eaves_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for building height (eaves) source(s)",
        example: ["", "", ""],
    },
    size_floor_area_ground: {
        category: Category.Size,
        title: "Ground floor area (m²)",
        example: 1245.6,
        //tooltip: ,
    },
    size_floor_area_total: {
        category: Category.Size,
        title: "Total floor area (m²)",
        example: 2001.7,
        //tooltip: ,
    },
    size_floor_area_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of floor area data",
        example: "",
        items: commonSourceTypes
    },
    size_floor_area_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for floor area data source(s)",
        example: ["", "", ""],
    },
    size_width_frontage: {
        category: Category.Size,
        title: "Frontage width (m)",
        example: 12.2,
        //tooltip: ,
    },
    size_width_frontage_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of building frontage data",
        example: "",
        items: commonSourceTypes
    },
    size_width_frontage_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for building frontage source(s)",
        example: ["", "", ""],
    },

    size_configuration: {
        category: Category.Size,
        title: "Configuration (semi/detached, end/terrace)",
        example: "",
        //tooltip: ,
    },

    size_plot_area_total: {
        category: Category.StreetContext,
        title: "Total area of plot (m²)",
        example: 123.02,
        tooltip: "Total area of plot (m²)",
    },
    size_plot_area_total_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of plot area data",
        example: "",
        items: commonSourceTypes
    },
    size_plot_area_total_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for plot area data source(s)",
        example: ["", "", ""],
    },
    size_far_ratio: {
        category: Category.StreetContext,
        title: "FAR ratio (percentage of plot covered by building)",
        example: 1.0,
        tooltip: "boobs",
    },
    size_far_ratio_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of FAR ratio data",
        example: "",
        items: commonSourceTypes
    },
    size_far_ratio_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for FAR ratio data source(s)",
        example: ["", "", ""],
    },
    size_parcel_geometry: {
        category: Category.StreetContext,
        title: "Land parcel geometry link",
        example: "https://",
        tooltip: "INSPIRE Polygons",
    },
    size_parcel_geometry_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of parcel geometry data",
        example: "",
        items: commonSourceTypes
    },
    size_parcel_geometry_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for parcel geometry data source(s)",
        example: ["", "", ""],
    },

    construction_core_material: {
        category: Category.Construction,
        title: "Core material",
        tooltip: "The main structural material",
        example: "",
    },

    construction_secondary_materials: {
        category: Category.Construction,
        title: "Main secondary construction material/s",
        tooltip: "Other construction materials",
        example: "",
    },

    construction_roof_covering: {
        category: Category.Construction,
        title: "Main roof covering",
        tooltip: 'Main roof covering material',
        example: "",
    },

    sust_breeam_rating: {
        category: Category.EnergyPerformance,
        title: "Official environmental quality rating",
        tooltip: ccconfig.energy_rating,
        example: "",
    },
    sust_dec: {
        category: Category.EnergyPerformance,
        title: "Non-domestic Building Energy Rating",
        tooltip: "Display Energy Certificate (DEC) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use",
        example: "G",
    },
    sust_aggregate_estimate_epc: {
        category: Category.EnergyPerformance,
        title: "Domestic Building Energy Rating",
        tooltip: "Energy Performance Certificate (EPC) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher may be rented",
        example: "",
    },
    sust_retrofit_date: {
        category: Category.EnergyPerformance,
        title: "Last significant retrofit",
        tooltip: "Date of last major building refurbishment",
        example: 1920,
    },
    sust_retrofit_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of last significant retrofit data",
        example: "",
        items: commonSourceTypes
    },
    sust_retrofit_source_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for last significant retrofit data source(s)",
        example: ["", "", ""],
    },
    sust_life_expectancy: {
        category: Category.EnergyPerformance,
        title: "Expected lifespan for typology",
        example: 123,
        //tooltip: ,
    },

    survival_status: {
        category: Category.Age,
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
        category: Category.Age,
        title: "Source type",
        tooltip: "Source for the survival status",
        items: [
            "Matched by comparing maps",
            "Checked using streetview images",
            "Historical publication or archive document",
            "Other"
        ],
        example: "",
    },

    survival_source_links: {
        category: Category.Age,
        title: "Source link(s)",
        tooltip: "Links to sources of survival/historical information on this building",
        example: ["", "", ""],
    },

    edit_history: {
        category: Category.Planning,
        title: "PLANNING DATA",
        tooltip: "PLANNING DATA",
        example: [{}],
    },


    planning_portal_link: {
        category: Category.Planning,
        title: "Local authority planning application link",
        example: "",
        //tooltip: ,
    },
    planning_in_conservation_area_url: {
        category: Category.Planning,
        title: "Is the building in a conservation area?",
        example: "",
        //tooltip: ,
    },
    planning_crowdsourced_site_completion_status: {
        category: Category.Planning,
        title: "Has the work on this site been completed?",
        example: true,
        //tooltip: ,
    },
    planning_crowdsourced_site_completion_year: {
        category: Category.Planning,
        title: "Year of completion if known",
        example: 2022,
        //tooltip: ,
    },
    planning_crowdsourced_planning_id: {
        category: Category.Planning,
        title: "If you know of a planning application that has been recently submitted for this site, and is not listed in the blue box above, please enter its planning application ID below:",
        example: "1112/QWERTY",
        //tooltip: ,
    },
    planning_in_conservation_area_id: {
        category: Category.Planning,
        title: "Conservation Area identifier",
        example: "",
        //tooltip: ,
    },
    planning_conservation_area_name: {
        category: Category.Planning,
        title: "Conservation Area Name",
        example: "",
        //tooltip: ,
    },
    planning_list_id: {
        category: Category.Planning,
        title: "If the building is on a national heritage register, please add the ID:",
        example: "121436",
        tooltip: "e.g. National Heritage List for England (NHLE)",
    },
    planning_list_grade: {
        category: Category.Planning,
        title: "What is its rating?",
        example: "II",
        //tooltip: ,
    },
    planning_heritage_at_risk_url: {
        category: Category.Planning,
        title: "If the building is on a heritage at risk register, please add the ID:",
        example: "",
        //tooltip: ,
    },
    planning_world_list_id: {
        category: Category.Planning,
        title: "If the building is on a <a href=\"https://historicengland.org.uk/advice/hpg/has/whs/\" target=\"_blank\">World Heritage Site</a> please add the ID:",
        example: "488",
        //tooltip: ,
    },
    planning_glher_url: {
        category: Category.Planning,
        title: "Is it recorded on any historic environment records?",
        example: "",
        //tooltip: ,
    },
    planning_in_apa_url: {
        category: Category.Planning,
        title: "Is it in an area if archaeological priority?",
        example: "",
        //tooltip: ,
    },
    planning_local_list_url: {
        category: Category.Planning,
        title: "Is it a locally listed heritage asset?",
        example: "",
        //tooltip: ,
    },
    planning_historic_area_assessment_url: {
        category: Category.Planning,
        title: "Does it have any other kind of historic area assessment?",
        example: "",
        //tooltip: ,
    },
    planning_demolition_proposed: {
        category: Category.Planning,
        title: "Is the building proposed for demolition?",
        example: true,
        //tooltip: ,
    },
    is_domestic: {
        category: Category.Team,
        title: "Is the building a home/domestic building?",
        tooltip: "Note: Homes used as offices for working from home should be classified as domestic.",
        example: "mixed domestic/non-domestic",
        items: [
            "Yes",
            "No",
            "Mixed domestic/non-domestic"
        ]
    },
    is_domestic_source: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source of domestic/non-domestic data",
        example: "",
        items: commonSourceTypes
    },
    is_domestic_links: {
        category: Category.Team,
        title: "Source links",
        tooltip: "URL(s) for domestic/non-domestic data source(s)",
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
    community_local_significance_total: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local interest",
        example: 100,
    },

    community_expected_planning_application_total: {
        category: Category.Community,
        title: "People who think the building will be affected by a planning application in the near future",
        example: 100,
    },

    community_activities_current: {
        category: Category.Community,
        title: "Are activities open to the community currently taking place in the building?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    community_activities: {
        category: Category.Community,
        title: "Has this ever been used for community activities in the past?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    community_activities_always: {
        category: Category.Community,
        title: "Has the building always been used for community activities?",
        tooltip: "E.g. youth club, place of worship, GP surgery, pub",
        example: true
    },
    // community_activities_dates: {
    //     category: Category.Community,
    //     title: "When was this building used for community activities?"
    // },

    community_public_ownership: {
        category: Category.Community,
        title: "Is the building in public/community ownership?",
        example: "Privately owned (non-corporate)",
        items: [
            'Government-owned',
            'Charity-owned',
            'Community-owned/cooperative',
            'Owned by other non-profit body',
            'Not in public/community ownership'
        ]
    },
    community_public_ownership_sources: {
        category: Category.Community,
        title: "Community ownership source link",
        example: ["https://example.com"]
    },

    dynamics_has_demolished_buildings: {
        category: Category.Resilience,
        title: 'Were any other buildings ever built on this site?',
        example: true,
    },

    demolished_buildings: {
        category: Category.Resilience,
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
        category: Category.Team,
        title: "Was a later extension added?",
        tooltip: "",
        example: false
    },
    extension_year: {
        category: Category.Team,
        title: "Year extension built (best estimate)",
        tooltip: "This field is the same as 'Year built (best estimate)' in the Age category'",
        tooltip_extension: "This should be the year the extension was built, not the original building",
        example: 2020
    },
    extension_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for extension data",
        example: "",
        items: commonSourceTypes
    },
    extension_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for extension data",
        example: ["", "", ""],
    },
    developer_type: {
        category: Category.Team,
        title: "What type of developer built the building?",
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
        category: Category.Team,
        title: "Who were the developer(s)?",
        tooltip: "Free text. First name, space, then Last name",
        example: ["", "", ""],
    },
    developer_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for developer data",
        example: "",
        items: commonSourceTypes
    },
    developer_source_link: {
        category: Category.Team,
        title: "Source links for developer(s)",
        tooltip: "URL for source for developer(s)",
        example: ["", "", ""],
    },
    landowner: {
        category: Category.Team,
        title: "Landowner(s) at time of construction",
        tooltip: "Free text. First name, space, then Last name",
        example: ["", "", ""],
    },
    landowner_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for landowner data",
        example: "",
        items: commonSourceTypes
    },
    landowner_source_link: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "URL(s) for source for landowner data",
        example: ["", "", ""],
    },
    designers: {
        category: Category.Team,
        title: "Who were the main designer(s)?",
        tooltip: "Free text. First name, space, then Last name",
        example: ["", "", ""],
    },
    designers_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for designer data",
        example: "",
        items: commonSourceTypes
    },
    designers_source_link: {
        category: Category.Team,
        title: "Source links for designer(s)",
        tooltip: "URL for source for designer(s)",
        example: ["", "", ""],
    },
    lead_designer_type: {
        category: Category.Team,
        title: "Which title best describes the lead designer?",
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
        category: Category.Team,
        title: "Did the design team win any awards for this building?",
        tooltip: "",
        example: false
    },
    awards_source_link: {
        category: Category.Team,
        title: "Source link(s) for designer award(s)",
        tooltip: "URL for source for designer award(s)",
        example: ["", "", ""],
    },
    builder: {
        category: Category.Team,
        title: "Name of builder/construction team",
        example: ["", "", ""],
    },
    builder_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for builder data",
        example: "",
        items: commonSourceTypes
    },
    builder_source_link: {
        category: Category.Team,
        title: "Source for builder/construction team",
        example: ["", "", ""],
    },
    other_team: {
        category: Category.Team,
        title: "Other significant members of the team",
        example: ["", "", ""],
    },
    other_team_source_link: {
        category: Category.Team,
        title: "Source other significant team members",
        example: ["", "", ""],
    },
    disaster_type: {
        category: Category.Resilience,
        title: "Disaster type",
        tooltip: "What type of disaster management do you wish to collect data for?",
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
        category: Category.Resilience,
        title: "How severe do you assess the damage to be?",
        tooltip: "Best estimate for the severity of damage to the building",
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
        category: Category.Resilience,
        title: "Source Type",
        tooltip: "Please add a Best estimate for the severity of damage to the building",
        example: "Citizen/Passerby by eye",
        items: commonSourceTypes
    },
    disaster_source_link: {
        category: Category.Resilience,
        title: "Source link(s)",
        tooltip: "Please add a source link(s) to official documentation/photographic evidence where applicable",
        example: ["", "", ""],
    },
    disaster_start_date: {
        category: Category.Resilience,
        title: "What was the start date of the disaster?",
        example: "01/04/2023"
    },
    disaster_end_date: {
        category: Category.Resilience,
        title: "What was the end date of the disaster? (if applicable)",
        example: "03/04/2023"
    },

    context_front_garden: {
        category: Category.StreetContext,
        title: "Does the building have a front garden?",
        tooltip: "Is the front garden mainly green/planted?",
        example: "",
        items: [
            "Yes",
            "No"
        ]
    },
    context_back_garden: {
        category: Category.StreetContext,
        title: "Does the building have a back garden?",
        tooltip: "Is the back garden mainly green/planted?",
        example: "",
        items: [
            "Yes",
            "No"
        ]
    },
    context_flats_garden: {
        category: Category.StreetContext,
        title: "Is the building flats with a dedicated green space?",
        tooltip: "If the building is a block of flats, does it have a dedicated garden area/green space?",
        example: "",
        items: [
            "Yes",
            "No"
        ]
    },
    context_garden_source_type: {
        category: Category.StreetContext,
        title: "Source type",
        tooltip: "Source type for garden data",
        example: "",
        items: commonSourceTypes
    },
    context_garden_source_links: {
        category: Category.StreetContext,
        title: "Source link(s)",
        tooltip: "Source link(s) for garden data source(s)",
        example: ["", "", ""],
    },
    context_street_width: {
        category: Category.Team,
        title: "Street width (m)",
        tooltip: "Width of the street in metres.",
        example: 10
    },
    context_street_width_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for street width data",
        example: "",
        items: commonSourceTypes
    },
    context_street_width_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for street width data",
        example: ["", "", ""],
    },
    context_pavement_width: {
        category: Category.Team,
        title: "Pavement width (m)",
        tooltip: "Width of the pavement in metres.",
        example: 10
    },
    context_pavement_width_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for pavement width data",
        example: "",
        items: commonSourceTypes
    },
    context_pavement_width_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for pavement width data",
        example: ["", "", ""],
    },
    context_green_space_distance: {
        category: Category.Team,
        title: "Distance to nearest green space (m)",
        tooltip: "Approximate distance from the front door of the building to the nearest public green space.",
        example: 10
    },
    context_green_space_distance_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for green space data",
        example: "",
        items: commonSourceTypes
    },
    context_green_space_distance_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for green space data",
        example: ["", "", ""],
    },
    context_tree_distance: {
        category: Category.Team,
        title: "Distance to nearest tree (m)",
        tooltip: "Approximate distance from the front door of the building to the nearest tree.",
        example: 10
    },
    context_tree_distance_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for tree data",
        example: "",
        items: commonSourceTypes
    },
    context_tree_distance_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for tree data",
        example: ["", "", ""],
    },
    context_street_geometry: {
        category: Category.Team,
        title: "Street network geometry link",
        tooltip: "Link to a website with the name of the building..",
        example: "https://en.wikipedia.org/",
    },
    context_street_geometry_source_type: {
        category: Category.Team,
        title: "Source type",
        tooltip: "Source type for tree data",
        example: "",
        items: commonSourceTypes
    },
    context_street_geometry_source_links: {
        category: Category.Team,
        title: "Source link(s)",
        tooltip: "Source link(s) for tree data",
        example: ["", "", ""],
    },
    age_cladding_date: {
        category: Category.Age,
        title: "Cladding date",
        tooltip: "Width of the street in metres.",
        example: 1970
    },
    age_cladding_date_source_type: {
        category: Category.Age,
        title: "Source type",
        tooltip: "Source type for street width data",
        example: "",
        items: commonSourceTypes
    },
    age_cladding_date_source_links: {
        category: Category.Age,
        title: "Source link(s)",
        tooltip: "Source link(s) for street width data",
        example: ["", "", ""],
    },
    age_extension_date: {
        category: Category.Age,
        title: "Date of significant extensions",
        tooltip: "Width of the street in metres.",
        example: 1970
    },
    age_extension_date_source_type: {
        category: Category.Age,
        title: "Source type",
        tooltip: "Source type for street width data",
        example: "",
        items: commonSourceTypes
    },
    age_extension_date_source_links: {
        category: Category.Age,
        title: "Source link(s)",
        tooltip: "Source link(s) for street width data",
        example: ["", "", ""],
    },
    age_retrofit_date: {
        category: Category.Age,
        title: "Date of significant retrofits",
        tooltip: "Width of the street in metres.",
        example: 1970
    },
    age_retrofit_date_source_type: {
        category: Category.Age,
        title: "Source type",
        tooltip: "Source type for street width data",
        example: "",
        items: commonSourceTypes
    },
    age_retrofit_date_source_links: {
        category: Category.Age,
        title: "Source link(s)",
        tooltip: "Source link(s) for street width data",
        example: ["", "", ""],
    },
};

export const allFieldsConfig = { ...dataFields, ...buildingUserFields };