# Colouring London
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)
![Build status](https://github.com/colouring-london/colouring-london/workflows/Node.js%20CI/badge.svg)

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
1. Load buildings and geometries to database (see `etl`)
1. Install app dependencies: `cd app && npm i`
1. Run tests: `npm test`
1. Run app: `npm start`

In development, run with environment variables:

```bash
APP_COOKIE_SECRET=test_secret \
PGHOST=localhost \
PGUSER=dbuser \
PGDATABASE=dbname \
PGPASSWORD=dbpassword \
PGPORT=5432 \
TILECACHE_PATH=/path/to/tilecache/directory \
    npm start
```

## Acknowledgements

Colouring London was set up at the Centre for Advanced Spatial
Analysis (CASA), University College London and is now based at The Alan Turing Institute.
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
<table>
  <tr>
    <td align="center"><a href="https://github.com/polly64"><img src="https://avatars3.githubusercontent.com/u/42236514?v=4" width="100px;" alt="polly64"/><br /><sub><b>polly64</b></sub></a><br /><a href="#design-polly64" title="Design">🎨</a> <a href="#ideas-polly64" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-polly64" title="Content">🖋</a> <a href="#fundingFinding-polly64" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="https://github.com/tomalrussell"><img src="https://avatars2.githubusercontent.com/u/2762769?v=4" width="100px;" alt="Tom Russell"/><br /><sub><b>Tom Russell</b></sub></a><br /><a href="#design-tomalrussell" title="Design">🎨</a> <a href="#ideas-tomalrussell" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/tomalrussell/colouring-london/commits?author=tomalrussell" title="Code">💻</a> <a href="https://github.com/tomalrussell/colouring-london/commits?author=tomalrussell" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mz8i"><img src="https://avatars2.githubusercontent.com/u/36160844?v=4" width="100px;" alt="mz8i"/><br /><sub><b>mz8i</b></sub></a><br /><a href="https://github.com/tomalrussell/colouring-london/commits?author=mz8i" title="Code">💻</a> <a href="#ideas-mz8i" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://dghumphrey.co.uk/"><img src="https://avatars0.githubusercontent.com/u/6041913?v=4" width="100px;" alt="dominic"/><br /><sub><b>dominic</b></sub></a><br /><a href="#ideas-dominijk" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-dominijk" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/adamdennett"><img src="https://avatars1.githubusercontent.com/u/5138911?v=4" width="100px;" alt="Adam Dennett"/><br /><sub><b>Adam Dennett</b></sub></a><br /><a href="#ideas-adamdennett" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/duncan2001"><img src="https://avatars1.githubusercontent.com/u/19817528?v=4" width="100px;" alt="Duncan Smith"/><br /><sub><b>Duncan Smith</b></sub></a><br /><a href="#ideas-duncan2001" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/martin-dj"><img src="https://avatars2.githubusercontent.com/u/7262550?v=4" width="100px;" alt="martin-dj"/><br /><sub><b>martin-dj</b></sub></a><br /><a href="https://github.com/tomalrussell/colouring-london/commits?author=martin-dj" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/MeldaS"><img src="https://avatars.githubusercontent.com/u/33935846?v=4" width="100px;" alt="MeldaS"/><br /><sub><b>MeldaS</b></sub></a><br /><a href="https://github.com/tomalrussell/colouring-london/commits?author=MeldaS" title="Code">💻</a> <a href="#ideas-MeldaS" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="#"><img src="docs/images/green.png" width="100px;" alt="Tarn Hamilton"/><br /><sub><b>Tarn Hamilton</b></sub></a><br /><a href="#design-tarn" title="Colour">🎨</a></td>
    <td align="center"><a href="http://www.louisjobst.com/index.php/about/"><img src="docs/images/yellow.png" width="100px;" alt="Louis Jobst"/><br /><sub><b>Louis Jobst</b></sub></a><br /><a href="#design-tarn" title="Design">🎨</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Even more thanks go to Colouring London contributors, funders, project partners, consultees,
advisers, supporters and friends - [everyone involved in the
project](https://www.pages.colouring.london/whoisinvolved).
