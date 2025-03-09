"use client";
import { useUserStore } from "../../../../../store/useUserStore";
import { useAccommodationStore } from "../../../../../store/useAccommodationStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importation du router
import AddAccessibilityOptions from "./addAcomponnents/addAccessibilityOptions";
import AddAccommodationTypes from "./addAcomponnents/addAccommodationTypes";
import AddAccomodationCharacteristics from "./addAcomponnents/addAccomodationCharacteristics";
import AddAddress from "./addAcomponnents/addAddress";
import AddBedding from "./addAcomponnents/addBedding";
import AddBedTypes from "./addAcomponnents/addBedTypes";
import AddContactDetails from "./addAcomponnents/addContactDetails";
import AddDestinations from "./addAcomponnents/addDestinations";
import Addimage from "./addAcomponnents/addimage";
import AddParkingOptions from "./addAcomponnents/addParkingOptions";
import AddRoomFeatures from "./addAcomponnents/addRoomFeatures";
import AddServices from "./addAcomponnents/addServices";
import AddAccommodation from "./addAcomponnents/addAccommodation";

export default function AccommodationsPage() {
  const { user } = useUserStore();
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();
  const [userHotels, setUserHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialisation du router

  useEffect(() => {
    // Redirection si l'utilisateur n'est pas connecté
    if (!user) {
      router.push('/auth/login'); // Redirection vers la page de connexion
      return;
    }

    const fetchUserHotels = async () => {
      try {
        // Add the userId parameter to the API request
        const response = await fetch(`/api/listHotelByUser?userId=${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        
        const data = await response.json();
        setUserHotels(data);
      } catch (err) {
        setError('Error fetching hotels. Please try again later.');
        console.error('Error fetching hotels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserHotels();
  }, [user, router]);

  const handleSelectHotel = (hotel: any) => {
    setSelectedAccommodation(hotel);
  };

  // Affichage d'un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  // Si l'utilisateur n'est pas défini, ne rien afficher car la redirection est en cours
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      {/* User Information Section */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div>
          <p><strong>Name:</strong> {user.name || 'Not specified'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not specified'}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Language:</strong> {user.lang}</p>
        </div>
      </section>

      {/* Hotels List Section */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Hotels</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        {userHotels.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {userHotels.map((hotel) => (
                <div 
                  key={hotel.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAccommodation?.id === hotel.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectHotel(hotel)}
                >
                  <h3 className="font-semibold">{hotel.name}</h3>
                  {hotel.address && (
                    <p className="text-sm text-gray-600">
                      {hotel.address.city}, {hotel.address.country}
                    </p>
                  )}
                  <div className="mt-2">
                    <button 
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectHotel(hotel);
                      }}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedAccommodation && (
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <p className="font-medium">Selected: {selectedAccommodation.name}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-center">You don't manage any hotels yet.</p>
          </div>
        )}
      </section>

      {/* Hotel Management Components */}
      <section className="space-y-8">
        <AddAccommodation />
        <AddContactDetails />
        <AddAddress />
        <Addimage />
        <AddDestinations />
        <AddAccommodationTypes />
        <AddAccomodationCharacteristics />
        <AddBedding />
        <AddServices />
        <AddAccessibilityOptions />
        <AddRoomFeatures />
        <AddParkingOptions />
        <AddBedTypes />
      </section>
    </div>
  );
}
