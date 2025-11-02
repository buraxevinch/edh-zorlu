import Image from "next/image";
import GetContact from "./GetContact";
import HandleRows from "./HandleRows";
import HandleSocial from "./HandleSocial";

const appInfo = [
  { ttl: "Ios App", alt: "Ios logo", src: "/images/ios.png" },
  { ttl: "Android App", alt: "Android logo", src: "/images/android.png" },
];

const Footer = ({ dict, slug, stn }) => {
  const { app, contact, cusName, footer, lang, social } = stn;
  const path = "/" + lang + "/" + (Array.isArray(slug) ? slug.join("/") : "");

  return (
    <footer className="mt-auto">
      {social !== undefined && <HandleSocial data={social} text={dict[52]} />}
      <div className="py-6 bg-light">
        <div className="container">
          <div className="grid grid-cols-4 gap-10">
            <div>
              <div className="flex flex-col items-center gap-y-5 text-center">
                <Image src="/images/logo.png" alt={cusName + " logo"} width={320} height={48} />
                <span>{dict[0]}</span>
                {app && (
                  <div className="grid grid-cols-2 gap-4">
                    {app.map(
                      (item, key) =>
                        item && (
                          <a key={key} href={item} rel="noopener noreferrer" target="_blank" className="flex" title={appInfo[key].ttl}>
                            <Image src={appInfo[key].src} alt={appInfo[key].alt} width={420} height={120} />
                          </a>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
            <HandleRows data={footer} slug={path} />
            <GetContact data={contact} />
          </div>
        </div>
      </div>
      <div className="bg-dark">
        <div className="container">
          <div className={`py-2${stn.ilke ? " px-11" : ""} relative text-center text-black/80`}>
            <small>
              Copyright © {new Date().getFullYear()}
              <b className="mx-1 tracking-wider">{stn.cusName}</b>
              {dict[9]}
            </small>
            {stn.ilke && (
              <a href={stn.ilke} target="_blank" className="absolute top-1/2 right-0 -translate-y-1/2 group" title="By ilke media">
                <Image src="/images/ilke.png" alt="ilke media" width={41} height={15} className="grayscale duration-300 group-hover:grayscale-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
