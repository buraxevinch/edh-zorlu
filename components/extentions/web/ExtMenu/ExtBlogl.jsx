import Link from "next/link";
import Image from "next/image";
import { normalizeText } from "../extUtils";

const ExtBlogl = ({ cls, data }) => {
  const { det, list, text } = data;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";

  return (
    <div>
      {text && (
        <div className="grid grid-cols-1 gap-4 text-center">
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
      <div className={"pt-12 grid " + cls + " gap-y-14 gap-x-8"}>
        {list.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className={`${item.id % 2 ? "pt-8 px-5 pb-5" : "pt-5 px-5 pb-8"} h-full flex flex-col items-center text-center gap-3 relative bg-light/50 shadow rounded-2xl group`}
            title={det}
          >
            {item.id % 2 === 1 && (
              <>
                <span className="w-16 h-16 flex items-center justify-center absolute -top-8 bg-white border-8 border-light/50 rounded-full">{item.id}</span>
                <div>
                  <h4 className="font-medium text-lg">
                    <span className="btn-mine">{item.ttl}</span>
                  </h4>
                  <small>{item.cat}</small>
                </div>
                {/* {item.short && <small>{item.short}</small>} */}
              </>
            )}
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image
                alt={item.ttl}
                src={root + item.img.src}
                width={item.img.wdt}
                height={item.img.hgh}
                placeholder="blur"
                blurDataURL={item.base}
                className="w-full h-full object-cover duration-300 group-hover:scale-105"
              />
            </div>
            {item.id % 2 === 0 && (
              <>
                <span className="w-16 h-16 flex items-center justify-center absolute -bottom-8 bg-white border-8 border-light/50 rounded-full">{item.id}</span>
                <div>
                  <h4 className="font-medium text-lg">
                    <span className="btn-mine">{item.ttl}</span>
                  </h4>
                  <small>{item.cat}</small>
                </div>
                {/* {item.short && <small>{item.short}</small>} */}
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExtBlogl;
