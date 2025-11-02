"use client";
import { useEffect, useState } from "react";

const throttle = (func, limit) => {
  let inThrottle;
  let lastResult;

  return function (...args) {
    const context = this;
    if (!inThrottle) {
      lastResult = func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    return lastResult;
  };
};

const StickyHandler = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const SCROLL_THRESHOLD = 300;

  useEffect(() => {
    const headerElement = document.querySelector('[data-sticky-target="header"]');
    if (!headerElement) return;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > SCROLL_THRESHOLD;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const headerElement = document.querySelector('[data-sticky-target="header"]');
    if (!headerElement) return;

    if (isScrolled) {
      headerElement.classList.add("shadow-md");
      headerElement.classList.remove("-translate-y-full");
    } else {
      headerElement.classList.add("-translate-y-full");
      headerElement.classList.remove("shadow-md");
    }
  }, [isScrolled]);

  return null;
};

export default StickyHandler;
