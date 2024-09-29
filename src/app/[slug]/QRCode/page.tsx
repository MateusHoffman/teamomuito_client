"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react"; // Importa o QRCode
import LogoTeAmoMuito from "@/app/assets/images/logo-te-amo-muito.png";
import html2canvas from "html2canvas"; // Importa html2canvas

export default function Page({ params }: { params: { slug: string } }) {
  const [buttonText, setButtonText] = useState(
    "Clique aqui para copiar o link"
  );
  const qrCodeRef = useRef<HTMLDivElement>(null); // Ref para o contêiner do QR Code

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

  // Função para baixar a imagem do QR Code como PNG
  async function handleDownloadQRCode() {
    const element = qrCodeRef.current;

    if (element) {
      const canvas = await html2canvas(element);
      const dataURL = canvas.toDataURL("image/png");

      // Criar um link para download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `QRCode_${params.slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className="justify-center items-center flex h-screen bg-[#030d21] px-4 max-w-screen w-screen">
      <div className="lg:w-[25vw] flex justify-start items-center flex-col h-screen bg-[#030d21]">
        <div className="relative w-[70vw] h-[20vh]">
          <Image
            src={LogoTeAmoMuito}
            alt="Logo Te Amo Muito"
            fill
            className="rounded-lg"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <span className="block pt-4 mb-2 text-base font-bold tracking-wide text-center text-white uppercase">
          Guarde o link e o QR Code do seu site com cuidado.
        </span>
        <span className="block mb-2 text-xs font-bold tracking-wide text-center text-white uppercase">
          Atenção: Se perder, não será possível recuperá-los.
        </span>
        <div
          ref={qrCodeRef} // Usando ref aqui para capturar o QR Code
          className="bg-white rounded-xl w-[70vw] lg:w-[17vw] lg:h-[17vw] h-[70vw] mt-7 p-2 flex items-center justify-center"
        >
          <QRCodeSVG
            value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${params?.slug}`}
            size={256}
          />
        </div>
        <button
          onClick={handleDownloadQRCode}
          className="bg-white rounded-lg w-[70vw] lg:w-[17vw] h-8 mt-7 p-2 flex items-center justify-center"
        >
          <span className="text-xs font-bold tracking-wide text-center uppercase">
            Baixar QR Code
          </span>
        </button>
        <button
          onClick={handleCopy}
          className="bg-white rounded-lg w-[70vw] lg:w-[17vw] h-8 mt-2 p-2 flex items-center justify-center"
        >
          <span className="text-xs font-bold tracking-wide text-center uppercase">
            {buttonText}
          </span>
        </button>
        <div className="flex-1" />
        <button
          onClick={handleRedirectSite}
          className="bg-white rounded-lg w-[70vw] lg:w-[17vw] h-14 mt-7 p-2 flex items-center justify-center mb-7"
        >
          <span className="font-bold tracking-wide text-center uppercase">
            Acessar meu site
          </span>
        </button>
      </div>
    </div>
  );
}
