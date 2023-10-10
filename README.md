# Colouring Cities Core Platform
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors)
![Build status](https://github.com/colouring-cities/colouring-core/workflows/Node.js%20CI/badge.svg)

How many buildings are there in a city? What are their characteristics? Where
are they located, how well do they work and how efficient, sustainable and resilient are they?  

The Colouring Cities Research Programme (CCRP) is an international research initiative that designs and tests open-source tools to facilitate knowledge and data sharing on national building stocks. The project is managed from the UK by The Alan Turing Institute (the UK's national institute for datascience and AI) in collaboration with international academic partners and openly releases its code, data and methods. For further information please see http://colouringcities.org/.  


## Structure

This repository contain open-source code for the project which:

- stores building footprint polygons and source metadata
- allows site users to record building attribute data
- serves map tiles rendered from collected data
- allows site visitors to download the collected building attribute data

Building attribute data collected as part of the project will be made available
for download under a liberal open data license
([ODbL](https://opendatacommons.org/licenses/odbl/1.0/)).

## Setup and run

#### Forking the Core Repository
If you are working with us as part of this GitHub organisation, then a repository and team may already have been set up for you. If you are already usign the repository and want to add a new project, perhaps because you are expanding to additional cities, then please following these instructions to create a Fork of the core repository: [docs/working-with-colouring-core](docs/working-with-colouring-core.md).

#### Customise the Application:

You can customise the Colouring Cities application by changing the values in the following file:

`app/src/cc-config.json`

For more information on the config system, see [docs/configuring-colouring-cities](docs/configuring-colouring-cities.md).

#### Test the application:

You can try out the Colouring Cities application by setting up your own development environment, which includes the option to load test data from OpenStreetMaps (OSM). See [docs/setup-dev-environment](docs/setup-dev-environment.md).
  
_Last updated March 2022_

#### Create a production version of the application:

We also have documentation on setting up a production environment here: [docs/setup-production-environment](docs/setup-production-environment.md).
  
_Last updated December 2021_

**Note:** There are additional useful documentation within the `/docs` folder.

#### Troubleshooting
If you are having problems with the application, first look here: [docs/troubleshooting](docs/troubleshooting.md) to see if there is a solution for your problem.
(Also, please consider updating this document if you encounter and problems and manage to solve them!)

## Acknowledgements

Colouring London was set up at the Centre for Advanced Spatial Analysis, University College London in 2016 as part of EPSRC funded doctoral research undertaken by Polly Hudson. Tom Russell was responsible for technical design and open licence strategy and selection.  Ordnance Survey and the Greater London Authority have provided access to high quality building footprints essential for set up. In 2020 the Colouring Cities Research Programme relocated to The Alan Turing Institute's Urban Anaytics Programme, which has funded development and enrichment since this time. Exceptional technical contributions to the prototype have been made by Mateusz Konieczny, Maciej Ziakowski, Ed Chalstrey, Dominic Humphrey and Dr Mike Simpson. Exceptional contributions to the CCRP international programme have been made by Dr Falli Palaiologou, Will Taylor, and CCRP academic colleagues managing platforms in Australia, Bahrain, Lebanon, Greece, Germany, Colombia, Sweden and Indonesia. Many other individuals and organisations have also contributed to the research programme and are thanked on individual CCRP platforms. 


## License

    Colouring London/Colouring Cities
    Copyright (C) 2018-2022 Tom Russell and Colouring Cities contributors

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
<!-- this section is updated using external bot, see https://allcontributors.org/docs/en/bot/usage - post comment like
@all-contributors please add @<username> for <contributions>
to trigger it, for example
@all-contributors please add @<username> for code
@all-contributors please add @<username> for code and docs
-->
Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/polly64"><img src="https://avatars3.githubusercontent.com/u/42236514?v=4?s=100" width="100px;" alt=""/><br /><sub><b>polly64</b></sub></a><br /><a href="#design-polly64" title="Design">🎨</a> <a href="#ideas-polly64" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-polly64" title="Content">🖋</a> <a href="#fundingFinding-polly64" title="Funding Finding">🔍</a></td>
      <td align="center"><a href="https://github.com/tomalrussell"><img src="https://avatars2.githubusercontent.com/u/2762769?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tom Russell</b></sub></a><br /><a href="#design-tomalrussell" title="Design">🎨</a> <a href="#ideas-tomalrussell" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/colouring-cities/colouring-london/commits?author=tomalrussell" title="Code">💻</a> <a href="https://github.com/colouring-cities/colouring-london/commits?author=tomalrussell" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/mz8i"><img src="https://avatars2.githubusercontent.com/u/36160844?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mz8i</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=mz8i" title="Code">💻</a> <a href="#ideas-mz8i" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://dghumphrey.co.uk/"><img src="https://avatars0.githubusercontent.com/u/6041913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dominic</b></sub></a><br /><a href="#ideas-dominijk" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-dominijk" title="Content">🖋</a></td>
      <td align="center"><a href="https://github.com/adamdennett"><img src="https://avatars1.githubusercontent.com/u/5138911?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Dennett</b></sub></a><br /><a href="#ideas-adamdennett" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/duncan2001"><img src="https://avatars1.githubusercontent.com/u/19817528?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Duncan Smith</b></sub></a><br /><a href="#ideas-duncan2001" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/martin-dj"><img src="https://avatars2.githubusercontent.com/u/7262550?v=4?s=100" width="100px;" alt=""/><br /><sub><b>martin-dj</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=martin-dj" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/MeldaS"><img src="https://avatars2.githubusercontent.com/u/33935846?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MeldaS</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=MeldaS" title="Code">💻</a></td>
      <td align="center"><a href="#"><img src="docs/images/green.png?s=100" width="100px;" alt=""/><br /><sub><b>Tarn Hamilton</b></sub></a><br /><a href="#design" title="Design">🎨</a></td>
      <td align="center"><a href="http://www.louisjobst.com/index.php/about/"><img src="docs/images/yellow.png?s=100" width="100px;" alt=""/><br /><sub><b>Louis Jobst</b></sub></a><br /><a href="#design" title="Design">🎨</a></td>
      <td align="center"><a href="http://edchalstrey.com/"><img src="https://avatars.githubusercontent.com/u/5486164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ed Chalstrey</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=edwardchalstrey1" title="Code">💻</a> <a href="https://github.com/colouring-cities/colouring-london/commits?author=edwardchalstrey1" title="Documentation">📖</a></td>
      <td align="center"><a href="https://mapsaregreat.com/"><img src="https://avatars.githubusercontent.com/u/899988?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mateusz Konieczny</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=matkoniecz" title="Code">💻</a> <a href="https://github.com/colouring-cities/colouring-london/commits?author=matkoniecz" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/mdsimpson42"><img src="https://avatars.githubusercontent.com/u/21125422?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Simpson</b></sub></a><br /><a href="https://github.com/colouring-cities/colouring-london/commits?author=mdsimpson42" title="Code">💻</a> <a href="https://github.com/colouring-cities/colouring-london/commits?author=mdsimpson42" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Even more thanks go to Colouring Cities contributors, funders, project partners, consultees,
advisers, supporters and friends - [everyone involved in the
project](https://www.pages.colouring.london/whoisinvolved).
