//utils/AccessibilityOption
import { AccessibilityOption } from "@prisma/client";

/**
 * Fetches all accessibility options from the database
 * @returns A Promise containing all accessibility options
 */
export async function getAccessibilityOptions(): Promise<AccessibilityOption[]> {
  try {
    const response = await fetch('/api/get/AccessibilityOptions', {
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
    console.error('Failed to fetch accessibility options:', error);
    return [];
  }
}