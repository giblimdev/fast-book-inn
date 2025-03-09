import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";

interface Service {
  id: string;
  name: string;
  order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; name: string }>({ id: null, name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/Services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleAdd = async () => {
    if (!newService) return;
    try {
      const response = await fetch('/api/admin/Services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newService }),
      });
      if (response.ok) {
        const addedService = await response.json();
        setServices([...services, addedService]);
        setNewService("");
      }
    } catch (error) {
      console.error("Failed to add service:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/Services?id=${id}`, {
        method: 'DELETE',
      });
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = services.findIndex((service) => service.id === id);
    if (index < 0) return;
    const newOrder = [...services];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((service, idx) => (service.order = idx));
    setServices([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/Services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: services.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/Services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editing.name }),
      });
      setServices(services.map((service) => (service.id === id ? { ...service, name: editing.name } : service)));
      setEditing({ id: null, name: "" });
    } catch (error) {
      console.error("Failed to edit service:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Add new service"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={service.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === service.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            ) : (
              <span>{service.name}</span>
            )}
            <div className="flex gap-2">
              {editing.id === service.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(service.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: service.id, name: service.name })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(service.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(service.id, "down")} disabled={index === services.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(service.id)}>
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

export default Services;
