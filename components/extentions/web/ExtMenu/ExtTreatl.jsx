import Link from "next/link";
import Image from "next/image";
import { normalizeText } from "../extUtils";

const ExtTreatl = ({ cls, data }) => {
  const { det, list, text } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div>
      {text && (
        <div className="mb-6 grid grid-cols-1 gap-4 text-center">
          {text.map((t, k) =>
            k ? (
              <p key={k} className={t.size + " whitespace-pre-line"}>
                {normalizeText(t.txt)}
              </p>
            ) : (
              <h3 key={k} className={t.size}>
                {t.txt}
              </h3>
            )
          )}
        </div>
      )}
      <div className={"grid " + cls + " gap-8"}>
        {list.map((item, key) => (
          <Link key={key} href={item.url} className="relative group" title={det}>
            <figure>
              <Image
                alt={item.ttl}
                src={root + item.img.src}
                width={item.img.wdt}
                height={item.img.hgh}
                placeholder="blur"
                blurDataURL={item.base}
                className="w-full h-full object-cover rounded-3xl shadow-md"
              />
              <figcaption className="text-center relative">
                <div className="p-2 w-16 h-16 flex items-center justify-center absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-full -rotate-45 duration-300 group-hover:rotate-0">
                  <svg width="32" height="32" viewBox="0 0 20 20" aria-hidden="true" className="text-lime-500">
                    <line fill="none" stroke="#668497" x1="3.47" y1="10" x2="15.47" y2="10" />
                    <polyline fill="none" stroke="#668497" points="11.98 13.84 15.82 10 11.98 6.16" />
                  </svg>
                </div>
                <div className="pt-4 relative bg-white">
                  <h4 className="font-semibold text-lg leading-5">{item.ttl}</h4>
                  <small className="text-tclr">{item.cat}</small>
                </div>
                <span className="-ml-[51px] w-5 h-10 absolute -top-10 left-1/2 rounded-br-3xl shadow-[0_20px_0_0_#fff]" />
                <span className="-mr-[51px] w-5 h-10 absolute -top-10 right-1/2 rounded-bl-3xl shadow-[0_20px_0_0_#fff]" />
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExtTreatl;
