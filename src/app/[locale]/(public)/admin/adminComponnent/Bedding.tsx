/*
export const beddingConfiguration = [
    "Dormitory", // Dortoir
    "Single room", // Chambre simple
    "Double room", // Chambre double
    "Triple room", // Chambre triple
    "Quadruple room and more", // Chambre quadruple et plus
  ];
 */
/*

model BeddingConfiguration {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}




*/
"use client";
import React, { useState, useEffect } from 'react';

interface BeddingConfiguration {
  id: string;
  name: string;
}

const Bedding: React.FC = () => {
  const [beddingConfigurations, setBeddingConfigurations] = useState<BeddingConfiguration[]>([]);
  const [newBeddingConfiguration, setNewBeddingConfiguration] = useState<{ name: string }>({ name: '' });
  const [editingBeddingConfiguration, setEditingBeddingConfiguration] = useState<BeddingConfiguration | null>(null);

  // Fetch all bedding configurations
  useEffect(() => {
    fetchBeddingConfigurations();
  }, []);

  const fetchBeddingConfigurations = async () => {
    try {
      const response = await fetch('/api/admin/Bedding');
      if (!response.ok) throw new Error('Failed to fetch bedding configurations');
      const data = await response.json();
      setBeddingConfigurations(data);
    } catch (error) {
      console.error('Error fetching bedding configurations:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingBeddingConfiguration) {
      setEditingBeddingConfiguration({ ...editingBeddingConfiguration, [name]: value });
    } else {
      setNewBeddingConfiguration({ ...newBeddingConfiguration, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBeddingConfiguration) {
        const response = await fetch('/api/admin/Bedding', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBeddingConfiguration.id, name: editingBeddingConfiguration.name }),
        });
        if (!response.ok) throw new Error('Failed to update bedding configuration');
        setEditingBeddingConfiguration(null);
      } else {
        const response = await fetch('/api/admin/Bedding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBeddingConfiguration),
        });
        if (!response.ok) throw new Error('Failed to create bedding configuration');
        setNewBeddingConfiguration({ name: '' });
      }
      fetchBeddingConfigurations();
    } catch (error) {
      console.error('Error submitting bedding configuration:', error);
    }
  };

  const handleEdit = (beddingConfiguration: BeddingConfiguration) => {
    setEditingBeddingConfiguration(beddingConfiguration);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/Bedding', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete bedding configuration');
      fetchBeddingConfigurations();
    } catch (error) {
      console.error('Error deleting bedding configuration:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bedding Configurations</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingBeddingConfiguration ? editingBeddingConfiguration.name : newBeddingConfiguration.name}
          onChange={handleInputChange}
          placeholder="Bedding configuration name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingBeddingConfiguration ? 'Update Bedding Configuration' : 'Add Bedding Configuration'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {beddingConfigurations.map((beddingConfiguration) => (
          <li key={beddingConfiguration.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{beddingConfiguration.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(beddingConfiguration)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(beddingConfiguration.id)}
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

export default Bedding;




/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */

