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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image
          src="/img/top.png"
          alt="性愛診断"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* コンテンツエリア */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
        {/* タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            性愛診断
          </h1>
          <p className="text-xl sm:text-2xl text-white drop-shadow-md">
            あなたの性愛スタイルを見つける
          </p>
        </div>

        {/* 診断スタートボタン */}
        <div className="mb-16">
          <button
            onClick={() => setShowGenderModal(true)}
            className="relative block hover:opacity-90 transition-opacity"
          >
            <Image
              src="/img/btn.png"
              alt="診断スタート"
              width={300}
              height={100}
              className="w-auto h-auto"
            />
          </button>
        </div>

        {/* フッターリンク */}
        <div className="mt-auto flex flex-col items-center gap-4 text-white">
          <div className="flex gap-6 text-sm">
            <a href="/terms" className="hover:underline drop-shadow-md">
              用語解説・全タイプ一覧
            </a>
            <a href="/privacy" className="hover:underline drop-shadow-md">
              プライバシーポリシー
            </a>
          </div>
        </div>
      </div>

      {/* 性別選択モーダル */}
      {showGenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
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
