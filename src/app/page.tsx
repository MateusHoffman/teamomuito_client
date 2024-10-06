"use client";
import React, { useEffect, useState } from "react";
import FormInput from "./components/formInput/FormInput";
import PhotoUploader from "./components/photoUploader/PhotoUploader";
import Preview from "./components/preview/Preview";
import Photo1 from "@/app/assets/images/photo1.png";
import Photo2 from "@/app/assets/images/photo2.png";
import Photo3 from "@/app/assets/images/photo3.png";
import Photo4 from "@/app/assets/images/photo4.png";
import { StaticImageData } from "next/image";
import {
  generateId,
  removeAccents,
  resizeAndConvertImages,
  validateField,
} from "./utils/helpers";
import "@/app/assets/styles/scrollbar.css";
import { useRouter } from "next/navigation";
import { ProductData, useFormContext } from "./context/FormContext";
import { createCodePix } from "./services/purchaseService";
import { uploadImages } from "./services/imageService";

export interface FormData {
  email: string;
  manName: string;
  womanName: string;
  startDate: string;
  startTime: string;
  message: string;
  youtubeLink: string;
  photos: File[];
  slug?: string;
}

const Home: React.FC = () => {
  const router = useRouter();

  const { setProductData } = useFormContext();

  const [email, setEmail] = useState<string>(""); // mateus0hoffman@gmail.com
  const [manName, setManName] = useState<string>(""); // Joao
  const [womanName, setWomanName] = useState<string>(""); // Maria
  const [startDate, setStartDate] = useState<string>(""); // 2022-01-01
  const [startTime, setStartTime] = useState<string>(""); // 00:00
  const [message, setMessage] = useState<string>(``);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [example, setExample] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const generateData = async (): Promise<FormData> => {
    try {
      const isEmpty =
        !manName &&
        !womanName &&
        !startDate &&
        !startTime &&
        !message &&
        !email &&
        !youtubeLink &&
        photos.length === 0;
      setExample(isEmpty);

      const examplePhotos = [Photo1, Photo2, Photo3, Photo4] as any;

      if (isEmpty) {
        return {
          email: "",
          manName: "Joao",
          womanName: "Maria",
          startDate: "2022-01-01",
          startTime: "00:00",
          message: `Só queria te dizer que você é tudo pra mim.
Desde que a gente se conheceu, minha vida ficou muito mais divertida.

Seu sorriso? É a melhor parte do meu dia!
Quero passar cada momento com você, vivendo nossas loucuras e risadas.

Te amo demais, de um jeito que nem consigo explicar.

Beijinhos`,
          youtubeLink:
            "https://www.youtube.com/watch?v=oFbSL5RTrac&ab_channel=Jorge%26Mateus-Topic",
          photos: examplePhotos,
        };
      }

      return {
        manName,
        womanName,
        startDate,
        startTime,
        message,
        youtubeLink,
        photos,
        email,
      };
    } catch (error) {
      alert("Ocorreu um erro ao gerar os dados.");
      console.error(error);
      return {
        email: "",
        manName: "",
        womanName: "",
        startDate: "",
        startTime: "",
        message: "",
        youtubeLink: "",
        photos: [],
      }; // Retornando um objeto vazio em caso de erro
    }
  };

  const handlePhotoChange = (files: FileList | null) => {
    try {
      if (files) {
        const selectedPhotos = Array.from(files);
        setPhotos(selectedPhotos);
      }
    } catch (error) {
      alert("Ocorreu um erro ao selecionar as fotos.");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const missingFields = [
        validateField(manName, "Primeiro nome dele"),
        validateField(womanName, "Primeiro nome dela"),
        validateField(startDate, "Data de início do namoro"),
        validateField(startTime, "Hora"),
        validateField(photos, "Fotos"),
      ]
        .filter(Boolean)
        .join("");

      if (missingFields) {
        alert(missingFields);
      } else {
        if (!validateEmail(email)) {
          return;
        }
        if (
          formData &&
          Array.isArray(formData.photos) &&
          formData.photos.every((file) => file instanceof File)
        ) {
          // const photosBase64 = await resizeAndConvertImages(formData?.photos);

          const slug = encodeURIComponent(
            `${generateId()}-${removeAccents(
              formData?.manName
            )}-e-${removeAccents(formData?.womanName)}`
          );

          const photosUrls = await uploadImages(slug, formData?.photos);

          const content: ProductData = {
            slug: slug,
            ...formData,
            photos: photosUrls,
          };

          const codePix = await createCodePix(content);

          setProductData({
            ...content,
            qr_code: codePix,
          });

          router.push(`${slug}/pagamento`);
        }
      }
    } catch (error) {
      alert("Ocorreu um erro ao enviar o formulário.");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndFilterInput = (input: string, prev: string): string => {
    // Usar expressão regular para permitir apenas letras (a-z, A-Z), sem espaços, acentos, "ç", caracteres especiais ou emojis
    const filteredInput = input.replace(/[^a-zA-Z]/g, ""); // Permite apenas letras normais

    // Verificar se o input filtrado é diferente do original
    if (filteredInput !== input) {
      alert(
        "Você só pode digitar letras (A-Z), sem acentos, números, emojis ou espaços."
      );
      return prev;
    }

    return filteredInput;
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Por favor, insira um e-mail válido");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const defaultData = await generateData();
      setFormData(defaultData);
    })();
  }, [
    manName,
    womanName,
    startDate,
    startTime,
    message,
    youtubeLink,
    photos,
    email,
  ]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const defaultData = await generateData();
        setFormData(defaultData);
      } catch (error) {
        alert("Ocorreu um erro ao inicializar os dados.");
        console.error(error);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#030d21] lg:flex lg:justify-center lg:gap-14 lg:px-14 lg:py-7 px-4 py-4 overflow-x-hidden">
      <div className="lg:w-[60vw]">
        <form className="flex flex-col h-full gap-3">
          <h1 className="pb-2 text-6xl font-bold text-left text-white text-[#ff4e6dd9]">
            Surpreenda Quem Você Ama
          </h1>
          <p className="pb-6 text-base font-bold text-left text-white">
            Crie uma homenagem personalizada para seu relacionamento com data,
            fotos e a música do casal, e deixe o QR Code revelar tudo!
          </p>
          <div className="flex flex-row w-full gap-4">
            <FormInput
              label="Primeiro nome dele"
              type="text"
              placeholder="Joao"
              value={manName}
              onChange={(e) =>
                setManName(validateAndFilterInput(e.target.value, manName))
              }
            />
            <FormInput
              label="Primeiro nome dela"
              type="text"
              placeholder="Maria"
              value={womanName}
              onChange={(e) =>
                setWomanName(validateAndFilterInput(e.target.value, womanName))
              }
            />
          </div>
          <div className="flex flex-row w-full gap-4">
            <FormInput
              label="Início do namoro"
              type="date"
              value={startDate}
              placeholder="22/07/2015"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormInput
              placeholder="00:00"
              label="Hora"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <FormInput
            label="Link da música no YouTube"
            type="text"
            placeholder="https://www.youtube.com/..."
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <FormInput
            label="Mensagem"
            type="textarea"
            placeholder="Amor, você faz meus dias mais felizes..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <PhotoUploader onPhotoChange={handlePhotoChange} />
          <FormInput
            label="Email onde recebera o link"
            type="text"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="items-center justify-center hidden gap-2 py-4 mt-4 text-2xl font-bold text-black bg-white rounded-md lg:flex"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Criando site...
                <div className="w-6 h-6 border-4 border-t-4 border-gray-300 rounded-full border-t-black animate-spin"></div>
              </>
            ) : (
              "Criar meu site"
            )}
          </button>
        </form>
      </div>
      <div className="lg:w-[40vw] -mt-7 lg:pt-0 pt-3">
        <div className="flex flex-col gap-2 lg:fixed lg:top-0 pt-7 lg:w-[25vw]">
          <span className="block text-xs font-bold tracking-wide text-center text-white uppercase">
            {example ? "Exemplo de como vai ficar 👇" : "Como vai ficar 👇"}
          </span>
          <Preview formData={formData} example={example} />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-4 mt-4 text-2xl font-bold text-black bg-white rounded-md lg:hidden"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Criando site...
                <div className="w-6 h-6 border-4 border-t-4 border-gray-300 rounded-full border-t-black animate-spin"></div>
              </>
            ) : (
              "Criar meu site"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
