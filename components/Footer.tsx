'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* サービス情報 */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              性愛タイプ診断
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              あなたの性愛スタイルを12タイプから診断。自分の傾向を知り、より良いパートナーシップを築くためのツールです。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
              情報
            </h3>
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

          {/* SNS・お問い合わせ */}
          <div>
            <h3 className="font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
              フォロー
            </h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--bg-tertiary)' }}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
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
