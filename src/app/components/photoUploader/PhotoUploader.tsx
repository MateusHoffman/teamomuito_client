// PhotoUploader.tsx
import React from "react";

interface PhotoUploaderProps {
  onPhotoChange: (files: FileList | null) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotoChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onPhotoChange(e.target.files);
    }
  };

  return (
    <div className="flex flex-row w-full gap-4">
      <label htmlFor="fileInput" className="flex items-center justify-center w-full px-4 py-3 mt-3 leading-tight text-black bg-gray-200 border border-gray-200 rounded cursor-pointer hover:bg-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Escolher algumas fotos (4:5)
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        id="fileInput"
      />
    </div>
  );
};

export default PhotoUploader;
