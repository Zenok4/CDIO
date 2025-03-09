"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_component/header";
import ItemDasboard from "./_component/itemDashboard";
import Footer from "./_component/footer";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
  createClientComponentClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Medical System",
//   description: "Implement by team Lisa",
// };

export default function RootLayout({ children }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <html lang="en">
      <meta title="Medical System"/>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
          <Header />
          <div className="py-14 px-4">{children}</div>
          <ItemDasboard />
          <Footer />
        </body>
      </SessionContextProvider>
    </html>
  );
}
