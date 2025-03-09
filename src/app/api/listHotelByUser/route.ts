// src/app/api/listAccommodationById/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    // Récupérer l'ID de l'utilisateur (host) depuis les query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Vérifier que l'ID de l'utilisateur est fourni
    if (!userId) {
      return NextResponse.json(
        { message: "L'ID de l'utilisateur est requis" },
        { status: 400 }
      );
    }

    // Récupérer les hôtels associés à l'utilisateur (host)
    const hotels = await prisma.hotel.findMany({
      where: { userId: userId }, // Filtrer par hostId
      select: {
        id: true,
        name: true,
        address: true, // Inclure l'adresse si nécessaire
        contactDetails: true, // Inclure les détails de contact si nécessaire
        images: true, // Inclure les images si nécessaire
        createdAt: true,
        updatedAt: true,
      },
    });

    // Retourner les hôtels
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Erreur lors de la récupération des hôtels", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}