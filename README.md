# Colouring Britain Platform
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors)
![Build status](https://github.com/colouring-cities/colouring-core/workflows/Node.js%20CI/badge.svg)

How many buildings are there in a Britain? What are their characteristics? Where
are different types of building located? How well do they work for users/local communities? And how efficient, sustainable and resilient are they?  

Colouring Britain with website at https://colouringbritain.org/ is a research-led, free public resource, providing open spatial data on Britain's buildings. It is also an open knowledge initiative, built collectively by, and for, academia, communities, government, industry and the third sector. Any information you can add to our open platform is greatly appreciated.

Colouring Britain forms part of the Colouring Cities Research Programme (CCRP), currently overseen by [The Alan Turing Institute](https://www.turing.ac.uk/research/research-projects/colouring-cities-research-programme), and developed in collaboration with international academic institutions across countries co-work on a global network of interoperable open data platforms on national building stocks, and to accelerate sharing of resources and expertise. The CCRP's overall aim is to help improve the quality, efficiency, resilience and sustainability of buildings, and urban areas, and to accelerate the move to net zero in line with United Nations Sustainable Development Goals. For further information please see http://colouringcities.org/.  


## Structure

This repository contain open-source code for the project which:

- stores building footprint polygons and source metadata
- allows site users to record building attribute data
- serves map tiles rendered from collected data
- allows site visitors to download the collected building attribute data

Building attribute data collected as part of the project will be made available
for download under a liberal open data license
([ODbL](https://opendatacommons.org/licenses/odbl/1.0/)).

## Project Board and Issues
To view all of the issue relating to Colouring Britain (and their current status) please visit the [Colouring Britain Project](https://github.com/orgs/colouring-cities/projects/4).

## Setup and run

#### Forking the Core Repository
If you are working with us as part of this GitHub organisation, then a repository and team may already have been set up for you. If you are already using the repository and want to add a new project, perhaps because you are expanding to additional cities, then please following these instructions to create a Fork of the core repository: [working-with-colouring-core](docs/working-with-colouring-core.md).

#### Customise the Application:

You can customise the Colouring Cities application by changing the values in the following file:

`app/src/cc-config.json`

For more information on the config system, see [configuring-colouring-cities](https://github.com/colouring-cities/ccrp-technical-manual/wiki/Configuring-the-Colouring-Cities-Core-Platform).

#### Test the application:

You can try out the Colouring Cities application by setting up your own development environment, which includes the option to load test data from OpenStreetMaps (OSM). See [setup-dev-environment](https://github.com/colouring-cities/ccrp-technical-manual/wiki/Setting-up-a-local-development-environment).
  
_Last updated March 2022_

#### Create a production version of the application:

We also have documentation on setting up a production environment here: [setup-production-environment](https://github.com/colouring-cities/ccrp-technical-manual/wiki/Setting-Up-A-Production-Environment).
  
_Last updated December 2021_

**Note:** There are additional useful documentation in the [CCRP Technical Manual](https://github.com/colouring-cities/ccrp-technical-manual/wiki).

#### Troubleshooting
If you are having problems with the application, first look here: [troubleshooting](docs/troubleshooting.md) to see if there is a solution for your problem.
(Also, please consider updating this document if you encounter and problems and manage to solve them!)

## History & core acknowledgements - updated March 2025

Colouring London was set up at the Centre for Advanced Spatial Analysis, UCL in 2016 as part of EPSRC funded doctoral research, undertaken by Polly Hudson and supported by Professors Mike Batty, Andrew Hudson-Smith and Elsa Aracute. Ordnance Survey, the Greater London Authority and Historic England were major contributors at this stage. The Colouring London prototype built on previous work into public spatial data platforms integrating microspatial data on building stocks - and into methods for co-developing free physical and technical tools to support sustainable urban development through cross sector collaboration- undertaken at The Building Exploratory charitable trust (London) in the 1990s. Tom Russell was responsible for original technical design and open licence strategy and selection. In 2020 when the  initiative moved to The Alan Turing Institute where the international Colouring Cities Research Programme (CCRP) was set up. Since 2024 the UK RSE team, led by Mateusz Konieczny, and funded by Turing and Loughborough, has begun joint work with CCRP research software engineering teams in Germany (IOER), Sweden (Malardalen University) and Canada (Concordia University). Special thanks go to Dr Falli Palaiologou (CCRP Co-I), to Will Taylor, Dr Alden Conner, Dr Dr Allaine Cerwonka, Dr Flora Roumpani & Professor Jon Crowcroft at Turing, and to Dr Taimaz Larimian (Loughborough University) in the UK; in Germany by Dr Robert Hecht, Dr Hendrik Herold and Professor Martin Behnisch (IOER); in Sweden by Dr Allan Hawas (Malardalen University); in Canada by Oriola Gavalda and Professor Ursula Eicker (Concordia University); in Greece by Dr Athina Vlachou (NTUA) and Dr Alcestis Rodi (University of Patras); in Australia by Professor Chris Pettit and Dr Matthew Ng (UNSW); in Kenya by Dr George Musumba (Dedan Kimathi University of Technology); in Lebanon by Dr Sara Najem (AUB); in Bahrain by Dr Wafa Alghatam (University of Bahrain); for Colombia by Dr Fernando Benitez (St Andrew's University), and for Indonesia by Dr Zahratu Shabrina (KCL). We are grateful to the many other individuals and organisations who have contributed to the resarch programme since 2016 and who are helping it expand and improve today.


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
project](https://github.com/colouring-cities/manual/wiki/M3.2-Colouring-Britain:-Who's-Involved%3F).
