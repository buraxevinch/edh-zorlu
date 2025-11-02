import Main from "@/components/content/web/Main";
import Header from "@/components/content/web/Header";
import Footer from "@/components/content/web/Footer";

const WebContent = ({ data, setting, slug }) => {
  const { dict, menus, settings } = setting;
  const shouldRenderMedia = data?.slide || (data?.image && data?.image.src !== "site/no_img.svg" && parseInt(data?.image.dot) < 2);

  return (
    <>
      <Header dict={dict} media={shouldRenderMedia} menus={menus} slug={slug} stn={settings} />
      <Main data={data} dict={dict} list={menus} media={shouldRenderMedia} stn={settings} />
      <Footer dict={dict} slug={slug} stn={settings} />
    </>
  );
};

export default WebContent;
