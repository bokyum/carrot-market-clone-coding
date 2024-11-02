import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Rubik_Scribble } from "next/font/google";
import localFont from "next/font/local";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--roboto-text",
});

const rubik = Rubik_Scribble({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--rubik-text",
});

const d2coding = localFont({
  src: "./D2Coding.ttf",
  variable: "--d2coding-text",
});

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
  console.log(roboto);
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${roboto.variable} ${d2coding.variable} mx-auto max-w-screen-sm bg-neutral-900 text-white antialiased`}
        // style={roboto.style}
      >
        {children}
      </body>
    </html>
  );
}
