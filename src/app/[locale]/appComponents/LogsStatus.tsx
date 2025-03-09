//@/src/app/[locale]/appComponents/logstatus.tsx
"use client"; 

import { Link } from '@/i18n/navigation'
import React, { useState, useEffect, useRef } from "react";
import { useUserStore } from "../../../../store/useUserStore";
import { useTranslations } from 'next-intl';

export default function LogStatus() {
  const { user, token, clearUser } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('LogStatus'); // Utiliser le namespace LogStatus pour les traductions

  const handleLogout = () => {
    clearUser();
    setIsMenuOpen(false);
  }; 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {user && token ? (
        <>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center focus:outline-none"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={t('profileImage')}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 bg-green-500 rounded-full"></div>
            )}
            {user.name && (
              <span className="ml-2 text-gray-700">{user.name}</span>
            )}
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
            >
              <Link
                href="/user"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('profile')}
              </Link>
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('admin')}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/auth/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {t('login')}
        </Link>
      )}
    </div>
  );
}