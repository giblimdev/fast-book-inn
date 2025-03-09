/*
model Service {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
 */
/*
 export const services = [
    "Bar", // Bar
    "Restaurant", // Restaurant
    "Casino", // Casino
    "Spa / massage", // Spa / massage
    "Gym", // Salle de sport
    "Business center", // Centre d'affaires
    "Boutique", // Boutique
    "Pool", // Piscine
    "Water park", // Parc aquatique
    "Golf", // Golf
    "Concierge service", // Service de conciergerie
    "Room service", // Service en chambre
    "Currency exchange", // Service de change
    "Wake-up service", // Service de réveil
    "Laundry service", // Blanchisserie
    "24/7 reception", // Réception 24/7
    "Self check-in", // Réception automatique
    "Bike rental", // Location de vélo
    "Scooter rental", // Location de scooter
    "Car rental", // Location de voiture
    "Shuttle service", // Service de navette
    "Pets allowed", // Animaux acceptés
    "Smoking area", // Zone fumeur
  ];
*/
 
"use client";
import React, { useState, useEffect } from 'react';

interface Service {
  id: string;
  name: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<{ name: string }>({ name: '' });
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Fetch all services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/Services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingService) {
      setEditingService({ ...editingService, [name]: value });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        const response = await fetch('/api/admin/Services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingService.id, name: editingService.name }),
        });
        if (!response.ok) throw new Error('Failed to update service');
        setEditingService(null);
      } else {
        const response = await fetch('/api/admin/Services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newService),
        });
        if (!response.ok) throw new Error('Failed to create service');
        setNewService({ name: '' });
      }
      fetchServices();
    } catch (error) {
      console.error('Error submitting service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/Services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete service');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Services</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingService ? editingService.name : newService.name}
          onChange={handleInputChange}
          placeholder="Service name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingService ? 'Update Service' : 'Add Service'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {services.map((service) => (
          <li key={service.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{service.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;


/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */