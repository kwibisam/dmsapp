import "./globals.css";
import { inter } from "./ui/fonts";
export const metadata = {
  title: "Document Managemet",
  description: "Document Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
