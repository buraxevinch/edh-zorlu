"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const ShowImages = ({ list, ttl }) => {
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <>
      <div>
        <Swiper
          loop={true}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: function (i, c) {
              return `<span class='!w-8 !h-8 overflow-hidden ${c}'><Image alt='${ttl + (i + 1)}' src='${root + list[i].src}' class='h-full' fill /></span>`;
            },
          }}
          className="pgImg !pb-10 h-auto"
        >
          {list.map((itm, key) => (
            <SwiperSlide key={key} className="!h-full">
              <div className="p-0.5 h-full flex justify-center cursor-pointer">
                <Image alt={ttl + (key + 1)} src={root + itm.src} className="aspect-video pointer-events-none" width={itm.wdt} height={itm.hgh} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ShowImages;
