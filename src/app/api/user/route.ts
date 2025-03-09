import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Assurez-vous d'avoir configuré Prisma

export async function PUT(req: Request) {
  try {
    const { id, name, email, phone, lang, role } = await req.json();

    // Validation des données
    if (!id) {
      return NextResponse.json(
        { message: "L'ID de l'utilisateur est requis" },
        { status: 400 }
      );
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        lang,
        role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Validation des données
    if (!id) {
      return NextResponse.json(
        { message: "L'ID de l'utilisateur est requis" },
        { status: 400 }
      );
    }

    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Utilisateur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}