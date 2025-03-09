/*

*/



  // src/app/api/get/languages/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les langues triées par ordre croissant
    const languages = await prisma.language.findMany({
      orderBy: {
        order : 'asc', // Tri par le champ `name`
      },
    });

    // Retourner les langues en JSON
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}