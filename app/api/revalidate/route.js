import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req) {
  const headers = { "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_MEDIA_URL, "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    if (secret !== process.env.REVALIDATION_SECRET_KEY) {
      return new Response(JSON.stringify({ message: "Invalid token!" }), { status: 401, headers });
    }
    const path = searchParams.get("path");
    const tag = searchParams.get("tag");
    if (path) {
      try {
        await revalidatePath(path);
      } catch (err) {
        console.warn("Path revalidation failed:", err);
      }
    }
    if (tag) {
      try {
        await revalidateTag(tag);
      } catch (err) {
        console.warn("Tag revalidation failed:", err);
      }
    }
    return new Response(JSON.stringify({ revalidated: true, path: path || null, tag: tag || null, timestamp: new Date().toISOString() }), { status: 200, headers });
  } catch (error) {
    console.error("Revalidate error:", error);
    return new Response(JSON.stringify({ message: "Error revalidating!" }), { status: 500, headers });
  }
}
