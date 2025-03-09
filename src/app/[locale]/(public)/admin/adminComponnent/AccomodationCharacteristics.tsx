/*
model AccommodationCharacteristic {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/

/*
 export const accomodationCharacteristics = [
    "Remarkable view", // Vue remarquable
    "Prime location", // Localisation remarquable
    "Vibrant nightlife", // Vie nocturne intense
    "Romantic atmosphere", // Ambiance romantique
    "Quiet and relaxing", // Calme et reposant
  ];
*/


"use client";
import React, { useState, useEffect } from 'react';

interface AccommodationCharacteristic {
  id: string;
  name: string;
}

const AccommodationCharacteristics: React.FC = () => {
  const [accommodationCharacteristics, setAccommodationCharacteristics] = useState<AccommodationCharacteristic[]>([]);
  const [newAccommodationCharacteristic, setNewAccommodationCharacteristic] = useState<{ name: string }>({ name: '' });
  const [editingAccommodationCharacteristic, setEditingAccommodationCharacteristic] = useState<AccommodationCharacteristic | null>(null);

  // Fetch all accommodation characteristics
  useEffect(() => {
    fetchAccommodationCharacteristics();
  }, []);

  const fetchAccommodationCharacteristics = async () => {
    try {
      const response = await fetch('/api/admin/AccomodationCharacteristics');
      if (!response.ok) throw new Error('Failed to fetch accommodation characteristics');
      const data = await response.json();
      setAccommodationCharacteristics(data);
    } catch (error) {
      console.error('Error fetching accommodation characteristics:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingAccommodationCharacteristic) {
      setEditingAccommodationCharacteristic({ ...editingAccommodationCharacteristic, [name]: value });
    } else {
      setNewAccommodationCharacteristic({ ...newAccommodationCharacteristic, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAccommodationCharacteristic) {
        const response = await fetch('/api/admin/AccomodationCharacteristics', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingAccommodationCharacteristic.id, name: editingAccommodationCharacteristic.name }),
        });
        if (!response.ok) throw new Error('Failed to update accommodation characteristic');
        setEditingAccommodationCharacteristic(null);
      } else {
        const response = await fetch('/api/admin/AccomodationCharacteristics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAccommodationCharacteristic),
        });
        if (!response.ok) throw new Error('Failed to create accommodation characteristic');
        setNewAccommodationCharacteristic({ name: '' });
      }
      fetchAccommodationCharacteristics();
    } catch (error) {
      console.error('Error submitting accommodation characteristic:', error);
    }
  };

  const handleEdit = (accommodationCharacteristic: AccommodationCharacteristic) => {
    setEditingAccommodationCharacteristic(accommodationCharacteristic);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/AccomodationCharacteristics', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete accommodation characteristic');
      fetchAccommodationCharacteristics();
    } catch (error) {
      console.error('Error deleting accommodation characteristic:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Accommodation Characteristics</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingAccommodationCharacteristic ? editingAccommodationCharacteristic.name : newAccommodationCharacteristic.name}
          onChange={handleInputChange}
          placeholder="Accommodation characteristic name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingAccommodationCharacteristic ? 'Update Accommodation Characteristic' : 'Add Accommodation Characteristic'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {accommodationCharacteristics.map((accommodationCharacteristic) => (
          <li key={accommodationCharacteristic.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{accommodationCharacteristic.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(accommodationCharacteristic)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(accommodationCharacteristic.id)}
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

export default AccommodationCharacteristics;





/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */


