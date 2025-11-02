import Link from "next/link";
import DynamicForm from "@/components/form/DynamicForm";
import OpenVideo from "@/components/extentions/OpenVideo";
import ShowImages from "@/components/extentions/ShowImages";

const Blog = ({ data, dict }) => {
  const { lang, left, list, props, text, video } = data;
  const { auth, cat, time, title } = props;
  const { desc, short, subttl, ttl } = text;

  const handleLeft = () => {
    const formSchema = {
      lang: lang,
      name: "lform",
      title: dict[35],
      submit: { class: "py-2.5 w-full bg-black text-white rounded-sm duration-300 opacity-75 hover:opacity-100", text: dict[40] },
      fields: [
        { type: "text", name: "name", placeholder: dict[36], rules: [{ type: "required" }, { type: "min", value: 3 }] },
        { type: "email", name: "email", placeholder: dict[37], rules: [{ type: "required" }, { type: "email" }] },
        { type: "textarea", name: "message", placeholder: dict[39], rules: [{ type: "required" }, { type: "min", value: 5 }] },
      ],
    };

    return (
      <aside className="basis-1/4 xl:block hidden">
        <div className="sticky top-28 flex flex-col 2xl:gap-10 gap-6 transition-all duration-500">
          <div>
            {title && (
              <div className="mb-4 border-b before:-bottom-[0.05rem]">
                <h4 className="text-lg font-normal">{title}</h4>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              {left.map((el, ky) => (
                <Link key={ky} href={el.url} className={`${ky ? "pt-3 px-1 pb-1 border-t" : "p-1"} duration-300 hover:text-black`}>
                  <h5 className="line-clamp-1">{el.ttl}</h5>
                </Link>
              ))}
            </div>
          </div>
          {video && (
            <div>
              <OpenVideo title={ttl} video={video} />
            </div>
          )}
          <div className="p-5 bg-light/20 shadow">
            <DynamicForm dict={dict} schema={formSchema} submitEndpoint={process.env.NEXT_PUBLIC_MEDIA_URL} />
          </div>
        </div>
      </aside>
    );
  };

  return (
    <main>
      <div className="py-8 bg-light/70">
        <div className="container">
          <div className="flex flex-col items-center gap-2">
            <strong className="2xl:text-2xl text-xl uppercase text-tclr">{subttl ? subttl : ttl}</strong>
            <small className="text-red-500">{cat}</small>
            <div className="flex items-center gap-2">
              <span className="text-sky-600">{auth}</span>-<span className="text-gray-500">{time}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 py-10 content">
        <div className="flex flex-grow basis-4 2xl:gap-10 gap-8">
          <div className={`basis-full${left ? " xl:basis-3/4" : ""}`}>
            <div className="grid grid-cols-1 2xl:gap-8 gap-6 overflow-hidden">
              {short && <h3 className="2xl:text-2xl text-xl text-center">{short}</h3>}
              {list && <ShowImages list={list} ttl={ttl} video={video} />}
              {desc && <div className="edt" dangerouslySetInnerHTML={{ __html: desc }} />}
            </div>
          </div>
          {left && handleLeft()}
        </div>
      </div>
    </main>
  );
};

export default Blog;
