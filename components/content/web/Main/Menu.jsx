import Link from "next/link";
import Image from "next/image";
import Bulletin from "./Bulletin";
import dynamic from "next/dynamic";
import PageImage from "./PageImage";
import Breadcrumb from "./Breadcrumb";
import DynamicForm from "@/components/form/DynamicForm";
import PageExt from "@/components/extentions/web/PageExt";

// loading: () => <div className="h-96 bg-gray-100 flex items-center justify-center">Slider Yükleniyor...</div>,
const DynamicSlider = dynamic(() => import("@/components/extentions/web/Slider"), { ssr: false });

const Menu = ({ data, dict, list, media, stn }) => {
  const { aside, bulten, fk, fpos, galeri, grid, image, left, ptyp, slide, text } = data;

  const handleLeft = (left) => {
    return (
      <aside className="basis-1/4 xl:block hidden">
        <div className={`sticky top-28 flex flex-col 2xl:gap-10 gap-6 transition-all duration-500`}>
          {Object.keys(left).map((elm, key) => {
            if (elm === "dir") return "";
            switch (elm[0]) {
              case "f":
                const formSchema = {
                  lang: stn?.lang,
                  name: "lform",
                  title: dict[35],
                  submit: { class: "py-2.5 w-full bg-black text-white rounded-sm duration-300 opacity-75 hover:opacity-100", text: dict[40] },
                  fields: [
                    { type: "text", name: "name", placeholder: dict[36], rules: [{ type: "required" }, { type: "min", value: 3 }] },
                    { type: "email", name: "email", placeholder: dict[37], rules: [{ type: "required" }, { type: "email" }] },
                    { type: "tel", name: "phone", placeholder: dict[38], rules: [{ type: "required" }, { type: "tel" }] },
                    {
                      type: "select",
                      name: "topic",
                      options: [
                        { label: "Genel", value: "general" },
                        { label: "Teknik", value: "tech" },
                      ],
                      rules: [{ type: "required" }],
                    },
                    { type: "textarea", name: "message", placeholder: dict[39], rules: [{ type: "required" }, { type: "min", value: 5 }] },
                  ],
                };
                return (
                  <div key={key} className="p-5 bg-light/20 shadow">
                    <DynamicForm dict={dict} schema={formSchema} submitEndpoint={process.env.NEXT_PUBLIC_MEDIA_URL} />
                  </div>
                );
              case "c":
                return (
                  <div key={key}>
                    <div className="mb-4 border-b before:-bottom-[0.05rem]">
                      <h4 className="text-lg font-normal">{left[elm][0].title}</h4>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      {elm[1] === "b"
                        ? left[elm].map((el) => (
                            <Link key={el.id} href={el.url} className="p-3 flex items-center gap-4 shadow bg-light/20 group">
                              <div className="w-20 h-20 flex flex-col items-center justify-center rounded-full shadow bg-white">
                                {el.date.map((d, i) => (
                                  <small key={i}>{d}</small>
                                ))}
                              </div>
                              <div className="flex-1 space-y-1">
                                <h5 className="inline-flex line-clamp-1 text-blue-500 btn-mine">{el.ttl}</h5>
                                <small className="line-clamp-1">{el.auth}</small>
                              </div>
                            </Link>
                          ))
                        : left[elm].map((el, ky) => (
                            <Link key={ky} href={el.url} className="p-3 flex items-center gap-4 btn-mine border-b rounded-t-lg">
                              <Image alt={el.ttl} src="/images/treatment.png" width={128} height={128} className="w-14 h-14 rounded" />
                              <div>
                                <h5 className="line-clamp-1">{el.ttl}</h5>
                                {el.short && <small className="mt-1 line-clamp-2">{el.short}</small>}
                              </div>
                            </Link>
                          ))}
                    </div>
                  </div>
                );
              default:
                return (
                  <div key={key} className="bg-white/50">
                    {left[elm][0].title && (
                      <div className="mb-4 border-b before:-bottom-[0.05rem]">
                        <h4 className="text-lg font-normal">{left[elm][0].title}</h4>
                      </div>
                    )}
                    <div className="flex flex-col gap-y-2">
                      {left[elm].map((el, ky) => (
                        <Link key={ky} href={el.url} className={`${ky ? "pt-3 px-1 pb-1 border-t" : "p-1"} duration-300 hover:text-brand`}>
                          <h5 className="line-clamp-1">{el.ttl}</h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
            }
          })}
        </div>
      </aside>
    );
  };

  const FillContent = () => {
    const { mntxt, show, ttl } = text;
    const alng = mntxt.align === "1" ? [" items-center", " center text-center", " text-center"] : ["", "", ""];

    return (
      <div className={`${fpos === "1" ? "pt-10" : "py-10"} content`}>
        {(left || show === "0" || mntxt || aside) && (
          <div className={`flex flex-grow basis-4${left.dir === "1" ? " flex-row-reverse" : ""} 2xl:gap-10 gap-8`}>
            {left && handleLeft(left)}
            <div className={`basis-full${left ? " xl:basis-3/4" : ""}`}>
              {!ptyp && <Breadcrumb fk={fk} list={list} title={ttl} />}
              {(show === "0" || mntxt || aside) && (
                <div className="grid grid-cols-1 2xl:gap-8 gap-6 overflow-hidden">
                  {image.src !== "site/no_img.svg" && parseInt(image.dot) > 1 && <PageImage alt={text.ttl} image={image} pos={0} />}
                  {(show === "0" || mntxt.subttl || mntxt.short || mntxt.desc) && (
                    <div className={`flex flex-col${alng[0]} gap-5`}>
                      {(show === "0" || mntxt.subttl) && <strong className={`${alng[1]} 2xl:text-2xl text-xl`}>{mntxt.subttl ? mntxt.subttl : ttl}</strong>}
                      {mntxt.short && <h3 className={`2xl:text-xl text-lg${alng[2]}`}>{mntxt.short}</h3>}
                      {mntxt.desc && <div className="edt" dangerouslySetInnerHTML={{ __html: mntxt.desc }} />}
                    </div>
                  )}
                  {left && aside && <PageExt data={[0, aside, grid]} />}
                </div>
              )}
            </div>
          </div>
        )}
        {galeri && <PageExt data={[1, galeri, grid]} />}
        {bulten === "1" && <Bulletin dict={dict} lang={stn.lng} />}
      </div>
    );
  };

  return (
    <main>
      {media && <div className="mt-4 container">{slide ? <DynamicSlider data={slide} /> : <PageImage alt={text.ttl} image={image} />}</div>}
      <FillContent />
    </main>
  );
};

export default Menu;
