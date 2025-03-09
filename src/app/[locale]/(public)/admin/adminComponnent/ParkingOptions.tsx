"use client";
import { useEffect, useState } from "react";
import { getParkingOptions } from "../../../../../../utils/getParkingOptions"; 
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface ParkingOption {
  id: string;
  name: string;
  order: number;
}

const ParkingOptions = () => {
  const [parkingOptions, setParkingOptions] = useState<ParkingOption[]>([]);
  const [newParkingOption, setNewParkingOption] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getParkingOptions(); // Utilisation de getParkingOption
      setParkingOptions(data);
    } catch (error) {
      console.error("Failed to fetch parking options:", error);
    }
  };

  const handleAdd = async () => {
    if (!newParkingOption) return;
    try {
      const response = await fetch('/api/admin/ParkingOptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newParkingOption }),
      });
      if (response.ok) {
        const addedParkingOption = await response.json();
        setParkingOptions([...parkingOptions, addedParkingOption]);
        setNewParkingOption("");
      }
    } catch (error) {
      console.error("Failed to add parking option:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/ParkingOptions?id=${id}`, {
        method: 'DELETE',
      });
      setParkingOptions(parkingOptions.filter((option) => option.id !== id));
    } catch (error) {
      console.error("Failed to delete parking option:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = parkingOptions.findIndex((option) => option.id === id);
    if (index < 0) return;
    const newOrder = [...parkingOptions];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((option, idx) => (option.order = idx));
    setParkingOptions([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/ParkingOptions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parkingOptions: parkingOptions.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/ParkingOptions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setParkingOptions(parkingOptions.map((option) => (option.id === id ? { ...option, name: editing.name } : option)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit parking option:", error);
    }
  };
 
  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Parking Options</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newParkingOption}
          onChange={(e) => setNewParkingOption(e.target.value)}
          placeholder="Add new parking option"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {parkingOptions.map((option, index) => (
          <li key={option.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === option.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{option.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === option.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(option.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: option.id, name: option.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(option.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(option.id, "down")} disabled={index === parkingOptions.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(option.id)}>
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

export default ParkingOptions;
