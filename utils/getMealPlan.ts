// utils/getMealPlan.ts

import { MealPlans } from "@prisma/client";

export async function getMealPlans(): Promise<MealPlans[]> {
  try {
    const response = await fetch('/api/get/mealPlans', {
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
    console.error('Failed to fetch meal plans:', error);
    return [];
  }
}
