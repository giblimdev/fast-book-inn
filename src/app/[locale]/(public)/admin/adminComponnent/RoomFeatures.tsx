import { useEffect, useState } from "react";
import { getRoomFeatures } from "../../../../../../utils/getRoomFfeatures"; 
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface RoomFeature {
  id: string;
  name: string;
  order: number;
}

const RoomFeatures = () => {
  const [features, setFeatures] = useState<RoomFeature[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRoomFeatures();
      setFeatures(data);
    } catch (error) {
      console.error("Failed to fetch room features:", error);
    }
  };

  const handleAdd = async () => {
    if (!newFeature) return;
    try {
      const response = await fetch("/api/admin/RoomFeatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFeature }),
      });
      if (response.ok) {
        const addedFeature = await response.json();
        setFeatures([...features, addedFeature]);
        setNewFeature("");
      }
    } catch (error) {
      console.error("Failed to add room feature:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/RoomFeatures?id=${id}`, {
        method: "DELETE",
      });
      setFeatures(features.filter((feature) => feature.id !== id));
    } catch (error) {
      console.error("Failed to delete room feature:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = features.findIndex((feature) => feature.id === id);
    if (index < 0) return;
    const newOrder = [...features];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((feature, idx) => (feature.order = idx));
    setFeatures([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch("/api/admin/RoomFeatures", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: features.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch("/api/admin/RoomFeatures", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setFeatures(
        features.map((feature) =>
          feature.id === id ? { ...feature, name: editing.name } : feature
        )
      );
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit room feature:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Room Features</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add new room feature"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={feature.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === feature.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{feature.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === feature.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(feature.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: feature.id, name: feature.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(feature.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(feature.id, "down")} disabled={index === features.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(feature.id)}>
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

export default RoomFeatures;
