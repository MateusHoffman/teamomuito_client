"use client";

import { useEffect, useState } from "react";
import Preview from "../components/preview/Preview";

const Result = ({ params }: { params: { slug: string } }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
  }, []);

  const formData = {
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
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    photos: [
      {
        src: "/_next/static/media/photo1.d5f918f5.png",
        height: 744,
        width: 595,
        blurDataURL:
          "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphoto1.d5f918f5.png&w=6&q=70",
        blurWidth: 6,
        blurHeight: 8,
      },
      // other photos...
    ],
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#030d21] px-4">
      {isClient && (
        <>
          <Preview formData={formData} example={false} />
        </>
      )}
    </div>
  );
};

export default Result;
