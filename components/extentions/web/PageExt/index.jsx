import { Fragment } from "react";
import extComponentMap from "../extComponentMap";
import { renderStaticExt, setCls } from "../extUtils";

const PageExt = ({ data, int = 0 }) => {
  const extensions = data[1] || {};
  return (
    <>
      {Object.keys(extensions).map((fullExtKey) => {
        const obj = extensions[fullExtKey];
        const shortExtKey = fullExtKey.substring(0, 2);
        const staticRender = renderStaticExt(shortExtKey, obj);

        if (staticRender) return <Fragment key={fullExtKey}>{staticRender}</Fragment>;
        if (obj?.page) {
          const CallPage = extComponentMap[obj.page];
          if (!CallPage || (obj?.list !== undefined && !obj.list.length)) return null;
          if (obj.slide) int++;
          const grd = shortExtKey === "gf" || shortExtKey === "gt" ? obj.props.grid : data[2];
          const sc = setCls(data, grd, 0, obj.slide);
          const currentInt = int % 2 ? 9000 : 12000;

          return (
            <Fragment key={fullExtKey}>
              <CallPage cls={sc} data={obj} int={currentInt} />
            </Fragment>
          );
        }

        return null;
      })}
    </>
  );
};

export default PageExt;
