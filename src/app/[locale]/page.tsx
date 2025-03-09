"use client";

import { useTranslations } from 'next-intl';
import React from "react";
import HeroForm from "./appComponents/HeroForm";
import heroImage from "../../../public/hero-.png"; // Importez l'image ici

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-200 p-2">
      {/* HeroForm Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="text-center">
          <HeroForm />
        </div>
      </div>

      {/* Hero Section with Background Image and Slogan */}
      <div className="relative h-[400px] bg-cover bg-center mt-6">
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            backgroundImage: `url(${heroImage.src})`, // Utilisez l'image importée ici
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)" // Noir avec 40% d'opacité
          }}
        >
          <div className="text-center text-gray-500">
            <h1 className="text-5xl font-bold mb-4">
              {t('heroSlogan')}
            </h1>
            <p className="text-xl">
              {t('heroSubSlogan')}
            </p>
          </div>
        </div>
      </div>

      {/* Rest of your code */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('accommodationTypes')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Hôtels</h3>
            <p className="text-gray-600">
              {t('hotelsDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Appartements</h3>
            <p className="text-gray-600">
              {t('apartmentsDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Villas</h3>
            <p className="text-gray-600">
              {t('villasDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('popularDestinations')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Paris</h3>
            <p className="text-gray-600">
              {t('parisDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">New York</h3>
            <p className="text-gray-600">
              {t('newYorkDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tokyo</h3>
            <p className="text-gray-600">
              {t('tokyoDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}