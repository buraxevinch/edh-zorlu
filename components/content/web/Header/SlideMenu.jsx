"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/extentions/Icon";

const SlideMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        <div className="py-2 flex flex-col items-end gap-y-1.5 group cursor-pointer" onClick={() => setShow(true)}>
          {new Array(3).fill().map((_, key) => (
            <span key={key} className={`${key ? (key > 1 ? "w-7" : "w-5") : "w-3"} h-0.5 bg-gray-400 rounded-full duration-500 group-hover:w-7`} />
          ))}
        </div>
      </div>
      <div className={`fixed inset-0 ${show ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10"} transition-all duration-300 bg-black/20`}>
        <div className={`w-2/3 absolute inset-y-0 ${show ? "left-0" : "-right-full"} bg-transparent`} onClick={() => setShow(false)} />
        <div className={`p-8 w-1/3 absolute top-0 ${show ? "right-0" : "-right-full"} bottom-0 transition-all duration-500 bg-light border-l border-l-dark`}>
          <div className="p-1 absolute top-px left-px bg-red-500 text-white cursor-pointer transition-all duration-500 hover:bg-red-700" onClick={() => setShow(false)}>
            <Icon icon="close" />
          </div>
          <div className="mt-6 flex flex-col items-center gap-5">
            <Image alt="Cagdas Kislaoglu logo" src="/images/logo.png" width={320} height={48} />
            <p className="text-xl text-center leading-9">
              Bu alana, iletişim bilgileri ve sosyal media erişim linklerini ekleyebiliriz. Yada ana menüleri yerleştirilip, mevcut menülerin olduğu alana logoyu yerleştirebiliriz.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideMenu;
