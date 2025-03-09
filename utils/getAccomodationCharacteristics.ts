import { AccommodationCharacteristic } from "@prisma/client";

/**
 * Fetches all accommodation characteristics from the database
 * @returns A Promise containing all accommodation characteristics
 */
export async function getAccommodationCharacteristics(): Promise<AccommodationCharacteristic[]> {
  try {
    const response = await fetch('/api/get/AccomodationCharacteristics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch accommodation characteristics:', error);
    return [];
  }
}