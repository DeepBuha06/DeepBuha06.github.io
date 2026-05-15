import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Deep Buha — Systems Engineer",
  description:
    "Personal portfolio of Deep Buha. Systems Engineer at IIT Gandhinagar.",
  verification: {
    google: "AiUgbGnV-jdnmg162v4HtmO5ymKnTisc6xjt3Tc2z0w",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
