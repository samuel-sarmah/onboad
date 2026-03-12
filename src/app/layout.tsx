import type { Metadata } from "next";
import { Inter, Patrick_Hand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onboard | Project Management for Small Teams",
  description: "Streamline your team's workflow with Kanban boards, calendar views, and real-time collaboration. Built for small teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${patrickHand.variable}`}>
        {children}
      </body>
    </html>
  );
}
