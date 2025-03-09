import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer tous les services
export async function GET() {
  try {
    console.log('GET request received for services');
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved services:', services);
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 

// POST: Créer un nouveau service
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
    const maxOrderOption = await prisma.service.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Créer le nouveau service
    const newService = await prisma.service.create({
      data: { name, order: orderValue },
    });
    console.log('Created new service:', newService);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour un ou plusieurs services
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Mise à jour en bloc des ordres des services
    if (body.services) {
      const { services } = body;

      // Mettre à jour l'ordre de tous les services
      await Promise.all(
        services.map(async (service: { id: string; order: number }) => {
          await prisma.service.update({
            where: { id: service.id },
            data: { order: service.order },
          });
        })
      );

      console.log('Updated services order:', services);
      return NextResponse.json({ success: true });
    }

    // Mise à jour d'un seul service (nom ou ordre)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating service with data:', updateData);

    const updatedService = await prisma.service.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated service:', updatedService);
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un service
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id },
    });
    console.log(`Successfully deleted service with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
