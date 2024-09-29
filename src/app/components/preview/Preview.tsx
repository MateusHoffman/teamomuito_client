"use client";
import "@/app/assets/styles/scrollbar.css";
import { FormData } from "@/app/page";
import {
  calculateTimeDifference,
  TimeDifference,
} from "@/app/utils/CalculateTimeDifference";
import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface PreviewProps {
  formData: FormData | null;
  example: boolean;
  showPresent?: boolean;
}

const Preview: React.FC<PreviewProps> = ({
  formData,
  example,
  showPresent,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [timeDifference, setTimeDifference] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatTimeUnit = (value: number, singular: string, plural: string) => {
    return `${value} ${value === 1 ? singular : plural}`;
  };

  useEffect(() => {
    if (formData) {
      const { startDate, startTime } = formData;

      const updateCurrentTime = () => {
        const { years, months, days, hours, minutes, seconds } =
          calculateTimeDifference(startDate, startTime);
        setTimeDifference({ years, months, days, hours, minutes, seconds });
      };

      // Atualiza imediatamente ao montar
      updateCurrentTime();

      // Configura o intervalo para atualizar a cada segundo
      const intervalId = setInterval(updateCurrentTime, 1000);

      // Limpa o intervalo ao desmontar
      return () => clearInterval(intervalId);
    }
  }, [formData]);

  useEffect(() => {
    if (formData?.photos && formData?.photos?.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex + 1) % (formData.photos?.length ?? 1)
        );
      }, 3000); // Troca a foto a cada 3 segundos

      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
    }
  }, [formData]);

  // Obtenha a URL da foto atual
  const currentPhotoUrl = (() => {
    const currentPhoto = formData?.photos?.[currentPhotoIndex];

    // Verifica se é uma instância de File (upload do usuário)
    if (currentPhoto instanceof File) {
      return URL.createObjectURL(currentPhoto);
    }

    // Verifica se é uma string (provavelmente um caminho de uma imagem estática)
    if (typeof currentPhoto === "string") {
      return currentPhoto;
    }

    // Verifica se é StaticImageData (imagens importadas estaticamente)
    if (
      currentPhoto &&
      typeof currentPhoto === "object" &&
      "src" in currentPhoto
    ) {
      return (currentPhoto as StaticImageData).src;
    }

    // Caso não haja uma foto válida
    return "";
  })();

  return (
    // <div className="bg-[#202020] min-h-[85vh] max-h-[85vh] max-w-full p-5 rounded-lg shadow-2xl flex flex-col items-center overflow-y-auto">
    <div
      className={`bg-[#202020] 
        ${
          showPresent
            ? "min-h-[95vh] max-h-[95vh]"
            : "h-[90vh] lg:min-h-[85vh] lg:max-h-[85vh]"
        } 
        max-w-full p-5 rounded-lg shadow-2xl flex flex-col items-center overflow-y-auto`}
    >
      <div className="w-full px-2 py-1 mb-5 bg-white rounded-md">
        {formData?.manName && formData?.womanName ? (
          <span className="flex justify-center text-center">{`teamomuito.com.br/${formData.manName}-e-${formData.womanName}`}</span>
        ) : (
          <span className="flex justify-center text-center">{`teamomuito.com.br`}</span>
        )}
      </div>

      {/* Mantém a proporção de 4:5 */}
      <div className="relative w-[80%] border-2 border-white rounded-lg flex justify-center items-center">
        <div
          className="w-full"
          style={{ paddingBottom: "125%", position: "relative" }}
        >
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            {/* Renderiza a imagem se existir */}
            {currentPhotoUrl ? (
              <img
                src={currentPhotoUrl}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-4 text-white">
        <span className="pb-2">Estamos juntos há:</span>
        <span>{`${formatTimeUnit(
          timeDifference.years,
          "ano",
          "anos"
        )}, ${formatTimeUnit(
          timeDifference.months,
          "mês",
          "meses"
        )}, ${formatTimeUnit(timeDifference.days, "dia", "dias")}`}</span>
        <span>{`${formatTimeUnit(
          timeDifference.hours,
          "hora",
          "horas"
        )}, ${formatTimeUnit(
          timeDifference.minutes,
          "minuto",
          "minutos"
        )} e ${formatTimeUnit(
          timeDifference.seconds,
          "segundo",
          "segundos"
        )}.`}</span>
      </div>
      <div className="my-5 border-[1px] w-[60%]" />
      <div className="flex flex-col flex-shrink-0 w-full gap-3 mx-auto text-center text-white break-words">
        {formData?.message.split("\n").map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </div>
      {formData?.youtubeLink && (
        <div className="flex items-center justify-center w-full mt-9">
          <ReactPlayer
            url={formData.youtubeLink}
            playing
            loop
            controls
            width="100%"
            volume={example ? 0.3 : 0.5}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Preview;
