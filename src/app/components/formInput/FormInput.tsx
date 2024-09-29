import React, { useRef, useEffect } from "react";

interface FormInputProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Função para ajustar a altura do textarea automaticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height based on content
    }
  }, [value]);

  return (
    <label className="w-full">
      <span className="block mb-2 text-xs font-bold tracking-wide text-white uppercase">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-3 leading-tight text-black bg-gray-200 border border-gray-200 rounded appearance-none placeholder:text-gray-500" // Aqui adicionamos a classe do placeholder
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-3 leading-tight text-black bg-gray-200 border border-gray-200 rounded appearance-none placeholder:text-gray-500" // Aqui adicionamos a classe do placeholder
        />
      )}
    </label>
  );
};

export default FormInput;
