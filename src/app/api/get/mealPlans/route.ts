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
};
