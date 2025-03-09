// src/app/api/get/mealPlans/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
// GET: Fetch all meal plans
export async function GET() {
  try {
    console.log('GET request received for meal plans');
    const mealPlans = await prisma.mealPlans.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved meal plans:', mealPlans);
    return NextResponse.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meal plans' },
      { status: 500 },
    );
  }
}

// POST: Create a new meal plan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request received with body:', body);

    const { name } = body;
    if (!name) {
      console.log('POST validation failed: Name is required');
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Calculate the next order value
    const maxOrderOption = await prisma.mealPlans.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Create the new meal plan
    const newMealPlan = await prisma.mealPlans.create({
      data: { name, order: orderValue },
    });
    console.log('Created new meal plan:', newMealPlan);
    return NextResponse.json(newMealPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    return NextResponse.json(
      { error: 'Failed to create meal plan' },
      { status: 500 },
    );
  }
}

// PUT: Update a meal plan
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Handle bulk order updates
    if (body.mealPlans) {
      const { mealPlans } = body;

      // Update the order of all meal plans
      await Promise.all(
        mealPlans.map(async (plan: { id: string; order: number }) => {
          await prisma.mealPlans.update({
            where: { id: plan.id },
            data: { order: plan.order },
          });
        }),
      );

      console.log('Updated meal plans order:', mealPlans);
      return NextResponse.json({ success: true });
    }

    // Handle single meal plan update (name or order)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating meal plan with data:', updateData);

    const updatedMealPlan = await prisma.mealPlans.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated meal plan:', updatedMealPlan);
    return NextResponse.json(updatedMealPlan);
  } catch (error) {
    console.error('Error updating meal plan:', error);
    return NextResponse.json(
      { error: 'Failed to update meal plan' },
      { status: 500 },
    );
  }
}

// DELETE: Delete a meal plan
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.mealPlans.delete({
      where: { id },
    });
    console.log(`Successfully deleted meal plan with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete meal plan' },
      { status: 500 },
    );
  }
}
