import { Icon } from "@/components/extentions/Icon";

const GetContact = ({ data }) => {
  const cnt = data.reduce((acc, info) => {
    const key = info.act;
    if (!acc[key]) acc[key] = [];
    acc[key].push(info);
    return acc;
  }, {});

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">{data[0].title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {cnt[1].map((item, key) => (
          <a key={key} href={(key ? "tel:" : "mailto:") + item.url} className="flex items-center gap-2" title={item.ttl}>
            <Icon icon={item.icon} size={20} className="shrink-0" />
            {item.url}
          </a>
        ))}
        {cnt[2] !== undefined && (
          <a href={cnt[2][0].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" title="Whatsapp">
            <Icon icon={cnt[2][0].icon} size={20} className="shrink-0" />
            {cnt[2][0].ttl}
          </a>
        )}
        <div className="flex items-center gap-2">
          <Icon icon={cnt[3][0].icon} size={24} className="shrink-0" />
          <p className="text-sm whitespace-pre-wrap">{cnt[3][0].txt}</p>
        </div>
      </div>
    </div>
  );
};

export default GetContact;
