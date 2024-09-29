"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react"; // Importa o QRCode
import LogoTeAmoMuito from "@/app/assets/images/logo-te-amo-muito.png";

export default function page({ params }: { params: { slug: string } }) {
  const [buttonText, setButtonText] = useState(
    "Clique aqui para copiar o link"
  );
  const qrCodeRef = useRef<SVGSVGElement>(null); // Ref para o QR Code

  // Função para copiar o link para a área de transferência
  function handleCopy() {
    const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${params?.slug}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Muda o texto do botão para "Link copiado"
        setButtonText("Link copiado");

        // Restaura o texto original após 2 segundos
        setTimeout(() => {
          setButtonText("Clique aqui para copiar o link");
        }, 2000);
      })
      .catch((err) => {
        console.error("Erro ao copiar o link: ", err);
      });
  }

  // Função para redirecionar para o site
  function handleRedirectSite() {
    const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${params?.slug}`;
    window.open(link, "_blank");
  }

  // Função para baixar a imagem do QR Code
  function handleDownloadQRCode() {
    const svgElement = qrCodeRef.current;

    if (svgElement) {
      const svgData = new Blob([svgElement.outerHTML], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgData);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QRCode_${params.slug}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen bg-[#030d21] px-4 max-w-screen w-screen">
      <div className="relative w-[80vw] h-[25vh]">
        <Image
          src={LogoTeAmoMuito}
          alt="Logo Te Amo Muito"
          fill
          className="rounded-lg"
          style={{ objectFit: "contain" }}
          priority // Add this prop
        />
      </div>
      <span className="block mb-2 text-base font-bold tracking-wide text-center text-white uppercase">
        Guarde o link e o QR Code do seu site com cuidado.
      </span>
      <span className="block mb-2 text-xs font-bold tracking-wide text-center text-white uppercase">
        Atenção: Se perder, não será possível recuperá-los.
      </span>
      <div className="bg-white rounded-xl w-[70vw] h-[70vw] mt-7 p-2 flex items-center justify-center">
        <QRCodeSVG
          ref={qrCodeRef} // Adiciona a ref ao QRCodeSVG
          value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${params?.slug}`}
          size={256}
        />
      </div>
      <button
        onClick={handleDownloadQRCode}
        className="bg-white rounded-lg w-[70vw] h-8 mt-7 p-2 flex items-center justify-center"
      >
        <span className="text-xs font-bold tracking-wide text-center uppercase">
          Baixar QR Code
        </span>
      </button>
      <button
        onClick={handleCopy}
        className="bg-white rounded-lg w-[70vw] h-8 mt-2 p-2 flex items-center justify-center"
      >
        <span className="text-xs font-bold tracking-wide text-center uppercase">
          {buttonText}
        </span>
      </button>
      <div className="flex-1" />
      <button
        onClick={handleRedirectSite}
        className="bg-white rounded-lg w-[70vw] h-14 mt-7 p-2 flex items-center justify-center mb-7"
      >
        <span className="font-bold tracking-wide text-center uppercase">
          Acessar meu site
        </span>
      </button>
    </div>
  );
}
