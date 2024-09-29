"use client";

import { useEffect, useState } from "react";
import Preview from "../components/preview/Preview";
import "@/app/assets/styles/scrollbar.css";

const Result = ({ params }: { params: { slug: string } }) => {
  const [isClient, setIsClient] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPurchaseBySlug = async () => {
    const api = process.env.NEXT_PUBLIC_BASE_URL;
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
        setLoadingData(false)
      }
    })();
  }, [params?.slug]);

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
        <>
          <Preview formData={formData} example={false} showPresent={true} />
        </>
      )}
    </div>
  );
};

export default Result;
