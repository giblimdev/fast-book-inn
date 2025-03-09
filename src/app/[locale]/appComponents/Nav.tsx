import React from "react";
import LogsStatus from "./LogsStatus";
import SelectLang from "./SelectLang";
import { useTranslations } from 'next-intl'; 
import { Link } from '@/i18n/navigation';

export default function Nav() {
  const t = useTranslations('Nav'); // Utilisez le bon namespace 'Nav'
  console.log("Traduction accommodations:", t('accommodations'));

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-600">
              FastBookInn
              </Link>
            </div>
            <div className=" md:flex space-x-8">
              
             <Link
                href="/accommodations"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('accommodations')} {/* Utilisez la traduction pour "accommodations" */}
              </Link>
              <Link
                href="/AboutUs"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('aboutUs')} {/* Utilisez la traduction pour "aboutUs" */}
              </Link>
              <Link
                href="/contactUs"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('contactUs')} {/* Utilisez la traduction pour "contactUs" */}
              </Link>
              <Link
                href="/label"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('Labeling')} {/* Utilisez la traduction pour "label" */}
              </Link>
              <Link
                href="/dev"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('dev')} {/* Utilisez la traduction pour "dev" */}
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600"
              >
                {t('admin')} {/* Utilisez la traduction pour "Admin" */}
              </Link>
            </div>


            <div className="flex items-center space-x-4">
              <SelectLang />
              <LogsStatus />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}