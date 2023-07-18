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
      <td align="center"><a href="https://github.com/polly64"><img src="https://avatars3.githubusercontent.com/u/42236514?v=4?s=100" width="100px;" alt=""/><br /><sub><b>polly64</b></sub></a><br /><a href="#design-polly64" title="Design">🎨</a> <a href="#ideas-polly64" title="Ideas, Planning, & Feedback">

🤔</a> <a href="#projectManagement-polly64" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
Contributions of any kind are welcome!
