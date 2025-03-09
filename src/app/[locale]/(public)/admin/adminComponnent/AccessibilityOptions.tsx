import { useEffect, useState } from "react";
import { getAccessibilityOptions } from "../../../../../../utils/getAccessibilityOptions";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface AccessibilityOption {
  id: string;
  name: string;
  order: number;
}

const AccessibilityOptions = () => {
  const [accessibilityOptions, setAccessibilityOptions] = useState<AccessibilityOption[]>([]);
  const [newAccessibilityOption, setNewAccessibilityOption] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAccessibilityOptions();
      setAccessibilityOptions(data);
    } catch (error) {
      console.error("Failed to fetch accessibility options:", error);
    }
  };

  const handleAdd = async () => {
    if (!newAccessibilityOption) return;
    try {
      const response = await fetch('/api/admin/AccessibilityOpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAccessibilityOption }),
      });
      if (response.ok) {
        const addedOption = await response.json();
        setAccessibilityOptions([...accessibilityOptions, addedOption]);
        setNewAccessibilityOption("");
      }
    } catch (error) {
      console.error("Failed to add accessibility option:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/AccessibilityOpt?id=${id}`, {
        method: 'DELETE',
      });
      setAccessibilityOptions(accessibilityOptions.filter((opt) => opt.id !== id));
    } catch (error) {
      console.error("Failed to delete accessibility option:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = accessibilityOptions.findIndex((opt) => opt.id === id);
    if (index < 0) return;
    const newOrder = [...accessibilityOptions];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((opt, idx) => (opt.order = idx));
    setAccessibilityOptions([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/AccessibilityOpt', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          options: accessibilityOptions.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/AccessibilityOpt', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setAccessibilityOptions(
        accessibilityOptions.map((opt) =>
          opt.id === id ? { ...opt, name: editing.name } : opt
        )
      );
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit accessibility option:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Accessibility Options</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newAccessibilityOption}
          onChange={(e) => setNewAccessibilityOption(e.target.value)}
          placeholder="Add new option"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {accessibilityOptions.map((opt, index) => (
          <li key={opt.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === opt.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{opt.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === opt.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(opt.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: opt.id, name: opt.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(opt.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(opt.id, "down")} disabled={index === accessibilityOptions.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(opt.id)}>
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

export default AccessibilityOptions;
