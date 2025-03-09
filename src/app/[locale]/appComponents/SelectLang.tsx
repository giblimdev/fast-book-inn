"use client";

import { useRouter, usePathname } from "next/navigation";

export const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "fr",
    name: "Français",
  },
  {
    code: "es",
    name: "Español",
  },
  {
    code: "de",
    name: "Deutsch",
  },
  {
    code: "it",
    name: "Italiano",
  },
  {
    code: "pt",
    name: "Português",
  },
  {
    code: "zh",
    name: "中文",
  },
  {
    code: "ja",
    name: "日本語",
  },
  {
    code: "ru",
    name: "Русский",
  },
  {
    code: "ar",
    name: "العربية",
  },
  // Ajoutez d'autres langues si nécessaire
];

export type Language = {
  code: string;
  name: string;
};
export default function SelectLang() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Utiliser Next.js's router pour changer la langue
    router.push(`/${newLocale}${pathname}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        onChange={handleLanguageChange}
        className="px-2 py-1 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((lang: Language) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}