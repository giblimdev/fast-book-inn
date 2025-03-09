/*

model RoomFeature {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}


 */
/*
export const roomFeatures = [
    "Shared bathroom", // Salle de bain commune
    "Shared toilet", // Sanitaire commun
    "Air conditioning", // Air conditionné
    "WiFi included", // WiFi inclus
    "Ensuite bathroom", // Salle de bain dans la chambre
    "Jacuzzi", // Jacuzzi
    "Bathtub", // Baignoire
    "Shower", // Douche
    "Toilet", // Sanitaire
    "Balcony", // Balcon
    "Minibar", // Minibar
    "Refrigerator", // Réfrigérateur
    "Kettle", // Bouilloire
    "Coffee maker", // Cafetière
    "Television", // Télévision
    "TV with streaming service", // TV avec service de streaming
    "Safe", // Coffre-fort
    "Iron and ironing board", // Fer et planche à repasser
    "Hair dryer", // Sèche-cheveux
    "Free toiletries", // Produits de toilette gratuits
    "Robes and slippers", // Peignoirs et chaussons
    "Desk", // Bureau
    "Kitchen", // Cuisine
    "Laundry facilities", // Buanderie
    "Washing machine", // Machine à laver
    "Baby cot available", // Lit bébé disponible
  ];
*/
"use client";
import React, { useState, useEffect } from 'react';

interface RoomFeature {
  id: string;
  name: string;
}

const RoomFeatures: React.FC = () => {
  const [roomFeatures, setRoomFeatures] = useState<RoomFeature[]>([]);
  const [newRoomFeature, setNewRoomFeature] = useState<{ name: string }>({ name: '' });
  const [editingRoomFeature, setEditingRoomFeature] = useState<RoomFeature | null>(null);

  // Fetch all room features
  useEffect(() => {
    fetchRoomFeatures();
  }, []);

  const fetchRoomFeatures = async () => {
    try {
      const response = await fetch('/api/admin/RoomFeatures');
      if (!response.ok) throw new Error('Failed to fetch room features');
      const data = await response.json();
      setRoomFeatures(data);
    } catch (error) {
      console.error('Error fetching room features:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingRoomFeature) {
      setEditingRoomFeature({ ...editingRoomFeature, [name]: value });
    } else {
      setNewRoomFeature({ ...newRoomFeature, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRoomFeature) {
        const response = await fetch('/api/admin/RoomFeatures', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingRoomFeature.id, name: editingRoomFeature.name }),
        });
        if (!response.ok) throw new Error('Failed to update room feature');
        setEditingRoomFeature(null);
      } else {
        const response = await fetch('/api/admin/RoomFeatures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRoomFeature),
        });
        if (!response.ok) throw new Error('Failed to create room feature');
        setNewRoomFeature({ name: '' });
      }
      fetchRoomFeatures();
    } catch (error) {
      console.error('Error submitting room feature:', error);
    }
  };

  const handleEdit = (roomFeature: RoomFeature) => {
    setEditingRoomFeature(roomFeature);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/RoomFeatures', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete room feature');
      fetchRoomFeatures();
    } catch (error) {
      console.error('Error deleting room feature:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Room Features</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingRoomFeature ? editingRoomFeature.name : newRoomFeature.name}
          onChange={handleInputChange}
          placeholder="Room feature name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingRoomFeature ? 'Update Room Feature' : 'Add Room Feature'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {roomFeatures.map((roomFeature) => (
          <li key={roomFeature.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{roomFeature.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(roomFeature)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(roomFeature.id)}
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

export default RoomFeatures;







/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */
