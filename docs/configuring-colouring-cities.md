# Configuring the Colouring Cities Core Platform

## Introduction

We have added new configuration options to the Colouring Cities Core Platform, in order to make it easier to customise the platform for different cities/countries without unnecessary custom code and diverging codebases. 

This is done using configuration files, which are described in detail later in this document.  

Our hope is that every project in the Colouring Cities Research Programme (CCRP) will use this method to customise the interfaces of the Colouring Cities Platform for their own use as the programme moves forwards.
  
## The Config Files
The configuration files are located here:  

`app/src/cc-config.ts`  
`app/src/cc-config.json`  

### > cc-config.json
The JSON file contains the definition of the values of the variables. 

Currently, these parameters include:

- **'cityName'** (string) - The name of the city/country. 
- **'projectBlurb'** (string) - A line of text describing the relationship of the project to the CCRP
- **'githubURL'** (string) - The URL of the *project specific* GitHub repository
- **'privacyStatement'** (string) - A description of where user data is stored and what safeguards are in place

These text strings are then used at various points throughout the Platform's interface.

There are also some other values to customise the behaviour of the application:

- **'initialMapPosition'** (string) - The default latitude and longitude of the map when the page loads. 
- **'initialZoomLevel'** (string) - The default zoom level when the map loads. 
- **'basemapTileUrl'** (string) - URL of basemap, in format accepted by Leaflet, shown under any displayed features. Note that default one is using external servers with own [Usage Policy](https://operations.osmfoundation.org/policies/tiles/) - please review it.
- **'baseAttribution'** (string) - basic attribution, in format accepted by Leaflet, should include basemap attribution, attribution for work of Colouring platform contributors and likely also attribute source of building geometries. Default `baseAttribution` always needs to be edited, though it contains part of required attribution for attribute data and default basemap.

For example, the [JSON file for Colouring London](https://github.com/colouring-cities/colouring-london/blob/master/app/src/cc-config.json) looks like this:

```json
{
    "cityName": "London",
    "projectBlurb": "Colouring London is also the prototype for the Colouring Cities Research Programme (CCRP)",
    "githubURL": "https://github.com/colouring-cities/colouring-london",
    "privacyStatement": "Colouring London stores your data at The Alan Turing Institute in London behind the organisation’s firewall in a secure database using industry standard practices",

    "initialMapPosition": [ 51.5245255, -0.1338422 ],
    "initialZoomLevel": 16,

    "postcode": "Postcode",
    "energy_rating": "Building Research Establishment Environmental Assessment Method (BREEAM) rating"
}
```

### > cc-config.ts
This file contains the declaration of the variables that can be configured. 

If you want to add additional parameters into the configuration framework, then they will need to be declared in this file and then defined in the JSON file (see below).
  
---
  
**NOTE: Any additional project specific text strings and parameters should be added to this file and the JSON file.**

*REQUEST: If you find any London-specific text or values, please report them or create a pull request to move them into the configuration framework.*
