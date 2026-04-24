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
