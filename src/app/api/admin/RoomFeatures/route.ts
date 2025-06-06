import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer toutes les caractéristiques de chambre
export async function GET() {
  try {
    console.log('GET request received for room features');
    const features = await prisma.roomFeature.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved room features:', features);
    return NextResponse.json(features);
  } catch (error) {
    console.error('Error fetching room features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room features' },
      { status: 500 }
    );
  }
}

// POST: Créer une nouvelle caractéristique de chambre
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request received with body:', body);

    const { name } = body;
    if (!name) {
      console.log('POST validation failed: Name is required');
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Calculer la valeur de l'ordre
    const maxOrderOption = await prisma.roomFeature.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Créer la nouvelle caractéristique
    const newFeature = await prisma.roomFeature.create({
      data: { name, order: orderValue },
    });
    console.log('Created new room feature:', newFeature);
    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error('Error creating room feature:', error);
    return NextResponse.json(
      { error: 'Failed to create room feature' },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour une ou plusieurs caractéristiques de chambre
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Mise à jour en bloc des ordres des caractéristiques
    if (body.features) {
      const { features } = body;

      // Mettre à jour l'ordre de toutes les caractéristiques
      await Promise.all(
        features.map(async (feature: { id: string; order: number }) => {
          await prisma.roomFeature.update({
            where: { id: feature.id },
            data: { order: feature.order },
          });
        })
      );

      console.log('Updated room features order:', features);
      return NextResponse.json({ success: true });
    }

    // Mise à jour d'une seule caractéristique (nom ou ordre)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating room feature with data:', updateData);

    const updatedFeature = await prisma.roomFeature.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated room feature:', updatedFeature);
    return NextResponse.json(updatedFeature);
  } catch (error) {
    console.error('Error updating room feature:', error);
    return NextResponse.json(
      { error: 'Failed to update room feature' },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une caractéristique de chambre
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.roomFeature.delete({
      where: { id },
    });
    console.log(`Successfully deleted room feature with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting room feature:', error);
    return NextResponse.json(
      { error: 'Failed to delete room feature' },
      { status: 500 }
    );
  }
}
