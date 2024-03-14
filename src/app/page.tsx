"use client";
import Dialog from "@/components/Dialog";
import { Mapa } from "@/components/Mapa";
import { GeoJsonProperties, type FeatureCollection, type Point } from "geojson";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import casos from "@/data/geo/casos.json";
import geoComisarias from "@/data/geo/comisarias-la-plata.json";
import geoSeccionales from "@/data/geo/seccionales-la_plata.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [showCasos, setShowCasos] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState<GeoJsonProperties | null>(
    null,
  );
  const [selectedComisaria, setSelectedComisaria] =
    useState<GeoJsonProperties | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(
    term: string,
    type: "comisaria" | "caso" = "comisaria",
  ) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(type, term);
    } else {
      params.delete("caso");
      params.delete("comisaria");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleCasoClick(properties: GeoJsonProperties) {
    handleSearch(JSON.stringify(properties), "caso");
  }

  const comisariaHandlerClick = (properties: GeoJsonProperties) => {
    //Hay que sacar el icono del objeto properties
    //para np generar una redundancia en json.stringify
    const { icon, ...data } = properties;
    handleSearch(JSON.stringify(data), "comisaria");
  };

  useEffect(() => {
    const comisaria = searchParams.get("comisaria");
    const caso = searchParams.get("caso");
    if (comisaria) {
      const data = JSON.parse(comisaria);
      console.log(data);
      setSelectedComisaria(data);
      return;
    }
    if (caso) {
      const data = JSON.parse(caso);
      setSelectedCaso(data);
      return;
    }
    setSelectedComisaria(null);
    setSelectedCaso(null);
  }, [searchParams]);

  return (
    <main className="h-full">
      <input
        type="checkbox"
        id="casos"
        onChange={(e) => setShowCasos(e.target.checked)}
      />
      <label className="mx-4 font-lulo font-bold text-white" htmlFor="casos">
        Mostrar casos
      </label>
      <Mapa
        maxBounds={[
          [-58.29, -35.24],
          [-57.75, -34.83],
        ]}
        style={{ width: "auto", height: "100%", borderRadius: "10px" }}
      >
        <Mapa.Capa data={geoSeccionales as FeatureCollection} id="my-data" />
        <Mapa.Puntos
          data={geoComisarias as FeatureCollection<Point>}
          id="my-data-1"
          icon={
            <Image
              src="/img/estacion_policia.png"
              alt="pin"
              height={24}
              width={24}
            />
          }
          onClick={({ properties }) => comisariaHandlerClick(properties)}
        />
        {showCasos && (
          <Mapa.Puntos
            data={casos as FeatureCollection<Point>}
            id="my-data-2"
            onClick={({ properties }) => handleCasoClick(properties)}
          />
        )}
      </Mapa>

      <Dialog
        open={Boolean(selectedComisaria)}
        onClose={() => handleSearch("")}
      >
        {selectedComisaria && (
          <div>
            <h1>Nombre: {selectedComisaria["Nombre"]}</h1>
            <p>Direccion: {selectedComisaria["Dirección"]}</p>
            <p>Telefono: {selectedComisaria["Teléfono"]}</p>
            <p>Representante: {selectedComisaria["Representa"]}</p>
          </div>
        )}
      </Dialog>

      <Dialog open={Boolean(selectedCaso)} onClose={() => handleSearch("")}>
        {selectedCaso && (
          <div className="max-w-md">
            <div className="my-4 flex flex-row flex-wrap gap-4">
              <p>Caso nro: {selectedCaso["NumCaso"]}</p>
              <p>Fecha: {selectedCaso["Fecha de Deceso"]}</p>
              <p>Barrio: {selectedCaso["Ciudad"]}</p>
              <p>Nombre: {selectedCaso["Nombre"]}</p>
            </div>
            <h6>Situación Procesal: {selectedCaso["Situación Procesal"]}</h6>
            <h6 className="mt-4 text-center font-bold">Circunstancias</h6>
            <p>{selectedCaso["Circunstancias"]}</p>
          </div>
        )}
      </Dialog>
    </main>
  );
}
