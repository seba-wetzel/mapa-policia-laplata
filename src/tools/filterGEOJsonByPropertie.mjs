/*
Este script se creo para poder individualizar un municipio de la provincia de Buenos Aires
a partir de un archivo geojson que contiene todos los municipios de la provincia.
Esta archivo se consigue en la pagina de datos abiertos de la provincia de Buenos Aires
https://catalogo.datos.gba.gob.ar/id/dataset/partidos/archivo/2cc73f96-98f7-42fa-a180-e56c755cf59a

Ejemplo de uso (cde=06441 es el codigo de La Plata):
node ./tools/filterGEOJsonByPropertie.mjs  --filter="cde=06441" --input=./geo/raw/limite_partidos.geojson --output=./geo/seccionales_la-plata.geojson
*/

/*
Este script tambien se puede utilizar para poder individualizar un comisarias de un solo municipio de 
la provincia de Buenos Aires a partir de un archivo geojson que contiene todas las comisarias de la provincia.
Esta archivo se consigue en la pagina de datos abiertos de la provincia de Buenos Aires
https://catalogo.datos.gba.gob.ar/id/dataset/comisarias/archivo/162d3166-0990-43f9-87b7-4ab01b1cc8b9

Ejemplo de uso:
node ./tools/filterGEOJsonByPropertie.mjs  --filter="Partido=La Plata" --input=./geo/raw/comisarias.geojson --output=./geo/comisarias-la-plata.geojson 
*/

import { readFileSync, writeFileSync } from "fs";
import { argv, exit } from "process";

/*Esta es la forma de ingresar argumentos en la terminal
node filterGEOJsonByPropertie.mjs  --filter="cd=006041" --input=limite.geojson --output=la-plata.geojson
*/
//Validacion de cantidad de argumentos (no se valida si el argumento es valido)
const args = argv.slice(2);
if (args.length < 3) {
  console.error("Faltan argumentos");
  exit(1);
} else if (args.length > 3) {
  console.error("Demasiados argumentos");
  exit(1);
}

//Transformar los argumentos en un objeto config
const splitedArgs = args.map((a) => a.split("="));
const options = splitedArgs.map((arg) => {
  const [key, ...values] = arg;
  const undashKey = key.replace("--", ""); //transform --filter to filter
  return values.length > 1 ? [undashKey, [...values]] : [undashKey, ...values];
});

const config = Object.fromEntries(options);
console.log("Entrada:", config);

//Leer el archivo y parsear el contenido
const file = readFileSync(config.input, "utf-8");
const data = JSON.parse(file);

const { features, ...rest } = data;

const filterFeatures = features.filter(
  (feature) => feature.properties[config.filter[0]] == config.filter[1]
);

const newData = { ...rest, features: filterFeatures };
const geoJsonContent = JSON.stringify(newData, null, 2);

writeFileSync(`${config.output}`, geoJsonContent);
