'use client';

import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* サイト情報 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-r from-pink-500 to-rose-500">
                💕
              </div>
              <div className="text-lg font-bold">性愛タイプ診断</div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              あなたの性愛スタイルを科学的に診断します。10個の質問に答えるだけで、あなたの性愛タイプがわかります。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-base font-bold mb-4">メニュー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  診断をする
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/types')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  全タイプ一覧
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  診断について
                </button>
              </li>
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h3 className="text-base font-bold mb-4">法的情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => router.push('/privacy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  利用規約
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} 性愛タイプ診断. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
