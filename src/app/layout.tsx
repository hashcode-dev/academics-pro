import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academics Pro | Modern Educational ERP & School Management SaaS",
  description:
    "Next-generation unified cloud operating platform for K-12 and collegiate institutions, featuring multi-tenant portals, automated timetable scheduling, student 360 profiles, and integrated financial management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased selection:bg-[#004bca] selection:text-white">
        {children}
      </body>
    </html>
  );
}
