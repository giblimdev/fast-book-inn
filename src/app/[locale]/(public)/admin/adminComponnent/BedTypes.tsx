"use client";
import { useEffect, useState } from "react";
import { getBedTypes } from "../../../../../../utils/getBedTypes"; 
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface BedType {
  id: string;
  name: string;
  order: number;
}

const BedType = () => {
  const [bedTypes, setBedTypes] = useState<BedType[]>([]);
  const [newBedType, setNewBedType] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getBedTypes(); // Utilisation de getBedType
      setBedTypes(data);
    } catch (error) {
      console.error("Failed to fetch bed types:", error);
    }
  };

  const handleAdd = async () => {
    if (!newBedType) return;
    try {
      const response = await fetch('/api/admin/BedType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBedType }),
      });
      if (response.ok) {
        const addedBedType = await response.json();
        setBedTypes([...bedTypes, addedBedType]);
        setNewBedType("");
      }
    } catch (error) {
      console.error("Failed to add bed type:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/BedType?id=${id}`, {
        method: 'DELETE',
      });
      setBedTypes(bedTypes.filter((type) => type.id !== id));
    } catch (error) {
      console.error("Failed to delete bed type:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = bedTypes.findIndex((type) => type.id === id);
    if (index < 0) return;
    const newOrder = [...bedTypes];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((type, idx) => (type.order = idx));
    setBedTypes([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/BedType', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bedTypes: bedTypes.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/BedType', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setBedTypes(bedTypes.map((type) => (type.id === id ? { ...type, name: editing.name } : type)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit bed type:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Bed Types</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newBedType}
          onChange={(e) => setNewBedType(e.target.value)}
          placeholder="Add new bed type"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {bedTypes.map((type, index) => (
          <li key={type.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === type.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{type.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === type.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(type.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: type.id, name: type.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(type.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(type.id, "down")} disabled={index === bedTypes.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(type.id)}>
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

export default BedType;