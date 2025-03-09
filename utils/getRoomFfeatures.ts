// utils/getRoomFeatures.ts

import { RoomFeature } from "@prisma/client";

/**
 * Fetches all room features from the database
 * @returns A Promise containing all room features
 */
export async function getRoomFeatures(): Promise<RoomFeature[]> {
  try {
    const response = await fetch('/api/get/roomFeatures', {
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
    console.error('Failed to fetch room features:', error);
    return [];
  }
}