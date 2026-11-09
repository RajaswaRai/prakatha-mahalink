import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import CTA from "@/components/my/CTA";
import MyFooter from "@/components/my/MyFooter";
import { Lora } from "next/font/google";
import MyNavbar from "@/components/my/MyNavbar";
import { auth } from "@/auth";
import { Suspense } from "react";
import { connection } from "next/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const lora = Lora({
  subsets: ["latin"],
  // Define all the weights you mentioned
  weight: ["400", "500", "600", "700"],
  // Define both normal and italic styles
  style: ["normal", "italic"],
  // Optional: CSS variable for Tailwind
  variable: "--font-lora",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mantra Dashboard",
  description: "Dashboard untuk organisasi",
};

async function AuthenticatedNavbar() {
  await connection();
  const session = await auth();
  return <MyNavbar session={session} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        lora.className,
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      {/* BG - F7F3EB */}
      <body className="bg-[] text-foreground">
        <Suspense fallback={<MyNavbar session={null} />}>
          <AuthenticatedNavbar />
        </Suspense>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
