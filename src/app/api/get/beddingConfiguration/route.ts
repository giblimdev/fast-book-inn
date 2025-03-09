// src/app/api/get/beddingConfiguration/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les configurations de literie triées par ordre croissant
    const beddingConfigurations = await prisma.beddingConfiguration.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les configurations de literie en JSON
    return NextResponse.json(beddingConfigurations);
  } catch (error) {
    console.error('Failed to fetch bedding configurations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bedding configurations' },
      { status: 500 }
    );
  }
}