"use client";
import DynamicForm from "@/components/form/DynamicForm";

const Bulletin = ({ dict, lang }) => {
  const inpClass = "p-3 rounded-lg bg-white/75 durarion-300 focus:bg-white placeholder-gray-500";

  const formSchema = {
    lang: lang,
    name: "bulletin",
    rows: "grid grid-cols-2 gap-6",
    submit: { class: "py-3 w-2/3 bg-dark text-white font-bold rounded-lg duration-300 opacity-75 hover:opacity-100", text: "ABONE OL" },
    fields: [
      { type: "text", name: "name", class: inpClass, placeholder: dict[36], rules: [{ type: "required" }, { type: "min", value: 3 }] },
      { type: "email", name: "email", class: inpClass, placeholder: dict[37], rules: [{ type: "required" }, { type: "email" }] },
    ],
  };

  return (
    <div className="rounded-2xl bg-[url('/images/bulletin_bg.png')] bg-cover bg-center">
      <div className="py-20 px-10 grid grid-cols-2">
        <div className="mb-10 col-span-full flex flex-col gap-3 text-white">
          <h3 className="text-2xl">HABER BÜLTENİ</h3>
          <p className="text-lg whitespace-pre-line">
            E-Bültene kayıt olun kliniğimiz ile ilgili gelişmelerden
            <br />
            ilk siz haberdar olun.
          </p>
        </div>
        <DynamicForm dict={dict} schema={formSchema} submitEndpoint={process.env.NEXT_PUBLIC_MEDIA_URL} />
      </div>
    </div>
  );
};

export default Bulletin;
