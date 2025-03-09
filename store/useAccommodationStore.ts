/*
model Hotel {
  id                        String                     @id @default(uuid())
  name                      String
  userId                    String    
  contactDetails            ContactDetails?            @relation(fields: [contactDetailsId], references: [id])
  contactDetailsId          String?
  address                   Address?                   @relation(fields: [addressId], references: [id])
  addressId                 String?
  images                    Image[]
  destinations              Destination[]
  accommodationTypes        AccommodationType[]
  accommodationCharacteristics AccommodationCharacteristic[]
  beddingConfigurations     BeddingConfiguration[]
  services                  Service[]
  accessibilityOptions      AccessibilityOption[]
  roomFeatures              RoomFeature[]
  parkingOptions            ParkingOption[]
  bedTypes                  BedType[]
  rooms                     Room[]
  labels                    HotelLabel[]
  createdAt                 DateTime                   @default(now())
  updatedAt                 DateTime                   @updatedAt

  bookings                  Booking[]
  // Informations bancaires pour recevoir les paiements
  bankAccount               BankAccount?

  User User[]
}
*/
/*
model ContactDetails {
  id        String   @id @default(uuid())
  phone     String?
  email     String?
  website   String?
  hotelId   String?
  Hotel     Hotel[]
}
*/
/*
model Address {
  id                      String   @id @default(uuid())
  number                  String?
  addressLine1            String
  addressLine2            String?
  zipCode                 String
  district                String?
  city                    String
  stateProvinceRegion     String?
  country                 String
  latitude                Float?
  longitude               Float?
  hotelId                 String?
  Hotel                   Hotel[]
}
*/
/*
model Image {
  id        String  @id @default(uuid())
  url       String
  isMain    Boolean  @default(false)
  hotelId   String
  hotel     Hotel    @relation(fields: [hotelId], references: [id])
}
*/
/*
model Destination {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/
/*
model AccommodationType {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
  */
/*model AccommodationCharacteristic {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/
/*
model BeddingConfiguration {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
  */
/*
model Service {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/
/*
model AccessibilityOption {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/

/*
model RoomFeature {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/
/*
model ParkingOption {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[] 
}
  
*/
/* 
model BedType {
  id        String  @id @default(uuid())
  name      String
  hotels    Hotel[]
}
*/
/*
model Room {
  id              String    @id @default(uuid())
  hotel           Hotel     @relation(fields: [hotelId], references: [id])
  hotelId         String
  name            String
  type            String    // single, double, suite, etc.
  description     String?
  pricePerNight   Float
  capacity        Int       @default(2)
  isAvailable     Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relation avec les réservations
  bookings        Booking[]
  // Relation avec la disponibilité
  availability    RoomAvailability[]
}
*/
/*
model Label {
  id     String       @id @default(uuid())
  name   String
  hotels HotelLabel[] // Relation via la table de jonction
}
*/



//src/app/[locale]/(public)/accommodations/addAcomponnents/addContactDetails.tsx

import { create } from "zustand";

// Interface basée sur le modèle Hotel
interface Hotel {
  id: string;
  name: string;
  userId: string;
  contactDetails?: {
    id: string;
    phone?: string;
    email?: string;
    website?: string;
    hotelId?: string;
  };
  contactDetailsId?: string;
  address?: {
    id: string;
    number?: string;
    addressLine1: string;
    addressLine2?: string;
    zipCode: string;
    district?: string;
    city: string;
    stateProvinceRegion?: string;
    country: string;
    latitude?: number;
    longitude?: number;
    hotelId?: string;
  };
  addressId?: string;
  images: {
    id: string;
    url: string;
    isMain: boolean;
    hotelId: string;
  }[];
  destinations: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  accommodationTypes: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  accommodationCharacteristics: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  beddingConfigurations: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  services: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  accessibilityOptions: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  roomFeatures: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  parkingOptions: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  bedTypes: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  rooms: {
    id: string;
    name: string;
    type: string;
    description?: string;
    pricePerNight: number;
    capacity: number;
    isAvailable: boolean;
    hotelId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  labels: {
    id: string;
    name: string;
    hotelId?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  bankAccount?: {
    id: string;
    accountNumber: string;
    bankName: string;
    hotelId?: string;
  };
  bookings: {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    hotelId?: string;
  }[];
}

interface AccommodationState {
  selectedAccommodation: Hotel | null; // Hôtel sélectionné
  setSelectedAccommodation: (accommodation: Hotel | null) => void; // Fonction pour définir l'hôtel sélectionné
}

export const useAccommodationStore = create<AccommodationState>((set) => ({
  selectedAccommodation: null, // Initialisation à null
  setSelectedAccommodation: (accommodation) => set({ selectedAccommodation: accommodation }), // Mise à jour de l'hôtel sélectionné
}));