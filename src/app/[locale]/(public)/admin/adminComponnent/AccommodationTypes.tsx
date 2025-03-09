import { useEffect, useState } from "react";
import { getAccommodationTypes } from "../../../../../../utils/getAccommodationTypes"; // Ajustez le chemin en fonction de votre structure
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface AccommodationType {
  id: string;
  name: string;
  order: number;
}

const AccommodationTypes = () => {
  const [types, setTypes] = useState<AccommodationType[]>([]);
  const [newType, setNewType] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAccommodationTypes();
      setTypes(data);
    } catch (error) {
      console.error("Failed to fetch accommodation types:", error);
    }
  };

  const handleAdd = async () => {
    if (!newType) return;
    try {
      const response = await fetch("/api/admin/AccommodationTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newType }),
      });
      if (response.ok) {
        const addedType = await response.json();
        setTypes([...types, addedType]);
        setNewType("");
      }
    } catch (error) {
      console.error("Failed to add accommodation type:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/AccommodationTypes?id=${id}`, {
        method: "DELETE",
      });
      setTypes(types.filter((type) => type.id !== id));
    } catch (error) {
      console.error("Failed to delete accommodation type:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = types.findIndex((type) => type.id === id);
    if (index < 0) return;
    const newOrder = [...types];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((type, idx) => (type.order = idx));
    setTypes([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch("/api/admin/AccommodationTypes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          types: types.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch("/api/admin/AccommodationTypes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setTypes(
        types.map((type) =>
          type.id === id ? { ...type, name: editing.name } : type
        )
      );
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit accommodation type:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Accommodation Types</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Add new accommodation type"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {types.map((type, index) => (
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
              <button onClick={() => handleMove(type.id, "down")} disabled={index === types.length - 1} className="text-gray-500">
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

export default AccommodationTypes;
