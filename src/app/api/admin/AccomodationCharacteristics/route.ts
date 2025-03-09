// app/api/admin/AccommodationCharacteristic/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accommodation characteristics
export async function GET() {
  try {
    const accommodationCharacteristics = await prisma.accommodationCharacteristic.findMany();
    return NextResponse.json(accommodationCharacteristics);
  } catch (error) {
    console.error('Error fetching accommodation characteristics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodation characteristics' },
      { status: 500 }
    );
  }
}

// POST: Create a new accommodation characteristic
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newAccommodationCharacteristic = await prisma.accommodationCharacteristic.create({
      data: { name },
    });
    return NextResponse.json(newAccommodationCharacteristic, { status: 201 });
  } catch (error) {
    console.error('Error creating accommodation characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to create accommodation characteristic' },
      { status: 500 }
    );
  }
}

// PUT: Update an accommodation characteristic
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedAccommodationCharacteristic = await prisma.accommodationCharacteristic.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedAccommodationCharacteristic);
  } catch (error) {
    console.error('Error updating accommodation characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to update accommodation characteristic' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an accommodation characteristic
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.accommodationCharacteristic.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting accommodation characteristic:', error);
    return NextResponse.json(
      { error: 'Failed to delete accommodation characteristic' },
      { status: 500 }
    );
  }
}