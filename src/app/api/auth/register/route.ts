import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../../lib/prisma';
import { z } from 'zod';

// Schéma de validation Zod
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  lang: z.enum(['en', 'fr', 'de', 'es'])
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' }, 
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        lang: validatedData.lang,
      }
    });

    // Return user data without password
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          lang: newUser.lang,
          createdAt: newUser.createdAt
        }
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(err => err.message)
        }, 
        { status: 400 }
      );
    }

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Email already registered' }, 
          { status: 409 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
