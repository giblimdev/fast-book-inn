 // app/api/admin/RoomFeature/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all room features
export async function GET() {
  try {
    const roomFeatures = await prisma.roomFeature.findMany();
    return NextResponse.json(roomFeatures);
  } catch (error) {
    console.error('Error fetching room features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room features' },
      { status: 500 }
    );
  }
}

// POST: Create a new room feature
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newRoomFeature = await prisma.roomFeature.create({
      data: { name },
    });
    return NextResponse.json(newRoomFeature, { status: 201 });
  } catch (error) {
    console.error('Error creating room feature:', error);
    return NextResponse.json(
      { error: 'Failed to create room feature' },
      { status: 500 }
    );
  }
}

// PUT: Update a room feature
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedRoomFeature = await prisma.roomFeature.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedRoomFeature);
  } catch (error) {
    console.error('Error updating room feature:', error);
    return NextResponse.json(
      { error: 'Failed to update room feature' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a room feature
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.roomFeature.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting room feature:', error);
    return NextResponse.json(
      { error: 'Failed to delete room feature' },
      { status: 500 }
    );
  }
}