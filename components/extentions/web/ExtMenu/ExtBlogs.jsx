"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/extentions/Icon";
import { Autoplay, Navigation } from "swiper/modules";
import { horizontalText, normalizeText } from "../extUtils";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const CustomNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className="mt-10 flex justify-center gap-3">
      <button className="p-2.5 bg-white border rounded-full" aria-label="Previous" onClick={() => swiper.slidePrev()}>
        <Icon icon="chevron-left" />
      </button>
      <button className="p-2.5 bg-white border rounded-full" aria-label="Next" onClick={() => swiper.slideNext()}>
        <Icon icon="chevron-right" />
      </button>
    </div>
  );
};

const ExtBlogs = ({ cls, data, int }) => {
  const { det, list, text, xtl } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div className="pt-12 pb-2 jumbotron bg-light/50">
      <div className="container">
        {text && (
          <div className="grid grid-cols-1 gap-4 text-center">
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
        )}
        <div className="grid grid-cols-12 gap-4">
          {xtl && horizontalText(xtl)}
          <div className={xtl ? "col-span-11" : "col-span-full"}>
            <Swiper
              loop={true}
              grabCursor={true}
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: int, pauseOnMouseEnter: true }}
              spaceBetween={25}
              breakpoints={{ 1280: { slidesPerView: cls[1] }, 1536: { slidesPerView: cls[0] } }}
              className="!pt-15 !pb-6 h-auto"
            >
              {list.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto relative group">
                  <Link
                    href={item.url}
                    className={`${item.id % 2 ? "pt-8 px-5 pb-5" : "pt-5 px-5 pb-8"} h-full flex flex-col items-center text-center gap-3 relative bg-white rounded-2xl`}
                    title={det}
                  >
                    {item.id % 2 === 1 && (
                      <>
                        <span className="w-16 h-16 flex items-center justify-center absolute -top-10 bg-white border-8 border-light/50 rounded-full">{item.id}</span>
                        <b>{item.ttl}</b>
                        {item.short && <small>{item.short}</small>}
                      </>
                    )}
                    <Image
                      alt={item.ttl}
                      src={root + item.img.src}
                      width={item.img.wdt}
                      height={item.img.hgh}
                      placeholder="blur"
                      blurDataURL={item.base}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {item.id % 2 === 0 && (
                      <>
                        <span className="w-16 h-16 flex items-center justify-center absolute -bottom-10 bg-white border-8 border-light/50 rounded-full">{item.id}</span>
                        <b>{item.ttl}</b>
                        {item.short && <small>{item.short}</small>}
                      </>
                    )}
                  </Link>
                </SwiperSlide>
              ))}
              <CustomNavigation />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtBlogs;
