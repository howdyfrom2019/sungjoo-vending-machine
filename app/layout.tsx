import { Provider } from "jotai";
import { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
