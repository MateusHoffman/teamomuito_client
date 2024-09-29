"use client";

import { useEffect, useState } from "react";
import Preview from "../components/preview/Preview";
import "@/app/assets/styles/scrollbar.css";
import Image from "next/image";
import LogoTeAmoMuito from "@/app/assets/images/logo-te-amo-muito.png";

const Result = ({ params }: { params: { slug: string } }) => {
  const [openPresent, setOpenPresent] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPurchaseBySlug = async () => {
    const api = process.env.NEXT_PUBLIC_SERVER_URL;
    const path = "/getPurchaseBySlug";
    const response = await fetch(`${api}${path}?slug=${params?.slug}`, {
      method: "GET",
    });
    const result = await response.json();
    return result || null;
  };

  useEffect(() => {
    (async () => {
      if (params?.slug && formData === null) {
        const purchaseBySlug = await getPurchaseBySlug();
        purchaseBySlug && setFormData(purchaseBySlug.data);
        setLoadingData(false);
      }
    })();
  }, [params?.slug]);

  if (openPresent === false) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#030d21] px-4 max-w-screen w-screen">
        {/* <Image
          src={LogoTeAmoMuito}
          alt="Logo Te Amo Muito"
          objectFit="contain"
          className="absolute top-9 py-8 w-[90vw] lg:w[30vw]"
        /> */}
        <div className="w-[90vw] lg:w-[20vw] h-[25vh] absolute top-9">
          <Image
            src={LogoTeAmoMuito}
            alt="Logo Te Amo Muito"
            fill
            style={{ objectFit: "contain" }}
            priority // Add this prop
          />
        </div>
        <button
          onClick={() => setOpenPresent(true)}
          className="p-4 border-2 border-[#DD443A] rounded-lg mt-4"
        >
          <span className="font-bold tracking-wide text-center text-white uppercase">
            ❤️ Abrir meu presente ❤️
          </span>
        </button>
      </div>
    );
  }

  if (loadingData === true) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030d21] px-4">
        <h1 className="text-white">Carregando...</h1>
      </div>
    );
  }

  if (formData === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030d21] px-4">
        <h1 className="text-white">Página não existe</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#030d21] px-4">
      {isClient && (
        <Preview formData={formData} example={false} showPresent={true} />
      )}
    </div>
  );
};

export default Result;
