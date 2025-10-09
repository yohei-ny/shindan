'use client';

import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-pink-500">
              💕
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                性愛タイプ診断
              </div>
              <div className="text-xs text-gray-500">
                SEX Type Diagnosis
              </div>
            </div>
          </button>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              診断をする
            </button>
            <button
              onClick={() => router.push('/types')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              全タイプ一覧
            </button>
            <button
              onClick={() => router.push('/about')}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              診断について
            </button>
          </nav>

          {/* CTAボタン */}
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 transition-all"
          >
            診断を始める
          </button>
        </div>
      </div>
    </header>
  );
}
