import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Ring Log — Eril & Mar",
  description: "Wedding ring preference quiz by Sang Jiwa Productions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* Scale page-frame to fit any screen — runs before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            function upd(){
              var s=Math.min(1,Math.min(window.innerWidth/595,window.innerHeight/842));
              document.documentElement.style.setProperty('--page-scale',s);
            }
            upd();
            window.addEventListener('resize',upd);
          })();
        `}} />
      </head>
      <body
        style={{
          minHeight: "100dvh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a13",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
