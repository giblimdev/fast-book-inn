"use client";
import { useEffect, useState } from "react";
import { getBeddingConfigurations } from "../../../../../../utils/getBeddingConfiguration"; // Utilisation de getBedding
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface BeddingConfiguration {
  id: string;
  name: string;
  order: number;
}

const BeddingConfiguration = () => {
  const [beddingConfigurations, setBeddingConfigurations] = useState<BeddingConfiguration[]>([]);
  const [newBeddingConfiguration, setNewBeddingConfiguration] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getBeddingConfigurations(); // Utilisation de getBedding
      setBeddingConfigurations(data);
    } catch (error) {
      console.error("Failed to fetch bedding configurations:", error);
    }
  };

  const handleAdd = async () => {
    if (!newBeddingConfiguration) return;
    try {
      const response = await fetch('/api/admin/Bedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBeddingConfiguration }),
      });
      if (response.ok) {
        const addedBeddingConfiguration = await response.json();
        setBeddingConfigurations([...beddingConfigurations, addedBeddingConfiguration]);
        setNewBeddingConfiguration("");
      }
    } catch (error) {
      console.error("Failed to add bedding configuration:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/Bedding?id=${id}`, {
        method: 'DELETE',
      });
      setBeddingConfigurations(beddingConfigurations.filter((config) => config.id !== id));
    } catch (error) {
      console.error("Failed to delete bedding configuration:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = beddingConfigurations.findIndex((config) => config.id === id);
    if (index < 0) return;
    const newOrder = [...beddingConfigurations];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((config, idx) => (config.order = idx));
    setBeddingConfigurations([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/Bedding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beddingConfigurations: beddingConfigurations.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/Bedding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setBeddingConfigurations(beddingConfigurations.map((config) => (config.id === id ? { ...config, name: editing.name } : config)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit bedding configuration:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Bedding Configurations</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newBeddingConfiguration}
          onChange={(e) => setNewBeddingConfiguration(e.target.value)}
          placeholder="Add new bedding configuration"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {beddingConfigurations.map((config, index) => (
          <li key={config.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === config.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{config.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === config.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(config.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: config.id, name: config.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(config.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(config.id, "down")} disabled={index === beddingConfigurations.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(config.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white p-2 rounded flex items-center" onClick={handleSaveOrder}>
          <FaSave className="mr-2" /> Save Order
        </button>
      </div>
    </div>
  );
};

export default BeddingConfiguration;