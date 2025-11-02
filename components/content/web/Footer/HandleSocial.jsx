import Image from "next/image";
import { Icon } from "@/components/extentions/Icon";

const HandleSocial = ({ data, text }) => {
  const socials = data?.filter((s) => s.typ === 1 || s.typ === 3);
  if (!socials?.length) return false;
  const root = process.env.NEXT_PUBLIC_MEDIA_URL + "/public/images/social/";

  return (
    <div className="mb-2 container">
      {text && <b className="mb-3 block text-center text-lg text-tclr">{text}</b>}
      <div className="flex items-center justify-center gap-3">
        {socials.map((itm, key) => (
          <a
            key={key}
            href={itm.url}
            rel="noopener noreferrer"
            target="_blank"
            className={`p-1 relative group${key ? " before:w-px before:absolute before:top-0 before:-left-1.5 before:bottom-0 before:bg-gray-300" : ""} `}
            title={itm.ttl}
          >
            {itm.icon.indexOf(".") > -1 ? (
              <Image alt={itm.ttl} src={root + itm.icon} width="32" height="32" className="grayscale duration-500 group-hover:grayscale-0 pointer-events-none" />
            ) : (
              <Icon icon={itm.icon} size={32} className="text-gray-400 duration-500 group-hover:text-[var(--clr)] pointer-events-none" style={{ "--clr": itm.clr }} />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HandleSocial;
