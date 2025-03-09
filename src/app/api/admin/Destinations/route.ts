import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all destinations
export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { order: 'asc' }, // Fetch destinations ordered by 'order'
    });
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

// POST: Create a new destination
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
    const maxOrderDestination = await prisma.destination.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = maxOrderDestination ? maxOrderDestination.order + 1 : 0;

    const newDestination = await prisma.destination.create({
      data: { name, order },
    });
    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}

// PUT: Update a destination
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Handle bulk order updates
    if (body.destinations) {
      const { destinations } = body;

      // Update the order of all destinations
      await Promise.all(
        destinations.map(async (dest: { id: string; order: number }) => {
          await prisma.destination.update({
            where: { id: dest.id },
            data: { order: dest.order },
          });
        })
      );

      return NextResponse.json({ success: true });
    }

    // Handle single destination update (name or order)
    const { id, name } = body;
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedDestination = await prisma.destination.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedDestination);
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json(
      { error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a destination
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

    await prisma.destination.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json(
      { error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
}