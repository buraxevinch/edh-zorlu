"use client";
import Link from "next/link";

const resetNav = () => {
  const nav = document.querySelector("nav.hvrNav");
  if (!nav) return;
  nav.classList.remove("hvrNav");
};

export const MenuLinkClick = ({ item, cls, children }) => {
  const handleClick = () => {
    if (item.clck) resetNav();
  };

  return (
    <Link href={item.url} className={cls} onClick={handleClick}>
      {children}
    </Link>
  );
};
