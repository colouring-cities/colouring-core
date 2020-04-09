# Colouring London Data Extract

This extract contains a snapshot of contributions to Colouring London
(https://colouring.london).

Colouring London is a citizen science platform collecting information on every building in
London, to help make the city more sustainable.

The data included are open data, licensed under the Open Data Commons Open Database License
(ODbL, http://opendatacommons.org/licenses/odbl/) by Colouring London contributors.

You are free to copy, distribute, transmit and adapt the data, as long as you credit Colouring
London and our contributors. If you alter or build upon our data, you may distribute the
result only under the same licence.


## Contents

This extract contains four files:

- README.txt
- building_attributes.csv
- building_uprns.csv
- edit_history.csv


## Building Attributes

This is the main table, containing almost all data collected by Colouring London. Apart from
`building_id`, `revision_id` and `ref_toid`, all of these fields are optional.

- `building_id`: unique building ID for Colouring London buildings
- `revision_id`: unique revision ID for Colouring London, cross-references to our edit history
- `ref_toid`: cross-reference to Ordnance Survey MasterMap TOID
- `ref_osm_id`: cross-reference to OpenStreetMap feature osm_id
- `location_name`: building name
- `location_number`: building number
- `location_street`: street name
- `location_line_two`: additional address line
- `location_town`: town
- `location_postcode`: postcode
- `location_latitude`: latitude
- `location_longitude`: longitude
- `current_landuse_group`: current land use group
- `current_landuse_order`: current land use order
- `building_attachment_form`: building attachment form
- `date_change_building_use`: year of last building use change
- `date_year`: year built
- `date_lower`: lower bound on year built
- `date_upper`: upper bound on year built
- `date_source`: type of source for building dates
- `date_source_detail`: details of source for building dates
- `date_link`: list of links to further information relating to building dates
- `facade_year`: facade date
- `facade_upper`: upper bound on facade date
- `facade_lower`: lower bound on facade date
- `facade_source`: type of source for facade dates
- `facade_source_detail`: details of source for facade dates
- `size_storeys_attic`: number of attic storeys
- `size_storeys_core`: number of core storeys
- `size_storeys_basement`: number of basement storeys
- `size_height_apex`: height in metres to the building apex
- `size_floor_area_ground`: ground floor floor area in square metres
- `size_floor_area_total`: total floor area in square metres
- `size_width_frontage`: width of frontage in metres
- `construction_core_material`: main structural material
- `construction_secondary_materials`: other structural materials
- `construction_roof_covering`: main roof covering
- `sust_breeam_rating`: BREEAM rating
- `sust_dec`: DEC rating
- `sust_retrofit_date`: year of last significant retrofit
- `planning_portal_link`: link to an entry on https://www.planningportal.co.uk/
- `planning_in_conservation_area`: in a conservation area? (True/False)
- `planning_conservation_area_name`: conservation area name
- `planning_in_list`: in the National Heritage List for England? (True/False)
- `planning_list_id`: National Heritage List for England ID
- `planning_list_cat`: National Heritage List for England listing type
- `planning_list_grade`: National Heritage List for England listing grade
- `planning_heritage_at_risk_id`: on the Heritage at Risk list? (True/False)
- `planning_world_list_id`: UNESCO World Heritage list ID
- `planning_in_glher`: in the Greater London Historic Environment Record? (True/False)
- `planning_glher_url`: Greater London Historic Environment Record link
- `planning_in_apa`: in an Architectural Priority Area? (True/False)
- `planning_apa_name`: Architectural Priority Area name
- `planning_apa_tier`: Architectural Priority Area tier
- `planning_in_local_list`: in a local list? (True/False)
- `planning_local_list_url`: local list reference link
- `planning_in_historic_area_assessment`: within a historic area assessment? (True/False)
- `planning_historic_area_assessment_url`: historic area assessment reference link
- `likes_total`: number of times the building has been liked by Colouring London users


## Building UPRNs

Buildings are matched to UPRNs (Unique Property Reference Numbers), which should help link
Colouring London data against other datasets.

Read more about UPRNs: https://www.ordnancesurvey.co.uk/business-government/tools-support/uprn

`building_uprns.csv` looks something like this:

    building_id,uprn,parent_uprn
    2810432,10091093495,100023038313
    2810432,10091093496,100023038313
    2810432,10091093497,

- `building_id`: Colouring London unique building ID, references the building_id in
  building_attributes.csv
- `uprn`: Unique Property Reference Number associated with the building. In some cases
  multiple UPRNs are associated with a single Colouring London building, for example in
  blocks of flats or mixed-use buildings.
- `parent_uprn`: optional. Some UPRNs are grouped by a parent-child relationship, so while
  each UPRN is unique, multiple UPRNs may share the same parent.


## Edit History

Each change to the Colouring London database is recorded, so it is possible to explore how the
dataset evolves over time.

The edit history logs changes made by users, with the following fields:

- `revision_id`: unique change id, referenced by building_attributes
- `revision_timestamp`: date and time of the change
- `building_id`: Colouring London building ID, references building_attributes
- `forward_patch`: the changes made, encoded as a JSON string where keys are attribute/column
  names, and values are the values set by this change.
- `reverse_patch`: the reverse of the change, encoded as a JSON string. This shows what the
  values were before this change was made.
- `user`: username of the user who made the change


For example a forward patch might show a building date being provided, along with some source
details:

    {"date_year": 1911, "date_source_details": "Survey of London Marylebone draft text"}

Where the reverse patch shows that there was no previous data stored:

    {"date_year": None, "date_source_details": None}
