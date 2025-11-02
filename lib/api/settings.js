import { notFound } from "next/navigation";

export const fetchLocaleSettings = async (locale, isMobile) => {
  const res = await fetch(`${process.env.API_BASE}settings&lng=${locale}&mbl=${isMobile}`, { next: { tags: ["setting"] } });
  if (!res.ok) return notFound();
  return await res.json();
};
