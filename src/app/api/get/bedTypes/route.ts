// src/app/api/get/bedTypes/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer tous les types de lits triés par ordre croissant
    const bedTypes = await prisma.bedType.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les types de lits en JSON
    return NextResponse.json(bedTypes);
  } catch (error) {
    console.error('Failed to fetch bed types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bed types' },
      { status: 500 }
    );
  }
}