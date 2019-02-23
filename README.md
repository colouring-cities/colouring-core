# Colouring London
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

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
facilitated by the Greater London Authority (GLA), and giving access to its API
and technical support.

## License

    Colouring London
    Copyright (C) 2018 Tom Russell and Colouring London contributors

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/42236514?v=4" width="100px;" alt="polly64"/><br /><sub><b>polly64</b></sub>](https://github.com/polly64)<br />[🎨](#design-polly64 "Design") [🤔](#ideas-polly64 "Ideas, Planning, & Feedback") [🖋](#content-polly64 "Content") [🔍](#fundingFinding-polly64 "Funding Finding") | [<img src="https://avatars2.githubusercontent.com/u/2762769?v=4" width="100px;" alt="Tom Russell"/><br /><sub><b>Tom Russell</b></sub>](https://github.com/tomalrussell)<br />[🎨](#design-tomalrussell "Design") [🤔](#ideas-tomalrussell "Ideas, Planning, & Feedback") [💻](https://github.com/tomalrussell/colouring-london/commits?author=tomalrussell "Code") [📖](https://github.com/tomalrussell/colouring-london/commits?author=tomalrussell "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/6041913?v=4" width="100px;" alt="dominic"/><br /><sub><b>dominic</b></sub>](https://dghumphrey.co.uk/)<br />[🤔](#ideas-dominijk "Ideas, Planning, & Feedback") [🖋](#content-dominijk "Content") | [<img src="https://avatars1.githubusercontent.com/u/5138911?v=4" width="100px;" alt="Adam Dennett"/><br /><sub><b>Adam Dennett</b></sub>](https://github.com/adamdennett)<br />[🤔](#ideas-adamdennett "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/19817528?v=4" width="100px;" alt="Duncan Smith"/><br /><sub><b>Duncan Smith</b></sub>](https://github.com/duncan2001)<br />[🤔](#ideas-duncan2001 "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
