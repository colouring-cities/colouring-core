# Colouring London

How many buildings are there in London? What are their characteristics? Where
are they located and how do they contribute to the city? How adaptable are
they? How long will they last, and what are the environmental and
socio-economic implications of demolition?

[Colouring London](http://colouring.london/) is a web-based citizen social
science project designed to help address these questions by crowdsourcing and
visualising twelve categories of information on London’s buildings.

## Structure

This repository will contain open-source code for the project which:
- stores building footprint polygons and source metadata
- allows site users to record building attribute data
- serves map tiles rendered from collected data
- allows site visitors to download the collected building attribute data

Building attribute data collected as part of the project will be made available
for download under a liberal open data license
([ODbL](https://opendatacommons.org/licenses/odbl/1.0/)).

## Setup and run

1. Provision database (see `migrations`)
1. Fill out details in `config.json` (see `config.template.json`)
1. Load buildings and geometries to database (see `etl`)
1. Install app dependencies: `cd app && npm i`
1. Run tests: `npm test`
1. Run app: `npm start`

## Acknowledgements

Colouring London is being designed and built by the Centre for Advanced Spatial
Analysis (CASA), University College London and funded by Historic England.
Ordnance Survey is providing building footprints required to collect the data,
facilitated by the GLA, and giving access to its API and technical support.
