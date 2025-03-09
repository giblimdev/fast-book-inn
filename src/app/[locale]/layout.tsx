import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "./appComponents/Header";
import Footer from "./appComponents/Footer";
import { ReactNode } from "react";
import SideNav from "./appComponents/SideNav";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <div className="flex min-h-screen">
        <div className="sticky top-0 h-screen overflow-y-auto mt-3">
          
        </div>
        <div className="flex-1 overflow-y-auto mt-3 p-6">
          {children}
        </div>
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}