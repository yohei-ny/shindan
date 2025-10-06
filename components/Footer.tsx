'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20" style={{ margin: '0 auto', textAlign: "center" as const }}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* サービス情報 */}
          <div>
            <div className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              性愛タイプ診断
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              あなたの性愛スタイルを12タイプから診断。自分の傾向を知り、より良いパートナーシップを築くためのツールです。
            </p>
          </div>

          {/* リンク */}
          <div>
            <div className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
              情報
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:underline transition-all" style={{ color: 'var(--text-secondary)' }}>
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:underline transition-all" style={{ color: 'var(--text-secondary)' }}>
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline transition-all" style={{ color: 'var(--text-secondary)' }}>
                  このサイトについて
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} 性愛タイプ診断. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
