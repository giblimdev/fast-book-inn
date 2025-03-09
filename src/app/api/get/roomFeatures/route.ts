


// src/app/api/get/roomFeatures/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les fonctionnalités de chambre triées par ordre croissant
    const roomFeatures = await prisma.roomFeature.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les fonctionnalités de chambre en JSON
    return NextResponse.json(roomFeatures);
  } catch (error) {
    console.error('Failed to fetch room features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room features' },
      { status: 500 }
    );
  }
}