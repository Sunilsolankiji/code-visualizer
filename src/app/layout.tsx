import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "App with sidebar and header layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-6 mt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
