import Image from "next/image";
import styles from "./styles.module.css";

const PageImage = ({ alt, image }) => {
  const { base, cont, dot, hgh, shdw, src, text, wdt } = image;
  const isrc = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/" + src;
  const chkDot = parseInt(dot) % 2;
  const cheight = cont ? { height: Math.round((hgh / 100) * cont) + "px" } : {};

  const getBgtext = () => {
    const pos = [
      "top-0 left-0",
      "top-0 left-1/2 -translate-x-1/2",
      "top-0 right-0",
      "top-1/2 left-0 -translate-y-1/2",
      "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
      "top-1/2 right-0 -translate-y-1/2",
      "left-0 bottom-0",
      "left-1/2 bottom-0 -translate-x-1/2",
      "right-0 bottom-0",
    ];

    return (
      <div className="absolute inset-4">
        <div className={`pgImg p-4 absolute flex flex-col gap-y-2 ${pos[text.dir]} ${text.align}`} style={{ width: text.size + "%" }}>
          {text.str.map((t, k) => (
            <div key={k} className={(k ? (k > 1 ? styles.third + " opacity-0" : styles.second) : styles.first) + " " + t.size + (t.font && " font-normal")} style={{ color: t.clr }}>
              {t.txt}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex items-center shadow-md rounded-2xl overflow-hidden pointer-events-none" style={cheight}>
      <Image src={isrc} alt={alt} width={wdt} height={hgh} placeholder="blur" blurDataURL={base} className="w-full" />
      {(chkDot || shdw) && <div className={`absolute inset-0${chkDot ? " " + styles.dotted : ""}`} style={{ backgroundColor: shdw }} />}
      {text && getBgtext()}
    </div>
  );
};

export default PageImage;
