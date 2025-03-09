import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Retrieve contact details for a specific hotel
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hotelId = searchParams.get("hotelId");

  if (!hotelId) {
    return NextResponse.json({ error: "hotelId is required" }, { status: 400 });
  }

  try {
    // Find the hotel first
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { contactDetails: true }
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Return the contact details or an empty object
    return NextResponse.json(hotel.contactDetails || { phone: "", email: "", website: "" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return NextResponse.json({ error: "Failed to fetch contact details" }, { status: 500 });
  }
}

// POST: Create or update contact details
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { hotelId, phone, email, website } = body;

  if (!hotelId) {
    return NextResponse.json({ error: "hotelId is required" }, { status: 400 });
  }

  try {
    // First, find the hotel to ensure it exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { contactDetails: true }
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    let contactDetails;

    if (hotel.contactDetails) {
      // Update existing contact details
      contactDetails = await prisma.contactDetails.update({
        where: { id: hotel.contactDetails.id },
        data: { phone, email, website }
      });
    } else {
      // Create new contact details
      contactDetails = await prisma.contactDetails.create({
        data: {
          phone,
          email,
          website,
          Hotel: {
            connect: { id: hotelId }
          }
        }
      });

      // Update the hotel with the reference to the contact details
      await prisma.hotel.update({
        where: { id: hotelId },
        data: { contactDetailsId: contactDetails.id }
      });
    }

    return NextResponse.json(contactDetails, { status: 200 });
  } catch (error) {
    console.error("Error saving contact details:", error);
    return NextResponse.json({ error: "Failed to save contact details" }, { status: 500 });
  }
}

// DELETE: Delete contact details
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hotelId = searchParams.get("hotelId");

  if (!hotelId) {
    return NextResponse.json({ error: "hotelId is required" }, { status: 400 });
  }

  try {
    // Find the hotel with its contact details
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { contactDetails: true }
    });

    if (!hotel || !hotel.contactDetails) {
      return NextResponse.json({ error: "Contact details not found" }, { status: 404 });
    }

    // Delete the contact details
    await prisma.contactDetails.delete({
      where: { id: hotel.contactDetails.id }
    });

    // Update the hotel to remove the contact details reference
    await prisma.hotel.update({
      where: { id: hotelId },
      data: { contactDetailsId: null }
    });

    return NextResponse.json({ message: "Contact details deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting contact details:", error);
    return NextResponse.json({ error: "Failed to delete contact details" }, { status: 500 });
  }
}