import { useEffect, useState } from "react";
import { getAccommodationCharacteristics } from "../../../../../../utils/getAccomodationCharacteristics";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface AccommodationCharacteristic {
  id: string;
  name: string;
  order: number;
}

const AccommodationCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState<AccommodationCharacteristic[]>([]);
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAccommodationCharacteristics();
      setCharacteristics(data);
    } catch (error) {
      console.error("Failed to fetch characteristics:", error);
    }
  };

  const handleAdd = async () => {
    if (!newCharacteristic) return;
    try {
      const response = await fetch('/api/admin/AccomodationCharacteristics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCharacteristic }),
      });
      if (response.ok) {
        const addedCharacteristic = await response.json();
        setCharacteristics([...characteristics, addedCharacteristic]);
        setNewCharacteristic("");
      }
    } catch (error) {
      console.error("Failed to add characteristic:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/AccomodationCharacteristics?id=${id}`, {
        method: 'DELETE',
      });
      setCharacteristics(characteristics.filter((characteristic) => characteristic.id !== id));
    } catch (error) {
      console.error("Failed to delete characteristic:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = characteristics.findIndex((characteristic) => characteristic.id === id);
    if (index < 0) return;
    const newOrder = [...characteristics];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((characteristic, idx) => (characteristic.order = idx));
    setCharacteristics([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/AccomodationCharacteristics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characteristics: characteristics.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/AccomodationCharacteristics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setCharacteristics(characteristics.map((characteristic) => (characteristic.id === id ? { ...characteristic, name: editing.name } : characteristic)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit characteristic:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Accommodation Characteristics</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newCharacteristic}
          onChange={(e) => setNewCharacteristic(e.target.value)}
          placeholder="Add new characteristic"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {characteristics.map((characteristic, index) => (
          <li key={characteristic.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === characteristic.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{characteristic.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === characteristic.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(characteristic.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: characteristic.id, name: characteristic.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(characteristic.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(characteristic.id, "down")} disabled={index === characteristics.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(characteristic.id)}>
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

export default AccommodationCharacteristics;
