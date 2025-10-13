'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gender } from '@/types';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const handleStart = () => {
    if (!selectedGender) {
      alert('性別を選択してください');
      return;
    }
    localStorage.setItem('gender', selectedGender);
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
      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        {/* メイン画像 */}
        <div className="w-full max-w-md mb-6 mt-4">
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
        <p className="text-white text-center text-base mb-8 tracking-wide">
          あなたの性愛スタイルを見つける
        </p>

        {/* 診断スタートボタン */}
        <button
          onClick={() => setShowGenderModal(true)}
          className="w-full max-w-md bg-white rounded-full py-4 px-8 mb-8 hover:bg-gray-100 transition-colors"
        >
          <span className="text-black text-lg font-bold">診断スタート</span>
        </button>

        {/* 区切り線 */}
        <div className="w-full max-w-md border-t border-gray-700 mb-6"></div>

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
            onClick={() => setShowGenderModal(true)}
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

      {/* 性別選択モーダル */}
      {showGenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div
            className="absolute inset-0"
            onClick={() => setShowGenderModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-pink-500">
              💕
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">
              性別を選択
            </h3>
            <p className="text-center mb-6 text-sm text-gray-600">
              あなたの性別を選択してください
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setSelectedGender('male')}
                className={`rounded-lg py-10 px-4 transition-all ${
                  selectedGender === 'male'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-5xl mb-3">👨</div>
                <div className={`text-lg font-bold ${selectedGender === 'male' ? 'text-white' : 'text-gray-800'}`}>
                  男性
                </div>
              </button>

              <button
                onClick={() => setSelectedGender('female')}
                className={`rounded-lg py-10 px-4 transition-all ${
                  selectedGender === 'female'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-5xl mb-3">👩</div>
                <div className={`text-lg font-bold ${selectedGender === 'female' ? 'text-white' : 'text-gray-800'}`}>
                  女性
                </div>
              </button>
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedGender}
              className={`w-full py-4 rounded-lg text-lg font-bold transition-all ${
                selectedGender
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              診断をはじめる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
