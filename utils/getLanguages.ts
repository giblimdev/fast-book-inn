

import { Language } from "@prisma/client";

/**
 * Fetches all languages from the database
 * @returns A Promise containing all languages
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const response = await fetch('/api/get/languages', {
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
    console.error('Failed to fetch languages:', error);
    return [];
  }
}