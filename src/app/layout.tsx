import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "TastyTaco",
  description: "Engineering student building systems, backend tools, and learning computer science through projects.",
  authors: [{ name: "Kaushik" }], // the username or generic
  icons: {
    icon: "/pf2.png",
  },
  openGraph: {
    title: "TastyTaco",
    description: "Engineering student building systems, backend tools, and learning computer science through projects.",
    images: [
      {
        url: "/pf2.png",
        width: 800,
        height: 600,
        alt: "TastyTaco Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TastyTaco",
    description: "Engineering student building systems, backend tools, and learning computer science through projects.",
    images: ["/pf2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
