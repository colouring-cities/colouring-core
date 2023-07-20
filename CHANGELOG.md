# Changelog

Todos los cambios realizados por el equipo de Colouring Colombia se documentan en este archivo. El objetivo es tener un registro completo de los cambios que deben realizarse a partir de un fork para obtener las adaptaciones en idioma, formato y funcionalidad específica de Colouring Colombia

## [0.0.1] - 2023-07-20
### Added
- Se emplea git diff other/master > target_file_filter.txt para crear un archivo con los cambios realizados en el fork
- Se crea el archivo find_changes.sh para filtrar los archivos que usan i18n. Este script crea un archivo con los archivos que usan i18n
- Se instalan las dependencias de internacionalización i18next, react-i18next, translation-check;
- Se agrega el archivo de configuración de i18n en app/src/frontend/i18n/i18n.ts
- Se agrega el archivo de traducciones i18n en app/src/frontend/app.tsx
    - import './i18n/i18n'
- Se agrega el archivo de traducciones en app/src/frontend/i18n/locales/es/translation.json (TO DO)
- Se actualizan los archivos que usan i18n. En cada uno se importa la biblioteca 
    - import { Trans, useTranslation } from 'react-i18next';
    - Se crea una constante para usar la traducción
        - const { t } = useTranslation();
    - Se reemplazan los textos por la constante t
        - {t('text')}
    - Ver cualquiera de los archivos en i18files.txt como ejemplo
    - Se modifica el componente select-data-entry.tsx
    - Se modifica el componente data-container.tsx que toma los datos desde categories-config.ts. Las cadenas de texto en este archivo se pasan a la función t() y la traducción se realiza en el archivo de traducciones i18n.ts
    - Se modifica el componente copy-controls.tsx
    - Se modifica el archivo category-links.tsx
    - Se modifica el archivo container-header.tsx
    - Se modifica el archivo tooltip.tsx













    
### Changed


### Fixed


