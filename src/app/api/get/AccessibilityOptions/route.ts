//src/app/api/get/AccessibilityOptions/route.ts

/*
 

*/

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les options d'accessibilité triées par ordre croissant
    const accessibilityOptions = await prisma.accessibilityOption.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les options d'accessibilité en JSON
    return NextResponse.json(accessibilityOptions);
  } catch (error) {
    console.error('Failed to fetch accessibility options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accessibility options' },
      { status: 500 }
    );
  }
}