"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Save } from 'lucide-react'; // Import des icônes

interface AccessibilityOption {
  id: string;
  name: string;
  order: number;
}

const AccessibilityOptions: React.FC = () => {
  const [options, setOptions] = useState<AccessibilityOption[]>([]);
  const [newOption, setNewOption] = useState<{ name: string }>({ name: '' });
  const [editingOption, setEditingOption] = useState<AccessibilityOption | null>(null);

  // Fetch all accessibility options
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/admin/AccessibilityOpt');
      if (!response.ok) throw new Error('Failed to fetch options');
      const data = await response.json();
      // Sort options by order
      const sortedData = data.sort((a: AccessibilityOption, b: AccessibilityOption) => a.order - b.order);
      setOptions(sortedData);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingOption) {
      setEditingOption({ ...editingOption, [name]: value });
    } else {
      setNewOption({ ...newOption, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOption) {
        const response = await fetch('/api/admin/AccessibilityOpt', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: editingOption.id, 
            name: editingOption.name,
            order: editingOption.order 
          }),
        });
        if (!response.ok) throw new Error('Failed to update option');
        setEditingOption(null);
      } else {
        // Set order as the highest existing order + 1 or 1 if no existing options
        const newOrder = options.length > 0 
          ? Math.max(...options.map(opt => opt.order)) + 1 
          : 1;
          
        const response = await fetch('/api/admin/AccessibilityOpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newOption, order: newOrder }),
        });
        if (!response.ok) throw new Error('Failed to create option');
        setNewOption({ name: '' });
      }
      fetchOptions();
    } catch (error) {
      console.error('Error submitting option:', error);
    }
  };

  const handleEdit = (option: AccessibilityOption) => {
    setEditingOption(option);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/AccessibilityOpt', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete option');
      fetchOptions();
    } catch (error) {
      console.error('Error deleting option:', error);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Already at the top

    const updatedOptions = [...options];
    // Swap orders
    const tempOrder = updatedOptions[index].order;
    updatedOptions[index].order = updatedOptions[index - 1].order;
    updatedOptions[index - 1].order = tempOrder;

    // Swap positions in the array
    [updatedOptions[index], updatedOptions[index - 1]] = [updatedOptions[index - 1], updatedOptions[index]];

    setOptions(updatedOptions);
  };

  const handleMoveDown = (index: number) => {
    if (index === options.length - 1) return; // Already at the bottom

    const updatedOptions = [...options];
    // Swap orders
    const tempOrder = updatedOptions[index].order;
    updatedOptions[index].order = updatedOptions[index + 1].order;
    updatedOptions[index + 1].order = tempOrder;

    // Swap positions in the array
    [updatedOptions[index], updatedOptions[index + 1]] = [updatedOptions[index + 1], updatedOptions[index]];

    setOptions(updatedOptions);
  };

  const saveOrder = async () => {
    try {
      // Update each option's order in the database
      await Promise.all(
        options.map((option) =>
          fetch('/api/admin/AccessibilityOpt', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              id: option.id, 
              name: option.name,
              order: option.order 
            }),
          })
        )
      );

      fetchOptions(); // Refresh the list to ensure consistency
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Accessibility Options</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          name="name"
          value={editingOption ? editingOption.name : newOption.name}
          onChange={handleInputChange}
          placeholder="Option name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {editingOption ? 'Update Option' : 'Add Option'}
        </button>
        {editingOption && (
          <button
            type="button"
            onClick={() => setEditingOption(null)}
            className="w-full mt-2 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        )}
      </form>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {options.map((option, index) => (
          <li key={option.id} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{option.name}</span>
              <span className="text-gray-500">(Order: {option.order})</span>
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
                disabled={index === options.length - 1}
                className={`p-2 rounded-lg ${index === options.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'} text-white transition duration-200`}
                title="Move Down"
              >
                <ArrowDown size={16} />
              </button>
              <button
                onClick={() => handleEdit(option)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(option.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {options.length === 0 && (
          <li className="p-4 text-gray-500 text-center">No accessibility options found</li>
        )}
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

export default AccessibilityOptions;
