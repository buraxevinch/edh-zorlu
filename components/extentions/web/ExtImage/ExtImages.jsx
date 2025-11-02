"use client";
import HandleMedia from "./HandleMedia";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import GetTtl from "@/components/extentions/GetTtl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

const ExtImages = ({ cls, data, int }) => {
  const { list, props, text } = data;
  const height = Math.round((list[0].img.hgh * 320) / list[0].img.wdt);

  const fillSwiper = () => {
    switch (props.gtype) {
      case 1:
        return (
          <div>
            {text && (
              <div className="-mb-10 relative z-30">
                <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />
              </div>
            )}
            <LightGallery download={false} plugins={[lgVideo]} selector="a.lg-item" speed={500}>
              <Swiper
                loop={true}
                grabCursor={true}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: int, pauseOnMouseEnter: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                spaceBetween={20}
                breakpoints={{ 1280: { slidesPerView: cls[1] }, 1536: { slidesPerView: cls[0] } }}
                className="pgOut before:w-[120%] before:h-[55%] before:absolute before:-top-[40%] before:-left-[10%] before:rounded-[100%] before:bg-white before:z-20"
              >
                {list.map((item, key) => (
                  <SwiperSlide key={key} className="h-auto">
                    <HandleMedia key={item.id} height={height} item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </LightGallery>
          </div>
        );
      default:
        return (
          <div>
            {text && <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />}
            <LightGallery download={false} plugins={[lgVideo]} selector="a.lg-item" speed={500}>
              <Swiper
                loop={true}
                grabCursor={true}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: int, pauseOnMouseEnter: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                spaceBetween={20}
                breakpoints={{ 1024: { slidesPerView: cls[2] }, 1280: { slidesPerView: cls[1] }, 1536: { slidesPerView: cls[0] } }}
                className="pgOut"
              >
                {list.map((item, key) => (
                  <SwiperSlide key={key} className="h-auto">
                    <HandleMedia key={item.id} height={height} item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </LightGallery>
          </div>
        );
    }
  };

  return fillSwiper();
};

export default ExtImages;
