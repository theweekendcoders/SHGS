import type { Metadata } from "next";
import { Inter, Poppins, Inter_Tight, Urbanist } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothSrolling from "./animations/SmoothScrolling";
import { GlobalProvider } from "../app/provider/GlobalProvider";
import { ToastContainer } from "./toast";
import { AuthContextProvider } from "./context/AuthContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
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
      <body className={`${poppins.className} relative`}>
        <div className="fixed inset-0 z-[-1]">
          <Image
            src="/assets/bg2.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="p-6 mx-auto xl:max-w-screen-2xl relative z-[1]">
          <SmoothSrolling>
            <AuthContextProvider>
              <GlobalProvider>{children}</GlobalProvider>
            </AuthContextProvider>
            <ToastContainer />
          </SmoothSrolling>
        </div>
      </body>
    </html>
  );
}
