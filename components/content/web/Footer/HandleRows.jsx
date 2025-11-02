import Link from "next/link";

const HandleRows = ({ data, slug }) => {
  return Object.entries(data).map(([ttl, group], ind) => {
    return (
      <div key={ind}>
        <h3 className="mb-4 text-lg font-medium">{ttl}</h3>
        <div className="grid grid-cols-1 gap-2">
          {group.map((item, key) => (
            <Link key={key} href={item.url} className={`duration-300 ${item.url === slug ? "text-red-500" : "hover:text-blue-400"}`}>
              {item.ttl}
            </Link>
          ))}
        </div>
      </div>
    );
  });
};

export default HandleRows;
