import { ProductData } from "../context/FormContext";

export const createCodePix = async (content: ProductData) => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const path = "/createCodePix";
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

export const getPurchaseBySlug = async (slug: string) => {
  console.log('getPurchaseBySlug');
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const path = "/getPurchaseBySlug";
  const query = `?slug=${slug}`;
  const response = await fetch(api + path + query, {
    method: "GET",
  });
  const result = await response.json();
  return result || null;
};
