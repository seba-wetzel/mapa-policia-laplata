import AnchorButton from "@/components/AnchorButton";
import { cn } from "@/utils/tailwindUtils";
import { FC } from "react";

//default function FC type that accepts className
const HeaderBar: FC<{ className?: string }> = ({ className }) => {
  return (
    <header className={cn("flex flex-row  gap-4 sm:flex-nowrap", className)}>
      <AnchorButton
        className=" md:h-96 md:w-48"
        image={{
          src: "/img/gorra-inicio.webp",
          w: 155,
          h: 106,
          alt: "inicio",
          priority: true,
        }}
        goTo="/"
      >
        {/* <div className="md-flex-col hidden flex-col text-white md:flex">
          <p className="-mt-4 text-3xl">MAPA</p>
          <p className="my-1  text-sm"> </p>
          <p className="text-pretty font-lulo text-sm ">
            DE LA POLICIA DE LA PLATA
          </p>
          <div className="mt-2 text-xs text-violeta">
            <p>RED DE CUIDADOS CONTRA </p>
            <p> LA VIOLENCIA POLICIAL</p>
          </div>
        </div> */}
      </AnchorButton>
      <AnchorButton
        image={{ src: "/img/mapa-header.webp", alt: "MAPA" }}
        goTo="/mapa"
        text="mapa"
        hoverText="MAPA"
      />
      <AnchorButton
        image={{ src: "/img/megafono-header.webp", alt: "DENUNCIÁ" }}
        active={false}
        goTo="/denuncia"
        text="DENUNCIÁ"
        hoverText="DENUNCIÁ"
      />
      <AnchorButton
        image={{ src: "/img/herramientas-header.webp", alt: "RECURSOS" }}
        active={true}
        goTo="/mapa"
        text="RECURSOS"
        hoverText="RECURSOS"
      />
      <AnchorButton
        image={{
          src: "/img/investigaciones-header.webp",
          w: 81,
          h: 95,
          alt: "INVESTIGACIONES",
        }}
        active={true}
        goTo="/mapa"
        text="INVESTIGACIONES"
        hoverText="INVESTIGACIONES"
      />
      <div className="grow"></div>
      <AnchorButton
        alt="NOSOTXS"
        active={true}
        goTo="/mapa"
        text="NOSOTRXS"
        hoverText="Quienes somos"
      />
    </header>
  );
};

export default HeaderBar;
