export const validateField = (
  fieldValue: string | number | File[],
  fieldName: string
): string => {
  if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
    return `O campo '${fieldName}' é obrigatório e deve ser preenchido.\n`;
  }
  return "";
};

export function resizeAndConvertImages(photos: File[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const base64Images: string[] = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return reject(new Error("Could not get canvas context"));
    }

    const resizeImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };

        img.onload = () => {
          const maxSize = 500000
          if (file.size <= maxSize) {
            // Se o tamanho do arquivo for menor ou igual a 500KB, não faz nada
            const base64 = reader.result as string;
            return resolve(base64);
          }

          // Se o tamanho do arquivo for maior que 500KB, redimensiona a imagem
          let width = img.width;
          let height = img.height;

          // Calcula a nova largura e altura mantendo a proporção
          const aspectRatio = height / width;

          // Ajusta a largura e a altura para que o tamanho do arquivo não exceda 500KB
          while (true) {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const base64 = canvas.toDataURL("image/png");

            // Converte a string base64 em um Blob e verifica o tamanho
            const byteString = atob(base64.split(",")[1]);
            const bytes = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
              bytes[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "image/png" });

            if (blob.size <= maxSize) {
              resolve(base64);
              break;
            }

            // Se a imagem ainda for muito grande, diminui o tamanho
            width *= 0.9; // Reduz a largura em 10%
            height = width * aspectRatio; // Ajusta a altura para manter a proporção
          }
        };

        img.onerror = (error) =>
          reject(new Error(`Failed to load image: ${error}`));
        reader.onerror = (error) =>
          reject(new Error(`Failed to read file: ${error}`));

        reader.readAsDataURL(file);
      });
    };

    const promises = photos.map(resizeImage);

    Promise.all(promises)
      .then((results) => {
        base64Images.push(...results);
        resolve(base64Images);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const generateId = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function removeAccents(str: string) {
  // Normalize the string to NFD format and remove accents
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
