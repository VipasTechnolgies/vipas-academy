import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import WhatsAppButton from "@/app/components/whatsappbutton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vipas Academy-SAP, AI/ML & IT Training Institute",
  description:
    "Vipas Academy offers training in SAP, AI/ML and IT courses with real-time projects, expert trainers and strong placement support.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console */}
       <meta 
       name="google-site-verification" 
       content="Mybhp5mLm3RcvrGCRKXV-1tE2t64NDZVMy27s-K5rXY" />
        {/* Google Tag Manager (HEAD) */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWQ434D5');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        {/* Google Tag Manager (BODY) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWQ434D5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* GA4 (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MLZHWJDC08"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MLZHWJDC08');
          `}
        </Script>

        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
