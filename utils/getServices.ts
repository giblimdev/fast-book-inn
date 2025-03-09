import { Service } from "@prisma/client";

/**
 * Fetches all services from the database
 * @returns A Promise containing all services
 */
export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch('/api/get/services', {
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
    console.error('Failed to fetch services:', error);
    return [];
  }
}
