# Colouring Colombia
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors)
![Build status](https://github.com/colouring-cities/colouring-core/workflows/Node.js%20CI/badge.svg)

¿Cuántos edificios hay en una ciudad? ¿Cuáles son sus características? ¿Dónde están ubicados y cómo contribuyen a la ciudad? ¿Cuán adaptables son? ¿Cuánto tiempo durarán y cuáles son las implicaciones ambientales y socioeconómicas de la demolición?

Colouring Cities es un proyecto de ciencia social ciudadana basado en la web diseñado para ayudar a responder estas preguntas mediante el crowdsourcing y visualización de doce categorías de información sobre los edificios de nuestras ciudades.

## Estructura

Este repositorio contendrá el código de fuente abierto para el fork Colouring Colombia que:

- ss una implementación del proyecto colouring cities en español.
- almacena polígonos de la huella de los edificios y metadatos de origen
- permite a los usuarios del sitio registrar datos de atributos de edificios
- sirve mosaicos de mapas renderizados a partir de los datos recopilados
- permite a los visitantes del sitio descargar los datos de atributos de edificios recopilados

Los datos de atributos de edificios recopilados como parte del proyecto estarán disponibles
para descargar bajo una licencia liberal de datos abiertos
([ODbL](https://opendatacommons.org/licenses/odbl/1.0/)).

## Configuración y ejecución

#### Haciendo Fork del Repositorio Principal
Si estás trabajando con nosotros como parte de esta organización de GitHub, entonces es posible que ya se haya configurado un repositorio y equipo para ti. Si ya estás usando el repositorio y quieres agregar un nuevo proyecto, quizás porque estás expandiendo a ciudades adicionales, por favor sigue estas instrucciones para crear un Fork del repositorio principal: [docs/working-with-colouring-core](docs/working-with-colouring-core.md).

#### Personaliza la Aplicación:

Puedes personalizar la aplicación Colouring Cities cambiando los valores en el siguiente archivo:

`app/src/cc-config.json`

Para obtener más información sobre el sistema de configuración, consulta [docs/configuring-colouring-cities](docs/configuring-colouring-cities.md).

#### Prueba la aplicación:

Puedes probar la aplicación Colouring Cities configurando tu propio entorno de desarrollo, que incluye la opción de cargar datos de prueba de OpenStreetMaps (OSM). Consulta [docs/setup-dev-environment](docs/setup-dev-environment.md).

_Ultima actualización Marzo 2022_

#### Crear una versión de producción de la aplicación:

También tenemos documentación sobre cómo configurar un entorno de producción aquí: [docs/setup-production-environment](docs/setup-production-environment.md).
  
_Ultima actualización Diciembre 2021_

**Nota:** Hay documentación adicional útil dentro de la carpeta `/docs`.

#### Solución de problemas
Si tienes problemas con la aplicación, primero busca aquí: [docs/troubleshooting](docs/troubleshooting.md) para ver si hay una solución para tu problema.
(También, considera actualizar este documento si te encuentras con problemas y logras resolverlos!)

## Reconocimientos

Colouring London fue establecido en el Centre for Advanced Spatial
Analysis (CASA), University College London y ahora se encuentra en The Alan Turing Institute.
Ordnance Survey está proporcionando las huellas de los edificios requeridos para recopilar los datos,
facilitado por la Greater London Authority (GLA), y dando acceso a su API
y soporte técnico.

## Licencia

    Colouring London/Colouring Cities
    Copyright (C) 2018-2022 Tom Russell y contribuyentes de Colouring Cities

    Este programa es software libre: puedes redistribuirlo y/o modificarlo
    bajo los términos de la Licencia Pública General de GNU publicada por
    la Free Software Foundation, ya sea la versión 3 de la Licencia, o
    (a tu elección) cualquier versión posterior.

    Este programa se distribuye con la esperanza de que sea útil,
    pero SIN NINGUNA GARANTÍA; sin siquiera la garantía implícita de
    COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Consulta los
    Detalles de la Licencia Pública General de GNU para obtener más detalles.

    Deberías haber recibido una copia de la Licencia Pública General de GNU
    junto con este programa. Si no, consulta <http://www.gnu.org/licenses/>.

## Contribuyentes
<!-- this section is updated using external bot, see https://allcontributors.org/docs/en/bot/usage - post comment like
@all-contributors please add @<username> for <contributions>
to trigger it, for example
@all-contributors please add @<username> for code
@all-contributors please add @<username> for code and docs
-->
Agradecimientos a estas maravillosas personas ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

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
Contributions of any kind are welcome!
