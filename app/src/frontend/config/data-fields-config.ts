import { Category } from './categories-config';


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
    fields?: { [key: string]: Omit<DataFieldDefinition, 'category'>}

    /**
     * The example is used to determine the runtime type in which the attribute data is stored (e.g. number, string, object)
     * This gives the programmer auto-complete of all available building attributes when implementing a category view.
     * 
     * E.g. if the field is a text value, an empty string ("") is the simplest example.
     * 
     * Making it semantically correct is useful but not necessary.
     * E.g. for building attachment form, you could use "Detached" as example
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
        title: "Do you think this **type** of building is generally worth keeping?",
        example: true,
    },
    community_type_worth_keeping_reasons: {
        perUser: true,
        category: Category.Community,
        title: 'Why is this type of building worth keeping?',
        fields: {
            external_design: {
                title: "because the external design contributes to the streetscape"
            },
            internal_design: {
                title: 'because the internal design works well'
            },
            adaptable: {
                title: 'because the building is adaptable / can be reused to make the city more sustainable'
            },
            other: {
                title: 'other'
            }
        },
        example: {
            external_design: true,
            internal_design: true,
            adaptable: false,
            other: false
        }
    },
    
    community_local_significance: {
        perUser: true,
        category: Category.Community,
        title: "Do you think this building should be recorded as a local heritage asset?",
        example: true
    }
};


export const dataFields = { /* eslint-disable @typescript-eslint/camelcase */
    location_name: {
        category: Category.Location,
        title: "Building Name",
        tooltip: "May not be needed for many buildings.",
        example: "The Cruciform",
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
        title: "Town",
        example: "London",
        //tooltip: ,
    },
    location_postcode: {
        category: Category.Location,
        title: "Postcode",
        example: "W1W 6TR",
        //tooltip: ,
    },
    ref_toid: {
        category: Category.Location,
        title: "TOID",
        tooltip: "Ordnance Survey Topography Layer ID (to be filled automatically)",
        example: "",
    },
    
    /**
     * UPRNs is not part of the buildings table, but the string fields 
     * are included here for completeness
     */
    uprns: {
        category: Category.Location,
        title: "UPRNs",
        tooltip: "Unique Property Reference Numbers (to be filled automatically)",
        example: [{uprn: "", parent_uprn: "" }, {uprn: "", parent_uprn: "" }],
    },

    ref_osm_id: {
        category: Category.Location,
        title: "OSM ID",
        tooltip: "OpenStreetMap feature ID",
        example: "",
    },
    location_latitude: {
        category: Category.Location,
        title: "Latitude",
        example: 12.4564,
    },
    location_longitude: {
        category: Category.Location,
        title: "Longitude",
        example: 0.12124,
    },

    current_landuse_group: {
        category: Category.LandUse,
        title: "Current Land Use (Group)",
        tooltip: "Land use Groups as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: ["", ""],
    },
    current_landuse_order: {
        category: Category.LandUse,
        title: "Current Land Use (Order)",
        tooltip: "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)",
        example: "",
    },
    current_landuse_source: {
        category: Category.LandUse,
        title: "Source of information",
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
        title: "Source Links",
        tooltip: "URL for current land use reference",
        example: ["", "", ""],
    },
    current_landuse_verified: {
        category: Category.LandUse,
        title: 'Has this land use been manually verified?',
        example: true,
    },
    building_attachment_form: {
        category: Category.Type,
        title: "Adjacency/configuration",
        tooltip: "We have prepopulated these based on their current attachment. A building can either be detached, semi-detached or part of a terrace (middle or end)",
        example: "",
    },
    date_change_building_use: {
        category: Category.Type,
        title:"When did use change?",
        tooltip: "This is the date the building stopped being used for for the function it was built for. I.e. if it was Victorian warehouse which is now an office this would be when it became an office or if it was something before that, maybe a garage then the date that happened",
        example: 1920,
    },
    /**
     * original_building_use does not exist in database yet.
     * Slug needs to be adjusted if the db column will be named differently 
     */
    original_building_use: {
        category: Category.Type,
        title: "Original building use",
        tooltip: "What was the building originally used for when it was built? I.e. If it was Victorian warehouse which is now an office this would be warehouse",
        example: "",
    },

    size_roof_shape: {
        category: Category.Type,
        title: "Roof type",
        example: "",
        //tooltip: ,
    },

    date_year: {
        category: Category.Age,
        title: "Year built (best estimate)",
        example: 1924,
    },
    date_lower : {
        category: Category.Age,
        title: "Earliest possible start date",
        tooltip: "This should be the earliest year in which building could have started.",
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
        title: "Facade year",
        tooltip: "Best estimate",
        example: 1900,
    },
    date_source: {
        category: Category.Age,
        title: "Source of information",
        tooltip: "Source for the main start date",
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
        title: "Text and Image Links",
        tooltip: "URL for age and date reference",
        example: ["", "", ""],
    },

    size_storeys_core: {
        category: Category.Size,
        title: "Core storeys",
        tooltip: "How many storeys between the pavement and start of roof?",
        example: 10,
    },
    size_storeys_attic: {
        category: Category.Size,
        title: "Attic storeys",
        tooltip: "How many storeys above start of roof?",
        example: 1,
    },
    size_storeys_basement: {
        category: Category.Size,
        title: "Basement storeys",
        tooltip: "How many storeys below pavement level?",
        example: 1,
    },
    size_height_apex: {
        category: Category.Size,
        title: "Height to apex (m)",
        example: 100.5,
        //tooltip: ,
    },
    size_height_eaves: {
        category: Category.Size,
        title: "Height to eaves (m)",
        example: 20.33,
        //tooltip: ,
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
    size_width_frontage: {
        category: Category.Size,
        title: "Frontage Width (m)",
        example: 12.2,
        //tooltip: ,
    },

    size_configuration: {
        category: Category.Size,
        title: "Configuration (semi/detached, end/terrace)",
        example: "",
        //tooltip: ,
    },

    size_plot_area_total: {
        category: Category.Streetscape,
        title: "Total area of plot (m²)",
        example: 123.02,
        //tooltip: ,
    },
    size_far_ratio: {
        category: Category.Streetscape,
        title: "FAR ratio (percentage of plot covered by building)",
        example: 0.1,
        //tooltip: ,
    },

    construction_core_material: {
        category: Category.Construction,
        title: "Core Material",
        tooltip:"The main structural material",
        example: "",
    },

    construction_secondary_materials: {
        category: Category.Construction,
        title: "Main Secondary Construction Material/s",
        tooltip:"Other construction materials",
        example: "",
    },

    construction_roof_covering: {
        category: Category.Construction,
        title: "Main Roof Covering",
        tooltip:'Main roof covering material',
        example: "",
    },

    sust_breeam_rating: {
        category: Category.Sustainability,
        title: "BREEAM Rating",
        tooltip: "(Building Research Establishment Environmental Assessment Method) May not be present for many buildings",
        example: "",
    },
    sust_dec: {
        category: Category.Sustainability,
        title: "DEC Rating",
        tooltip: "(Display Energy Certificate) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use",
        example: "G",
    },
    sust_aggregate_estimate_epc: {
        category: Category.Sustainability,
        title: "EPC Rating",
        tooltip: "(Energy Performance Certificate) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher maybe rented",
        example: "",
    },
    sust_retrofit_date: {
        category: Category.Sustainability,
        title: "Last significant retrofit",
        tooltip: "Date of last major building refurbishment",
        example: 1920,
    },
    sust_life_expectancy: {
        category: Category.Sustainability,
        title: "Expected lifespan for typology",
        example: 123,
        //tooltip: ,
    },

    planning_portal_link: {
        category: Category.Planning,
        title: "Planning portal link",
        example: "",
        //tooltip: ,
    },
    planning_in_conservation_area: {
        category: Category.Planning,
        title: "In a conservation area?",
        example: true,
        //tooltip: ,
    },
    planning_conservation_area_name: {
        category: Category.Planning,
        title: "Conservation area name",
        example: "",
        //tooltip: ,
    },
    planning_in_list: {
        category: Category.Planning,
        title: "Is listed on the National Heritage List for England?",
        example: true,
        //tooltip: ,
    },
    planning_list_id: {
        category: Category.Planning,
        title: "National Heritage List for England list id",
        example: "121436",
        //tooltip: ,
    },
    planning_list_cat: {
        category: Category.Planning,
        title: "National Heritage List for England list type",
        example: "",
        //tooltip: ,
    },
    planning_list_grade: {
        category: Category.Planning,
        title: "Listing grade",
        example: "II",
        //tooltip: ,
    },
    planning_heritage_at_risk_id: {
        category: Category.Planning,
        title: "Heritage at risk list id",
        example: "",
        //tooltip: ,
    },
    planning_world_list_id: {
        category: Category.Planning,
        title: "World heritage list id",
        example: "",
        //tooltip: ,
    },
    planning_in_glher: {
        category: Category.Planning,
        title: "In the Greater London Historic Environment Record?",
        example: true,
        //tooltip: ,
    },
    planning_glher_url: {
        category: Category.Planning,
        title: "Greater London Historic Environment Record link",
        example: "",
        //tooltip: ,
    },
    planning_in_apa: {
        category: Category.Planning,
        title: "In an Architectural Priority Area?",
        example: true,
        //tooltip: ,
    },
    planning_apa_name: {
        category: Category.Planning,
        title: "Architectural Priority Area name",
        example: "",
        //tooltip: ,
    },
    planning_apa_tier: {
        category: Category.Planning,
        title: "Architectural Priority Area tier",
        example: "2",
        //tooltip: ,
    },
    planning_in_local_list: {
        category: Category.Planning,
        title: "Is locally listed?",
        example: true,
        //tooltip: ,
    },
    planning_local_list_url: {
        category: Category.Planning,
        title: "Local list link",
        example: "",
        //tooltip: ,
    },
    planning_in_historic_area_assessment: {
        category: Category.Planning,
        title: "Within a historic area assessment?",
        example: true,
        //tooltip: ,
    },
    planning_historic_area_assessment_url: {
        category: Category.Planning,
        title: "Historic area assessment link",
        example: "",
        //tooltip: ,
    },
    planning_demolition_proposed: {
        category: Category.Planning,
        title: "Is the building proposed for demolition?",
        example: true,
        //tooltip: ,
    },

    likes_total: {
        category: Category.Community,
        title: "Total number of likes",
        example: 100,
        tooltip: "People who like the building and think it contributes to the city.",
    },

    community_local_significance_total: {
        category: Category.Community,
        title: "People who think the building should be recorded as one of local significance",
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
        example: "Not in public/community ownership"
    },

    community_public_ownership_sources: {
        category: Category.Community,
        title: "Community ownership source link",
        example: ["https://example.com"]
    },

    dynamics_has_demolished_buildings: {
        category: Category.Dynamics,
        title: 'Were any other buildings ever built on this site?',
        example: true,
    },

    demolished_buildings: {
        category: Category.Dynamics,
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
                lifespan: "2-5", overlap_present: "50%", links: ["", ""]}
        ]
    },
    is_extension: {
        category: Category.Team,
        title: "Do you wish to add information on:",
        tooltip: "",
        example: "",
        items: [
            "The main building",
            "A major extension"
        ],
    },
    extension_year: {
        category: Category.Team,
        title: "When was the work carried out?",
        tooltip: "This field is the same as 'Year built (best estimate)' in the Age category'",
        tooltip_extension: "This should be the year the extension was built, not the original building",
        example: 2020
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
            "Private (company/estate)",
            "Other"
        ]
    },
    designers: {
        category: Category.Team,
        title: "Who were the main designer(s)?",
        tooltip: "Free text. First name, space, then Last name.",
        example: ["", "", ""],
    },
    designers_source_link: {
        category: Category.Team,
        title: "Source links for designer(s)",
        tooltip: "URL for source for designer(s)",
        example: ["", "", ""],
    },
    lead_designer_type: {
        category: Category.Team,
        title: "Which best describes the lead designer?",
        example: "",
        items: [
            "Landowner",
            "Speculative builder",
            "Government architecture department",
            "Architectural firm",
            "Engineering firm",
            "Other"
        ]
    },
    designer_awards: {
        category: Category.Team,
        title: "Did the design team win any awards for this building?",
        tooltip: "",
        example: false
    },
};

export const allFieldsConfig = {...dataFields, ...buildingUserFields};