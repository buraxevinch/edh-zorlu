"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@/components/extentions/Icon";
import { Autoplay, Pagination } from "swiper/modules";
import { horizontalText, normalizeText } from "../extUtils";
import "swiper/css";
import "swiper/css/pagination";

const ExtTreats = ({ cls, data, int }) => {
  const { det, list, text, xtl } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div className="pb-3 jumbotron relative before:h-2/5 before:absolute before:inset-x-0 before:bottom-0 before:bg-gray-50 before:-z-10">
      <div className="container">
        {text && (
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
        )}
        <div className="grid grid-cols-12 gap-4">
          {xtl && horizontalText(xtl)}
          <div className={xtl ? "col-span-11" : "col-span-full"}>
            <Swiper
              loop={true}
              grabCursor={true}
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: int, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              spaceBetween={25}
              breakpoints={{ 1024: { slidesPerView: cls[2] }, 1280: { slidesPerView: cls[1] }, 1536: { slidesPerView: cls[0] } }}
              className="pgOut !pb-15 h-full"
            >
              {list.map((item, key) => (
                <SwiperSlide key={key} className="relative group">
                  <Link href={item.url} title={det}>
                    <Image
                      alt={item.ttl}
                      src={root + item.img.src}
                      width={item.img.wdt}
                      height={item.img.hgh}
                      placeholder="blur"
                      blurDataURL={item.base}
                      className="w-full h-auto object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute inset-0 duration-500 rounded-xl group-hover:bg-black/30" />
                    <div className="flex flex-col items-center gap-2 absolute inset-x-2 -bottom-6 text-center opacity-0 duration-500 group-hover:bottom-4 group-hover:opacity-100">
                      <b className="truncate text-white">{item.ttl}</b>
                      <div className="p-2.5 w-16 h-16 flex justify-center bg-white rounded-full">
                        <div className="p-2 border rounded-full bg-light">
                          <Icon icon="forward" />
                        </div>
                      </div>
                    </div>
                    <div className="py-2 px-3 relative text-center bg-gray-50">
                      <b className="block truncate opacity-100 duration-300 group-hover:opacity-0">{item.ttl}</b>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtTreats;
