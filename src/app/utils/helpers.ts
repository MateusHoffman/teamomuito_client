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
          const width = 500
          canvas.width = width;
          canvas.height = width/(4/5);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/png");
          resolve(base64);
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
