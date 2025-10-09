import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEXタイプ診断 | あなたの性愛タイプを診断",
  description: "10問の質問であなたの性愛タイプを診断。12タイプから自分の傾向を知り、相性の良いパートナーを見つけよう。",
  openGraph: {
    title: "SEXタイプ診断",
    description: "10問の質問であなたの性愛タイプを診断",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEXタイプ診断",
    description: "10問の質問であなたの性愛タイプを診断",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
