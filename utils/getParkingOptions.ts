 // utils/getParkingOptions.ts

import { ParkingOption } from "@prisma/client";

/**
 * Fetches all parking options from the database
 * @returns A Promise containing all parking options
 */
export async function getParkingOptions(): Promise<ParkingOption[]> {
  try {
    const response = await fetch('/api/get/parkingOptions', {
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
    console.error('Failed to fetch parking options:', error);
    return [];
  }
}