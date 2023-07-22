import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      
    },
  },
  es: {
    translation: {
      "Welcome to Colouring": "Bienvenido a Colouring",
      "Welcome First Paragraph":
      "Colouring Bogotá es la iniciativa regional dirigida por la Universidad Distrital Francisco José de Caldas, en estrecha colaboración con el Instituto Alan Turing, que tiene como objetivo la implementación de la plataforma Colouring Cities en la ciudad de Bogotá.",
        
      "Welcome Second Paragraph":
      "Colouring Cities es una plataforma abierta de intercambio de conocimientos que surge de un programa de investigación con sede en el Instituto Alan Turing. Ofrece un mecanismo para gestionar datos abiertos sobre los edificios alrededor del mundo, con el fin de contribuir a que las ciudades sean más sostenibles.",
      
      "Welcome Third Paragraph":
        "El proyecto plantea que el IDECA sea la fuente principal de información oficial y la base colaborativa se nutre de los trabajos de campo realizados por los estudiantes de la Universidad.",
      "Start Colouring Here!": "¡Empieza a colorear a Bogotá!",

      "Age": "Edad",
      "Location": "Localización",
      "Energy Performance": "Eficiencia energética",
      "Typology": "Tipología",
      "Age & History": "Edad e historia",
      "Planning Controls": "Controles de planificación",
      "Resilience": "Resiliencia",
      "Land Use": "Uso",

      "Type a postcode...": "Código postal...",
      "Search": "Buscar",

      "About the Colouring Cities Research Programme": "Programa de investigación Colouring Cities",
      "Colouring Cities Open Manual/Wiki": "Manual abierto de Colouring Cities",
      "Open code": "Código abierto",
      "Case Study Showcase": "Estudios de caso",
      "How to Use": "Cómo usar la plataforma",
      "Ethical Framework": "Marco ético",
      "Data Accuracy and Use Agreement": "Precisión y uso de los datos",
      "Equality, Diversity and Inclusion": "Igualdad, diversidad e inclusión",
      "CCRP Academic Partner Protocols": "Protocolos de los socios académicos de CCRP",



      
      Type: "Tipo",
      Size: "Tamaño",
      Construction: "Construcción",
      "Street Context": "Paisaje Urbano",
      Team: "Constructor",
      Planning: "Planificación",
      Sustainability: "Sustentabilidad",
      Dynamics: "Mutaciones",
      Community: "Comunidad",
      "Select a building to view data":"Seleccione un edificio para ver los datos",
      "Click a building to edit": "Haga clic en un edificio para editar",
      "Can you share your opinion on how well the building works?":
        "¿Puede compartir su opinión sobre el funcionamiento del edificio?",
      "Do you like this building and think it contributes to the city?":
        "¿Le gusta este edificio y cree que contribuye a la ciudad?",
      "Can you help add information on community use of buildings?":
        "¿Puede ayudar a añadir información sobre el uso comunitario de los edificios?",
      "This is what we're planning to collect on the building's context":
        "Esto es lo que pensamos recoger sobre el contexto del edificio",
      Gardens: "Jardines",
      Trees: "Arboles",
      "Green walls": "Muros verdes",
      "Green roof": "Techo verde",
      "Proximity to parks and open greenspace":
        "Proximidad a parques y espacios verdes abiertos",
      "Building shading": "Sombra del edificio",
      "We are testing a new feature in this section! Switch between different colour maps by using the dropdown in the legend pane.":
        "¡Estamos probando una nueva función en esta sección! Cambia entre diferentes mapas de colores utilizando el desplegable del panel de la leyenda.",
      "Do you think this type of building is generally worth keeping?":
        "¿Cree que en general merece la pena mantener este tipo de edificios?",
      "Why is this type of building worth keeping?":
        "¿Por qué merece la pena conservar este tipo de edificios?",
      "Do you think this building should be recorded as a local heritage asset?":
        "¿Cree usted que este edificio debería ser registrado como un bien del patrimonio local?",
      "Do you expect this site to be affected by a planning application in the near future?":
        "¿Espera que este lugar se vea afectado por una solicitud de planificación en un futuro próximo?",
      "Are activities open to the community currently taking place in the building?":
        "¿Se realizan actualmente actividades abiertas a la comunidad en el edificio?",
      "Has this ever been used for community activities in the past?":
        "¿Se ha utilizado alguna vez para actividades comunitarias en el pasado?",
      "Has the building always been used for community activities?":
        "¿Se ha utilizado siempre el edificio para actividades comunitarias?",
      "Is the building in public/community ownership?":
        "¿El edificio es de propiedad pública/comunitaria?",
      "Community ownership source link":
        "Enlace a la fuente de propiedad comunitaria",

      "Click a building for details": "Click en edificio para detalles",
      "Year built best estimate": "Año de construcción",
      "Earliest possible start date":
        "Fecha de inicio de construcción aproximada",
      "Latest possible start year": "Ùltimo año posible de inicio",
      "Facade year": "Fecha de modificacion de fachada",
      "Source of information": "Fuente de información",
      "Base type classification": "Clasificación del tipo de base",
      "Local typology/architectural style":
        "Tipología local/estilo arquitectónico",
      "Original building use": "Uso original del edificio",
      "Roof type": "Tipo de techo",
      "Adjacency/configuration": "Adhesión/configuración",
      "Local typology mutations": "Mutaciones de la tipología local",
      "3D procedural model classifications":
        "Clasificación de los modelos de procedimiento 3D",
      "Dynamic tissue type classificaiton":
        "Clasificación dinámica del tipo de tejido",
      "Total area of plot (m²)": "Superficie total del lote (m²)",
      "FAR ratio (percentage of plot covered by building)":
        "porcentaje del lote cubierto por el edificio",
      "Plot dimensions": "Dimensiones del lote",
      "Plot geometry link": "Enlace de la geometría del lote",
      "Land ownership parcel link":
        "Enlace del lote de propiedad de la tierra",
      "Land ownership type": "Tipo de propiedad de la tierra",
      "Street width": "Anchura de la calle",
      "Street network geometry link":
        "Enlace de la geometría de la red de calles",

      "Top Contributors": "mayores contribuyentes",
      "Data Ethics": "Ètica de datos",
      "Colouring Cities Research Programme":
        "Programa de investigación Colouring Cities",
      "Discussion Forum": "Foro de debate",
      "Privacy Policy": "Politica de privacidad",
      "Contributor Agreement": "Acuerdo de Colaboración",
      "Code of Conduct": "Código de conducta",
      "Data Accuracy Agreement": "Acuerdo sobre la precisión de los datos",
      "Ordnance Survey terms of UPRN usage": "Términos de uso de UPRN de Ordnance Survey",
      "Building information (link)": "Informacion de Construccion (link)",
      "Building number": "Número del Edificio",
      "Street": "Calle",
      "Address line 2": "Segunda Direccion",
      Town: "Ciudad",
      Postcode: "Codigo Postal",
      Latitude: "Latitud",
      Longitude: "Longitud",
      "Core material": "Material Principal",
      "Main Secondary Construction Material/s":
        "Material/s de construcción principal/es secundario/s",
      "Main Roof Covering": "Cubierta principal del techo",
      "Construction system type": "Tipos de sistemas de construcción",
      "Main roof covering material":
        "Material principal de la cubierta del techo",
      "Other construction materials": "Otros materiales de construcción",
      "The main structural material": "El material estructural principal",

      "93% of properties in UK are dwellings so we have set this as the default colour. Can you help us colour-in all non-residential and mixed use buildings, and verify residential buildings too?":
        "Se ha establecido el color amarillo como predeterminado. ¿Puede ayudarnos a colorear todos los edificios no residenciales y de uso mixto, y verificar también los edificios residenciales?",

      "Planning Status": "Estado de la planificación",
      "Is a planning application live for this site?":
        "¿Existe una solicitud de planificación para este lugar?",
      "Is the building proposed for demolition?":
        "¿se propone la demolición del edificio?",
      "Has this application recently been been approved/refused?":
        "¿Esta solicitud ha sido aprobada/rechazada recientemente?",
      "Has the work been carried out?": "¿Se han realizado las obras?",
      "For historical planning applications see Planning Portal link":
        "Para ver el historial de solicitudes de planificación, consulte el enlace del Portal de Planificación",
      "Designation and Protection": "Designación y protección",
      "In a conservation area?": "¿En una zona protegida?",
      "Conservation area name": "Nombre de la zona de conservación",
      "Is it listed on the National Heritage List for England?":
        "¿Está incluido en la Lista del Patrimonio Nacional de Colombia",
      "NHLE list entry link": "Enlace de entrada a la lista ...",
      "National Heritage List for England list id":
        "Lista del Patrimonio Nacional de Colombia",
      "Historic area assessment link":
        "Enlace a la evaluación de la zona histórica",
      "Within a historic area assessment?":
        "¿Dentro de una evaluación de la zona histórica?",
      "Local list link": "Enlace a la lista local",
      "Is locally listed?": "¿Está en la lista local?",
      "Architectural Priority Area tier":
        "Nivel del área de prioridad arquitectónica",
      "Architectural Priority Area name":
        "Nombre del área de prioridad arquitectónica",
      "In an Architectural Priority Area?":
        "¿En una zona de prioridad arquitectónica?",
      "Greater London Historic Environment Record link":
        "Enlace al Registro de Bogota",
      "In the Greater London Historic Environment Record?":
        "¿En el Registro de Bogota?",
      "World heritage list id":
        "Identificación de la lista del patrimonio mundial",
      "Heritage at risk list id":
        "Identificación de la lista de patrimonio en riesgo",
      "Listing grade": "Grado de la lista",
      "National Heritage List for England list type":
        "Lista del Patrimonio Nacional de Colombia",
      "Can you help us capture information on who built the currentbuilding?":
        "Puedes ayudarnos a recolectar informacion de quien construyo el edificio seleccionado?",
      "Landowner(s) at time of construction":
        "Propietarios al momento de la construcción",
      "Year built (best estimate)": "Año de la construccion(mejor estimado)",
      "Is there an extension?": "Hay una extension?",
      "What type of developer built the building?":
        "¿Qué tipo de Desarrollador construyó el edificio?",
      "Who were the developer(s)?": "¿Quienes fueron los Desarrolladores?",
      "Source links for landowner(s)":
        "Enlace fuente acerca de los propietarios",
      "Source links for developer(s)": "Enlace fuente de los Desarrolladores",
      "Who were the main designer(s)?":
        "¿Quienes fueron los principales diseñadores?",
      "Source links for designer(s)": "Enlace fuente acerca de los diseñadores",
      "Which best describes the lead designer?":
        "¿Que describe mejor al diseñador principal?",
      "Did the design team win any awards for this building?":
        "¿Gano el equipo de diseño algun premio por el edificio?",
      "Source links for designer award(s)":
        "Enlace fuente de los premios de los diseñadores",
      "Name of builder/ construction team": "Nombre del equipo de construcción",
      "Source builder/ construction team":
        "Fuentes acerca de la constructora/equipo de construccion",
      "Other significant members of the team":
        "Otros miembros relevantes del equipo",
      "Source other significant team members":
        "Fuentes acerca de los otros miembros relevantes del equipo",

      "Current Land Use (Group)": "Uso actual del suelo (Grupo)",
      "No entries": "No existen entradas",
      "Current Land Use (Order)": "Uso actual del suelo (Orden)",

      "Floor area": "Superficie del suelo",
      Storeys: "Pisos",
      Height: "Altura",
      "Total opening area": "Area total de bienvenida",
      "Core storeys": "Plantas Principales",
      "How many storeys between the pavement and start of roof?":
        "¿Cuántos pisos hay entre el suelo y el inicio del techo?",
      "Attic storeys": "Áticos",
      "How many storeys above start of roof?":
        "¿Cuántos pisos de áticos hay sobre el inicio del techo?",
      "Basement storeys": "Sotanos",
      "How many storeys below pavement level?":
        "¿Cuántos pisos de sotano hay por debajo del nivel del pavimento?",
      "Height to apex (m)": "Altura al techo (m)",
      "Height to eaves (m)": "Altura al alero (m)",
      "Ground floor area (m²)": "Superficie de la planta baja (m²)",
      "Total floor area (m²)": "Superficie total del suelo (m²)",
      "Frontage Width (m)": "Ancho de fachada(m)",
      "View Maps": "Ver mapas",
      "Edit Maps": "Editar mapas",
      "Download data": "Descargar datos",
      "View Data Showcase": "Ver escaparate de datos",
      "Coming soon": "Proximamente",
      About: "Sobre",
      "Data Categories": "Categorías de datos",
      "Who's Involved?": "¿Quiénes participan?",
      Blog: "Blog",
      Contact: "Contacto",
      "Log in": "Iniciar sesión",
      "Sign up": "Registrarse",
      "Access open code": "Acceso al código abierto",

      "Confirm that the current value is correct":
        "Confirmar que el valor actual es correcto",
      "Edit data": "Editar datos",
      "Welcome to Colouring London. You're one of the first people to use the site!  ":
        "Bienvenido a Colouring London. ¡Eres una de las primeras personas en utilizar el sitio! ",
      "Usernames can contain only letters, numbers and the underscore":
        "Los nombres de usuario sólo pueden contener letras, números y guión bajo",
      "someone@example.com": "alguien@ejemplo.com",
      "Please note that if you forget your password, you will only be able to recover your account if you provide an email address.":
        "Tenga en cuenta que si olvida su contraseña, sólo podrá recuperar su cuenta si proporciona una dirección de correo electrónico.",
      "Confirm account deletion": "Confirmar la eliminación de la cuenta",
      "Are you sure you want to deletose your account? This cannot be undone.":
        "¿Estás seguro de que quieres eliminar tu cuenta? Esto no se puede deshacer",
      "Delete account": "Eliminar cuenta",
      "Welcome to Colouring London. You're one of the first people to sign up!  ":
        "Bienvenido a Colouring London. ¡Eres una de las primeras personas en registrarse!  ",

      "Height to apex": "Altura al ápice",
      "% data collected": "% Datos capturados",
      "Mixed Use": "Uso mixto",
      "Single use:": "Uso Único",
      "Residential (unverified)": "Residencial (no verificado)",
      "Residential (verified)": "Residencial (verificado)",
      Retail: "Comercial",
      "Industry & Business": "Industria y negocios",
      "Community Services": "Servicios comunitarios",
      "Recreation & Leisure": "Ocio y tiempo libre",
      Transport: "Transporte",
      "Utilities & Infrastructure": "Servicios e infraestructura",
      Defence: "Defensa",
      Agriculture: "Agricultura",
      Minerals: "Minerales",
      "Vacant & Derelict": "Vacío y abandonado",
      "Unclassified, presumed non-residential":
        "No clasificado, presuntamente no residencial",
      Detached: "Adosada",
      "Semi-Detached": "Semi-adosada",
      "End-Terrace": "Terraza-final",
      "Mid-Terrace": "Terraza-media",
      "Materials": "Materiales",
      'Wood': "Madera",
      Stone: "Piedra",
      Brick: "Ladrillo",
      Steel: "Acero",
      "Reinforced Concrete": "Hormigón armado",
      "Other Metal": "Otro metal",
      "Other Natural Material": "Otros materiales natural",
      "Other Man-Made Material": "Otros materiales artificiales",
      "Statutory protections": "Protecciones legales",
      "All data relating to designated buildings should be checked on the National Heritage List for England or local authority websites where used for planning or development purposes":
        "Todos los datos relativos a los edificios designados deben comprobarse en la Lista del Patrimonio Nacional o en los sitios web de las autoridades locales cuando se utilicen con fines de planificación o desarrollo",
      "In conservation area": "En zona de conservación",
      "Grade I listed": "Grado I de protección",
      "Grade II* listed": "Grado II* de protección",
      "Grade II listed": "Grado III de protección",
      "Locally listed": "Listado local",
      "CDEC Rating": "Clasificación DEC",
      "Demolished buildings on the same site":
        "Edificios demolidos en el mismo lugar",
      None: "Ninguno",
      "Like Me": "Como yo",
      "Local Significance": "Importancia local",
      "Expected planning application": "Solicitud de planificación prevista",
      "Public Ownership": "Propiedad pública",
      "People who think the building should be locally listed":
        "Las personas piensan que el edificio debería ser catalogado localmente",
      "People who think the building will be affected by a planning application in the near future":
        "Las personas creen que el edificio se verá afectado por una solicitud de planificación en un futuro próximo",
      "Is the building in some form of public/community ownership":
        "El edificio es de propiedad pública/comunitaria",
      Yes: "Si",


      "This section provides open data on building locations and building IDs.": "Esta sección proporciona datos abiertos sobre la ubicación de los edificios y sus identificadores.",
      "Can you help us capture and verify this information?": "¿Puedes ayudarnos a capturar y verificar esta información?",
      "How are buildings used, and how does use change over time?": "¿Cómo se utilizan los edificios y cómo cambia su uso con el tiempo?",
      "This section provides open data on the age of buildings and the history of buildings and sites.": "Esta sección proporciona datos abiertos sobre la edad de los edificios y la historia de los edificios y los sitios.",
      "This section provides open data on the dimensions of buildings.": "Esta sección proporciona datos abiertos sobre las dimensiones de los edificios.",
      "This section provides open data on the teams designing and constructing the buildings.": "Esta sección proporciona datos abiertos sobre los equipos que diseñan y construyen los edificios.",
      "This section provides open data on building materials and construction systems.": "Esta sección proporciona datos abiertos sobre los materiales de construcción y los sistemas de construcción.",
      "This section collects data on how well citizens think specific *types* of building work. This will help us save/reuse as many useful buildings as possible, and help improve urban design quality in future.": "Esta sección recoge datos sobre el funcionamiento de los edificios. Esto nos ayudará a salvar/reutilizar tantos edificios útiles como sea posible, y a mejorar la calidad del diseño urbano en el futuro.",
      "This section provides open data on current and anticipated planning applications for buildings, planning zones and whether the building is protected.": "Esta sección proporciona datos abiertos sobre las solicitudes de planificación actuales y previstas para los edificios, las zonas de planificación y si el edificio está protegido.",
      "This section provides open data on the energy performance of buildings, and on retrofit.": "Esta sección proporciona datos abiertos sobre el rendimiento energético de los edificios y sobre la renovación.",
      "Note: This section is currently under development, we are working to activate it as soon as possible. This section provides open data on the typology of the building.": "Nota: Esta sección está actualmente en desarrollo, estamos trabajando para activarla lo antes posible. Esta sección proporciona datos abiertos sobre la tipología del edificio.",
      "This section provides open data, and links to open data on streets, pavements, street blocks, land parcels and greenery/green spaces.": "Esta sección proporciona datos abiertos y enlaces a datos abiertos sobre calles, aceras, manzanas de calles, parcelas de tierra y espacios verdes.",
      "This section provides a tool that allows for live collection of data in disaster situations and collates data relating to building resilience.": "Esta sección proporciona una herramienta que permite la recopilación en directo de datos en situaciones de desastre y recopila datos relacionados con la resiliencia de los edificios.",   

      "Edit History": "Historia",
      "Save edits": "Guardar ediciones",
      "Discard edits": "Descartar ediciones",

      "Copy": "Copiar",
      "Copy selected": "Copiar seleccionado",
      "Cancel": "Cancelar",
      "Edit": "Editar",
      "View": "Ver",
      "View data": "Ver datos",

      "Property/footprint IDs and coordinates": "Identificadores y coordenadas de la propiedad",
      "Addresses": "Direcciones",
      
      "Building name (non-residential)": "Nombre del edificio (no residencial)",
      "Building name (domestic)": "Nombre del edificio (residencial)",
      "Building name link": "Enlace al nombre del edificio",
      "Street name": "Nombre de la calle",
      "Town/City": "Ciudad",
      "Area code/Postcode": "Código de área",
      "Source type": "Fuente",

      "Building footprint ID": "Identificador de la huella del edificio",
      "Unique Property Reference Number(s) (UPRN)": "Número(s) de referencia de la propiedad (UPRN)",
      "OpenStreetMap ID": "Identificador de OpenStreetMap",
      "Centroid latitude": "Latitud del centroide",
      "Centroid longitude": "Longitud del centroide",
      "Alternative open building footprint links":  "Enlaces alternativos a datos del edificio",

      "Hint": "",
      "Ordnance Survey Topography Layer ID (TOID)": "Identificador de la capa topográfica de Ordnance Survey (TOID)",
      "The name of the building.<br/><br/>(For security reasons, we currently only collect the names of non-residential buildings).": "El nombre del edificio.<br/><br/>(Por razones de seguridad, actualmente sólo recogemos los nombres de los edificios no residenciales).",
      "Not yet activated.<br><br>For security reasons, we do not allow the use of free text boxes and are currently looking into alternative ways to collect this data.": "Aún no activado.<br><br>Por razones de seguridad, no permitimos el uso de cuadros de texto libre y actualmente estamos buscando formas alternativas de recoger estos datos.",
      'Numbers with an optional lowercase letter are accepted, e.g. 141 or 12b': 'Se aceptan números con una letra minúscula opcional, por ejemplo, 141 o 12b',
      'Main secondary construction material/s': 'Material/es de construcción secundario/s principal/es',
      'Main roof covering': 'Cubierta principal del techo',
      'Construction sectors': 'Sectores de la construcción',
      "The vast majority of properties are residential (93% in the UK), so we have set 'residential' as the default value. Can you help us identify non-residential and mixed use buildings (and verify residential buildings too)?": 'La gran mayoría de las propiedades son residenciales (93% en el Reino Unido), por lo que hemos establecido "residencial" como valor predeterminado. ¿Puede ayudarnos a identificar los edificios no residenciales y de uso mixto (y verificar también los edificios residenciales)?',
      'Click to see residential, non-residential and mixed-use buildings on the map.': 'Haga clic para ver los edificios residenciales, no residenciales y de uso mixto en el mapa.',
      "Is the building a home/residential building?": '¿Es el edificio una casa/edificio residencial?',
      "Current land use(s)": 'Uso(s) actual(es) del suelo',
      "Current land use (order)": 'Uso actual del suelo (orden)',
      'Below is a more general classification for the land use of this building, automatically derived from the information above.': 'A continuación se muestra una clasificación más general del uso del suelo de este edificio, derivada automáticamente de la información anterior.',
      "Note: Homes used as offices for working from home should be classified as residential.": 'Nota: Las viviendas utilizadas como oficinas para trabajar desde casa deben clasificarse como residenciales.',
      "Source of residential/non-residential data": 'Fuente de datos residenciales/no residenciales',
      "Land use Groups as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)": 'Grupos de uso del suelo según Catastro Distrital',
      "Source for the current land use": 'Fuente del uso actual del suelo',
      "Land use Order as classified by [NLUD](https://www.gov.uk/government/statistics/national-land-use-database-land-use-and-land-cover-classification)": 'Orden de uso del suelo según Catastro Distrital',
      "Specific land use(s)": 'Uso(s) específico(s) del suelo',
      "General Land Use": 'Uso general del suelo',
      "Adjacency and building use data": 'Datos de adyacencia y uso del edificio',
      "Attachment type/adjacency": 'Tipo de adjunto/adyacencia',
      "Source link": 'Enlace a la Fuente',
      "Building typology and classification data": 'Datos de tipología y clasificación de edificios',
      "Dynamic tissue type classification": 'Clasificación dinámica del tipo de tejido',
      "Core number of floors": 'Número de pisos principales',
      "Number of floors within roof space": 'Número de pisos dentro del espacio del techo',
      "Number of floors beneath ground Level": 'Número de pisos por debajo del nivel del suelo',
      "Total number of floors": 'Número total de pisos',
      "Land parcel geometry link": 'Enlace a la geometría del lote de tierra',
      "Number of floors/storeys": 'Número de pisos',
      "Plot size": 'Tamaño del lote',
      "Frontage width (m)": 'Ancho de fachada (m)',

      "Source of building height (apex) data": 'Fuente de datos de altura del edificio (ápice)',
      "Source of building height (eaves) data": 'Fuente de datos de altura del edificio (alero)',
      "Source of floor area data": 'Fuente de datos de superficie del suelo',
      "Source of building frontage data": 'Fuente de datos de fachada del edificio',
      "Source of plot area data": 'Fuente de datos de superficie del lote',
      "INSPIRE Polygons": 'Polígonos IDECA',
      "Source of parcel geometry data": 'Fuente de datos de geometría del lote',
      "boobs": "boobs",

      "Building age": 'Edad del edificio',
      "Cladding, extensions and retrofits": 'Revestimiento, extensiones y renovaciones',
      "Lifespan and site history": 'Vida útil e historia del sitio',
      "Survival tracking": 'Seguimiento de la supervivencia',
      "Historical map data options": 'Opciones de datos de mapas históricos',

      "Year of construction of main building (best estimate)": 'Año de construcción del edificio principal (mejor estimación)',
      "Earliest possible start year": 'Posible año de inicio (más antiguo)',
      "Date of front of building (best estimate)": 'Fecha de la fachada del edificio (mejor estimación)',
      "Year of completion (best estimate)": 'Año de finalización (mejor estimación)',
      "Cladding date (best estimate)": 'Fecha de revestimiento (mejor estimación)',
      "Date of significant extensions (best estimate)": 'Fecha de ampliaciones significativas (mejor estimación)',
      "Date of significant retrofit (best estimate)": 'Fecha de renovación significativa (mejor estimación)',
      "Date of last significant retrofit (best estimate)": 'Fecha de la última renovación significativa (mejor estimación)',
      "Survival status": 'Estado de supervivencia',
      "Historical maps links": 'Enlaces a mapas históricos',
      "Extracted vectorised historical footprints links": 'Enlaces a trazas históricas vectorizadas',
      "Click here to hide historical maps": 'Ocultar los mapas históricos',
      "Click here to show historical maps": 'Mostrar los mapas históricos',
      "Constructions and demolitions on this site": 'Construcciones y demoliciones en este sitio',
      "Current building (age data": 'Edad actual del edificio',
      "editable here": 'Editar',
      "Construction year": 'Año de construcción',
      "Demolition year": 'Año de demolición',
      "Lifespan to date": 'Vida útil',
      "To add historical records, fill in the age data first.": 'Para añadir registros históricos, primero rellene los datos de edad.',
      "Can you help us create a map that shows how many buildings in London have survived since the 1890s?. Choose a colour to indicate whether the building has survived.": '¿Puede ayudarnos a crear un mapa que muestre cuántos edificios han sobrevivido desde la década de 1890? Elija un color para indicar si el edificio ha sobrevivido.',
      "Best estimate for construction of main body of the building.": 'Mejor estimación para la construcción del cuerpo principal del edificio.',
      "This should be the earliest year in which construction could have started.": 'Este debería ser el año más temprano en el que podría haber comenzado la construcción.',
      "This should be the latest year in which building could have started.": 'Este debería ser el año más tardío en el que podría haber comenzado la construcción.',
      "Best estimate": 'Mejor estimación',
      "Source type for the building dates above": 'Fuente de las fechas de construcción anteriores',
      "Coming Soon": 'Próximamente',
      "This field is the same as 'Year built (best estimate)' in the Age category'": 'Este campo es el mismo que "Año de construcción (mejor estimación)" en la categoría de Edad',
      "Source type for age retrofit data": 'Fuente de los datos de renovación de la edad',
      "Source type for age cladding data": 'Fuente de los datos de revestimiento de la edad',
      "Survival and Loss tracked using Historical Maps": 'Supervivencia y pérdida rastreadas utilizando mapas históricos',
      "Source for the survival status": 'Fuente del estado de supervivencia',
      "Links to rasterised historical maps": 'Enlaces a mapas históricos rasterizados',
      "This section provides links to open digitised historical maps/mapping data that we are using in the Colouring Cities platform.": 'Esta sección proporciona enlaces a mapas históricos digitales abiertos que estamos utilizando en la plataforma Colouring Cities.',
      "This section is under development": 'Esta sección está en desarrollo',
      "Green Space": 'Espacio verde',
      "Does the building have a front garden?": '¿Tiene el edificio un jardín delantero?',
      "Does the building have a back garden?": '¿Tiene el edificio un jardín trasero?',
      "Are flats with a dedicated green space?": '¿Hay pisos con espacio verde dedicado?',
      "Distance to nearest green space (m)": 'Distancia al espacio verde más cercano (m)',
      "Distance to nearest tree (m)": 'Distancia al árbol más cercano (m)',
      "Street/pavement": 'Calle/andén',
      "Walkability Index": 'Índice de peatonalización',
      "Average street width (m)": 'Ancho medio de la calle (m)',
      "Average pavement width (m)": 'Ancho medio del andén (m)',
      "Number of entrances facing street": 'Número de entradas que dan a la calle',
      "Under development": 'En desarrollo',
      "Source type for tree data": 'Fuente de los datos',
      "Link to a website with the name of the building...": 'Enlace a un sitio web con el nombre del edificio...',
      "Source type for pavement width data": 'Fuente de los datos de ancho del andén',
      "Average width of the pavement in metres.": 'Ancho medio del andén en metros.',
      "Source type for street width data": 'Fuente de los datos de ancho de la calle',
      "Average width of the street in metres.": 'Ancho medio de la calle en metros.',
      "Approximate distance from the front door of the building to the nearest tree in meters.": 'Distancia aproximada desde la puerta principal del edificio hasta el árbol más cercano en metros.',
      "Source type for garden data": 'Fuente de los datos de jardín',
      "If the building is a block of flats, does it have a dedicated garden area/green space?": 'Si el edificio es un bloque de pisos, ¿tiene un área de jardín/espacio verde dedicado?',
      "Is the back garden mainly green/planted?": '¿Es el jardín trasero principalmente verde?',
      "Is the front garden mainly green/planted?": '¿Es el jardín delantero principalmente verde?',
      "Verify": 'Verificar',
      "Remove": 'Eliminar',
      "Verified as": 'Verificado',
      "tick to add or remove your edit": 'marque para añadir o eliminar su edición',
      
      "General info": 'Información general',
      "Does this information relate to the original main building?": '¿Esta información se refiere al edificio principal original?',
      'If the data in this section relates to the original main building, select "yes". If the data relates to a later extension/ redevelopment, select "no".': 'Si los datos de esta sección se refieren al edificio principal original, seleccione "sí". Si los datos se refieren a una ampliación/reurbanización posterior, seleccione "no".',

      "Land ownership": 'Propietarios',
      "Landowner link(s)": 'Enlace(s) del propietario',
      "Land owner when the building was constructed.<br/><br/>Free-text entry disabled for security reasons.<br/><br/>For info on current land ownership, see 'Planning Controls'.": 'Propietario de la tierra cuando se construyó el edificio.<br/><br/>Entrada de texto libre desactivada por razones de seguridad.<br/><br/>Para obtener información sobre la propiedad actual de la tierra, consulte "Controles de planificación".',
      "Link(s) to webpage(s) explaining who owned the land when when the building was built.": 'Enlace(s) a página(s) web que explican quién era el propietario de la tierra cuando se construyó el edificio.',
      "Source type for landowner data": 'Fuente de los datos del propietario de la tierra',
      "Developer": 'Ejecutor',
      "Name(s) of the building's developers.<br/><br/>Free-text entry disabled for security reasons.": 'Nombre(s) de los ejecutores del edificio.<br/><br/>Entrada de texto libre desactivada por razones de seguridad.',
      "Developer link(s)": 'Enlace(s) del constructor',
      "Link(s) to webpage(s) explaining who developed the building.": 'Enlace(s) a página(s) web que explican quién construyó el edificio.',
      "Source type for developer data": 'Fuente de los datos del desarrollador',
      "Designer": 'Diseñador',
      "Designer link(s)": 'Enlace(s) del diseñador',
      "Link(s) to webpage(s) explaining who designed the building.": 'Enlace(s) a página(s) web que explican quién diseñó el edificio.',
      "Which title best describes the lead designer?": '¿Qué título describe mejor al diseñador principal?',
      "Source type for designer data": 'Fuente de los datos del diseñador',
      "Builder": 'Constructor',
      "Name of builder/construction team.": 'Nombre del constructor/equipo de construcción.',
      "Free-text entry disabled for security reasons.": 'Entrada de texto libre desactivada por razones de seguridad.',
      "Builder link(s)": 'Enlace(s) del constructor',
      "Link(s) to webpage(s) explaining who built the building.": 'Enlace(s) a página(s) web que explican quién construyó el edificio.',
      "Source type for builder data": 'Fuente de los datos del constructor',
      "Awards": 'Premios',
      "Has the building won any awards?": '¿El edificio ha ganado algún premio?',

      "Residential building": 'Edificio residencial',
      "Residential": 'Residencial',
      "Mixed": 'Mixto',
      "Non-residential": 'No residencial',

      "Adjacency/Configuration": 'Adyacencia/Configuración',

      "All planning applications available from GLA (official data)": 'Todas las solicitudes de planificación disponibles en Catastro Distrital(datos oficiales)',
      "The last 12 months - planning applications submissions/decisions (official data)": 'Los últimos 12 meses - presentación de solicitudes de planificación/decisiones (datos oficiales)',
      "Last 30 days - planning applications submissions/decisions (official data)": 'Últimos 30 días - presentación de solicitudes de planificación/decisiones (datos oficiales)',
      "Expected planning applications (crowdsourced data)": 'Solicitudes de planificación previstas (datos colaborativos)',
      "Designation/protection (official and crowdsourced data)": 'Designación/protección (datos oficiales y colaborativos)',
      "The map shows official data available from the GLA Planning London Datahub. What you are looking at is mainly applications from 2019 onwards.": 'El mapa muestra datos oficiales abiertos disponibles en el IDECA.',
      "Submitted, awaiting decision": 'Presentado, a la espera de decisión',
      "Appeal In Progress": 'Apelación en curso',
      "Approved": 'Aprobado',
      "Rejected": 'Rechazado',
      "Withdrawn": 'Retirado',
      "Other": 'Otro',
      "DEC Rating": 'Clasificación DEC',

      "Severity of damage": 'Gravedad de los daños',
      "Severity of damage to building": 'Gravedad de los daños al edificio',
      "Building destroyed": 'Edificio destruido',
      "Very severe": 'Muy grave',
      "Severe": 'Grave',
      "Moderate": 'Moderado',
      "Minimal": 'Mínimo',
      "No damage visible": 'Sin daños visibles',

      "Liked non-residential buildings": 'Me gusta a edificios no residenciales',
      "Local Interest": 'Interés local',
      "Expected planning applications": 'Solicitudes de planificación previstas',
      "People who think the building is of a local interest": 'Personas que piensan que el edificio es de interés local',
      "Sites identified by users as likely to be subject to planning application over the next six months": 'Sitios identificados por los usuarios como susceptibles de ser objeto de una solicitud de planificación en los próximos seis meses',

      "This section provides data on active applications. We define these as applications with any activity in the last year.": 'Esta sección proporciona datos sobre las solicitudes activas. Las definimos como solicitudes con cualquier actividad en el último año.',
      "To comment on an application follow the application link if provided, or visit the relevant local authority's planning page.": 'Para comentar una solicitud, siga el enlace de la solicitud si está disponible, o visite la página de planificación de la autoridad local correspondiente.',
      "Only past application data is currently available for this site": 'Actualmente sólo están disponibles los datos de las solicitudes anteriores para este sitio',
      "No live planning data are currently available for this building from the Planning London Datahub.": 'Actualmente no hay datos de planificación en directo disponibles para este edificio en el IDECA.',
      "If you feel there are incorrect or missing data relating to this building please contact: planningdata@London.gov.uk": 'Si cree que hay datos incorrectos o que faltan relacionados con este edificio, póngase en contacto con: ideca@ideca.gov.co', 
      "This section provides data on past applications where available from the GLA, including those with no decision in over a year": 'Esta sección proporciona datos sobre las solicitudes anteriores cuando están disponibles en el IDECA, incluyendo aquellas sin decisión en más de un año',
      "This section is designed to provide information on land parcels and their ownership type. Can you help us collect this information?": 'Esta sección está diseñada para proporcionar información sobre los lotes de tierra y su tipo de propiedad. ¿Puede ayudarnos a recopilar esta información?',
      "Click and colour buildings here if you think they may be subject to a future planning application involving demolition. To add your opinion on how well this building works, please also visit the": 'Haga clic y colorea los edificios aquí si cree que pueden estar sujetos a una futura solicitud de planificación que implique la demolición. Para añadir su opinión sobre el funcionamiento de este edificio, visite también el',
      'Click here to view possible locations of future applications': 'Ver posibles ubicaciones de futuras solicitudes',
      'Click to see planning applications': 'Haga clic para ver las solicitudes de planificación',
      "To view planning zone data for London click the buttons below. You may need to zoom out Information on whether a specific building is in a zone will be added automatically in future.": 'Para ver los datos de la zona de planificación de Londres, haga clic en los botones de abajo. Es posible que tenga que alejarse. La información sobre si un edificio específico está en una zona se añadirá automáticamente en el futuro.',
      "Is the building in a Creative Enterprise Zone?": '¿Está el edificio en una zona de empresas creativas?',
      "Current planning applications": 'Solicitudes de planificación actuales',
      "Past applications": 'Solicitudes anteriores',
      "Possible future applications": 'Posibles solicitudes futuras',
      "Planning zones": 'Zonas de planificación',
      "Heritage assets and building protection": 'Patrimonio y protección de edificios',
      "Official data": 'Datos oficiales',
      "Year of completion": 'Año de finalización',
      "Was the building completed?": '¿Se completó el edificio?',
      "Incomplete/missing data": 'Datos incompletos/faltantes',
      "Is information on a planning application relating to this building missing?": '¿Falta información sobre una solicitud de planificación relacionada con este edificio?',
      "Link (to correct data)": 'Enlace (para corregir los datos)',
      "Further improvements to this feature are currently being made.": 'Actualmente se están realizando mejoras en esta función.',
      "Do you think that this building may be subject to a planning application, involving demolition, over the next six months?": '¿Cree que este edificio puede estar sujeto a una solicitud de planificación, que implique la demolición, en los próximos seis meses?',
      "Is the building in a Housing Zone?": '¿Está el edificio en una zona de vivienda?',
      "Is the building within a Protected Vista?": '¿Está el edificio dentro de una vista protegida?',
      'Help us produce the most accurate map possible for London\'s designated/protected buildings. Please add data if missing or click "Verify" where entries are correct.': 'Ayúdenos a producir el mapa más preciso posible de los edificios designados/protegidos de Bogotá. Por favor, añada datos si faltan o haga clic en "Verificar" donde las entradas son correctas.',

      "If the building is on a national heritage register, please add the ID:": 'Si el edificio está en un registro nacional de patrimonio, por favor añada el ID:',
      "What is its protection rating?": '¿Cuál es su clasificación de protección?',
      "If the building is on a heritage at risk register, please add the ID:": 'Si el edificio está en un registro de patrimonio en riesgo, por favor añada el ID:',
      "If the building is on a <a href=\"https://historicengland.org.uk/advice/hpg/has/whs/\" target=\"_blank\">World Heritage Site</a> please add the ID:": 'Si el edificio está en un <a href=\"https://historicengland.org.uk/advice/hpg/has/whs/\" target=\"_blank\">Sitio del Patrimonio Mundial</a> por favor añada el ID:',
      "Is the building a locally listed heritage asset?": '¿Es el edificio un bien patrimonial catalogado localmente?',
      "Is the building in a conservation area?": '¿Está el edificio en una zona de conservación?',
      "Is the building in an area of archaeological priority?": '¿Está el edificio en un área de prioridad arqueológica?',
      "Does it have any other type of designation?": '¿Tiene algún otro tipo de designación?',

      "Please add relevant link here": 'Por favor, añada aquí el enlace relevante',
      "Source Type": 'Tipo de fuente',
      "Click to show sample land parcel data": 'Mostrar datos de muestra del lote',
      "Click to see Flood Zones mapped": 'Ver las zonas de inundación',
      "Click to see Housing Zones mapped": 'Ver las zonas de vivienda',
      "Click to see Creative Enterprise Zones": 'Ver las zonas de empresas creativas',
      "Click to see Protected Vistas": 'Ver las vistas protegidas',
      "Click to see individual protected buildings mapped": 'Ver los edificios protegidos',
      "Click to see Conservation Areas": 'Ver las zonas de conservación',
      "add ID here": 'añadir ID',
      "the GLA official description: \"All areas with more than a 1 in 1,000 annual probability of either river or sea flooding.\"": '"Todas las áreas con más de 1 probabilidad anual de inundación fluvial o marina de 1.000".',
      "the GLA official description: \"Housing zones are areas funded by the Mayor and government to attract developers and relevant partners to build new homes.\"": 'la descripción oficial del IDECA: "Las zonas de vivienda son áreas financiadas por el Alcalde y el gobierno para atraer a los desarrolladores y socios pertinentes para construir nuevas viviendas".',
      "GLA official description: \"Creative Enterprise Zones are a new Mayoral initiative to designate areas of London where artists and creative businesses can find permanent affordable space to work; are supported to start-up and grow; and where local people are helped to learn creative sector skills and find new jobs.\"": '"Las Zonas de Empresas Creativas son una nueva iniciativa para designar áreas donde los artistas y las empresas creativas pueden encontrar un espacio permanente y asequible para trabajar; son apoyados para iniciar y crecer; y donde la gente local es ayudada a aprender habilidades del sector creativo y encontrar nuevos empleos".',
      "GLA official description: \"The Protected Vistas are established in the London Plan with more detailed guidance provided in the London View Management Framework (LVMF). The London Plan seeks to protect the significant views which help to define London, including the panoramas, linear views and townscape views in this layer.\"": '"Las vistas protegidas están establecidas en el Plan de Londres con una guía más detallada proporcionada en el Marco de Gestión de Vistas de Londres (LVMF). El Plan de Londres busca proteger las vistas significativas que ayudan a definir Londres, incluyendo los panoramas, las vistas lineales y las vistas del paisaje urbano en esta capa".',

      "Environmental quality rating": 'Calificación de la calidad ambiental',
      "Official environmental quality rating": 'Calificación oficial de la calidad ambiental',
      "Energy rating": 'Calificación energética',
      "Residential energy rating": 'Calificación energética residencial',
      "Non-residential Building Energy Rating": 'Calificación energética de edificios no residenciales',
      "Display Energy Certificate (DEC) Any public building should have (and display) a DEC. Showing how the energy use for that building compares to other buildings with same use": 'Certificado de Eficiencia Energética (DEC) Cualquier edificio público debe tener (y mostrar) un DEC. Mostrando cómo el uso de energía para ese edificio se compara con otros edificios con el mismo uso',
      "Residential Building Energy Rating": 'Calificación energética de edificios residenciales',
      "Energy Performance Certificate (EPC) Any premises sold or rented is required to have an EPC to show how energy efficient it is. Only buildings rate grade E or higher may be rented": 'Certificado de Eficiencia Energética (EPC) Cualquier local vendido o alquilado debe tener un EPC para mostrar lo eficiente que es en el uso de la energía. Sólo los edificios con una calificación de grado E o superior pueden ser alquilados',
      "Retrofit history": 'Historial de renovación',
      "Solar panels": 'Paneles solares',
      "Does the building have solar panels?": '¿El edificio tiene paneles solares?',
      "Are there any kinds of solar panels on the roof of the building?": '¿Hay algún tipo de paneles solares en el techo del edificio?',
      "Does the building have green walls/green roof?": '¿El edificio tiene paredes verdes/techo verde?',
      "Are there any green walls, or a green roof, on the building?": '¿Hay alguna pared verde, o un techo verde, en el edificio?',
      "Green walls/roof": 'Paredes/techo verde',
      "Date of disaster": 'Fecha del desastre',
      "This feature is designed as an assessment tool to help communities capture data on the state of buildings following major disasters. ": 'Esta función está diseñada como una herramienta de evaluación para ayudar a las comunidades a capturar datos sobre el estado de los edificios después de los principales desastres.',
      "It is intended to help support emergency services, to record damage, and to aid reconstruction programmes.": 'Su objetivo es ayudar a los servicios de emergencia, a registrar los daños y a ayudar a los programas de reconstrucción.',
      "Building damage assessment tool": 'Herramienta de evaluación de daños en edificios',
      "This feature is designed as an assessment tool to help communities capture data on the state of buildings following major disasters. It is intended to help support emergency services, to record damage, and to aid reconstruction programmes.": 'Esta función está diseñada como una herramienta de evaluación para ayudar a las comunidades a capturar datos sobre el estado de los edificios después de los principales desastres. Su objetivo es ayudar a los servicios de emergencia, a registrar los daños y a ayudar a los programas de reconstrucción.',
      "Date of disaster:": 'Fecha del desastre:',
      "Disaster type": 'Tipo de desastre:',
      "What type of disaster management do you wish to collect data for?": '¿Qué tipo de gestión de desastres desea recopilar datos?',
      "How severe do you assess the damage to be?": '¿Qué tan grave considera que es el daño?',
      "Best estimate for the severity of damage to the building.": 'Mejor estimación de la gravedad de los daños al edificio.',
      "Please add a Best estimate for the severity of damage to the building": 'Fuente principal de los datos',
      "Resilience indicators and risk assessment": 'Indicadores de resiliencia y evaluación de riesgos',
      "This section is under development.": 'Esta sección está en desarrollo.',
      "Typical typology lifespan": 'Vida útil típica de la tipología',
      "Typology adaptability rating": 'Calificación de adaptabilidad de la tipología',
      "Physical adaptability rating - within plot": 'Calificación de adaptabilidad física - dentro del lote',
      "Landuse adaptability rating": 'Calificación de adaptabilidad del uso del suelo',
      "Structural material lifespan rating": 'Calificación de la vida útil del material estructural',
      "Protection from demolition rating": 'Calificación de protección contra la demolición',
      "Flood risk rating": 'Calificación de riesgo de inundación',
      "Surface geology type": 'Tipo de geología superficial',
      "Average community value rating for typology": 'Calificación media del valor comunitario para la tipología',
      "Other ratings": 'Otras calificaciones',
      "Total resilience rating": 'Calificación total de resiliencia',    
      
      "Here we are collecting information on the location of buildings used for community activities so we can track loss of/additions to community space over time.": 'Aquí estamos recopilando información sobre la ubicación de los edificios utilizados para actividades comunitarias para que podamos realizar un seguimiento de la pérdida de/adiciones al espacio comunitario con el tiempo.',
      "For more information on current planning applications, refer to the Planning Controls category.": 'Para obtener más información sobre las solicitudes de planificación actuales, consulte la categoría de Controles de Planificación.',
      "Note: We are currently only collecting data on non-residential buildings.": 'Nota: Actualmente sólo estamos recopilando datos sobre edificios no residenciales.',
      "Community views on how well buildings work": 'Opiniones de la comunidad sobre el funcionamiento de los edificios',
      "Do you think this type of building contributes to the city?": '¿Cree que este tipo de edificio contribuye a la ciudad?',
      "Do you think this building should be recorded as being of special local interest?": '¿Cree que este edificio debería ser registrado como de especial interés local?',
      "Buildings in community use": 'Edificios en uso comunitario',
      "Is this building currently used for community activities?": '¿Se utiliza actualmente este edificio para actividades comunitarias?',
      "E.g. youth club, place of worship, GP surgery, pub": 'Por ejemplo, club juvenil, lugar de culto, consulta de médico de cabecera, pub',
      "If not been used for community activities in the past?": '¿Si no se ha utilizado para actividades comunitarias en el pasado?',
      "If in community use now, has it always been used for community activities?": 'Si está en uso comunitario ahora, ¿siempre se ha utilizado para actividades comunitarias?',
      "Click to return to liked typologies mapped.": 'Volver a las tipologías mapeadas.',
      "Click here to change map to buildings of local interest.": 'Cambiar el mapa a los edificios de interés local.',
      "Click here to change map to planning applications expected by community.": 'Cambiar el mapa a solicitudes de planificación previstas.',
      "Click here to see ownership type mapped.": 'Ver tipos de propiedad mapeadas',
      "Show layer options": 'Mostrar opciones de capa',
      "Switch theme": 'Cambiar tema',
      "Light": 'claro',
      "Night": 'nocturno',

      "Borough Boundaries on": 'Ocultar límites de la ciudad',
      "Borough Boundaries off": 'Ver límites de la ciudad',

      'Housing Zones off': 'Ver zonas de vivienda',
      'Housing Zones on': 'Ocultar zonas de vivienda',

      "Creative Enterprise Zones off": 'Ver zonas de empresas creativas',
      "Creative Enterprise Zones on": 'Ocultar zonas de empresas creativas',

      "Flood Zones off": 'Ver zonas de inundación',
      "Flood Zones on": 'Ocultar zonas de inundación',

      "Protected Vistas off": 'Ver vistas protegidas',
      "Protected Vistas on": 'Ocultar vistas protegidas',

      "Conservation Areas off": 'Ver zonas de conservación',
      "Conservation Areas on": 'Ocultar zonas de conservación',

      "The OS 1890s Historical Map on": 'Ocultar el mapa histórico',
      "The OS 1890s Historical Map off": 'Ver el mapa histórico',

      "Parcel overlay (sample) off": 'Ver superposición (muestra)',
      "Parcel overlay (sample) on": 'Ocultar superposición (muestra)',


    },
  },
};

if (typeof window !== "undefined") {
  i18n.use(i18nextPlugin);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;