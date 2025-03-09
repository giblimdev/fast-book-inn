// src/app/api/hotel/accessibilityOptions/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// POST: Sauvegarder les options d'accessibilité
export async function POST(request: Request) {
  const { hotelId, options } = await request.json();

  if (!hotelId || !options) {
    return NextResponse.json({ error: "hotelId and options are required" }, { status: 400 });
  }

  try {
    // Trouver l'hôtel
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { accessibilityOptions: true },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Supprimer les options d'accessibilité existantes pour cet hôtel
    await prisma.hotel.update({
      where: { id: hotelId },
      data: {
        accessibilityOptions: {
          set: [], // Déconnecter toutes les options existantes
        },
      },
    });

    // Créer ou associer les nouvelles options
    const updatedOptions = await Promise.all(
      options.map(async (optionName: string) => {
        // Vérifier si l'option existe déjà
        let option = await prisma.accessibilityOption.findFirst({
          where: { name: optionName },
        });

        // Si l'option n'existe pas, la créer
        if (!option) {
          option = await prisma.accessibilityOption.create({
            data: { name: optionName },
          });
        }

        // Connecter l'option à l'hôtel
        await prisma.hotel.update({
          where: { id: hotelId },
          data: {
            accessibilityOptions: {
              connect: { id: option.id },
            },
          },
        });

        return option;
      })
    );

    return NextResponse.json(updatedOptions, { status: 200 });
  } catch (error) {
    console.error("Error saving accessibility options:", error);
    return NextResponse.json({ error: "Failed to save accessibility options" }, { status: 500 });
  }
}