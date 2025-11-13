import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WhatsAppButton from "@/app/components/whatsappbutton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vipas Academy-SAP, AI/ML & IT Training Institute",
  description:
    "Vipas Academy offers training in SAP, AI/ML and IT courses with real-time projects, expert trainers and strong placement support.",
    icons: {
    icon:"/favicon.png" , 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} <WhatsAppButton />
      </body>
    </html>
  );
}
