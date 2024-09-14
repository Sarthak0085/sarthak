import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Sarthak's Portfolio",
  description: "Portfolio which shows the skills, works, projects about the Sarthak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${calistoga.variable} bg-gray-900 text-white antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
