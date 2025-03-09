import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer toutes les langues
export async function GET() {
  try {
    console.log('GET request received for languages');
    const languages = await prisma.language.findMany({
      orderBy: { order: 'asc' },
    });
    console.log('Retrieved languages:', languages);
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}

// POST: Ajouter une nouvelle langue
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request received with body:', body);

    const { lang } = body;
    if (!lang) {
      console.log('POST validation failed: Language name is required');
      return NextResponse.json({ error: 'Language name is required' }, { status: 400 });
    }

    // Déterminer l'ordre de la nouvelle langue
    const maxOrderLanguage = await prisma.language.findFirst({
      orderBy: { order: 'desc' },
    });
    const orderValue = maxOrderLanguage && maxOrderLanguage.order !== null ? maxOrderLanguage.order + 1 : 0;
    console.log('Generated order value:', orderValue);

    // Création de la langue
    const newLanguage = await prisma.language.create({
      data: { lang, order: orderValue },
    });
    console.log('Created new language:', newLanguage);
    return NextResponse.json(newLanguage, { status: 201 });
  } catch (error) {
    console.error('Error creating language:', error);
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    );
  }
}

// PUT: Modifier une langue (nom ou ordre)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log('PUT request received with body:', body);

    // Mise à jour de l'ordre de plusieurs langues
    if (body.languages) {
      const { languages } = body;

      await Promise.all(
        languages.map(async (lang: { id: string; order: number }) => {
          await prisma.language.update({
            where: { id: lang.id },
            data: { order: lang.order },
          });
        })
      );

      console.log('Updated languages order:', languages);
      return NextResponse.json({ success: true });
    }

    // Mise à jour d'une seule langue
    const { id, lang, order } = body;
    if (!id) {
      console.log('PUT validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updateData: { lang?: string; order?: number } = {};
    if (lang !== undefined) updateData.lang = lang;
    if (order !== undefined) updateData.order = order;

    console.log('Updating language with data:', updateData);

    const updatedLanguage = await prisma.language.update({
      where: { id },
      data: updateData,
    });
    console.log('Updated language:', updatedLanguage);
    return NextResponse.json(updatedLanguage);
  } catch (error) {
    console.error('Error updating language:', error);
    return NextResponse.json(
      { error: 'Failed to update language' },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une langue
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('DELETE request received with id:', id);

    if (!id) {
      console.log('DELETE validation failed: ID is required');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.language.delete({
      where: { id },
    });
    console.log(`Successfully deleted language with ID: ${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting language:', error);
    return NextResponse.json(
      { error: 'Failed to delete language' },
      { status: 500 }
    );
  }
}
