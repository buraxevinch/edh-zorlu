"use client";
import Image from "next/image";
import { Icon } from "@/components/extentions/Icon";

const HandleMedia = ({ height, item }) => {
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";
  const mediaProps = { "data-sub-html": item.ttl, className: "lg-item p-0.5 block border border-dark relative" };

  if (item.img.vid) {
    mediaProps["data-poster"] = root + item.img.src;
    mediaProps["data-src"] = item.img.vid;
  } else {
    mediaProps.href = root + item.img.src;
  }

  return (
    <a {...mediaProps}>
      <div className="relative cursor-pointer flex items-center group overflow-hidden" style={{ maxHeight: height + "px" }}>
        <Image alt={item.ttl} src={root + item.img.src.replace("/", "/thumbs/")} width={320} height={height} placeholder="blur" blurDataURL={item.img.base} className="w-full object-cover" />
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

export default HandleMedia;
