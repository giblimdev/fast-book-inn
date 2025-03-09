import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { hotelId, destinationIds } = await request.json();

    if (!hotelId || !destinationIds) {
      return NextResponse.json(
        { error: "hotelId and destinationIds are required" },
        { status: 400 }
      );
    }

    // Vérifier si l'hôtel existe
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: "Hotel not found" },
        { status: 404 }
      );
    }

    // Associer les destinations à l'hôtel
    await prisma.hotel.update({
      where: { id: hotelId },
      data: {
        destinations: {
          connect: destinationIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json({ message: "Destinations associated successfully" });
  } catch (error) {
    console.error("Error associating destinations:", error);
    return NextResponse.json(
      { error: "Failed to associate destinations" },
      { status: 500 }
    );
  }
}