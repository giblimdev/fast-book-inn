//src/app/[locale]/(protected)/user/page.tsx
"use client";
import React, { useState } from "react";
import { useUserStore } from "../../../../../store/useUserStore";

function UserProfilePage() {
  // Récupérer l'utilisateur et les fonctions du store
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  // État local pour gérer les modifications
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: user?.lang || "",
    role: user?.role || "USER",
  });

  // Validation de l'email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire (mise à jour)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de l'email
    if (!validateEmail(formData.email)) {
      alert("Veuillez entrer un email valide.");
      return;
    }

    // Mettre à jour l'utilisateur dans le store
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lang: formData.language,
        role: formData.role,
      };

      // Envoyer les données à l'API pour mise à jour
      try {
        const response = await fetch(`../../api/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
          setUser(updatedUser); // Mettre à jour le store
          alert("Informations mises à jour avec succès !");
        } else {
          const errorData = await response.json();
          alert(`Erreur : ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        alert("Une erreur s'est produite lors de la mise à jour.");
      }
    }
  };

  // Gestion de la suppression de l'utilisateur
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        const response = await fetch(`/api/users/${user?.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Compte supprimé avec succès !");
          clearUser(); // Réinitialiser le store
          window.location.href = "/"; // Rediriger vers la page d'accueil
        } else {
          const errorData = await response.json();
          alert(`Erreur : ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        alert("Une erreur s'est produite lors de la suppression.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profil de l'utilisateur</h1>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ pour le nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Champ pour l'email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Champ pour le téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Champ pour la langue */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium">
              Langue
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Champ pour le rôle (lecture seule) */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Rôle
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Mettre à jour
          </button>

          {/* Bouton de suppression */}
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 mt-4"
          >
            Supprimer mon compte
          </button>
        </form>
      ) : (
        <p>Chargement de l'utilisateur...</p>
      )}
    </div>
  );
}

export default UserProfilePage;