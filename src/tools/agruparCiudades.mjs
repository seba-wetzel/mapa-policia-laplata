//Este script es exclusivo para el archivo casos.json, objeto creado a partir de un excel propio.
//El objetivo de este script es reemplazar los nombres de las ciudades por los nombres de las localidades de la ciudad de La Plata, y agregar las coordenadas de cada localidad.
//No es un documento generico ni reutilizable, es un script que se utilizo para un caso especifico.

const { default: casos } = await import("../data/casos.json", {
  assert: {
    type: "json",
  },
});

import { writeFileSync } from "fs";

const replacer = {
  "LA PLATA": "LA PLATA",
  "RINGUELET - LA PLATA": "RINGUELET",
  "BOSQUES - LA PLATA": "BOSQUES",
  "OLMOS - LA PLATA": "OLMOS",
  "VILLA ELISA - LA PLATA": "VILLA ELISA",
  "MELCHOR ROMERO - LA PLATA": "MELCHOR ROMERO",
  "LOS HORNOS - LA PLATA": "LOS HORNOS",
  "ARANA - LA PLATA": "ARANA",
  "TOLOSA - LA PLATA": "TOLOSA",
  "LA PLATA - VILLA ARGÜELLO": "VILLA ARGÜELLO",
  "CITY BELL - LA PLATA": "CITY BELL",
  "GORINA - LA PLATA": "GORINA",
  "LA PLATA - OLMOS": "OLMOS",
  "LA PLATA - MELCHOR ROMERO": "MELCHOR ROMERO",
  "LA PLATA - ARTURO SEGUÍ": "ARTURO SEGUÍ",
  "VILLA ELVIRA - LA PLATA": "VILLA ELVIRA",
  "LA PLATA - TOLOSA": "TOLOSA",
  "EL PELIGRO - LA PLATA": "EL PELIGRO",
  "Arana Subcomisaría ARANA - LA PLATA": "ARANA",
  "GONNET - LA PLATA": "GONNET",
};

const coordenadas = {
  "LA PLATA": ["-34.9188448", "-57.9638639"],
  RINGUELET: ["-34.8856132", "-57.9947812"],
  BOSQUES: ["-34.8267859", "-58.244307"],
  OLMOS: ["-35.0057117", "-58.0853962"],
  "VILLA ELISA": ["-34.8606563", "-58.1167189"],
  "MELCHOR ROMERO": ["-34.9471028", "-58.0836601"],
  "LOS HORNOS": ["-34.978664", "-58.0090524"],
  ARANA: ["-35.002055", "-57.8880397"],
  TOLOSA: ["-34.8999454", "-58.0012147"],
  "VILLA ARGÜELLO": ["-34.9148288", "-57.9512791"],
  "CITY BELL": ["-34.8921021", "-58.087262"],
  GORINA: ["-34.9066342", "-58.058456"],
  "ARTURO SEGUÍ": ["-34.9190538", "-58.1905151"],
  "VILLA ELVIRA": ["-34.9521704", "-57.9090195"],
  "EL PELIGRO": ["-34.947389", "-58.2019404"],
  GONNET: ["-34.8933051", "-58.0525686"],
};

const casosCiudadesReemplazadas = casos.map((caso) => {
  const Ciudad = replacer[caso["Ciudad"]];
  return { ...caso, Ciudad };
});

const casosConCoordenadas = casosCiudadesReemplazadas.map((caso) => {
  const ciudad = caso["Ciudad"];
  const [lat, lng] = coordenadas[ciudad] || ["", ""];
  return {
    ...caso,

    coordinates: [lng, lat],
  };
});

//Por el momento voy a generar un geojson con los datos, despues se va a hacer una api que devuelva los datos en formato geojson

const header = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84",
    },
  },
};

const features = casosConCoordenadas.map((caso) => {
  const { coordinates, ...properties } = caso;
  return {
    type: "Feature",
    properties,
    geometry: {
      type: "Point",
      coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
    },
  };
});

const CASOS_GEOJSON = {
  ...header,
  features,
};

writeFileSync("../data/geo/casos.json", JSON.stringify(CASOS_GEOJSON, null, 2));
