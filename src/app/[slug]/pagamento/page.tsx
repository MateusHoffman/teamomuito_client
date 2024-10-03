"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import LogoTeAmoMuito from "@/app/assets/images/logo-te-amo-muito.png";
import { useFormContext } from "../../context/FormContext";
import { useRouter } from "next/navigation";
import {
  createCodePix,
  getPurchaseBySlug,
} from "../../services/purchaseService";
import { sendEmail } from "@/app/services/emailService";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { productData, setProductData } = useFormContext();

  const [buttonText, setButtonText] = useState(
    "Clique aqui para copiar o código"
  );
  const [qrCode, setQrCode] = useState(productData?.qr_code);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [descriptionBtn, setDescriptionBtn] = useState("");
  const [btnText, setBtnText] = useState("");
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  function handleCopy() {
    const text = qrCode!;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Muda o texto do botão para "Código copiado"
        setButtonText("Código copiado");

        // Restaura o texto original após 2 segundos
        setTimeout(() => {
          setButtonText("Clique aqui para copiar o código");
        }, 2000);
      })
      .catch((err) => {
        console.error("Erro ao copiar o link: ", err);
      });
  }

  // Função para redirecionar para o site
  async function handleBtn() {
    if (paymentStatus === "approved") {
      return router.push(`/${productData?.slug}/QRCode`);
    } else {
      alert("Crie novamente e emita um novo PIX");
      router.push("/");
      // setIsLoading(true)
      // setQrCode('')

      // const codePix = await createCodePix(productData!);

      // setProductData({
      //   ...productData!,
      //   qr_code: codePix,
      // });
    }
  }

  useEffect(() => {
    const slug = productData?.slug;
    let intervalId: any;

    if (slug && !stopPolling) {
      const fetchPurchase = async () => {
        const purchase = await getPurchaseBySlug(slug);
        setQrCode(purchase?.qr_code);
        setPaymentStatus(purchase?.paymentStatus);
        if (purchase?.paymentStatus === "approved") {
          setDescriptionBtn("");
          setBtnText("Acessar meu site");
          setIsLoading(false);
          setStopPolling(true);
        }
        if (purchase?.paymentStatus === "authorized") {
          setDescriptionBtn("Processando...");
          setBtnText("");
          setIsLoading(true);
        }
        if (purchase?.paymentStatus === "in_process") {
          setDescriptionBtn("Processando...");
          setBtnText("");
          setIsLoading(true);
        }
        if (purchase?.paymentStatus === "pending") {
          setDescriptionBtn("Aguardando pagamento...");
          setBtnText("");
          setIsLoading(true);
        }
        if (purchase?.paymentStatus === "cancelled") {
          setDescriptionBtn("Pagamento cancelado");
          setBtnText("Emita um novo QR Code");
          setIsLoading(false);
          setStopPolling(true);
        }
        if (purchase?.paymentStatus === "charged_back") {
          setDescriptionBtn("cobrado de volta");
          setBtnText("Emita um novo QR Code");
          setIsLoading(false);
          setStopPolling(true);
        }
        if (purchase?.paymentStatus === "refunded") {
          setDescriptionBtn("Pagamento reembolsado");
          setBtnText("Emita um novo QR Code");
          setIsLoading(false);
          setStopPolling(true);
        }
        if (purchase?.paymentStatus === "rejected") {
          setDescriptionBtn("Pagamento rejeitado");
          setBtnText("Emita um novo QR Code");
          setIsLoading(false);
          setStopPolling(true);
        }
      };

      fetchPurchase();

      intervalId = setInterval(fetchPurchase, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [productData]);

  useEffect(() => {
    if (paymentStatus === "approved" && productData) {
      router.push(`/${productData?.slug}/QRCode`);
      sendEmail(productData!);
    }
  }, [paymentStatus, productData]);

  useEffect(() => {
    (async () => {
      
      const purchase = await getPurchaseBySlug(params?.slug)
      setProductData(purchase)
    })()
  }, []);

  // if (productData === null) {
  //   return (
  //     <div className="justify-center items-center flex h-screen bg-[#030d21] px-4 max-w-screen w-screen"></div>
  //   );
  // }

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
          Quase lá! Finalize o pagamento para obter o seu site
        </span>
        <span className="block pt-2 mb-2 text-sm font-bold tracking-wide text-center text-white uppercase">
          Pague R$ 37 via Pix
        </span>
        <div
          ref={qrCodeRef} // Usando ref aqui para capturar o QR Code
          className="bg-white rounded-xl w-[70vw] lg:w-[17vw] lg:h-[17vw] h-[70vw] mt-4 p-2 flex items-center justify-center"
        >
          <QRCodeSVG value={qrCode!} size={256} />
        </div>
        <button className="bg-white rounded-lg w-[70vw] lg:w-[17vw] h-8 mt-7 p-2 flex items-center justify-center">
          <span className="overflow-hidden text-xs font-bold tracking-wide text-center uppercase whitespace-nowrap text-ellipsis">
            {qrCode}
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

        <span className="text-sm font-bold tracking-wide text-center text-white uppercase">
          {descriptionBtn}
        </span>
        <button
          onClick={handleBtn}
          className={`bg-white rounded-lg w-[70vw] lg:w-[17vw] h-14 mt-2 p-2 flex items-center justify-center mb-7 ${
            isLoading ? "opacity-80 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          <>
            {isLoading ? (
              <div className="w-6 h-6 ml-3 border-4 border-t-4 border-gray-300 rounded-full border-t-black animate-spin"></div>
            ) : (
              <span className="font-bold tracking-wide text-center uppercase">
                {btnText}
              </span>
            )}
          </>
        </button>
      </div>
    </div>
  );
}
