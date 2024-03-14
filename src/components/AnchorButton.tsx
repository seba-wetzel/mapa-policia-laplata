import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface HomeButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  image?: {
    src: string;
    w?: number;
    h?: number;
    priority?: boolean;
    alt: string;
  };
  alt?: string;
  text?: string;
  active?: boolean;
  goTo: string;
  hoverText?: string;
}

const ImageContainer: FC<{
  image: HomeButtonProps["image"];
  text: HomeButtonProps["text"];
  className?: HomeButtonProps["className"];
}> = ({ image, className, text }) => {
  if (!image)
    return (
      <div
        className={cn(
          "z-10 flex items-center justify-center text-center align-middle font-luloBold text-xs text-verde",
          className,
        )}
      >
        <p>{text}</p>
      </div>
    );
  const { src, w, h, priority, alt } = image;
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={w ?? 64}
        height={h ?? 64}
        priority={priority}
      />
    </div>
  );
};

const ActiveBar = ({ active }: { active: boolean }) => {
  if (active)
    return <div className=" hidden h-2  w-2/3 bg-violeta md:block"></div>;
  return null;
};

const AnchorButton: FC<HomeButtonProps> = ({
  image,
  text,
  active = false,
  goTo,
  hoverText,
  className,
  children,
  ...props
}) => {
  return (
    <Link
      href={goTo}
      {...props}
      className={cn(
        "group relative flex h-16 max-h-[107px] w-24 cursor-pointer  flex-col items-center  justify-around font-lulo",
        className,
      )}
    >
      <ImageContainer
        image={image}
        text={text}
        className={cn("flex-1 items-center  justify-center", {
          "group-hover:hidden": hoverText,
        })}
      />
      <p className="hidden flex-1 items-center justify-center  font-luloBold text-xxs text-violeta group-hover:flex">
        {hoverText}
      </p>
      <div className="absolute inset-y-full z-10">{children}</div>
      <ActiveBar active={active} />
    </Link>
  );
};
export default AnchorButton;
