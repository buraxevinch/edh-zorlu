"use client";
import { useEffect, useRef } from "react";

const SHOW_AFTER = 300;
const SCROLL_THROTTLE = 100;
const USE_THROTTLE = true;

export function HeaderFixed() {
  const prevScrollY = useRef(0);
  const ticking = useRef(false);

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    const header = document.querySelector('[data-sticky-target="header"]');
    if (!header) return;

    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "40";
    header.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    header.style.transform = "translateY(0)";
    header.style.opacity = "1";

    const updateHeader = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > prevScrollY.current;

      if (currentY < SHOW_AFTER) {
        // 300px altındaysa: normal pozisyonda görünür
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
      } else {
        // 300px üzerindeyse
        if (goingDown) {
          // aşağı kayarken gizlenir
          header.style.transform = "translateY(-100%)";
          header.style.opacity = "0";
        } else {
          // yukarı kayarken tekrar gelir
          header.style.transform = "translateY(0)";
          header.style.opacity = "1";
        }
      }

      prevScrollY.current = currentY;
      ticking.current = false;
    };

    const handleScroll = USE_THROTTLE
      ? throttle(() => window.requestAnimationFrame(updateHeader), SCROLL_THROTTLE)
      : () => {
          if (!ticking.current) {
            window.requestAnimationFrame(() => {
              updateHeader();
              ticking.current = false;
            });
            ticking.current = true;
          }
        };

    updateHeader(); // sayfa yüklenirken doğru pozisyon
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
