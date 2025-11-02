"use client";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

function buildYupForField(field) {
  const { type, rules } = field;
  let v;

  if (type === "file") v = field.multiple ? Yup.mixed() : Yup.mixed();
  else if (type === "select" && field.multiple) v = Yup.array().of(Yup.mixed());
  else if (type === "date") v = Yup.date().typeError("Geçerli bir tarih girin");
  else if (type === "checkbox" && field.multiple) v = Yup.array().of(Yup.string());
  else if (type === "number") v = Yup.number().typeError("Lütfen sayısal bir değer girin");
  else if (type === "phone") v = Yup.string().test("is-valid-phone", "Geçerli bir telefon girin", (val) => !val || isValidPhoneNumber(val));
  else v = Yup.string();

  (rules || []).forEach((r) => {
    switch (r.type) {
      case "required":
        v = v.required(r.message || "Bu alan zorunludur");
        break;
      case "requiredIf": {
        const dep = r.field;
        v = v.when(dep, {
          is: (val) => ("equals" in r ? val === r.equals : "notEquals" in r ? val !== r.notEquals : r.in ? (r.in || []).includes(val) : false),
          then: (schema) => schema.required(r.message || "Bu alan zorunludur"),
        });
        break;
      }
      case "email":
        v = v.email(r.message || "Geçerli bir e-posta girin");
        break;
      case "url":
        v = v.url(r.message || "Geçerli bir URL girin");
        break;
      case "min":
        if (type === "number") v = v.min(r.value, r.message || `En az ${r.value}`);
        else v = v.min(r.value, r.message || `En az ${r.value} karakter`);
        break;
      case "max":
        if (type === "number") v = v.max(r.value, r.message || `En fazla ${r.value}`);
        else v = v.max(r.value, r.message || `En fazla ${r.value} karakter`);
        break;
      case "length":
        v = v.length(r.value, r.message || `Uzunluk ${r.value} olmalı`);
        break;
      case "matches":
        v = v.matches(new RegExp(r.regex, r.flags), r.message || "Geçersiz format");
        break;
      case "oneOf":
        v = v.oneOf(r.values || [], r.message || "Geçersiz değer");
        break;
      default:
        break;
    }
  });

  return v;
}

function buildValidationSchema(fields) {
  const shape = {};
  fields.forEach((f) => (shape[f.name] = buildYupForField(f)));
  return Yup.object().shape(shape);
}

function buildInitialValues(fields) {
  const init = {};
  fields.forEach((f) => {
    if (typeof f.defaultValue !== "undefined") init[f.name] = f.defaultValue;
    else if (f.type === "checkbox" && f.multiple) init[f.name] = [];
    else if (f.type === "select" && f.multiple) init[f.name] = [];
    else if (f.type === "file") init[f.name] = f.multiple ? [] : null;
    else init[f.name] = "";
  });
  return init;
}

function InputError({ name, type }) {
  const errClass = type ? "absolute -top-6 left-0 text-sm text-orange-300" : "absolute -top-3.5 left-0 text-sm text-red-600";
  return <ErrorMessage name={name} render={(msg) => <div className={errClass}>{msg}</div>} />;
}

function shouldShowField(field, values) {
  const c = field.showIf;
  if (!c) return true;
  const v = values[c.field];
  if ("equals" in c) return v === c.equals;
  if ("notEquals" in c) return v !== c.notEquals;
  if (c.in) return (c.in || []).includes(v);
  return true;
}

async function loadAsyncOptions(field) {
  if (!field.optionsEndpoint) return field.options || [];
  const res = await fetch(field.optionsEndpoint, { cache: "no-store" });
  if (!res.ok) return field.options || [];
  const data = await res.json();
  const map = field.optionsMap || { labelKey: "label", valueKey: "value" };
  return (Array.isArray(data) ? data : []).map((it) => ({
    label: it[map.labelKey],
    value: it[map.valueKey],
  }));
}

// function hasAnyFile(values, fields) { return fields.some((f) => f.type === "file" && values[f.name]); }

export default function DynamicForm({ schemaEndpoint, submitEndpoint, dict, schema: inlineSchema }) {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVersion, setFormVersion] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        let data = inlineSchema;
        if (!data) {
          const res = await fetch(schemaEndpoint, { cache: "no-store" });
          if (!res.ok) throw new Error(`Şema alınamadı: ${res.status}`);
          data = await res.json();
        }

        const fields = await Promise.all((data.fields || []).map(async (f) => ({ ...f, options: await loadAsyncOptions(f) })));
        setSchema({ ...data, fields });
      } catch (e) {
        setError(e.message || "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    })();
  }, [schemaEndpoint, inlineSchema]);

  const validationSchema = useMemo(() => (schema ? buildValidationSchema(schema.fields) : null), [schema]);
  const initialValues = useMemo(() => (schema ? buildInitialValues(schema.fields) : {}), [schema]);

  if (loading) return <div>Yükleniyor…</div>;
  if (error) return <div className="text-red-600">Hata: {error}</div>;
  if (!schema) return <div>Şema bulunamadı.</div>;

  const onSubmit = async (values, { resetForm }) => {
    toast.dismiss();
    const msg = toast.loading(dict[11]);
    try {
      const body = new FormData();
      body.append("lng", schema.lang);
      body.append("fname", schema.name);
      schema.fields.forEach((f) => {
        const val = values[f.name];
        if (Array.isArray(val)) {
          val.forEach((v) => body.append(`${f.name}[]`, v));
        } else if (typeof val === "object" && val !== null) {
          body.append(f.name, JSON.stringify(val));
        } else {
          body.append(f.name, val ?? "");
        }
      });

      const res = await fetch(submitEndpoint + "/app/exclass/get-api.php", { method: "POST", body });
      if (!res.ok) throw new Error(`Gönderilemedi (${res.status})`);
      const json = await res.json();
      if (json.success) {
        toast.update(msg, { render: json.msg, type: "success", isLoading: false, autoClose: 3000 });
        resetForm();
        setFormVersion((v) => v + 1);
      } else toast.update(msg, { render: json.msg, type: "error", isLoading: false, autoClose: 3000 });
    } catch (e) {
      toast.update(msg, { render: dict[27], type: "error", isLoading: false });
    }
  };

  return (
    <>
      <Formik key={formVersion} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {({ values, setFieldValue }) => (
          <Form className={schema.rows ? schema.rows : "space-y-3.5"}>
            {schema.title && <h2 className="text-xl">{schema.title}</h2>}
            {schema.description && <p className="text-gray-600">{schema.description}</p>}
            {schema.fields.map((f) => {
              const visible = shouldShowField(f, values);
              if (!visible) return null;

              const commonProps = { name: f.name, className: f.class ? f.class : `p-3${f.type === "select" ? " pr-6 w-full appearance-none" : ""} border-b`, placeholder: f.placeholder };
              if (f.label) commonProps.id = f.name;

              return (
                <div key={f.name} className="flex flex-col relative">
                  {f.label && (f.type !== "checkbox" || f.multiple) ? (
                    <label htmlFor={f.name} className="mb-1 font-medium">
                      {f.label}
                    </label>
                  ) : null}

                  {(() => {
                    switch (f.type) {
                      case "textarea":
                        return <Field as="textarea" rows={4} {...commonProps} />;
                      case "hidden":
                        return <Field type="hidden" {...commonProps} />;
                      case "number":
                        return <Field type="number" {...commonProps} />;
                      case "email":
                      case "text":
                      case "date":
                        return <Field type={f.type} {...commonProps} />;
                      case "tel":
                        return (
                          <PhoneInput
                            name={f.name}
                            defaultCountry="TR"
                            international
                            countryCallingCodeEditable={false}
                            value={values[f.name]}
                            onChange={(v) => setFieldValue(f.name, v || "")}
                            className="p-3 bg-white border-b rounded"
                          />
                        );
                      case "select":
                        return (
                          <div className="relative">
                            <Field
                              as="select"
                              {...commonProps}
                              multiple={!!f.multiple}
                              onChange={(e) => {
                                if (f.multiple) {
                                  const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                                  setFieldValue(f.name, opts);
                                } else {
                                  setFieldValue(f.name, e.target.value);
                                }
                              }}
                            >
                              {!f.multiple && <option value="">Seçiniz</option>}
                              {(f.options || []).map((op) => (
                                <option key={String(op.value)} value={String(op.value)}>
                                  {op.label}
                                </option>
                              ))}
                            </Field>
                            <div className="absolute inset-y-0 right-1.5 flex items-center text-gray-700 pointer-events-none">
                              <svg width="20" height="20" viewBox="0 0 20 20">
                                <polyline fill="none" stroke="#000" strokeWidth="1.03" points="16 7 10 13 4 7" />
                              </svg>
                            </div>
                          </div>
                        );
                      case "radio":
                        return (
                          <div className="flex flex-wrap gap-4">
                            {(f.options || []).map((op) => (
                              <label key={String(op.value)} className="inline-flex items-center gap-2">
                                <Field type="radio" name={f.name} value={String(op.value)} />
                                <span>{op.label}</span>
                              </label>
                            ))}
                          </div>
                        );
                      case "checkbox":
                        if (f.multiple) {
                          return (
                            <div className="flex flex-wrap gap-4">
                              {(f.options || []).map((op) => (
                                <label key={String(op.value)} className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={(values[f.name] || []).includes(String(op.value))}
                                    onChange={(e) => {
                                      const set = new Set(values[f.name] || []);
                                      if (e.target.checked) set.add(String(op.value));
                                      else set.delete(String(op.value));
                                      setFieldValue(f.name, Array.from(set));
                                    }}
                                  />
                                  <span>{op.label}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }
                        return (
                          <label className="inline-flex items-center gap-2">
                            <Field type="checkbox" name={f.name} />
                            <span>{f.label}</span>
                          </label>
                        );
                      case "file":
                        return (
                          <input
                            id={f.name}
                            name={f.name}
                            type="file"
                            multiple={!!f.multiple}
                            accept={f.accept || "*/*"}
                            className="border rounded-lg p-3"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setFieldValue(f.name, f.multiple ? files : files[0] || null);
                            }}
                          />
                        );
                      default:
                        return <div>Desteklenmeyen tip: {f.type}</div>;
                    }
                  })()}

                  <InputError name={f.name} type={schema.name === "bulletin"} />
                </div>
              );
            })}
            <button type="submit" className={schema.submit.class}>
              {schema.submit.text || "Gönder"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
