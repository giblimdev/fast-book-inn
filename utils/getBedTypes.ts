// src/utils/getBedTypes.ts

import { BedType } from "@prisma/client";

/**
 * Fetches all bed types from the database
 * @returns A Promise containing all bed types
 */
export async function getBedTypes(): Promise<BedType[]> {
  try {
    const response = await fetch('/api/get/bedTypes', {
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
    console.error('Failed to fetch bed types:', error);
    return [];
  }
}