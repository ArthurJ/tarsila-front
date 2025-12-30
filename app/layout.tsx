import React from "react";
import type { Metadata } from "next";
import { AuthProvider } from "./contexts/AuthProvider";
import { HistoryProvider } from "./contexts/HistoryProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import { DraftProvider } from "./contexts/DraftProvider";
import { DialogProvider } from "./contexts/DialogsProvider";
import Header from "./components/header/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarsila",
  description: "Tarsila",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="pt-br" className="text-default bg-light">
      <body>
        <AuthProvider>
        <HistoryProvider>
          <LoaderProvider>
            <DraftProvider>
              <DialogProvider>
                <Header className="h-[4rem]" />
                <div className="h-[calc(100vh-4rem)]">
                  {children}
                </div>
              </DialogProvider>
            </DraftProvider>
          </LoaderProvider>
        </HistoryProvider>
      </AuthProvider>
      </body>
    </html>
  );
}