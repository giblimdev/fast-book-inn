import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Liste des locales supportées
  locales: ['en','es','fr',],
  
  // Locale par défaut
  defaultLocale: 'en',
  
  // Optionnel: redirige vers la locale par défaut si celle dans l'URL n'est pas supportée
  localeDetection: true
});
 
export const config = {
  // Matcher pour les routes qui doivent passer par le middleware
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
/*  locales: ['ar','de','en','es','fr','it','ja','pt','ru','zh'],
 */