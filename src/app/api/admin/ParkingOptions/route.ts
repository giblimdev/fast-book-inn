// app/api/admin/ParkingOption/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all parking options
export async function GET() {
  try {
    const parkingOptions = await prisma.parkingOption.findMany();
    return NextResponse.json(parkingOptions);
  } catch (error) {
    console.error('Error fetching parking options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parking options' },
      { status: 500 }
    );
  }
}

// POST: Create a new parking option
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newParkingOption = await prisma.parkingOption.create({
      data: { name },
    });
    return NextResponse.json(newParkingOption, { status: 201 });
  } catch (error) {
    console.error('Error creating parking option:', error);
    return NextResponse.json(
      { error: 'Failed to create parking option' },
      { status: 500 }
    );
  }
}

// PUT: Update a parking option
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedParkingOption = await prisma.parkingOption.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedParkingOption);
  } catch (error) {
    console.error('Error updating parking option:', error);
    return NextResponse.json(
      { error: 'Failed to update parking option' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a parking option
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.parkingOption.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting parking option:', error);
    return NextResponse.json(
      { error: 'Failed to delete parking option' },
      { status: 500 }
    );
  }
} 