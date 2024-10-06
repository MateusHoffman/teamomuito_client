"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProductData {
  manName: string;
  womanName: string;
  startDate: string;
  startTime: string;
  message: string;
  youtubeLink: string;
  photos: string[];
  slug?: string;
  qr_code?: string;
}

interface FormContextProps {
  productData: ProductData | null;
  setProductData: (data: ProductData) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productData, setProductData] = useState<ProductData | null>(null);

  return (
    <FormContext.Provider value={{ productData, setProductData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
