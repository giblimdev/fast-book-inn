/*

export const bedTypes = [
    "1 king size bed", // 1 lit king size
    "1 double bed", // 1 lit double
    "1 single bed", // 1 lit simple
    "2 single beds", // 2 lits simples
    "3 beds and more", // 3 lits et +
  ];

 */
/*

model BedType {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}


*/
"use client";
import React, { useState, useEffect } from 'react';

interface BedType {
  id: string;
  name: string;
}

const BedTypes: React.FC = () => {
  const [bedTypes, setBedTypes] = useState<BedType[]>([]);
  const [newBedType, setNewBedType] = useState<{ name: string }>({ name: '' });
  const [editingBedType, setEditingBedType] = useState<BedType | null>(null);

  // Fetch all bed types
  useEffect(() => {
    fetchBedTypes();
  }, []);

  const fetchBedTypes = async () => {
    try {
      const response = await fetch('/api/admin/BedType');
      if (!response.ok) throw new Error('Failed to fetch bed types');
      const data = await response.json();
      setBedTypes(data);
    } catch (error) {
      console.error('Error fetching bed types:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingBedType) {
      setEditingBedType({ ...editingBedType, [name]: value });
    } else {
      setNewBedType({ ...newBedType, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBedType) {
        const response = await fetch('/api/admin/BedType', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBedType.id, name: editingBedType.name }),
        });
        if (!response.ok) throw new Error('Failed to update bed type');
        setEditingBedType(null);
      } else {
        const response = await fetch('/api/admin/BedType', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBedType),
        });
        if (!response.ok) throw new Error('Failed to create bed type');
        setNewBedType({ name: '' });
      }
      fetchBedTypes();
    } catch (error) {
      console.error('Error submitting bed type:', error);
    }
  };

  const handleEdit = (bedType: BedType) => {
    setEditingBedType(bedType);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/BedType', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete bed type');
      fetchBedTypes();
    } catch (error) {
      console.error('Error deleting bed type:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bed Types</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingBedType ? editingBedType.name : newBedType.name}
          onChange={handleInputChange}
          placeholder="Bed type name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingBedType ? 'Update Bed Type' : 'Add Bed Type'}
        </button>
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {bedTypes.map((bedType) => (
          <li key={bedType.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{bedType.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(bedType)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bedType.id)}
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

export default BedTypes;

/*crées une mise forme conviviale ajoute les flèches up et down pour modifier ordre et rends ces flèches fonctionnelles. */