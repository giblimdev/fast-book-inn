// src/app/api/hotel/address/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET address by hotel ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get("hotelId");

    if (!hotelId) {
      return NextResponse.json({ message: "Hotel ID is required" }, { status: 400 });
    }

    // Utiliser findFirst ou findMany
    const address = await prisma.address.findFirst({ where: { hotelId } });

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching address" }, { status: 500 });
  }
}

// POST create a new address
export async function POST(req: Request) {
  try {
    const {
      hotelId,
      number,
      addressLine1,
      addressLine2,
      zipCode,
      district,
      city,
      stateProvinceRegion,
      country,
      latitude,
      longitude,
    } = await req.json();

    if (!hotelId || !addressLine1 || !zipCode || !city || !country) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newAddress = await prisma.address.create({
      data: {
        hotelId,
        number,
        addressLine1,
        addressLine2,
        zipCode,
        district,
        city,
        stateProvinceRegion,
        country,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating address" }, { status: 500 });
  }
}

// PUT update an address
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Address ID is required" }, { status: 400 });
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating address" }, { status: 500 });
  }
}

// DELETE an address
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get("hotelId");

    if (!hotelId) {
      return NextResponse.json({ message: "Hotel ID is required" }, { status: 400 });
    }

    await prisma.address.deleteMany({
      where: { hotelId },
    });

    return NextResponse.json({ message: "Address deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting address" }, { status: 500 });
  }
}