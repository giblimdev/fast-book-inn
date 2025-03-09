"use client";
import React, { useState, useEffect } from 'react';

interface Destination {
  id: string;
  name: string;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [newDestination, setNewDestination] = useState<{ name: string }>({ name: '' });
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  // Fetch all destinations
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/admin/Destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingDestination) {
      setEditingDestination({ ...editingDestination, [name]: value });
    } else {
      setNewDestination({ ...newDestination, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDestination) {
        const response = await fetch('/api/admin/Destinations', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingDestination.id, name: editingDestination.name }),
        });
        if (!response.ok) throw new Error('Failed to update destination');
        setEditingDestination(null);
      } else {
        const response = await fetch('/api/admin/Destinations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDestination),
        });
        if (!response.ok) throw new Error('Failed to create destination');
        setNewDestination({ name: '' });
      }
      fetchDestinations();
    } catch (error) {
      console.error('Error submitting destination:', error);
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/Destinations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete destination');
      fetchDestinations();
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Destinations</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingDestination ? editingDestination.name : newDestination.name}
          onChange={handleInputChange}
          placeholder="Destination name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingDestination ? 'Update Destination' : 'Add Destination'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {destinations.map((destination) => (
          <li key={destination.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{destination.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(destination)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(destination.id)}
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

export default Destinations;


/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */

