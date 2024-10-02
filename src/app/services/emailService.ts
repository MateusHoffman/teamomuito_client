import { ProductData } from "../context/FormContext";

export const sendEmail = async (content: ProductData) => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const path = "/sendEmail";
  const response = await fetch(api + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  const result = await response.json();
  return result || null;
};
