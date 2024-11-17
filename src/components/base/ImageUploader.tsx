/* eslint-disable @typescript-eslint/no-unused-vars */

import {  X } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { MdOutlineUploadFile } from "react-icons/md";

interface ImageUploaderProps {
  onImageChange: (image: File | undefined) => void;
  existingImage?: string | null;  
}

const ImageUploader = ({ onImageChange, existingImage }: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (existingImage) {
      setSelectedImage(existingImage);
      setImageFile(null); 
    }
  }, [existingImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); 
        setImageFile(file);
        onImageChange(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    onImageChange(undefined); 
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {selectedImage ? (
          <>
            <img
              src={selectedImage}
              alt="Avatar Preview"
              className="size-28 rounded border-dashed border-slate-400 mb-2 object-cover"
            />
            <button
              className="absolute top-1 group right-1 bg-red-500 p-2 rounded size-7 pointer transition duration-75 hover:bg-red-500/85 flex items-center"
              onClick={handleRemoveImage}
            >
              <X
                strokeWidth={4}
                className="size-5 stroke-white group-hover:rotate-90 group-hover:duration-75"
              />
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <div
                className="relative flex flex-col items-center justify-center w-fit py-6 px-2 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-muted"
              >
                <div className=" text-center">
                  <div className="border p-2 rounded-md max-w-min mx-auto">
                    <MdOutlineUploadFile size={20} />
                  </div>
                  <p className="text-xs text-gray-500">Click to upload image</p>
                </div>
              </div>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
