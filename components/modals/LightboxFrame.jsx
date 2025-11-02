"use client";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-video.css";

const getMediaId = (url) => {
  if (!url) return { type: null, id: null };
  const cleanedUrl = url.trim();
  let match = cleanedUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (match && match[1].length === 11) return { type: "youtube", id: match[1] };
  match = cleanedUrl.match(/vimeo\.com\/(\d+)/i);
  if (match && match[1]) return { type: "vimeo", id: match[1] };
  return { type: null, id: null };
};

const convertToSlides = (imageList, root) => {
  if (!imageList || imageList.length === 0) return [];

  return imageList
    .map((item) => {
      const thumbSrc = root + item.img.src.replace("/", "/thumbs/");
      const videoUrl = item.img.vid;
      if (videoUrl) {
        const { type, id } = getMediaId(videoUrl);
        if (id) {
          return {
            src: thumbSrc,
            thumb: thumbSrc,
            subHtml: `<h4>${item.ttl}</h4>`,
            "data-poster": thumbSrc,
            "data-sub-html": item.ttl,
            ...(type === "youtube" && { "data-youtube": id }),
            ...(type === "vimeo" && { "data-vimeo": id }),
          };
        }
      }
      return { src: root + item.img.src, thumb: thumbSrc, subHtml: `<h4>${item.ttl}</h4>` };
    })
    .filter((slide) => slide.src);

  /*
    return imageList
      .map((item) => {
        const thumbSrc = root + item.img.src.replace("/", "/thumbs/");
        const videoUrl = item.img.vid;
        if (videoUrl) {
          const { type, id } = getMediaId(videoUrl);
          if (id) {
            return {
              src: thumbSrc,
              thumb: thumbSrc,
              subHtml: `<h4>${item.ttl}</h4>`,
              "data-poster": thumbSrc,
              "data-sub-html": item.ttl,
              ...(type === "youtube" && { "data-youtube": id }),
              ...(type === "vimeo" && { "data-vimeo": id }),
            };
          }
        }
        return { src: root + item.img.src, thumb: thumbSrc, subHtml: `<h4>${item.ttl}</h4>` };
      })
      .filter((slide) => slide.src);
  */
};

const handleMedia = (item) => {
  if (item.img.vid) {
    return (
      <a key={item.id} data-poster={root + item.img.src} data-src={item.img.vid} data-sub-html={item.ttl} className="p-0.5 border border-dark relative">
        <div className="h-full relative cursor-pointer group overflow-hidden" style={{ height: height + "px" }}>
          <Image alt={item.ttl} src={root + item.img.src.replace("/", "/thumbs/")} sizes="320px" fill />
          <div className="p-2 absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            <Icon icon={item.img.vid ? "play-circle" : "expand"} className="delay-300 duration-300 scale-0 group-hover:scale-100 text-white" size={40} />
          </div>
          {item.ttl && (
            <div className="py-1 px-2 absolute left-2 right-2 -bottom-full flex items-center justify-center bg-white group-hover:bottom-2 transition-all duration-500 delay-150">
              <span className="line-clamp-1">{item.ttl}</span>
            </div>
          )}
        </div>
      </a>
    );
  }
  return (
    <a key={item.id} href={root + item.img.src} data-sub-html={item.ttl} className="p-0.5 border border-dark relative">
      <div className="h-full relative cursor-pointer group overflow-hidden" style={{ height: height + "px" }}>
        <Image alt={item.ttl} src={root + item.img.src.replace("/", "/thumbs/")} sizes="320px" fill />
        <div className="p-2 absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
          <Icon icon={item.img.vid ? "play-circle" : "expand"} className="delay-300 duration-300 scale-0 group-hover:scale-100 text-white" size={40} />
        </div>
        {item.ttl && (
          <div className="py-1 px-2 absolute left-2 right-2 -bottom-full flex items-center justify-center bg-white group-hover:bottom-2 transition-all duration-500 delay-150">
            <span className="line-clamp-1">{item.ttl}</span>
          </div>
        )}
      </div>
    </a>
  );
};

const LightboxFrame = ({ modalState, closeModal }) => {
  const { imageList, initialIndex } = modalState.content || {};
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";
  const slides = convertToSlides(imageList, root);
  if (!modalState.isOpen || slides.length === 0) return null;
  const handleClose = () => closeModal();
  return <LightGallery dynamic dynamicEl={slides} startIndex={initialIndex} onCloseAfter={handleClose} speed={500} mode="lg-fade" plugins={[lgThumbnail, lgVideo, lgZoom]} closable />;
};

export default LightboxFrame;
