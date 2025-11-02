import Link from "next/link";
import Image from "next/image";
import MainMenu from "./MainMenu";
import SlideMenu from "./SlideMenu";

const Header = ({ dict, media, menus, slug, stn }) => {
  const { cusName, lang, logo } = stn;
  const path = "/" + stn.lang + "/" + (Array.isArray(slug) ? slug.join("/") : "");

  return (
    <header className="w-full sticky top-0 shadow bg-white z-40">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href={`/${lang}`}>
              <Image src={logo.img} alt={cusName + " logo"} width={Number(logo.width)} height={Number(logo.height)} priority />
            </Link>
          </div>
          <MainMenu items={menus} path={path} />
          <SlideMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
