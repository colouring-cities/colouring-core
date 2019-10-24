export enum Category {
    Location = 'Location',
    LandUse = 'Land Use',
    Type = 'Type',
    Age = 'Age',
    SizeShape = 'Size & Shape',
    Construction = 'Construction',
    Streetscape = 'Streetscape',
    Team = 'Team',
    Sustainability = 'Sustainability',
    Community = 'Community',
    Planning = 'Planning',
    Like = 'Like Me!'
}

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

export const dataFields = {
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

    likes_total: {
        category: Category.Like,
        title: "Total number of likes"
    }

};
