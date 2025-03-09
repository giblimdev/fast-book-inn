// app/api/admin/BedType/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all bed types
export async function GET() {
  try {
    const bedTypes = await prisma.bedType.findMany();
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

    const newBedType = await prisma.bedType.create({
      data: { name },
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
    const { id, name } = await request.json();
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
    const { id } = await request.json();
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