"use client";
import React, { useState } from "react";
import { Search, Calendar, Users } from "lucide-react"; // Icônes
import Link from "next/link";
import { useTranslations } from 'next-intl'; // Import de useTranslations

export default function HeroForm() {
  const t = useTranslations('HeroForm'); // Utilisation des traductions
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("25 févr. - 27 févr.");
  const [voyageurs, setVoyageurs] = useState("2 personnes, 1 chambre");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche avec :", destination, dates, voyageurs);
    // Logique de recherche ici (par exemple, appel à une API)
  };

  return (
    <div>
      {/* Search Form */}
      <div className="max-w-4xl mx-auto p-4">
        <form
          className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          onSubmit={handleSubmit}
        >
          {/* Destination */}
          <div className="flex-1 relative">
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="destination"
            >
              {t('destinationLabel')}
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t('destinationPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="flex-1 relative">
            <label className="text-sm font-medium text-gray-700 block mb-2" htmlFor="dates">
              {t('datesLabel')}
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                id="dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t('datesPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Voyageurs */}
          <div className="flex-1 relative">
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="voyageurs"
            >
              {t('voyageursLabel')}
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                id="voyageurs"
                value={voyageurs}
                onChange={(e) => setVoyageurs(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t('voyageursPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center">
            <Link href="/findAccomodations">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3.5 rounded-lg hover:bg-blue-700 transition-all w-full md:w-auto flex items-center justify-center"
              >
                {t('searchButton')}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}