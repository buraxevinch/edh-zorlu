"use client";
import HandleMedia from "./HandleMedia";
import MasonryGallery from "./MasonryGallery";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import GetTtl from "@/components/extentions/GetTtl";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";

const ExtImagel = ({ cls, data }) => {
  const { list, props, text } = data;
  const height = Math.round((list[0].img.hgh * 320) / list[0].img.wdt);

  return (
    <div>
      {text && <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />}
      {props.gtype ? (
        <LightGallery download={false} elementClassNames="flex gap-4" plugins={[lgVideo]} selector="a.lg-item" speed={500}>
          <MasonryGallery count={cls[window.innerWidth > 1535 ? 0 : window.innerWidth > 1279 ? 1 : 2]} height={height} list={list} />
        </LightGallery>
      ) : (
        <LightGallery download={false} elementClassNames={`grid ${cls} gap-4`} plugins={[lgVideo]} selector="a.lg-item" speed={500}>
          {list.map((item) => (
            <HandleMedia key={item.id} height={height} item={item} />
          ))}
        </LightGallery>
      )}
    </div>
  );
};

export default ExtImagel;
