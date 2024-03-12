"use client";
import Dialog from "@/components/Dialog";
import type { PuntoOnClick } from "@/components/Mapa";
import { Mapa } from "@/components/Mapa";
import type { FeatureCollection, Point } from "geojson";
import Image from "next/image";

import geoComisarias from "@/data/geo/comisarias-la-plata.json";
import geoSeccionales from "@/data/geo/seccionales-la_plata.json";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: "",
    tel: "",
    representante: "",
  });

  const puntoHandlerClick: PuntoOnClick = (data, id) => {
    setOpen(true);
    console.log(data);
    setData({
      title: data.properties?.Nombre || "Comisaria",
      content: data.properties["Dirección"] || "Sin Direccion",
      tel: data.properties["Teléfono"] || "Sin Telefono",
      representante: data.properties["Representa"] || "Sin Representante",
    });
  };
  return (
    <main className="h-full">
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
          onClick={puntoHandlerClick}
        />
      </Mapa>
      <Dialog open={open} data={data} onClose={() => setOpen(false)} />
    </main>
  );
}
