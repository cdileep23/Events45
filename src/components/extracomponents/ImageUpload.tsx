"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "imageUploader";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const [fileKey, setFileKey] = useState<string | null>(null);

  const handleRemove = async () => {
    if (!value) return;
    
    try {
      // Extract the file key from the URL
      const urlParts = value.split('/');
      const key = urlParts[urlParts.length - 1];
      
      // Delete the file from UploadThing
      await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileKey: key }),
      });
      
      // Clear the form value
      onChange("");
      setFileKey(null);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (value) {
    return (
      <div className="relative w-full h-48 sm:h-56 md:h-64 max-w-xs sm:max-w-sm md:max-w-md">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover"
        />
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full shadow-sm hover:bg-red-600 transition-colors"
          type="button"
          aria-label="Remove image"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs flex justify-center items-center sm:max-w-sm md:max-w-md">
      <div className="w-full h-48 sm:h-56 md:h-64">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              onChange(res[0].ufsUrl);
              setFileKey(res[0].key); // Store the file key for potential deletion
            }
          }}
          onUploadError={(error: Error) => {
            console.error(error);
          }}
          appearance={{
            container: "border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-4 w-full h-full flex flex-col items-center justify-center",
            uploadIcon: "text-gray-400",
            label: "text-gray-600 hover:text-gray-800",
            allowedContent: "text-gray-500 text-xs",
            button: "bg-primary text-white px-4 py-2 rounded-md mt-2",
          }}
        />
      </div>
    </div>
  );
}

export default ImageUpload;