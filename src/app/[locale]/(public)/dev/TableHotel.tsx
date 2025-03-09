import React from 'react';

const HotelsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Modélisation de la base de données des hôtels</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">1. Modèle principal : Hotel</h2>
        <p>Représente un hôtel avec plusieurs relations vers d'autres entités.</p>
        <ul className="list-disc ml-6">
          <li><strong>contactDetails</strong> : Détails de contact (téléphone, email, site web).</li>
          <li><strong>address</strong> : Adresse de l'hôtel.</li>
          <li><strong>images</strong> : Liste des images associées.</li>
          <li><strong>destinations</strong> : Lien avec différentes destinations.</li>
          <li><strong>accommodationTypes</strong> : Types d'hébergement proposés.</li>
          <li><strong>services</strong> : Liste des services offerts.</li>
          <li><strong>features</strong> : Caractéristiques spécifiques de l'hôtel.</li>
          <li><strong>createdAt et updatedAt</strong> : Dates de création et de mise à jour.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">2. Informations de contact : ContactDetails</h2>
        <p>Détails de contact associés à un hôtel.</p>
        <ul className="list-disc ml-6">
          <li><strong>phone</strong> : Numéro de téléphone.</li>
          <li><strong>email</strong> : Adresse email.</li>
          <li><strong>website</strong> : Site web.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">3. Adresse : Address</h2>
        <p>Stocke les informations de localisation d'un hôtel.</p>
        <ul className="list-disc ml-6">
          <li><strong>latitude et longitude</strong> : Coordonnées GPS.</li>
          <li><strong>rue, ville, code postal, pays</strong> : Détails de l'adresse.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">4. Images : Image</h2>
        <p>Gestion des images d’un hôtel.</p>
        <ul className="list-disc ml-6">
          <li><strong>url</strong> : Lien vers l’image.</li>
          <li><strong>isMain</strong> : Indique si c'est l'image principale.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">5. Services et équipements : Service</h2>
        <p>Liste des services proposés.</p>
        <ul className="list-disc ml-6">
          <li>Wi-Fi gratuit</li>
          <li>Spa</li>
          <li>Salle de sport</li>
          <li>Restaurant</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">6. Accessibilité : AccessibilityOption</h2>
        <p>Options d’accessibilité pour les personnes à mobilité réduite.</p>
        <ul className="list-disc ml-6">
          <li>Accès PMR</li>
          <li>Ascenseur</li>
          <li>Chambres adaptées</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">7. Parking : ParkingOption</h2>
        <p>Options de stationnement disponibles.</p>
        <ul className="list-disc ml-6">
          <li>Parking gratuit</li>
          <li>Parking privé</li>
          <li>Stationnement avec voiturier</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Résumé</h2>
        <ul className="list-disc ml-6">
          <li><strong>Hôtel</strong> : Structure principale avec relations vers plusieurs entités.</li>
          <li><strong>Contact et adresse</strong> : Stockage des informations de localisation et de communication.</li>
          <li><strong>Images et caractéristiques</strong> : Informations visuelles et particularités de l’hôtel.</li>
          <li><strong>Services et accessibilité</strong> : Options disponibles pour les clients.</li>
          <li><strong>Approche flexible</strong> : Modèle relationnel adapté à divers types d’hébergement.</li>
        </ul>
      </section>
    </div>
  );
};

export default HotelsPage;
