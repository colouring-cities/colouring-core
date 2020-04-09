export enum Category {
    Location = 'Location',
    LandUse = 'LandUse',
    Type = 'Type',
    Age = 'Age',
    SizeShape = 'SizeShape',
    Construction = 'Construction',
    Streetscape = 'Streetscape',
    Team = 'Team',
    Sustainability = 'Sustainability',
    Community = 'Community',
    Planning = 'Planning',
    Like = 'Like',

    Unknown = 'Unknown'
}

export const categories = {
    [Category.Location]: {
        slug: 'location',
        name: 'Location'
    },
    [Category.LandUse]: {
        slug: 'use',
        name: 'Land Use'
    },
    [Category.Type]: {
        slug: 'type',
        name: 'Type'
    },
    [Category.Age]: {
        slug: 'age',
        name: 'Age'
    },
    [Category.SizeShape]: {
        slug: 'size',
        name: 'Size & Shape'
    },
    [Category.Construction]: {
        slug: 'construction',
        name: 'Construction'
    },
    [Category.Streetscape]: {
        slug: 'streetscape',
        name: 'Streetscape'
    },
    [Category.Team]: {
        slug: 'team',
        name: 'Team'
    },
    [Category.Sustainability]: {
        slug: 'sustainability',
        name: 'Sustainability'
    },
    [Category.Community]: {
        slug: 'community',
        name: 'Community'
    },
    [Category.Planning]: {
        slug: 'planning',
        name: 'Planning'
    },
    [Category.Like]: {
        slug: 'like',
        name: 'Like Me!'
    }
};

export const categoriesOrder: Category[] = [
    Category.Location,
    Category.LandUse,
    Category.Type,
    Category.Age,
    Category.SizeShape,
    Category.Construction,
    Category.Streetscape,
    Category.Team,
    Category.Sustainability,
    Category.Community,
    Category.Planning,
    Category.Like,
];

/**
 * This interface is used only in code which uses dataFields, not in the dataFields definition itself
 * Cannot make dataFields an indexed type ({[key: string]: DataFieldDefinition}),
 * because then we wouldn't have type-checking for whether a given key exists on dataFields,
 * e.g. dataFields.foo_bar would not be highlighted as an error.
 */
export interface DataFieldDefinition {
    category: Category;
    title: string;
    tooltip?: string;
}

export const dataFields = {
    location_name: {
        category: Category.Location,
        title: "Building Name",
        tooltip: "May not be needed for many buildings.",
    },
    location_number: {
        category: Category.Location,
        title: "Building number",
    },
    location_street: {
        category: Category.Location,
        title: "Street",
        //tooltip: ,
    },
    location_line_two: {
        category: Category.Location,
        title: "Address line 2",
        //tooltip: ,
    },
    location_town: {
        category: Category.Location,
        title: "Town",
        //tooltip: ,
    },
    location_postcode: {
        category: Category.Location,
        title: "Postcode",
        //tooltip: ,
    },
    ref_toid: {
        category: Category.Location,
        title: "TOID",
        tooltip: "Ordnance Survey Topography Layer ID (to be filled automatically)",
    },
    
    /**
     * UPRNs is not part of the buildings table, but the string fields 
     * are included here for completeness
     */
    uprns: {
        category: Category.Location,
        title: "UPRNs",
        tooltip: "Unique Property Reference Numbers (to be filled automatically)"
    },

    ref_osm_id: {
        category: Category.Location,
        title: "OSM ID",
        tooltip: "OpenStreetMap feature ID",
    },
    location_latitude: {
        category: Category.Location,
        title: "Latitude",
    },
    location_longitude: {
        category: Category.Location,
        title: "Longitude",
    },

    current_landuse_class: {
        category: Category.LandUse,
        title: "Current Land Use Class"
    },
    current_landuse_group: {
        category: Category.LandUse,
        title: "Current Land Use Group"
    },
    current_landuse_order: {
        category: Category.LandUse,
        title: "Current Land Use Order"
    },

    building_attachment_form: {
        category: Category.Type,
        title: "Building configuration (attachment)?",
        tooltip: "We have prepopulated these based on their current attachment. A building can either be detached, semi-detached or part of a terrace (middle or end)",
    },
    date_change_building_use: {
        category: Category.Type,
        title:"When did use change?",
        tooltip: "This is the date the building stopped being used for for the function it was built for. I.e. if it was Victorian warehouse which is now an office this would be when it became an office or if it was something before that, maybe a garage then the date that happened",
    },
    /**
     * original_building_use does not exist in database yet.
     * Slug needs to be adjusted if the db column will be named differently 
     */
    original_building_use: {
        category: Category.Type,
        title: "Original building use",
        tooltip: "What was the building originally used for when it was built? I.e. If it was Victorian warehouse which is now an office this would be warehouse",
    },

    date_year: {
        category: Category.Age,
        title: "Year built (best estimate)"
    },
    date_lower : {
        category: Category.Age,
        title: "Earliest possible start date",
        tooltip: "This should be the earliest year in which building could have started."
    },
    date_upper: {
        category: Category.Age,
        title: "Latest possible start year",
        tooltip: "This should be the latest year in which building could have started."
    },
    facade_year: {
        category: Category.Age,
        title: "Facade year",
        tooltip: "Best estimate"
    },
    date_source: {
        category: Category.Age,
        title: "Source of information",
        tooltip: "Source for the main start date"
    },
    date_source_detail: {
        category: Category.Age,
        title: "Source details",
        tooltip: "References for date source (max 500 characters)"
    },
    date_link: {
        category: Category.Age,
        title: "Text and Image Links",
        tooltip: "URL for age and date reference",
    },

    size_storeys_core: {
        category: Category.SizeShape,
        title: "Core storeys",
        tooltip: "How many storeys between the pavement and start of roof?",
    },
    size_storeys_attic: {
        category: Category.SizeShape,
        title: "Attic storeys",
        tooltip: "How many storeys above start of roof?",
    },
    size_storeys_basement: {
        category: Category.SizeShape,
        title: "Basement storeys",
        tooltip: "How many storeys below pavement level?",
    },
    size_height_apex: {
        category: Category.SizeShape,
        title: "Height to apex (m)",
        //tooltip: ,
    },
    size_height_eaves: {
        category: Category.SizeShape,
        title: "Height to eaves (m)",
        //tooltip: ,
    },
    size_floor_area_ground: {
        category: Category.SizeShape,
        title: "Ground floor area (m²)",
        //tooltip: ,
    },
    size_floor_area_total: {
        category: Category.SizeShape,
        title: "Total floor area (m²)",
        //tooltip: ,
    },
    size_width_frontage: {
        category: Category.SizeShape,
        title: "Frontage Width (m)",
        //tooltip: ,
    },
    size_plot_area_total: {
        category: Category.SizeShape,
        title: "Total area of plot (m²)",
        //tooltip: ,
    },
    size_far_ratio: {
        category: Category.SizeShape,
        title: "FAR ratio (percentage of plot covered by building)",
        //tooltip: ,
    },
    size_configuration: {
        category: Category.SizeShape,
        title: "Configuration (semi/detached, end/terrace)",
        //tooltip: ,
    },
    size_roof_shape: {
        category: Category.SizeShape,
        title: "Roof shape",
        //tooltip: ,
    },

    sust_breeam_rating: {
        category: Category.Sustainability,
        title: "BREEAM Rating",
        tooltip: "(Building Research Establishment Environmental Assessment Method) May not be present for many buildings",
    },
    sust_dec: {
        category: Category.Sustainability,
        title: "DEC Rating",
        tooltip: "(Display Energy Certificate) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use",
    },
    sust_aggregate_estimate_epc: {
        category: Category.Sustainability,
        title: "EPC Rating",
        tooltip: "(Energy Performance Certifcate) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher maybe rented",
    },
    sust_retrofit_date: {
        category: Category.Sustainability,
        title: "Last significant retrofit",
        tooltip: "Date of last major building refurbishment",
    },
    sust_life_expectancy: {
        category: Category.Sustainability,
        title: "Expected lifespan for typology",
        //tooltip: ,
    },

    planning_portal_link: {
        category: Category.Planning,
        title: "Planning portal link",
        //tooltip: ,
    },
    planning_in_conservation_area: {
        category: Category.Planning,
        title: "In a conservation area?",
        //tooltip: ,
    },
    planning_conservation_area_name: {
        category: Category.Planning,
        title: "Conservation area name",
        //tooltip: ,
    },
    planning_in_list: {
        category: Category.Planning,
        title: "Is listed on the National Heritage List for England?",
        //tooltip: ,
    },
    planning_list_id: {
        category: Category.Planning,
        title: "National Heritage List for England list id",
        //tooltip: ,
    },
    planning_list_cat: {
        category: Category.Planning,
        title: "National Heritage List for England list type",
        //tooltip: ,
    },
    planning_list_grade: {
        category: Category.Planning,
        title: "Listing grade",
        //tooltip: ,
    },
    planning_heritage_at_risk_id: {
        category: Category.Planning,
        title: "Heritage at risk list id",
        //tooltip: ,
    },
    planning_world_list_id: {
        category: Category.Planning,
        title: "World heritage list id",
        //tooltip: ,
    },
    planning_in_glher: {
        category: Category.Planning,
        title: "In the Greater London Historic Environment Record?",
        //tooltip: ,
    },
    planning_glher_url: {
        category: Category.Planning,
        title: "Greater London Historic Environment Record link",
        //tooltip: ,
    },
    planning_in_apa: {
        category: Category.Planning,
        title: "In an Architectural Priority Area?",
        //tooltip: ,
    },
    planning_apa_name: {
        category: Category.Planning,
        title: "Architectural Priority Area name",
        //tooltip: ,
    },
    planning_apa_tier: {
        category: Category.Planning,
        title: "Architectural Priority Area tier",
        //tooltip: ,
    },
    planning_in_local_list: {
        category: Category.Planning,
        title: "Is locally listed?",
        //tooltip: ,
    },
    planning_local_list_url: {
        category: Category.Planning,
        title: "Local list link",
        //tooltip: ,
    },
    planning_in_historic_area_assessment: {
        category: Category.Planning,
        title: "Within a historic area assessment?",
        //tooltip: ,
    },
    planning_historic_area_assessment_url: {
        category: Category.Planning,
        title: "Historic area assessment link",
        //tooltip: ,
    },
    planning_demolition_proposed: {
        category: Category.Planning,
        title: "Is the building proposed for demolition?",
        //tooltip: ,
    },
    planning_demolition_complete: {
        category: Category.Planning,
        title: "Has the building been demolished?",
        //tooltip: ,
    },
    planning_demolition_history: {
        category: Category.Planning,
        title: "Dates of construction and demolition of previous buildings on site",
        //tooltip: ,
    },

    likes_total: {
        category: Category.Like,
        title: "Total number of likes"
    }

};
