## Adding new building attribute fields

This document is a checklist for adding a new building attribute to the system. It's split into two sections - actions that apply when adding any field, and additional steps to add a field that will be visualised on the map.
The second section would be required when adding a new category or when changing which field should be visualised for a category.

### Adding any attribute

#### In database
1. Add a column to the `buildings` table in the database.
2. Add any check constraints or foreign key constraints on the column, if necessary (if the foreign key constraint is used to restrict the column to a set of values, the table with the values might need to be created from scratch)

#### In API
1. Add field name to `BUILDING_FIELD_WHITELIST` in the building service to allow saving changes to the field
2. Add any special domain logic for processing updates to the field in the `processBuildingUpdate()` function

#### In frontend
1. Add the field description to the `dataFields` object in `data_fields.ts`
2. Add the data entry React component of the appropriate type (text, numeric etc) to the appropriate category view component in the `building/data-containers` folder. Link to `dataFields` for static string values (field name, description etc)


#### In data extracts
1. Add the field to the select list in the COPY query in `maintenance/extract_data/export_attributes.sql` 
2. Add a description of the field to the `README.txt` file

### Adding an attribute which is used to colour the map

All steps from the previous section need to be carried out first.

#### In tileserver
1. Add a SQL query for calculating the value to be visualised to `BUILDING_LAYER_DEFINITIONS` in `app/tiles/dataDefinition.ts`
2. Add Mapnik rendering style in `app/map_styles/polygon.xml`

#### In frontend
1. Update the category to field name mapping in the `tilesetByCat` object inside the `ColouringMap` React component (`map.tsx` file)
2. Add an entry for the field to the `LEGEND_CONFIG` object in `legend.tsx` file