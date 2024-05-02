import type { Metadata } from "next";
import { Inter, Poppins, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothSrolling from "./animations/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });
// const inter_tight = Inter_Tight({ subsets: ["latin"] });

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400','500','600'],
  style: ['normal', 'italic'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Sree Hariganesh Sweets & Hotchips",
  description: "Powered by theweekendcoders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} p-6 mx-auto xl:max-w-screen-2xl`}>
        <SmoothSrolling>{children}</SmoothSrolling>
        </body>
    </html>
  );
}
