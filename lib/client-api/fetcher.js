export const fetchWebDataClientSide = async (apiUrl, locale, slug) => {
  const path = "/" + (Array.isArray(slug) ? slug.join("/") : "");
  const url = `${apiUrl}details&lng=${locale}&url=${path}&mbl=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("Client-Side Fetch Error:", error.message);
    return null;
  }
};
