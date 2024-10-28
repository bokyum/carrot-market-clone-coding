import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Markey",
    default: "Carrot Market",
  },
  description: "Sell and Buy All the Things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`mx-auto max-w-screen-sm bg-neutral-900 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
