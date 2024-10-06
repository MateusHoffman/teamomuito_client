import axios from "axios";

export const uploadImages = async (slug: string, files: File[]) => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const path = "/upload";

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  // Adiciona o folderName à URL como um parâmetro de consulta
  const response = await axios.post(
    `${api}${path}?folderName=${encodeURIComponent(slug)}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response?.data?.photos;
};
