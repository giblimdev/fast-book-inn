// app/api/admin/BeddingConfiguration/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all bedding configurations
export async function GET() {
  try {
    const beddingConfigurations = await prisma.beddingConfiguration.findMany();
    return NextResponse.json(beddingConfigurations);
  } catch (error) {
    console.error('Error fetching bedding configurations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bedding configurations' },
      { status: 500 }
    );
  }
}

// POST: Create a new bedding configuration
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newBeddingConfiguration = await prisma.beddingConfiguration.create({
      data: { name },
    });
    return NextResponse.json(newBeddingConfiguration, { status: 201 });
  } catch (error) {
    console.error('Error creating bedding configuration:', error);
    return NextResponse.json(
      { error: 'Failed to create bedding configuration' },
      { status: 500 }
    );
  }
}

// PUT: Update a bedding configuration
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedBeddingConfiguration = await prisma.beddingConfiguration.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedBeddingConfiguration);
  } catch (error) {
    console.error('Error updating bedding configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update bedding configuration' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a bedding configuration
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.beddingConfiguration.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting bedding configuration:', error);
    return NextResponse.json(
      { error: 'Failed to delete bedding configuration' },
      { status: 500 }
    );
  }
}