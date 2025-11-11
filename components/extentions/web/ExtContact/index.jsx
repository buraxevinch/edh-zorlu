import { normalizeText } from "../extUtils";
import ContactForm from "./ContactForm";

const ExtContact = ({ data, dict }) => {
  const size = data?.type > 1 ? "lg:grid-cols-2 " : "";
  const list = Object.keys(data).filter((e) => e != "type" && e != "page");

  const Address = ({ dt }) => {
    const map = dt.map && dt.map.indexOf("embed") > -1 ? dt.map : "";
    const cnt = [
      { typ: "m", ttl: dict[14], val: dt.mail },
      { typ: "t", ttl: dict[15], val: dt.phone },
      { typ: "t", ttl: dict[16], val: dt.mobil },
      { typ: "s", ttl: dict[17], val: dt.fax },
      { typ: "s", ttl: dict[18], val: dt.sicil },
      { typ: "s", ttl: dict[19], val: dt.vergi },
      { typ: "h", ttl: dict[20], val: dt.hesap },
      { typ: "k", ttl: dict[21], val: map ? "" : dt.map },
      { typ: "a", ttl: dict[23], val: dt.address },
    ];

    return (
      <div className="flex flex-col gap-8">
        <div className="grid 2xl:grid-cols-2 gap-5">
          <div className="col-span-full">
            <h4 className="relative text-xl k-title">{dt.title}</h4>
          </div>
          {cnt.map((i, k) => {
            if (!i.val) return false;
            switch (i.typ) {
              case "a":
                return (
                  <div key={k} className="col-span-full">
                    <small className="font-bold">{i.ttl}</small>
                    <p className="whitespace-pre-line">{normalizeText(i.val)}</p>
                  </div>
                );
              case "k":
                return (
                  <div key={k}>
                    <small className="font-bold">{i.ttl}</small>
                    <a href={i.val} className="block truncate text-sm text-blue-500" target="_blank">
                      {dict[22]}
                    </a>
                  </div>
                );
              case "m":
                return (
                  <div key={k}>
                    <small className="block font-bold">{i.ttl}</small>
                    <a href={"mailto:" + i.val} className="btn-mine" rel="noopener noreferrer">
                      {i.val}
                    </a>
                  </div>
                );
              case "s":
                return (
                  <div key={k}>
                    <small className="font-bold">{i.ttl}</small>
                    <p>{i.val}</p>
                  </div>
                );
              case "t":
                return (
                  <div key={k}>
                    <small className="block font-bold">{i.ttl}</small>
                    <a href={"tel:" + i.val} className="btn-mine" rel="noopener noreferrer">
                      {i.val}
                    </a>
                  </div>
                );
            }
          })}
        </div>
        {Object.keys(dt.hesap).length > 0 && (
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-full">
              <h4 className="relative text-lg k-title">{cnt[6].ttl}</h4>
            </div>
            {Object.entries(cnt[6].val).map(([t, b], ky) => (
              <div key={ky}>
                <div key={ky} className="flex flex-col">
                  <small className="font-bold">{t}</small>
                  <span>{b}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {map && (
          <div>
            <iframe
              border={0}
              width="100%"
              height={300}
              title={dict[36]}
              loading="lazy"
              src={dt.map}
              allowFullScreen
              className="p-1 2xl:h-80 h-64 border"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={`${Object.keys(data).length < 3 ? "mx-auto w-1/2 " : ""}grid ${size}grid-cols-1 2xl:gap-10 gap-6`}>
        {list.map((i, k) => (
          <div key={k}>{i === "form" ? <ContactForm data={data?.form} dict={dict} /> : <Address dt={data[i]} />}</div>
        ))}
      </div>
    </div>
  );
};

export default ExtContact;
