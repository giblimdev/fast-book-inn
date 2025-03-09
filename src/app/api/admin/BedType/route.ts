import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all bed types
export async function GET() {
  try {
    const bedTypes = await prisma.bedType.findMany({
      orderBy: { order: 'asc' }, // Fetch bed types ordered by 'order'
    });
    return NextResponse.json(bedTypes);
  } catch (error) {
    console.error('Error fetching bed types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bed types' },
      { status: 500 }
    );
  }
}

// POST: Create a new bed type
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Calculate the next order value
    const maxOrderType = await prisma.bedType.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = maxOrderType ? maxOrderType.order + 1 : 0;

    const newBedType = await prisma.bedType.create({
      data: { name, order },
    });
    return NextResponse.json(newBedType, { status: 201 });
  } catch (error) {
    console.error('Error creating bed type:', error);
    return NextResponse.json(
      { error: 'Failed to create bed type' },
      { status: 500 }
    );
  }
}

// PUT: Update a bed type
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Handle bulk order updates
    if (body.bedTypes) {
      const { bedTypes } = body;

      // Update the order of all bed types
      await Promise.all(
        bedTypes.map(async (type: { id: string; order: number }) => {
          await prisma.bedType.update({
            where: { id: type.id },
            data: { order: type.order },
          });
        })
      );

      return NextResponse.json({ success: true });
    }

    // Handle single bed type update (name or order)
    const { id, name } = body;
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedBedType = await prisma.bedType.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedBedType);
  } catch (error) {
    console.error('Error updating bed type:', error);
    return NextResponse.json(
      { error: 'Failed to update bed type' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a bed type
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Extract ID from query parameters
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.bedType.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting bed type:', error);
    return NextResponse.json(
      { error: 'Failed to delete bed type' },
      { status: 500 }
    );
  }
}