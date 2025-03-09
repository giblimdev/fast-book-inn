import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accommodation characteristics
export async function GET() {
  try {
    console.log('GET request received for accommodation characteristics');
    const characteristics = await prisma.accommodationCharacteristic.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved characteristics:', characteristics);
    return NextResponse.json(characteristics);
  } catch (error) {
    console.error('Error fetching characteristics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation characteristics' },
      { status: 500 },
    );
  }
}

// POST: Create a new accommodation characteristic
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
    const maxOrderOption = await prisma.accommodationCharacteristic.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Create the new characteristic
    const newCharacteristic = await prisma.accommodationCharacteristic.create({
      data: { name, order: orderValue },
    });
    console.log('Created new characteristic:', newCharacteristic);
    return NextResponse.json(newCharacteristic, { status: 201 });
  } catch (error) {
    console.error('Error creating characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to create accommodation characteristic' },
      { status: 500 },
    );
  }
}

// PUT: Update an accommodation characteristic
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Handle bulk order updates
    if (body.characteristics) {
      const { characteristics } = body;

      // Update the order of all characteristics
      await Promise.all(
        characteristics.map(async (char: { id: string; order: number }) => {
          await prisma.accommodationCharacteristic.update({
            where: { id: char.id },
            data: { order: char.order },
          });
        }),
      ); 

      console.log('Updated characteristics order:', characteristics);
      return NextResponse.json({ success: true });
    }

    // Handle single characteristic update (name or order)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating characteristic with data:', updateData);

    const updatedCharacteristic = await prisma.accommodationCharacteristic.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated characteristic:', updatedCharacteristic);
    return NextResponse.json(updatedCharacteristic);
  } catch (error) {
    console.error('Error updating characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to update accommodation characteristic' },
      { status: 500 },
    );
  }
}

// DELETE: Delete an accommodation characteristic
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.accommodationCharacteristic.delete({
      where: { id },
    });
    console.log(`Successfully deleted characteristic with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to delete accommodation characteristic' },
      { status: 500 },
    );
  }
}