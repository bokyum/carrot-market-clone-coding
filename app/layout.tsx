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
  potato,
}: Readonly<{
  children: React.ReactNode;
  potato: React.ReactNode;
}>) {
  console.log("potato", potato);
  return (
    <html lang="en">
      <body
        className={`mx-auto max-w-screen-sm bg-neutral-900 text-white antialiased`}
      >
        {potato}
        {children}
      </body>
    </html>
  );
}
