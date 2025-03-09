"use client";
import { useEffect, useState } from "react";
import { getDestinations } from "../../../../../../utils/getDestination"; // Utilisation de getDestination
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface Destination {
  id: string;
  name: string;
  order: number;
}

const Destination = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [newDestination, setNewDestination] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getDestinations(); // Utilisation de getDestination
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  const handleAdd = async () => {
    if (!newDestination) return;
    try {
      const response = await fetch('/api/admin/Destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newDestination }),
      });
      if (response.ok) {
        const addedDestination = await response.json();
        setDestinations([...destinations, addedDestination]);
        setNewDestination("");
      }
    } catch (error) {
      console.error("Failed to add destination:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/Destinations?id=${id}`, {
        method: 'DELETE',
      });
      setDestinations(destinations.filter((dest) => dest.id !== id));
    } catch (error) {
      console.error("Failed to delete destination:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = destinations.findIndex((dest) => dest.id === id);
    if (index < 0) return;
    const newOrder = [...destinations];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((dest, idx) => (dest.order = idx));
    setDestinations([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/Destinations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations: destinations.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/Destinations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setDestinations(destinations.map((dest) => (dest.id === id ? { ...dest, name: editing.name } : dest)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit destination:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Destinations</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          placeholder="Add new destination"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {destinations.map((dest, index) => (
          <li key={dest.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === dest.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{dest.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === dest.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(dest.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: dest.id, name: dest.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(dest.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(dest.id, "down")} disabled={index === destinations.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(dest.id)}>
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

export default Destination;