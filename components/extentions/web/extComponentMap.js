import dynamic from "next/dynamic";

const extComponentMap = {
  ExtContact: dynamic(() => import("./ExtContact"), { ssr: false, loading: () => <div className="h-svh" /> }),
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
  ExtKursl: dynamic(() => import("./ExtCourse/ExtKursl"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtKurss: dynamic(() => import("./ExtCourse/ExtKurss"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtSeml: dynamic(() => import("./ExtCourse/ExtSeml"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtSems: dynamic(() => import("./ExtCourse/ExtSems"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtMulti: dynamic(() => import("./ExtCourse/ExtMulti"), { ssr: false, loading: () => <div className="h-svh" /> }),
  ExtTeaml: dynamic(() => import("./ExtTeam/ExtTeaml"), { ssr: true, loading: () => <div className="h-svh" /> }),
  ExtTeams: dynamic(() => import("./ExtTeam/ExtTeams"), { ssr: false, loading: () => <div className="h-svh" /> }),
};

export default extComponentMap;
