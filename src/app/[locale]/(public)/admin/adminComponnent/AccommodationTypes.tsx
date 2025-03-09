"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Save } from 'lucide-react'; // Import des icônes

interface AccommodationType {
  id: string;
  name: string;
  order: number; // Ajout de l'ordre
}

const AccommodationTypes: React.FC = () => {
  const [accommodationTypes, setAccommodationTypes] = useState<AccommodationType[]>([]);
  const [newAccommodationType, setNewAccommodationType] = useState<{ name: string }>({ name: '' });
  const [editingAccommodationType, setEditingAccommodationType] = useState<AccommodationType | null>(null);

  // Fetch all accommodation types
  useEffect(() => {
    fetchAccommodationTypes();
  }, []);

  const fetchAccommodationTypes = async () => {
    try {
      const response = await fetch('/api/admin/AccommodationTypes');
      if (!response.ok) throw new Error('Failed to fetch accommodation types');
      const data = await response.json();
      // Sort options by order
      const sortedData = data.sort((a: AccommodationType, b: AccommodationType) => a.order - b.order);
      setAccommodationTypes(sortedData);
    } catch (error) {
      console.error('Error fetching accommodation types:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingAccommodationType) {
      setEditingAccommodationType({ ...editingAccommodationType, [name]: value });
    } else {
      setNewAccommodationType({ ...newAccommodationType, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAccommodationType) {
        const response = await fetch('/api/admin/AccommodationTypes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: editingAccommodationType.id, 
            name: editingAccommodationType.name,
            order: editingAccommodationType.order 
          }),
        });
        if (!response.ok) throw new Error('Failed to update accommodation type');
        setEditingAccommodationType(null);
      } else {
        // Set order as the highest existing order + 1 or 1 if no existing options
        const newOrder = accommodationTypes.length > 0 
          ? Math.max(...accommodationTypes.map(opt => opt.order)) + 1 
          : 1;
          
        const response = await fetch('/api/admin/AccommodationTypes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newAccommodationType, order: newOrder }),
        });
        if (!response.ok) throw new Error('Failed to create accommodation type');
        setNewAccommodationType({ name: '' });
      }
      fetchAccommodationTypes();
    } catch (error) {
      console.error('Error submitting accommodation type:', error);
    }
  };

  const handleEdit = (accommodationType: AccommodationType) => {
    setEditingAccommodationType(accommodationType);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/AccommodationTypes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete accommodation type');
      fetchAccommodationTypes();
    } catch (error) {
      console.error('Error deleting accommodation type:', error);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Already at the top

    const updatedAccommodationTypes = [...accommodationTypes];
    // Swap orders
    const tempOrder = updatedAccommodationTypes[index].order;
    updatedAccommodationTypes[index].order = updatedAccommodationTypes[index - 1].order;
    updatedAccommodationTypes[index - 1].order = tempOrder;

    // Swap positions in the array
    [updatedAccommodationTypes[index], updatedAccommodationTypes[index - 1]] = [updatedAccommodationTypes[index - 1], updatedAccommodationTypes[index]];

    setAccommodationTypes(updatedAccommodationTypes);
  };

  const handleMoveDown = (index: number) => {
    if (index === accommodationTypes.length - 1) return; // Already at the bottom

    const updatedAccommodationTypes = [...accommodationTypes];
    // Swap orders
    const tempOrder = updatedAccommodationTypes[index].order;
    updatedAccommodationTypes[index].order = updatedAccommodationTypes[index + 1].order;
    updatedAccommodationTypes[index + 1].order = tempOrder;

    // Swap positions in the array
    [updatedAccommodationTypes[index], updatedAccommodationTypes[index + 1]] = [updatedAccommodationTypes[index + 1], updatedAccommodationTypes[index]];

    setAccommodationTypes(updatedAccommodationTypes);
  };

  const saveOrder = async () => {
    try {
      // Update each accommodation type's order in the database
      await Promise.all(
        accommodationTypes.map((accommodationType) =>
          fetch('/api/admin/AccommodationTypes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              id: accommodationType.id, 
              name: accommodationType.name,
              order: accommodationType.order 
            }),
          })
        )
      );

      fetchAccommodationTypes(); // Refresh the list to ensure consistency
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Accommodation Types</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingAccommodationType ? editingAccommodationType.name : newAccommodationType.name}
          onChange={handleInputChange}
          placeholder="Accommodation type name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingAccommodationType ? 'Update Accommodation Type' : 'Add Accommodation Type'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {accommodationTypes.map((accommodationType, index) => (
          <li key={accommodationType.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{accommodationType.name}</span>
              <span className="text-gray-500">(Order: {accommodationType.order})</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={`p-2 rounded-lg ${index === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'} text-white transition duration-200`}
                title="Move Up"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === accommodationTypes.length - 1}
                className={`p-2 rounded-lg ${index === accommodationTypes.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'} text-white transition duration-200`}
                title="Move Down"
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={() => handleEdit(accommodationType)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(accommodationType.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={saveOrder}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2"
      >
        <Save size={16} />
        <span>Enregistrer l'ordre</span>
      </button>
    </div>
  );
};

export default AccommodationTypes;