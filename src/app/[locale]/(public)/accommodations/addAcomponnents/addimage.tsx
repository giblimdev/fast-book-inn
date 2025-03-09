"use client";

import React, { useState, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import { Button } from "../../../../../components/ui/button"; // Utilisation du composant Button pour une meilleure cohérence

export default function AddImage() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<{ [key: string]: string }>({});

  // Gestion du téléchargement de l'image principale
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImage(file);
      setImageNames((prev) => ({ ...prev, [file.name]: file.name }));
    }
  };

  // Gestion du téléchargement des images supplémentaires
  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAdditionalImages((prev) => [...prev, ...files]);
      files.forEach((file) => {
        setImageNames((prev) => ({ ...prev, [file.name]: file.name }));
      });
    }
  };

  // Gestion du glisser-déposer
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, isMain: boolean) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (isMain && files.length > 0) {
        setMainImage(files[0]);
        setImageNames((prev) => ({ ...prev, [files[0].name]: files[0].name }));
      } else {
        setAdditionalImages((prev) => [...prev, ...files]);
        files.forEach((file) => {
          setImageNames((prev) => ({ ...prev, [file.name]: file.name }));
        });
      }
    },
    []
  );

  // Gestion de la modification du nom de l'image
  const handleNameChange = (fileName: string, newName: string) => {
    setImageNames((prev) => ({ ...prev, [fileName]: newName }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Main Image:", mainImage);
    console.log("Additional Images:", additionalImages);
    console.log("Image Names:", imageNames);

    // Enregistrement des images sur l'ordinateur (simulé ici)
    if (mainImage) {
      const url = URL.createObjectURL(mainImage);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageNames[mainImage.name] || mainImage.name;
      link.click();
    }

    additionalImages.forEach((image) => {
      const url = URL.createObjectURL(image);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageNames[image.name] || image.name;
      link.click();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="images">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
            Images
          </AccordionTrigger>
          <AccordionContent className="space-y-6">
            {/* Section pour l'image principale */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Main Image</h2>
              <div
                onDrop={(e) => handleDrop(e, true)}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <p className="text-gray-600">
                  Drag and drop your main image here, or{" "}
                  <span className="text-blue-600 underline">click to upload</span>
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Upload Main Image
                </label>
              </div>
              {mainImage && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Name:</p>
                  <input
                    type="text"
                    value={imageNames[mainImage.name] || mainImage.name}
                    onChange={(e) => handleNameChange(mainImage.name, e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Section pour les images supplémentaires */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Additional Images</h2>
              <div
                onDrop={(e) => handleDrop(e, false)}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <p className="text-gray-600">
                  Drag and drop additional images here, or{" "}
                  <span className="text-blue-600 underline">click to upload</span>
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                  id="additional-images-upload"
                />
                <label
                  htmlFor="additional-images-upload"
                  className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Upload Additional Images
                </label>
              </div>
              {additionalImages.length > 0 && (
                <div className="mt-4 space-y-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Image Name:</p>
                      <input
                        type="text"
                        value={imageNames[image.name] || image.name}
                        onChange={(e) => handleNameChange(image.name, e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Images
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
}
/*
model Image {
  id        String  @id @default(uuid())
  url       String
  isMain    Boolean  @default(false)
  hotelId   String
  hotel     Hotel    @relation(fields: [hotelId], references: [id])
}

*/