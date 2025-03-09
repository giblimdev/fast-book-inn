//src/app/api/get/destinations/route.ts



import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: {
       order: 'asc',
      },
    }); 
    
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Failed to fetch destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}