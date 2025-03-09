import { useEffect, useState } from "react";
import { getMealPlans } from "../../../../../../utils/getMealPlan"; 
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface MealPlan {
  id: string;
  name: string;
  order: number;
}

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [newMealPlan, setNewMealPlan] = useState({ name: "" });
  const [editing, setEditing] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMealPlans();
      setMealPlans(data);
    } catch (error) {
      console.error("Failed to fetch meal plans:", error);
    }
  };

  const handleAdd = async () => {
    if (!newMealPlan.name) return;
    try {
      const response = await fetch("/api/admin/MealPlans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMealPlan),
      });
      if (response.ok) {
        const addedMealPlan = await response.json();
        setMealPlans([...mealPlans, addedMealPlan]);
        setNewMealPlan({ name: "" });
      }
    } catch (error) {
      console.error("Failed to add meal plan:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/MealPlans?id=${id}`, {
        method: "DELETE",
      });
      setMealPlans(mealPlans.filter((mealPlan) => mealPlan.id !== id));
    } catch (error) {
      console.error("Failed to delete meal plan:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = mealPlans.findIndex((mealPlan) => mealPlan.id === id);
    if (index < 0) return;
    const newOrder = [...mealPlans];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((mealPlan, idx) => (mealPlan.order = idx));
    setMealPlans([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch("/api/admin/MealPlans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealPlans: mealPlans.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch("/api/admin/MealPlans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: editing.name,
        }),
      });
      setMealPlans(
        mealPlans.map((mealPlan) =>
          mealPlan.id === id ? { ...mealPlan, name: editing.name } : mealPlan
        )
      );
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit meal plan:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Meal Plans</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newMealPlan.name}
          onChange={(e) => setNewMealPlan({ name: e.target.value })}
          placeholder="Meal Plan Name"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {mealPlans.map((mealPlan, index) => (
          <li key={mealPlan.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === mealPlan.id ? (
              <>
                <input
                  type="text"
                  className="border p-1 flex-grow"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </>
            ) : (
              <span>{mealPlan.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === mealPlan.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(mealPlan.id)}>
                  ✅
                </button>
              ) : (
                <button
                  className="text-blue-500"
                  onClick={() => setEditing({ id: mealPlan.id, name: mealPlan.name })}
                >
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(mealPlan.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(mealPlan.id, "down")} disabled={index === mealPlans.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(mealPlan.id)}>
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

export default MealPlans;
