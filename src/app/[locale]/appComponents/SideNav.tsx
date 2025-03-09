"use client";

import React, { useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Slider } from "../../../components/ui/slider";
import SideMap from "./SideMap";
import {
  destinations,
  accommodationTypes,
  accomodationCharacteristics,
  services,
  roomFeatures,
  accessibilityOptions,
  parkingOptions,
  bedTypes,
} from "../../../../lib/registatHotelItem";

const SideNav = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>([]);
  const [selectedHotelServices, setSelectedHotelServices] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [selectedHotelCharacteristics, setSelectedHotelCharacteristics] = useState<string[]>([]);
  const [selectedParkingOptions, setSelectedParkingOptions] = useState<string[]>([]);
  const [selectedBedTypes, setSelectedBedTypes] = useState<string[]>([]);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 1000]);

  const handleSelection = (
    item: string,
    selectedList: string[],
    setList: Function
  ) => {
    setList((prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      selectedDestinations,
      selectedRoomFeatures,
      selectedHotelServices,
      selectedAccessibility,
      selectedHotelCharacteristics,
      selectedParkingOptions,
      selectedBedTypes,
      selectedAccommodationTypes,
      priceRange,
    });
  };

  return (
    <Card className="m-2 p-1 w-full max-w-xs shadow-lg rounded-2xl bg-white">
      <div className="mb-1 p-3 border rounded-xl">
        <SideMap />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-1">Filtres</h2>
      <div className="mb-1 p-1 border rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Votre budget (par nuit)</h3>
        <div className="p-2">
          <Slider
            min={10}
            max={1000}
            step={5}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>€{priceRange[0]}</span>
          <span>€{priceRange[1]}+</span>
        </div>
      </div>
      {[
        {
          title: "Destinations",
          items: destinations,
          state: selectedDestinations,
          setState: setSelectedDestinations,
        },
        {
          title: "Équipements de la chambre",
          items: roomFeatures,
          state: selectedRoomFeatures,
          setState: setSelectedRoomFeatures,
        },
        {
          title: "Services de l'hôtel",
          items: services,
          state: selectedHotelServices,
          setState: setSelectedHotelServices,
        },
        {
          title: "Options d'accessibilité",
          items: accessibilityOptions,
          state: selectedAccessibility,
          setState: setSelectedAccessibility,
        },
        {
          title: "Caractéristiques de l'hôtel",
          items: accomodationCharacteristics,
          state: selectedHotelCharacteristics,
          setState: setSelectedHotelCharacteristics,
        },
        {
          title: "Options de parking",
          items: parkingOptions,
          state: selectedParkingOptions,
          setState: setSelectedParkingOptions,
        },
        {
          title: "Types de lits",
          items: bedTypes,
          state: selectedBedTypes,
          setState: setSelectedBedTypes,
        },
        {
          title: "Types d'hébergement",
          items: accommodationTypes,
          state: selectedAccommodationTypes,
          setState: setSelectedAccommodationTypes,
        },
      ].map(({ title, items, state, setState }) => (
        <div key={title} className="mb-1 p-1 border rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center space-x-1 text-sm text-gray-600"
            >
              <Checkbox
                checked={state.includes(item)}
                onCheckedChange={() => handleSelection(item, state, setState)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all"
      >
        Appliquer les filtres
      </Button>
    </Card>
  );
};

export default SideNav;
