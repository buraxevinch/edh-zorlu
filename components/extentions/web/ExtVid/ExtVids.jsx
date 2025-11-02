"use client";
import Image from "next/image";
import { normalizeText } from "../extUtils";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@/components/extentions/Icon";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

const ExtVids = ({ data, int }) => {
  const { bg, grd, group, list, text } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div className="pb-13 jumbotron">
      <div className="grid grid-cols-4">
        <div className={bg ? "col-span-3" : "col-span-full"}>
          {text && (
            <div className="container">
              <div className="mb-6 grid grid-cols-1 gap-4 text-center">
                {text.map((t, k) =>
                  k ? (
                    <p key={k} className={t.size + " whitespace-pre-line"}>
                      {normalizeText(t.txt)}
                    </p>
                  ) : (
                    <h3 key={k} className={t.size}>
                      {t.txt}
                    </h3>
                  )
                )}
              </div>
            </div>
          )}
          <div className="bg-gray-100">
            <div className={`py-16 ${bg ? "pl-5" : "container"} pb-12 relative`}>
              <i className="h-1 absolute top-10 inset-x-0 bg-white" />
              <LightGallery download={false} plugins={[lgVideo]} selector="a.lg-item" speed={500}>
                <Swiper
                  loop={true}
                  grabCursor={true}
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: int, pauseOnMouseEnter: true }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  spaceBetween={20}
                  breakpoints={{ 1280: { slidesPerView: grd[1] }, 1536: { slidesPerView: grd[0] } }}
                  className="pgOut"
                >
                  {list.map((item, key) => (
                    <SwiperSlide key={key} className="!h-auto">
                      <a data-sub-html={item.name} data-src={item.img.vid} data-poster={root + item.img.src} className="lg-item h-full block relative group rounded-2xl overflow-hidden">
                        <Image alt={item.name} src={root + item.img.src} width={item.img.wdt} height={item.img.hgh} className="w-full h-full object-cover" />
                        <div className="p-4 absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                          <Icon icon="play-circle" className="delay-300 duration-300 scale-0 group-hover:scale-100" size={40} />
                          <small>{group[item.cat]}</small>
                          <b className="text-xl">{item.name}</b>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </LightGallery>
              <i className="h-1 absolute inset-x-0 bottom-10 bg-white" />
            </div>
          </div>
        </div>
        {bg && <div className="col-span-1 bg-no-repeat bg-cover bg-left rounded-l-2xl" style={{ height: "calc(100% + 50px)", backgroundImage: `url(${root + bg.src})` }} />}
      </div>
    </div>
  );
};

export default ExtVids;
