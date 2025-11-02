import { notFound } from "next/navigation";

export const fetchPageDetails = async (lang, slug, isMobile = false) => {
  const path = "/" + (Array.isArray(slug) ? slug.join("/") : "");
  const res = await fetch(`${process.env.API_BASE}details&lng=${lang}&url=${path}&mbl=${isMobile}`, { next: { tags: ["menu"] } });
  if (!res.ok) return notFound();
  return await res.json();
};
