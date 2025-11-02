import Link from "next/link";

const Breadcrumb = ({ fk, list, title }) => {
  const parent = fk ? list.find((item) => item.id === fk) : list[0];

  return (
    <div className="-mt-6 mb-2 flex items-center justify-end gap-2 text-xs">
      {parent.lnk ? (
        <Link href={parent.url} className="btn-mine text-sky-600">
          {parent.title}
        </Link>
      ) : (
        <span className="text-sky-600">{parent.title}</span>
      )}
      /<span className="text-gray-500">{title}</span>
    </div>
  );
};

export default Breadcrumb;
