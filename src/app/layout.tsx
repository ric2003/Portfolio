import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import I18nProviderClient from "@/components/I18nProviderClient";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageToggle } from "@/components/ui/language-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of Ricardo Gonçalves",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient>
            {children}
            <div className="fixed top-8 right-6 z-50 md:hidden">
              <div className="bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
                <LanguageToggle />
              </div>
            </div>
          </I18nProviderClient>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
