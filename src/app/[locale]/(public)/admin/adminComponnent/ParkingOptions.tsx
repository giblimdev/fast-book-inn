/*
  export const parkingOptions = [
    "Secure parking", // Parking sécurisé
    "Covered parking", // Parking couvert
    "Free parking", // Parking gratuit
    "Paid parking", // Parking payant
    "Electric vehicle charging station", // Borne de recharge pour voiture électrique
  ];
 */
/*
model ParkingOption {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/

"use client";
import React, { useState, useEffect } from 'react';

interface ParkingOption {
  id: string;
  name: string;
}

const ParkingOptions: React.FC = () => {
  const [parkingOptions, setParkingOptions] = useState<ParkingOption[]>([]);
  const [newParkingOption, setNewParkingOption] = useState<{ name: string }>({ name: '' });
  const [editingParkingOption, setEditingParkingOption] = useState<ParkingOption | null>(null);

  // Fetch all parking options
  useEffect(() => {
    fetchParkingOptions();
  }, []);

  const fetchParkingOptions = async () => {
    try {
      const response = await fetch('/api/admin/ParkingOptions');
      if (!response.ok) throw new Error('Failed to fetch parking options');
      const data = await response.json();
      setParkingOptions(data);
    } catch (error) {
      console.error('Error fetching parking options:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingParkingOption) {
      setEditingParkingOption({ ...editingParkingOption, [name]: value });
    } else {
      setNewParkingOption({ ...newParkingOption, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingParkingOption) {
        const response = await fetch('/api/admin/ParkingOptions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingParkingOption.id, name: editingParkingOption.name }),
        });
        if (!response.ok) throw new Error('Failed to update parking option');
        setEditingParkingOption(null);
      } else {
        const response = await fetch('/api/admin/ParkingOptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newParkingOption),
        });
        if (!response.ok) throw new Error('Failed to create parking option');
        setNewParkingOption({ name: '' });
      }
      fetchParkingOptions();
    } catch (error) {
      console.error('Error submitting parking option:', error);
    }
  };

  const handleEdit = (parkingOption: ParkingOption) => {
    setEditingParkingOption(parkingOption);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/ParkingOptions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete parking option');
      fetchParkingOptions();
    } catch (error) {
      console.error('Error deleting parking option:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Parking Options</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingParkingOption ? editingParkingOption.name : newParkingOption.name}
          onChange={handleInputChange}
          placeholder="Parking option name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingParkingOption ? 'Update Parking Option' : 'Add Parking Option'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {parkingOptions.map((parkingOption) => (
          <li key={parkingOption.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{parkingOption.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(parkingOption)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(parkingOption.id)}
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

export default ParkingOptions;



/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */