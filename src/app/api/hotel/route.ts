import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; 

// Création d'un hôtel
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { message: "Le nom de l'hôtel et l'ID de l'utilisateur sont requis" },
        { status: 400 }
      );
    }

    const newHotel = await prisma.hotel.create({
      data: { name, userId },
    });

    return NextResponse.json(newHotel, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'hôtel :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la création de l'hôtel" },
      { status: 500 }
    );
  }
}

// Mise à jour d'un hôtel
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, userId } = body;

    if (!id || !name || !userId) {
      return NextResponse.json(
        { message: "L'ID, le nom de l'hôtel et l'ID de l'utilisateur sont requis" },
        { status: 400 }
      );
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: { name, userId },
    });

    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'hôtel :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la mise à jour de l'hôtel" },
      { status: 500 }
    );
  }
}

// Suppression d'un hôtel
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "L'ID de l'hôtel est requis" }, { status: 400 });
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hôtel supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'hôtel :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la suppression de l'hôtel" },
      { status: 500 }
    );
  }
}
