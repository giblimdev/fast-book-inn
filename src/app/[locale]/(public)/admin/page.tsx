"use client";
import React, { useState } from 'react';
import AccessibilityOpt from './adminComponnent/AccessibilityOptions';
import AccommodationTypes from './adminComponnent/AccommodationTypes';
import AccomodationCharacteristics from './adminComponnent/AccomodationCharacteristics';
import Bedding from './adminComponnent/Bedding';
import BedTypes from './adminComponnent/BedTypes';
import Destinations from './adminComponnent/Destinations';
import ParkingOptions from './adminComponnent/ParkingOptions';
import RoomFeatures from './adminComponnent/RoomFeatures';
import Services from './adminComponnent/ServicesOpt';
import { Languages, Menu, X } from 'lucide-react';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState<string>('Accessibility Options');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const componentMap = {
    'Accessibility Options': <AccessibilityOpt />,
    'Accommodation Types': <AccommodationTypes />,
    'Accommodation Characteristics': <AccomodationCharacteristics />,
    'Bedding': <Bedding />,
    'Bed Types': <BedTypes />,
    'Destinations': <Destinations />,
    'Parking Options': <ParkingOptions />,
    'Room Features': <RoomFeatures />,
    'Services': <Services />,
    'Languages': <Languages />
  };

  const components = Object.keys(componentMap).map(name => ({
    name,
    component: componentMap[name as keyof typeof componentMap]
  }));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h1>
          <nav>
            <ul className="space-y-2">
              {components.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActiveComponent(item.name);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                      activeComponent === item.name
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            {activeComponent}
          </h2>
          <div className="mt-4">
            {componentMap[activeComponent as keyof typeof componentMap]}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default AdminDashboard;