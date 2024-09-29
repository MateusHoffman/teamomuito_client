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
import { resizeAndConvertImages, validateField } from "./utils/helpers";
import "@/app/assets/styles/scrollbar.css";

export interface FormData {
  manName: string;
  womanName: string;
  startDate: string;
  startTime: string;
  message: string;
  youtubeLink: string;
  photos: File[] | StaticImageData[];
}

const Home: React.FC = () => {
  const [manName, setManName] = useState<string>("");
  const [womanName, setWomanName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
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
        !youtubeLink &&
        photos.length === 0;
      setExample(isEmpty);

      const examplePhotos = [Photo1, Photo2, Photo3, Photo4];

      if (isEmpty) {
        return {
          manName: "João",
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
      };
    } catch (error) {
      alert("Ocorreu um erro ao gerar os dados.");
      console.error(error);
      return {
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
        if (
          formData &&
          Array.isArray(formData.photos) &&
          formData.photos.every((file) => file instanceof File)
        ) {
          const photosBase64 = await resizeAndConvertImages(formData?.photos);
          const content = { ...formData, photos: photosBase64 };
          const api = process.env.NEXT_PUBLIC_SERVER_URL;
          const path = "/checkout";
          const response = await fetch(api + path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
          });
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          }
        }
      }
    } catch (error) {
      alert("Ocorreu um erro ao enviar o formulário.");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndFilterInput = (input: string): string => {
    // Usar expressão regular para permitir apenas letras (a-z, A-Z), acentos e sem espaços
    const filteredInput = input.normalize("NFD").replace(/[^a-zA-ZÀ-ÿ]/g, ""); // Normaliza acentos e remove qualquer caractere fora do padrão

    // Verificar se o input filtrado é diferente do original sem contar caracteres invisíveis
    if (filteredInput.trim() !== input.trim()) {
      alert("Você só pode digitar letras, sem espaços.");
    }

    return filteredInput;
  };
  useEffect(() => {
    (async () => {
      const defaultData = await generateData();
      setFormData(defaultData);
    })();
  }, [manName, womanName, startDate, startTime, message, youtubeLink, photos]);

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
          <h1 className="pb-8 text-6xl font-bold text-center text-white">
            Presentei seu amor
          </h1>
          <div className="flex flex-row w-full gap-4">
            <FormInput
              label="Primeiro nome dele"
              type="text"
              placeholder="João"
              value={manName}
              onChange={(e) =>
                setManName(validateAndFilterInput(e.target.value))
              }
            />
            <FormInput
              label="Primeiro nome dela"
              type="text"
              placeholder="Maria"
              value={womanName}
              onChange={(e) =>
                setWomanName(validateAndFilterInput(e.target.value))
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
