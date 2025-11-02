export const setCls = (data, g, t, s) => {
  let rcl = s ? [] : "";
  const cls = g.split(",");
  const sz = ["2xl:", "xl:", "lg:"];
  cls.forEach((e, i) => {
    // if (data[0]) cls[i] = parseInt(e) + 1;
    if (s) rcl[i] = parseInt(cls[i]) - (data[0] ? 0 : 1);
    else rcl += `${i ? " " : ""}${sz[i]}${t ? "columns" : "grid-cols"}-${cls[i]}`;
  });
  return rcl;
};

export const renderStaticExt = (extKey, obj) => {
  if (extKey === "gj") {
    return obj?.web ? <div className="jumbotron pt-10" dangerouslySetInnerHTML={{ __html: obj.web }} /> : null;
  }
  if (extKey === "tx") {
    const alng = obj.align ? [" items-center", " center text-center", " text-center"] : ["", "", ""];
    return (
      (obj.subttl || obj.short || obj.desc) && (
        <div className={`flex flex-col${alng[0]} gap-5`}>
          {obj.subttl && <h3 className={`${alng[1]} 2xl:text-2xl text-xl`}>{obj.subttl}</h3>}
          {obj.short && <h4 className={`2xl:text-xl text-lg${alng[2]}`}>{obj.short}</h4>}
          {obj.desc && <div className="edt" dangerouslySetInnerHTML={{ __html: obj.desc }} />}
        </div>
      )
    );
  }
  return null;
};

export const normalizeText = (text = "") => {
  return text
    .replaceAll(/<br\s*\/?>/gi, "\n")
    .replaceAll(/\r\n/g, "\n")
    .replaceAll(/\r/g, "\n")
    .replaceAll(/\\r\\n|\\n|\\r/g, "\n")
    .trim();
};

export const horizontalText = (text, cls = 0) => {
  const strLeft = text.split("").reverse();
  const props = cls ? [" justify-center", " h-full"] : ["", ""];

  return (
    <div className={`col-span-1 flex items-center${props[0]}`}>
      <div className={`py-2 px-4${props[1]} flex flex-col items-center justify-center bg-white border-8 text-xl border-light text-gray-400`}>
        {strLeft.map((l, k) => (
          <b key={k} className="-rotate-90">
            {l}
          </b>
        ))}
      </div>
    </div>
  );
};
