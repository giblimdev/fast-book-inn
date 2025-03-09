"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../../../../store/useUserStore';
import { Link } from '@/i18n/navigation';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl'; // Importez useTranslations

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useUserStore();
  const t = useTranslations('LoginPage'); // Utilisez le namespace LoginPage

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('API Response:', data); // Log la réponse de l'API

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        toast.success(t('success')); // Utilisez la traduction pour le message de succès
        router.push('/');
      } else {
        setError(data.error || t('errors.generic')); // Utilisez la traduction pour l'erreur générique
      }
    } catch (error) {
      setError(t('errors.generic')); // Utilisez la traduction pour l'erreur générique
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center">{t('title')}</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? t('loading') : t('loginButton')}
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">{t('noAccount')}</span>
          <Link 
            href="/auth/register" 
            className="text-blue-600 hover:underline"
          >
            {t('registerLink')}
          </Link>
        </div>
      </form>
    </div>
  );
}