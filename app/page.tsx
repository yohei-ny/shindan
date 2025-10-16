'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-4 bg-black">
        <div className="text-2xl">🔥</div>
        <h1 className="text-xl font-bold text-[#D4AF77] tracking-wider">性愛診断</h1>
        <div className="text-2xl">🎁</div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col items-center" style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '48px' }}>
        {/* メイン画像 */}
        <div className="w-full max-w-md" style={{ marginBottom: '40px' }}>
          <Image
            src="/img/top.png"
            alt="性愛診断"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>

        {/* キャッチコピー */}
        <p className="text-white text-center text-base tracking-wide" style={{ marginBottom: '40px' }}>
          あなたの性愛スタイルを見つける
        </p>

        {/* 診断スタートボタン */}
        <button
          onClick={handleStart}
          className="w-full max-w-md bg-white rounded-full hover:bg-gray-100 transition-colors"
          style={{ padding: '20px 32px' }}
        >
          <span className="text-black text-lg font-bold">診断スタート</span>
        </button>

        {/* 区切り線 */}
        <div className="w-full max-w-md border-t border-gray-700" style={{ marginBottom: '48px' }}></div>

        {/* フッター */}
        <div className="w-full max-w-md flex items-center justify-between">
          <div className="flex flex-col gap-2 text-white text-sm">
            <a href="/terms" className="hover:text-gray-300 transition-colors">
              用語解説・全タイプ一覧
            </a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">
              プライバシーポリシー
            </a>
          </div>
          <button
            onClick={handleStart}
            className="relative w-20 h-20 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 overflow-hidden"
          >
            <Image
              src="/img/btn.png"
              alt=""
              fill
              className="object-cover"
            />
            <div className="relative z-10 text-center">
              <div className="text-white text-xs font-bold drop-shadow-lg">診断</div>
              <div className="text-white text-xs font-bold drop-shadow-lg">START</div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
