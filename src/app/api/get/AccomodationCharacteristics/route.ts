//src/app/api/get/AccomodationCharacteristics/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les caractéristiques d'hébergement triées par ordre croissant
    const accommodationCharacteristics = await prisma.accommodationCharacteristic.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les caractéristiques d'hébergement en JSON
    return NextResponse.json(accommodationCharacteristics);
  } catch (error) {
    console.error('Failed to fetch accommodation characteristics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation characteristics' },
      { status: 500 }
    );
  }
}