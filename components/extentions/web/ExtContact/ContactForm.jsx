import DynamicForm from "@/components/form/DynamicForm";

const ContactForm = ({ data, dict }) => {
  const { fields, grid, lang, name, submit, title } = data;
  const formSchema = {
    lang: lang,
    name: name,
    // rows: "grid grid-cols-6 " + grid,
    title: title,
    // submit: submit,
    submit: { class: "py-2.5 w-full bg-black text-white rounded-sm duration-300 opacity-75 hover:opacity-100", text: submit.text },
    fields: fields,
  };

  return <DynamicForm dict={dict} schema={formSchema} submitEndpoint={process.env.NEXT_PUBLIC_MEDIA_URL} />;
};

export default ContactForm;
