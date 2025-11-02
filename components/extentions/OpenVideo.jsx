"use client";
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";
import { Icon } from "./Icon";

const OpenVideo = ({ title, video }) => {
  const root = "/images/poster.jpg";
  const mediaProps = { "data-sub-html": title, className: "lg-item py-1 px-2 inline-flex items-center gap-2 border-b cursor-pointer" };

  if (video) {
    mediaProps["data-poster"] = root;
    mediaProps["data-src"] = video;
  } else {
    mediaProps.href = root;
  }

  return (
    <LightGallery download={false} plugins={[lgVideo]} selector="a.lg-item" speed={500}>
      <a {...mediaProps}>
        <Icon icon="youtube" size={28} className="text-red-600" />
        Video URL
      </a>
    </LightGallery>
  );
};

export default OpenVideo;
