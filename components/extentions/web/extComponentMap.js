import dynamic from "next/dynamic";

const extComponentMap = {
  ExtBlogl: dynamic(() => import("./ExtMenu/ExtBlogl"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtBlogs: dynamic(() => import("./ExtMenu/ExtBlogs"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtTreatl: dynamic(() => import("./ExtMenu/ExtTreatl"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtTreats: dynamic(() => import("./ExtMenu/ExtTreats"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtImagel: dynamic(() => import("./ExtImage/ExtImagel"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtImages: dynamic(() => import("./ExtImage/ExtImages"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtTextl: dynamic(() => import("./ExtText/ExtTextl"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtTexts: dynamic(() => import("./ExtText/ExtTexts"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtVidl: dynamic(() => import("./ExtVid/ExtVidl"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtVids: dynamic(() => import("./ExtVid/ExtVids"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtMulti: dynamic(() => import("./ExtCourse/ExtMulti"), { ssr: true, loading: () => <div className="h-svh" /> }),
  // ExtMenul: dynamic(() => import("./extentions/web/MenulRender"), { ssr: true, loading: () => <div className="h-svh" /> }),
  // ExtMenus: dynamic(() => import("./extentions/web/MenusRender"), { ssr: true, loading: () => <div className="h-svh" /> }),
};

export default extComponentMap;
