 //utils/getAccommodationTypes.ts


 import { AccommodationType } from "@prisma/client";

/**
 * Fetches all accommodation types from the database
 * @returns A Promise containing all accommodation types
 */
export async function getAccommodationTypes(): Promise<AccommodationType[]> {
  try {
    const response = await fetch('/api/get/accommodationTypes', {
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
    console.error('Failed to fetch accommodation types:', error);
    return [];
  }
}

