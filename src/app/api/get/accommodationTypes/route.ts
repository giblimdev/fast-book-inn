//src/app/api/get/accommodationTypes.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer tous les types d'hébergement triés par ordre croissant
    const accommodationTypes = await prisma.accommodationType.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les types d'hébergement en JSON
    return NextResponse.json(accommodationTypes);
  } catch (error) {
    console.error('Failed to fetch accommodation types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation types' },
      { status: 500 }
    );
  }
} 