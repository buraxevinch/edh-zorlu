import dynamic from "next/dynamic";
const Blog = dynamic(() => import("./Blog"), { ssr: true });
const Info = dynamic(() => import("./Info"), { ssr: true });
const Menu = dynamic(() => import("./Menu"), { ssr: true });
const Treatment = dynamic(() => import("./Treatment"), { ssr: true });

const Main = ({ data, dict, list, media, stn }) => {
  switch (data?.type) {
    case "blog":
      return <Blog data={data} dict={dict} />;
    case "info":
      return <Info data={data} />;
    case "treatment":
      return <Treatment data={data} dict={dict} />;
    default:
      return <Menu data={data} dict={dict} list={list} media={media} stn={stn} />;
  }
};

export default Main;
