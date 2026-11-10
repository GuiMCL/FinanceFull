import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { main_font } from "@/public/fonts/font_index";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

const isVercel = process.env.VERCEL === "1";

export const metadata: Metadata = {
  title: "MoneyWise",
  description: "Gestão financeira inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="MoneyWise" />
      </head>
      <body
        className={`${main_font.className} antialiased `}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
        {isVercel && <Analytics />}
        {isVercel && <SpeedInsights />}
      </body>
    </html>
  );
}
