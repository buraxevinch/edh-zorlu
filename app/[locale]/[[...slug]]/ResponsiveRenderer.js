"use client";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import WebContent from "@/components/content/web";
import MobileContent from "@/components/content/mobil";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { fetchWebDataClientSide } from "@/lib/client-api/fetcher";
import "react-toastify/dist/ReactToastify.css";

const ResponsiveRenderer = ({ apiUrl, initialData, chkMbl, locale, settings, slug }) => {
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState(initialData);
  const [hasFetchedWebData, setHasFetchedWebData] = useState(!chkMbl);

  useEffect(() => {
    if (!mounted) setMounted(true);
    if (!isMobile && !hasFetchedWebData) {
      setIsLoading(true);
      fetchWebDataClientSide(apiUrl, locale, slug)
        .then((data) => {
          if (data) {
            setCurrentData(data);
            setHasFetchedWebData(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [mounted, isMobile, chkMbl, apiUrl, locale, slug, hasFetchedWebData]);

  if (!mounted) {
    return chkMbl ? <MobileContent data={currentData} setting={settings} /> : <WebContent data={currentData} setting={settings} />;
  }

  if (isLoading) {
    return <div className="w-screen h-screen flex items-center justify-center">Web İçeriği Yükleniyor...</div>;
  }

  return (
    <>
      {isMobile ? <MobileContent data={currentData} setting={settings} /> : <WebContent data={currentData} setting={settings} slug={slug} />}
      <ToastContainer position="top-center" />
    </>
  );
};

export default ResponsiveRenderer;
