"use client";

import React from "react";
import { Button } from "../../../../../components/ui/button"; // Assurez-vous d'avoir un composant Button
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          À propos de <Link href="/" className="text-2xl font-bold text-blue-600">FastBookInn</Link> 
        </h1>
        <p className="text-lg text-gray-600 mb-8">
           <Link href="/" className="text-2xl font-bold text-blue-600">FastBookInn</Link> est une plateforme innovante conçue pour mettre en relation directe les hôteliers et les voyageurs, sans intermédiaires coûteux. Notre mission est de simplifier les réservations tout en permettant aux hôteliers de maximiser leurs revenus.
        </p>

        <div className="space-y-8">
          {/* Section Pourquoi choisir [Nom de votre application] ? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi choisir  <Link href="/" className="text-2xl font-bold text-blue-600">FastBookInn</Link> ?
            </h2>
            <div className="space-y-4 text-left">
              <p className="text-gray-600">
                <strong>Inscription 100% gratuite pour les hôteliers :</strong> Rejoignez notre communauté sans frais d'inscription ni engagement.
              </p>
              <p className="text-gray-600">
                <strong>Mise en relation directe avec les voyageurs :</strong> Supprimez les intermédiaires et établissez une relation de confiance avec vos clients.
              </p>
              <p className="text-gray-600">
                <strong>Économisez sur les commissions exorbitantes :</strong> Gardez l'intégralité de vos revenus sans frais cachés.
              </p>
              <p className="text-gray-600">
                <strong>Visibilité accrue :</strong> Notre plateforme vous offre une visibilité optimale auprès des voyageurs.
              </p>
              <p className="text-gray-600">
                <strong>Gestion simplifiée :</strong> Gérez vos réservations, disponibilités et tarifs en toute simplicité.
              </p>
            </div>
          </section>

          {/* Section Comment ça marche ? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <div className="space-y-4 text-left">
              <p className="text-gray-600">
                <strong>1. Créez votre profil :</strong> Inscrivez-vous gratuitement et ajoutez votre établissement en quelques étapes simples.
              </p>
              <p className="text-gray-600">
                <strong>2. Ajoutez vos informations :</strong> Téléchargez des photos, décrivez vos services et fixez vos tarifs.
              </p>
              <p className="text-gray-600">
                <strong>3. Recevez des réservations :</strong> Les voyageurs peuvent réserver directement via votre profil.
              </p>
              <p className="text-gray-600">
                <strong>4. Économisez et grandissez :</strong> Sans commissions élevées, maximisez vos revenus et développez votre activité.
              </p>
            </div>
          </section>

          {/* Section Avantages pour les voyageurs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Avantages pour les voyageurs
            </h2>
            <div className="space-y-4 text-left">
              <p className="text-gray-600">
                <strong>Transparence des prix :</strong> Les voyageurs voient directement vos tarifs sans frais supplémentaires.
              </p>
              <p className="text-gray-600">
                <strong>Confiance :</strong> Les avis et commentaires des clients aident à construire une réputation solide.
              </p>
              <p className="text-gray-600">
                <strong>Simplicité :</strong> Les réservations sont rapides et sécurisées, sans intermédiaires.
              </p>
            </div>
          </section>
{/* Section monétisation */}
<section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              monétisation
            </h2>
            <div className="space-y-4 text-left">
            <p className="text-gray-600">
                <strong>Principe de base</strong>le Service est restera Gratuit. Nous fesont confiance à la communauté au fur et a mesur que la pllatforme se développera.
              </p>
              <p className="text-gray-600">
                <strong>Donnation</strong> un teepee est ouvert pour que les hotelier et les voyageur qui veulent soutenirune initiative qui permet des économies substantiel.
              </p>
              <p className="text-gray-600">
                <strong>mise en place d'une plateforme de réservation</strong> pour des hotel qui ne dispose pas d'alternative aux majers, nous proposons un solution simple a faible coûts : 5€/mois
              </p>
              <p className="text-gray-600">
                <strong>Sponsorig :</strong> npus affrirons un systeme d'amélioration de la pertinance pour les établissement qui le désir.
              </p>
            </div>
          </section>
          {/* Section Témoignages */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Témoignages
            </h2>
            <div className="space-y-4 text-left">
              <blockquote className="text-gray-600 italic">
                "Grâce à <Link href="/" className="text-2xl font-bold text-blue-600">FastBookInn</Link> , nous avons réduit nos coûts de réservation de 20% et augmenté notre taux d'occupation. Une véritable révolution pour notre établissement !"
                <br />
                – [Nom de l'hôtelier], [Nom de l'établissement]
              </blockquote>
              <blockquote className="text-gray-600 italic">
                "Enfin une plateforme qui pense aux hôteliers. Simple, efficace et sans frais cachés. Je recommande !"
                <br />
                – [Nom de l'hôtelier], [Nom de l'établissement]
              </blockquote>
            </div>
          </section>

          {/* Section Call-to-action */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez-nous dès aujourd'hui !
            </h2>
            <p className="text-gray-600 mb-6">
              [Nom de votre application] est la solution idéale pour les hôteliers qui souhaitent reprendre le contrôle de leur activité et maximiser leurs revenus. Inscrivez-vous gratuitement dès maintenant et commencez à attirer plus de clients sans payer de commissions exorbitantes.
            </p>
            <Button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Inscrivez-vous gratuitement
            </Button>
          </section>
        </div>
      </div>

      <div className="flex justify-center mt-12">

      <ul>
        <li>accomodation</li>
  <li>Inn</li>
  <li>Lodge</li>
  <li>Resort</li>
  <li>Stay</li>
  <li>GetawayHousing</li>
  <li>Lodging</li>
  </ul>
<ul>
<li>Booking</li>
<li>resa</li>
<li>Registration</li>
<li>Hold</li>

</ul>
      </div>
     
    </div>
  );
}