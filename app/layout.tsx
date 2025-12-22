import type { Metadata } from "next";
import "./globals.css";

// This block controls your browser tab and Favicon
export const metadata: Metadata = {
  title: "Adam Seumae | Product Leader",
  description: "Product Leader with 10+ years of experience at Amazon, Microsoft, and Blizzard.",
  icons: {
    icon: "/headshot.jpeg", // This tells the browser to use your headshot
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
