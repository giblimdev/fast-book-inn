// @/utils/getDestination.ts


import { Destination } from "@prisma/client";

/**
 * Fetches all destinations from the database
 * @returns A Promise containing all destinations
 */
export async function getDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch('/api/get/destinations', {
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
    console.error('Failed to fetch destinations:', error);
    return [];
  }
}