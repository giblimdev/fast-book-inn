import { useEffect, useState } from "react";
import { getLanguages } from "../../../../../../utils/getLanguages";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaSave } from "react-icons/fa";
import { Languages } from 'lucide-react';

interface Language {
  id: string;
  lang: string;
  order?: number;
}

const Language = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [editing, setEditing] = useState<{ id: string | null; lang: string }>({ id: null, lang: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getLanguages();
      // Convertir `null` en `undefined` pour éviter l'erreur TypeScript
      const formattedData = data.map((lang) => ({
        ...lang,
        order: lang.order ?? undefined,
      }));
      setLanguages(formattedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des langues :", error);
    }
  };

  const handleAdd = async () => {
    if (!newLanguage) return;
    try {
      const response = await fetch('/api/admin/languages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: newLanguage }),
      });
      if (response.ok) {
        const addedLanguage = await response.json();
        setLanguages([...languages, addedLanguage]);
        setNewLanguage("");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la langue :", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/languages?id=${id}`, { method: 'DELETE' });
      setLanguages(languages.filter((lang) => lang.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la langue :", error);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    const index = languages.findIndex((lang) => lang.id === id);
    if (index < 0) return;
    const newOrder = [...languages];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    newOrder.forEach((lang, idx) => (lang.order = idx));
    setLanguages([...newOrder]);
  };

  const handleSaveOrder = async () => {
    try {
      await fetch('/api/admin/languages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languages: languages.map(({ id, order }) => ({ id, order })),
        }),
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'ordre :", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await fetch('/api/admin/languages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, lang: editing.lang }),
      });
      setLanguages(languages.map((lang) => (lang.id === id ? { ...lang, lang: editing.lang } : lang)));
      setEditing({ id: null, lang: "" });
    } catch (error) {
      console.error("Erreur lors de la modification de la langue :", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Languages />
        <h2 className="text-xl font-semibold">Langues</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          placeholder="Ajouter une nouvelle langue"
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {languages.map((lang, index) => (
          <li key={lang.id} className="flex items-center justify-between p-2 border rounded">
            {editing.id === lang.id ? (
              <input
                type="text"
                className="border p-1 flex-grow"
                value={editing.lang}
                onChange={(e) => setEditing({ ...editing, lang: e.target.value })}
              />
            ) : (
              <span>{lang.lang}</span>
            )}
            <div className="flex gap-2">
              {editing.id === lang.id ? (
                <button className="bg-green-500 text-white p-1 rounded" onClick={() => handleEdit(lang.id)}>
                  ✅
                </button>
              ) : (
                <button className="text-blue-500" onClick={() => setEditing({ id: lang.id, lang: lang.lang })}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => handleMove(lang.id, "up")} disabled={index === 0} className="text-gray-500">
                <FaArrowUp />
              </button>
              <button onClick={() => handleMove(lang.id, "down")} disabled={index === languages.length - 1} className="text-gray-500">
                <FaArrowDown />
              </button>
              <button className="text-red-500" onClick={() => handleDelete(lang.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white p-2 rounded flex items-center" onClick={handleSaveOrder}>
          <FaSave className="mr-2" /> Sauvegarder l'ordre
        </button>
      </div>
    </div>
  );
};

export default Language;
