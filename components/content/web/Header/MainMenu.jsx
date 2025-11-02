import Link from "next/link";
import { MenuLinkClick } from "./MenuLinkClick";

const MenuItem = ({ item, nodes, pathname }) => {
  const hasChildren = nodes.some((n) => n.fk === item.id);
  const isActive = pathname === item.url || (pathname.startsWith(item.url + "/") && item.url !== `/${pathname.split("/")[1]}`);
  const cls = "mnTtl flex items-center" + (item.fk ? "" : " h-24 font-normal") + (isActive ? " active" : "");
  const sub = item.show?.indexOf("parent") > -1 ? " before:-mt-0.5 before:w-1 before:h-1 before:absolute before:top-1/2 before:-left-1.5 before:bg-gray-400 before:rounded-full" : "";

  return (
    <li className={item.show + sub}>
      {item.lnk === 1 ? (
        item.clck ? (
          <MenuLinkClick item={item} cls={cls}>
            {item.title}
          </MenuLinkClick>
        ) : (
          <Link href={item.url} className={cls}>
            {item.title}
          </Link>
        )
      ) : (
        <span className={cls}>{item.title}</span>
      )}

      {hasChildren && (
        <ul className="p-4 w-60 flex flex-col gap-y-2 absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-md duration-300">
          {nodes
            .filter((child) => child.fk === item.id)
            .map((child) => (
              <MenuItem key={child.id} item={child} nodes={nodes} pathname={pathname} />
            ))}
        </ul>
      )}
    </li>
  );
};

const MainMenu = ({ items, path }) => {
  return (
    <nav className="hvrNav">
      <ul className="mList w-full flex justify-center gap-x-5 relative">
        {items
          .filter((item) => item.fk === 0)
          .map((item) => (
            <MenuItem key={item.id} item={item} nodes={items} pathname={path} />
          ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
