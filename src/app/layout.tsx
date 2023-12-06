import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../public/assets/styles/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montesarrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exchange Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montesarrat.className}>{children}</body>
    </html>
  );
}
