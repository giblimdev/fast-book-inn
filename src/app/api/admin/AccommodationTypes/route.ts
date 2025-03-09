// app/api/admin/AccommodationType/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accommodation types
export async function GET() {
  try {
    const accommodationTypes = await prisma.accommodationType.findMany();
    return NextResponse.json(accommodationTypes);
  } catch (error) {
    console.error('Error fetching accommodation types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation types' },
      { status: 500 }
    );
  }
}

// POST: Create a new accommodation type
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newAccommodationType = await prisma.accommodationType.create({
      data: { name },
    });
    return NextResponse.json(newAccommodationType, { status: 201 });
  } catch (error) {
    console.error('Error creating accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to create accommodation type' },
      { status: 500 }
    );
  }
}

// PUT: Update an accommodation type
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedAccommodationType = await prisma.accommodationType.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedAccommodationType);
  } catch (error) {
    console.error('Error updating accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to update accommodation type' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an accommodation type
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.accommodationType.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting accommodation type:', error);
    return NextResponse.json(
      { error: 'Failed to delete accommodation type' },
      { status: 500 }
    );
  }
}