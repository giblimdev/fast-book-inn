// src/app/api/contact/route.ts

import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Extraire les données JSON de la requête
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validations de base
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation d'email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Ici, ajoutez votre logique d'envoi d'email
    // Par exemple avec nodemailer, SendGrid, etc.

    // Exemple avec console.log pour le développement
    console.log('Message reçu:', {
      name,
      email,
      subject,
      message,
    });

    // Simuler un délai (à retirer en production)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}