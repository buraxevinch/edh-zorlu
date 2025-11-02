"use client";
import Image from "next/image";
import { horizontalText, normalizeText } from "../extUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Icon } from "../../Icon";

const ExtMulti = ({ data }) => {
  const { arr, det, text } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div>
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
      <div className="grid grid-cols-2 gap-8">
        {arr.map((item, key) => {
          const { group, list, xtl } = item;
          return (
            <div key={key} className="grid grid-cols-6 gap-4">
              {xtl && horizontalText(xtl, 1)}
              <div className={xtl ? "col-span-5" : "col-span-full"}>
                <Swiper
                  loop={true}
                  grabCursor={true}
                  modules={[Autoplay, Pagination]}
                  // autoplay={{ delay: int, pauseOnMouseEnter: true }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  spaceBetween={20}
                  className="h-full"
                >
                  {list.map((item, key) => (
                    <SwiperSlide key={key} className="!h-auto relative group">
                      <Image alt={item.text.ttl} src={root + item.img.src} width={item.img.wdt} height={item.img.hgh} className="w-full h-full object-cover rounded-xl shadow-md" />
                      <div className="p-4 absolute inset-4 flex flex-col items-center justify-center gap-2 text-center rounded-xl scale-y-0 bg-dark/90 duration-300 group-hover:scale-y-100">
                        <small className="absolute top-3 left-4">{group[item.cat]}</small>
                        <small className="absolute top-3 right-4">{item.date}</small>
                        <b className="text-lg">{item.text.ttl}</b>
                        {item.text.desc && <p className="whitespace-pre-line">{normalizeText(item.text.desc)}</p>}
                        {(item.list || item.vid) && (
                          <div className="flex gap-3">
                            <div className="p-2 rounded-full shadow bg-black/10">
                              <Icon icon="image" size={20} color="white" />
                            </div>
                            <div className="p-2 rounded-full shadow bg-black/10">
                              <Icon icon="youtube" size={20} color="red" />
                            </div>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtMulti;
