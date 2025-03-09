import { BeddingConfiguration } from "@prisma/client";

/**
 * Fetches all bedding configurations from the database
 * @returns A Promise containing all bedding configurations
 */
export async function getBeddingConfigurations(): Promise<BeddingConfiguration[]> {
  try {
    const response = await fetch('/api/get/beddingConfiguration', {
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
    console.error('Failed to fetch bedding configurations:', error);
    return [];
  }
}