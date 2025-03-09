// app/api/admin/AccessibilityOpt/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accessibility options
export async function GET() {
  try {
    const options = await prisma.accessibilityOption.findMany();
    return NextResponse.json(options);
  } catch (error) {
    console.error('Error fetching options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accessibility options' },
      { status: 500 }
    );
  }
}

// POST: Create a new accessibility option
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newOption = await prisma.accessibilityOption.create({
      data: { name },
    });
    return NextResponse.json(newOption, { status: 201 });
  } catch (error) {
    console.error('Error creating option:', error);
    return NextResponse.json(
      { error: 'Failed to create accessibility option' },
      { status: 500 }
    );
  }
}

// PUT: Update an accessibility option
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and Name are required' },
        { status: 400 }
      );
    }

    const updatedOption = await prisma.accessibilityOption.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedOption);
  } catch (error) {
    console.error('Error updating option:', error);
    return NextResponse.json(
      { error: 'Failed to update accessibility option' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an accessibility option
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.accessibilityOption.delete({
      where: { id },
    });
    // Retourner une réponse vide avec le code 204
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting option:', error);
    return NextResponse.json(
      { error: 'Failed to delete accessibility option' },
      { status: 500 }
    );
  }
}