"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl'; // Importez useTranslations

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lang, setLang] = useState('en');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const t = useTranslations('RegisterPage'); // Utilisez le namespace RegisterPage

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(email)) {
      setError(t('errors.invalidEmail')); // Utilisez la traduction pour l'erreur
      return;
    }

    if (password.length < 8) {
      setError(t('errors.passwordTooShort')); // Utilisez la traduction pour l'erreur
      return;
    }

    if (password !== confirmPassword) {
      setError(t('errors.passwordsDoNotMatch')); // Utilisez la traduction pour l'erreur
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          lang 
        }),
      });

      const contentType = response.headers.get('content-type');
      let data = {};
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          setError(t('errors.networkError')); 
          return;
        }
      }
      
      if (response.ok) {
        router.push('/auth/login');
      } else {
        setError(
          (data as any).error || 
          (data as any).message || 
          t('errors.registrationFailed')
        );
      }
    } catch (error) {
      console.error('Registration error', error);
      setError(t('errors.networkError')); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {t('title')}
          </h2>
          
          {error && (
            <div 
              className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative mb-4" 
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('passwordLabel')} 
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('passwordPlaceholder')} 
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmPasswordLabel')} 
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('confirmPasswordPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                {t('languageLabel')}
              </label>
              <select
                id="language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="es">Italiano</option>
                <option value="es">Português</option>
                <option value="es">中文</option>
                <option value="es">日本語</option>
                <option value="es">Русский</option>
                <option value="es">العربية</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              {t('registerButton')} 
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">{t('alreadyHaveAccount')}</span>
            <Link 
              href="/auth/login" 
              className="text-blue-600 hover:underline font-medium"
            >
              {t('loginLink')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}