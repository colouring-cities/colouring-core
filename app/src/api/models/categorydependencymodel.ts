import { dataFields } from "../../frontend/config/data-fields-config";

type Field = {
    type: string;
    title: string;
    slug: string;
    tooltip: string;
    options: string[];
    placeholder: string | null;
    isUrl: boolean;
    condition:boolean;
  };
  
  type Subcategory = {
    id: string | number;
    name: string;
    fields: Field[];
  };
  
  type Category = {
    id: string | number;
    name: string;
    subcategories: Subcategory[];
  };
  
   export type Dataset= {
    //categories: Category[];
    subcategories:Subcategory[]
  };


  const dataset1 = {
    categories: [
      {
        name: "Energy Performance",
        id: "1",
        subcategories: [
          {
            name: "Official environmental quality rating",
            id: "1.1",
            fields: [
              {
                type: "Select",
                title: dataFields.sust_breeam_rating.title,
                slug: "sust_breeam_rating",
                tooltip: dataFields.sust_breeam_rating.tooltip,
                options: ["Outstanding", "Excellent", "Very good1", "Good", "Pass", "Unclassified"],
              },
              {
                type: "Verification",
                slug: "sust_breeam_rating",
              },
              {
                type: "Select",
                title: dataFields.sust_breeam_rating_source_type.title,
                slug: "sust_breeam_rating_source_type",
                tooltip: dataFields.sust_breeam_rating_source_type.tooltip,
                options: dataFields.sust_breeam_rating_source_type.items,
                placeholder: dataFields.sust_breeam_rating_source_type.example,
              },
              {
                type: "DataEntry",
                condition: (props) =>
                  props.building.sust_breeam_rating_source_type !== null &&
                  ![
                    dataFields.sust_breeam_rating_source_type.items[0],
                    dataFields.sust_breeam_rating_source_type.items[1],
                  ].includes(props.building.sust_breeam_rating_source_type),
                title: dataFields.sust_breeam_rating_source_link.title,
                slug: "sust_breeam_rating_source_link",
                tooltip: dataFields.sust_breeam_rating_source_link.tooltip,
                placeholder: "https://...",
                isUrl: true,
              },
            ],
          },
          {
            name: "Official energy rating",
            id: "1.2",
            fields: [
              {
                type: "Select",
                title: dataFields.sust_dec.title,
                slug: "sust_dec",
                tooltip: dataFields.sust_dec.tooltip,
                options: ["A", "B", "C", "D", "E", "F", "G"],
              },
              {
                type: "Verification",
                slug: "sust_dec",
              },
            ],
          },
        ],
      },
      {
        name: "Energy Systems",
        id: "2",
        subcategories: [
          {
            name: "Solar panels",
            id: "2.1",
            fields: [
              {
                type: "Logical",
                title: dataFields.energy_solar.title,
                slug: "energy_solar",
                tooltip: dataFields.energy_solar.tooltip,
              },
              {
                type: "Verification",
                slug: "energy_solar",
              },
            ],
          },
        ],
      },
    ],
  };