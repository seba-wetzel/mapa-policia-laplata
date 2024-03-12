"use client";
import Dialog from "@/components/Dialog";
import type { PuntoOnClick } from "@/components/Mapa";
import { Mapa } from "@/components/Mapa";
import type { FeatureCollection, Point } from "geojson";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import geoComisarias from "@/data/geo/comisarias-la-plata.json";
import geoSeccionales from "@/data/geo/seccionales-la_plata.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [data, setData] = useState({
    title: "",
    content: "",
    tel: "",
    representante: "",
  });

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("comisaria", term);
    } else {
      params.delete("comisaria");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const puntoHandlerClick: PuntoOnClick = (data, id) => {
    setOpen(true);
    const { icon, ...properties } = data.properties;
    handleSearch(JSON.stringify(properties));
  };

  useEffect(() => {
    if (searchParams.get("comisaria")) {
      const paramsFound = searchParams.get("comisaria");
      if (!paramsFound) return;
      const data = JSON.parse(paramsFound);
      setData({
        title: data.Nombre || "Comisaria",
        content: data["Dirección"] || "Sin Direccion",
        tel: data["Teléfono"] || "Sin Telefono",
        representante: data["Representa"] || "Sin Representante",
      });
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [searchParams]);

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

      <Dialog open={open} onClose={() => handleSearch("")}>
        <h1>Nombre: {data.title}</h1>
        <p>Direccion: {data.content}</p>
        <p>Telefono: {data.tel}</p>
        <p>Representante: {data.representante}</p>
      </Dialog>
    </main>
  );
}
