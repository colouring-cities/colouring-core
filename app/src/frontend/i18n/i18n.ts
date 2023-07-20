import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to Colouring London!": "Welcome to Colouring London!",
      "Welcome First Paragraph":
        "Colouring London is a free knowledge exchange platform designed to provide over fifty types of open data on London buildings, to help make the city more sustainable.",
      "Welcome Second Paragraph":
        "Colouring London is also the prototype for the Colouring Cities Research programme based at the Alan Turing Institute (the UK's national Institute for data science and artificial intelligence). The programme works with local, regional, national and international partners to develop open platform code also of relevance to other cities.",
      "Welcome Third Paragraph":
        "New datasets and features are added all the time. Any help you can give, colouring-in our building maps, and enriching and verifying our open datasets is very much appreciated.",
      welcome_fourth_paragraph:
        "All our <1>data</1> and <3>code</3> are free to download, use and share under our open licence terms.",
      "Start Colouring Here!": "Start Colouring Here!",
    },
  },
  es: {
    translation: {
      "Welcome to Colouring": "Bienvenido a Colouring",
      "Welcome First Paragraph":
        "Colouring Cities es una plataforma gratuita de intercambio de conocimientos diseñada para ofrecer más de cincuenta tipos de datos abiertos sobre los edificios alrededor del mundo, con el fin de contribuir a que las ciudades sean más sostenibles.",
      "Welcome Second Paragraph":
        "Colouring Cities es también un programa de investigación, con sede en el Instituto Alan Turing (el instituto nacional del Reino Unido para la ciencia de los datos y la inteligencia artificial). El programa trabaja con socios locales, regionales, nacionales e internacionales para desarrollar un código de plataforma abierta que también sea relevante para otras ciudades.",
      "Welcome Third Paragraph":
        "Continuamente se añaden nuevos conjuntos de datos y características. Cualquier ayuda que pueda prestar, coloreando nuestros mapas de edificios y enriqueciendo y verificando nuestros conjuntos de datos abiertos, será muy apreciada.",
      welcome_fourth_paragraph:
        "Todos nuestros <1>datos</1> y <3>código</3> pueden descargarse, utilizarse y compartirse libremente con arreglo a las condiciones de nuestra licencia abierta.",
      "Start Colouring Here!": "¡Empieza a colorear tu ciudad!",
      Age: "Edad",
      Location: "Localización",
      "Land Use": "Uso",
      Type: "Tipo",
      Size: "Tamaño",
      Construction: "Construcción",
      "Street Context": "Paisaje Urbano",
      Team: "Constructor",
      Planning: "Planificación",
      Sustainability: "Sustentabilidad",
      Dynamics: "Mutaciones",
      Community: "Comunidad",
      "Select a building to view data":
        "Seleccione un edificio para ver los datos",
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
      "Total area of plot (m²)": "Superficie total de la parcela (m²)",
      "FAR ratio (percentage of plot covered by building)":
        "porcentaje de la parcela cubierto por el edificio",
      "Plot dimensions": "Dimensiones de la parcela",
      "Plot geometry link": "Enlace de la geometría de la parcela",
      "Land ownership parcel link":
        "Enlace de la parcela de propiedad de la tierra",
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
      "Ordnance Survey terms of UPRN usage":
        "Términos de uso de UPRN de Ordnance Survey",
      "Building information (link)": "Informacion de Construccion (link)",
      "Building number": "Número del Edificio",
      Street: "Calle",
      "Address line 2": "Segunda Direccion",
      Town: "Ciudad",
      Postcode: "Codigo Postal",
      Latitude: "Latitud",
      Longitude: "Longitud",
      "Core Material": "Material Principal",
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
      Wood: "Madera",
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