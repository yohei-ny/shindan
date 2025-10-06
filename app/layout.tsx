import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

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
    <html lang="ja" className={notoSansJP.variable} suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
