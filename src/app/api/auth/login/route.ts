import { NextResponse, NextRequest } from 'next/server'; // Importez NextRequest
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../../../lib/prisma';
import { z } from 'zod';

// Schéma de validation des données de connexion
const schema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

export async function POST(request: NextRequest) { // Typage de request
  try {
    // Vérifiez que JWT_SECRET est défini
    if (!process.env.JWT_SECRET) {
      throw new Error('La clé secrète JWT n\'est pas configurée');
    }

    // Récupération et validation des données de la requête
    const body = await request.json();
    const { email, password } = schema.parse(body);

    // Recherche de l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({ where: { email } });

    // Vérification de l'existence de l'utilisateur et du mot de passe
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Durée de validité du token
    });

    // Réponse avec le token et les informations de l'utilisateur (sans le mot de passe)
    const userData = {
      id: user.id,
      email: user.email,
      lang: user.lang,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const response = NextResponse.json({ token, user: userData });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (error) {
    // Gestion des erreurs de validation ou autres erreurs
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur s\'est produite lors de la connexion' },
      { status: 500 }
    );
  }
}