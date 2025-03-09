import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accessibility options
export async function GET() {
  try {
    console.log('GET request received for accessibility options');
    const options = await prisma.accessibilityOption.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved accessibility options:', options);
    return NextResponse.json(options);
  } catch (error) {
    console.error('Error fetching accessibility options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accessibility options' },
      { status: 500 },
    );
  }
}

// POST: Create a new accessibility option
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
    const maxOrderOption = await prisma.accessibilityOption.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderOption ? maxOrderOption.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Create the new accessibility option
    const newOption = await prisma.accessibilityOption.create({
      data: { name, order: orderValue },
    });
    console.log('Created new accessibility option:', newOption);
    return NextResponse.json(newOption, { status: 201 });
  } catch (error) {
    console.error('Error creating accessibility option:', error);
    return NextResponse.json(
      { error: 'Failed to create accessibility option' },
      { status: 500 },
    );
  }
}

// PUT: Update an accessibility option
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Handle bulk order updates
    if (body.options) {
      const { options } = body;

      // Update the order of all accessibility options
      await Promise.all(
        options.map(async (opt: { id: string; order: number }) => {
          await prisma.accessibilityOption.update({
            where: { id: opt.id },
            data: { order: opt.order },
          });
        }),
      );

      console.log('Updated accessibility options order:', options);
      return NextResponse.json({ success: true });
    }

    // Handle single accessibility option update (name or order)
    const { id, name, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { name?: string; order?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (order !== undefined) updateData.order = order;

    console.log('Updating accessibility option with data:', updateData);

    const updatedOption = await prisma.accessibilityOption.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated accessibility option:', updatedOption);
    return NextResponse.json(updatedOption);
  } catch (error) {
    console.error('Error updating accessibility option:', error);
    return NextResponse.json(
      { error: 'Failed to update accessibility option' },
      { status: 500 },
    );
  }
}

// DELETE: Delete an accessibility option
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.accessibilityOption.delete({
      where: { id },
    });
    console.log(`Successfully deleted accessibility option with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting accessibility option:', error);
    return NextResponse.json(
      { error: 'Failed to delete accessibility option' },
      { status: 500 },
    );
  }
}
