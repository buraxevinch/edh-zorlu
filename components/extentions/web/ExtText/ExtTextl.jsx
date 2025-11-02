"use client";
import Image from "next/image";
import GetTtl from "@/components/extentions/GetTtl";
import { Icon } from "@/components/extentions/Icon";
import Link from "next/link";

const clearHTML = (str, typ = "") => {
  if (typ) {
    const div = document.createElement("div");
    div.innerHTML = str;
    let text = div.innerText || div.textContent || "";
    return <p className="mt-0.5 text-sm line-clamp-2">{text.replace(/\s+/g, " ").trim()}</p>;
  }
  return <div dangerouslySetInnerHTML={{ __html: str }} />;
};

const ExtTextl = ({ cls, data }) => {
  const { list, props, text } = data;
  const { det, gtype } = props;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/";
  const uTyp = ["", "", "mailto:", "tel:"];

  const fillGlry = () => {
    switch (gtype) {
      case 0:
        return (
          <div>
            {text && <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />}
            <div className={"p-2 grid " + cls + " gap-5"}>
              {list.map((item, key) => (
                <div key={key} className="flex items-center relative shadow">
                  <div className="p-4 h-full flex items-center justify-center pointer-events-none bg-brand/10">
                    {item.icon.icn.indexOf(".") > -1 ? (
                      <Image alt={item.txt.ttl} src={root + "txt/" + item.icon.icn} width={96} height={96} className="w-12 object-contain" />
                    ) : (
                      <Icon icon={item.icon.icn} size={48} color={item.icon.clr} />
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <span className="text-lg">{item.txt.ttl}</span>
                    {item.txt.dsc && clearHTML(item.txt.dsc, 1)}
                  </div>
                  {item.url &&
                    (item.url[1] ? (
                      <a href={uTyp[item.url[1]] + item.url[0]} rel="noopener noreferrer" target={item.url[1] < 2 ? "_blank" : undefined} className="absolute inset-0 hover:shadow-lg" />
                    ) : (
                      <Link href={item.url[0]} title={det} className="absolute inset-0 hover:shadow-lg" />
                    ))}
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            {text && <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />}
            <div className={"p-2 grid " + cls + " gap-6"}>
              {list.map((item, key) => (
                <div key={key} className={`p-5 flex flex-col items-center justify-center gap-y-4 text-center relative${item.url ? " duration-300 hover:scale-105" : ""} shadow-lg bg-white`}>
                  {item.icon.icn.indexOf(".") > -1 ? (
                    <Image alt={item.txt.ttl} src={root + "txt/" + item.icon.icn} width={80} height={80} className="w-20 object-contain" />
                  ) : (
                    <Icon icon={item.icon.icn} size={80} color={item.icon.clr} />
                  )}
                  <div className="flex flex-col gap-y-2">
                    <b className="text-lg text-brand">{item.txt.ttl}</b>
                    {item.txt.dsc && clearHTML(item.txt.dsc, 1)}
                  </div>
                  {item.url &&
                    (item.url[1] ? (
                      <a href={uTyp[item.url[1]] + item.url[0]} rel="noopener noreferrer" target={item.url[1] < 2 ? "_blank" : undefined} className="absolute inset-0 hover:shadow-lg" />
                    ) : (
                      <Link href={item.url[0]} title={det} className="absolute inset-0 hover:shadow-lg" />
                    ))}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        const lst = [[], []];
        list.forEach((el, ind) => lst[ind % 2 ? 1 : 0].push(el));
        return (
          <div>
            {text && <GetTtl ttl={text.title} subttl={text.dsc} pos={text.shw} />}
            <div className="grid grid-cols-2 gap-4">
              {lst.map((items, ky) => (
                <AccordionList key={ky} data={items} det={det} />
              ))}
            </div>
          </div>
        );
    }
  };

  return fillGlry();
};

export default ExtTextl;
