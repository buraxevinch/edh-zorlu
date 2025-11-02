import Image from "next/image";
import { isImageFitCover, isImageSlide, useLightboxProps } from "yet-another-react-lightbox";

const isNextJsImage = (slide) => isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";

export const NextJsImage = ({ slide, rect }) => {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;
  const height = !cover ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height)) : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.title || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / rect.width) * 100)}vw`}
      />
    </div>
  );
};
