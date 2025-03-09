import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accommodation types
export async function GET() {
  try {
    console.log('GET request received for accommodation types');
    const types = await prisma.accommodationType.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved accommodation types:', types);
    return NextResponse.json(types);
  } catch (error) {
    console.error('Error fetching accommodation types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation types' },
      { status: 500 },
    );
  }
}

// POST: Create a new accommodation type
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request received with body:', body);

    const { name } = body;
    if (!name) {
      console.log('POST validation failed: Name is required');
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Calculate the next order value
    const maxOrderOption = await prisma.accommodationType.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Create the new accommodation type
    const newType = await prisma.accommodationType.create({
      data: { name, order: orderValue },
    });
    console.log('Created new accommodation type:', newType);
    return NextResponse.json(newType, { status: 201 });
  } catch (error) {
    console.error('Error creating accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to create accommodation type' },
      { status: 500 },
    );
  }
}

// PUT: Update an accommodation type
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Handle bulk order updates
    if (body.types) {
      const { types } = body;

      // Update the order of all accommodation types
      await Promise.all(
        types.map(async (type: { id: string; order: number }) => {
          await prisma.accommodationType.update({
            where: { id: type.id },
            data: { order: type.order },
          });
        }),
      );

      console.log('Updated accommodation types order:', types);
      return NextResponse.json({ success: true });
    }

    // Handle single accommodation type update (name or order)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating accommodation type with data:', updateData);

    const updatedType = await prisma.accommodationType.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated accommodation type:', updatedType);
    return NextResponse.json(updatedType);
  } catch (error) {
    console.error('Error updating accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to update accommodation type' },
      { status: 500 },
    );
  }
}

// DELETE: Delete an accommodation type
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.accommodationType.delete({
      where: { id },
    });
    console.log(`Successfully deleted accommodation type with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to delete accommodation type' },
      { status: 500 },
    );
  }
}
