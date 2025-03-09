/*
model ParkingOption {
  id        String  @id @default(uuid())
  name      String
  order     Int?    @default(0)
  hotels    Hotel[]
}

*/

//src/app/api/get/parkingOptions/route.ts


 // src/app/api/get/parkingOptions/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les options de parking triées par ordre croissant
    const parkingOptions = await prisma.parkingOption.findMany({
      orderBy: {
        order: 'asc', // Tri par le champ `order`
      },
    });

    // Retourner les options de parking en JSON
    return NextResponse.json(parkingOptions);
  } catch (error) {
    console.error('Failed to fetch parking options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parking options' },
      { status: 500 }
    );
  }
}