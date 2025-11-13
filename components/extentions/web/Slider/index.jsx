"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
const HEADER_HEIGHT = 96;

const Slider = ({ data }) => {
  const { info, list, size, time } = data;
  // const lstsize = list.length;
  // const [height, setHeight] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const parsedSize = size ? parseFloat(size) : null;
  const isDynamic = parsedSize && !isNaN(parsedSize) && parsedSize > 0;

  const height = isDynamic ? `calc(${parsedSize * 100}vh - ${HEADER_HEIGHT}px)` : `${list[0].img.hgh}px`;

  /*
    const calculateDynamicHeight = () => {
      if (!parsedSize) return null;
      return `${window.innerHeight * parsedSize - HEADER_HEIGHT}px`;
    };

    useEffect(() => {
      setMounted(true);
      if (isDynamic) setHeight(calculateDynamicHeight());
      else setHeight(list[0].img.hgh + "px");
      if (isDynamic) {
        const handleResize = () => setHeight(calculateDynamicHeight());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [data, isDynamic, parsedSize]);
  */
  useEffect(() => setMounted(true), []);

  const root = (r) => process.env.NEXT_PUBLIC_MEDIA_URL + "/public/" + (r ? "video/" : "images/");
  const elmPos = [
    "top-0 left-0",
    "top-1/2 left-0 -translate-y-1/2",
    "left-0 bottom-0",
    "top-0 left-1/2 -translate-x-1/2",
    "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
    "left-1/2 bottom-0 -translate-x-1/2",
    "top-0 right-0",
    "top-1/2 right-0 -translate-y-1/2",
    "right-0 bottom-28",
  ];

  const handleBtn = (btn) => {
    const cls = "py-2 px-4 opacity-60 rounded-sm shadow-sm duration-500 hover:opacity-100";
    switch (btn.type) {
      case "1":
        return (
          <a href={btn.url} target={btn.target} rel={btn.rel} className={cls} style={{ background: btn.bg, color: btn.clr }}>
            {btn.ttl}
          </a>
        );
      case "2":
        return (
          <a href={"mailto:" + btn.url} className={cls} style={{ background: btn.bg, color: btn.clr }}>
            {btn.ttl}
          </a>
        );
      case "3":
        return (
          <a href={"tel:" + btn.url} className={cls} style={{ background: btn.bg, color: btn.clr }}>
            {btn.ttl}
          </a>
        );
      default:
        return (
          <Link href={btn.url} className={cls} style={{ background: btn.bg, color: btn.clr }}>
            {btn.ttl}
          </Link>
        );
    }
  };

  return (
    <div className="relative">
      <Swiper
        grabCursor={true}
        effect={"fade"}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, EffectFade, Thumbs]}
        autoplay={time !== "0" ? { delay: time, disableOnInteraction: false } : false}
        className="rounded-2xl"
        style={{ height: height }}
      >
        {list.map((item, key) => (
          <SwiperSlide key={key} className="h-full relative">
            <Image
              alt={"Slider image " + (key + 1)}
              src={root(0) + item.img.src}
              className="object-cover"
              fill
              placeholder="blur"
              blurDataURL={item.img.base}
              priority={key === 0}
              fetchPriority={key === 0 ? "high" : "auto"}
              sizes="(min-width: 1280px) 100vw, 1px"
            />
            {item.vid && <video src={root(1) + item.vid} className="w-full h-auto absolute inset-0 object-cover pointer-events-none" autoPlay loop muted />}
            {item.shd && <div className="absolute inset-0" style={{ backgroundColor: item.shd }} />}
            {mounted && ((item.str.length > 0 && item.str[0]) || (item.btn.length > 0 && item.btn[""])) && (
              <div className="absolute inset-6">
                <div
                  className={`absolute ${elmPos[item.pos[1]]}${item.pos[2] > 0 ? (item.pos[2] > 1 ? " text-right" : " text-center") : ""} flex flex-col gap-1`}
                  style={{ width: (item.pos[0] !== "0" ? 100 - 5 * parseInt(item.pos[0]) : 100) + "%" }}
                >
                  {item.str.length > 0 &&
                    item.str[0] &&
                    item.str.map((str, key) => <div key={key} className={styles[`anm${key}`]} style={{ "--ind": key + 1 }} dangerouslySetInnerHTML={{ __html: str }} />)}
                  {item.btn.length > 0 && item.btn[0] && (
                    <div className={item.str.length > 0 ? "mt-4" : undefined}>
                      <div className={`flex${item.pos[2] > 0 ? (item.pos[2] > 1 ? " justify-end" : " justify-center") : ""} gap-3`}>
                        {item.btn.map((btn, key) => (
                          <div key={key} className={`anm${item.str.length + key}`} style={{ "--ind": item.str.length + key + 1 }}>
                            {handleBtn(btn)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {info && mounted && (
        <div
          className="pt-5 pl-6 absolute right-0 bottom-0 bg-[var(--background)] rounded-tl-3xl z-10 before:w-5 before:h-10 before:absolute before:-top-10 before:right-0 before:rounded-br-3xl before:bg-transparent before:shadow-[0_20px_0_0_var(--background)] after:w-5 after:h-10 after:absolute after:-left-5 after:bottom-0 after:rounded-br-3xl after:bg-transparent after:shadow-[0_20px_0_0_var(--background)]"
          style={{ width: info[0] }}
        >
          <Swiper onSwiper={setThumbsSwiper} spaceBetween={20} slidesPerView={info[1]} watchSlidesProgress={true} modules={[Thumbs]} className="h-28">
            {list.map((item, key) => (
              <SwiperSlide key={key} className="h-20 relative cursor-pointer">
                <Image alt={"Thumb image " + (key + 1)} src={root(0) + item.img.src} sizes="200px" className="object-cover rounded-xl pointer-events-none" fill />
                <span className="w-6 h-6 block absolute -right-6 -bottom-6 rounded-tl-lg bg-[var(--background)] duration-500 z-10 before:w-2.5 before:h-5 before:absolute before:-top-5 before:right-0 before:rounded-br-xl before:bg-transparent before:shadow-[0_10px_0_0_var(--background)] after:w-2.5 after:h-5 after:absolute after:-left-2.5 after:bottom-0  after:rounded-br-xl after:bg-transparent after:shadow-[0_10px_0_0_var(--background)]" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Slider;
