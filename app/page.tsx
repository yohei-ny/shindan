'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gender } from '@/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="max-w-2xl w-full">
          {/* メインカード */}
          <div className="bg-white rounded-2xl shadow-sm p-10 sm:p-14 text-center">
            {/* アイコン */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-pink-500">
              <span className="text-4xl">💕</span>
            </div>

            {/* タイトル */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                10個の質問に答えて、
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                あなたの秘めた<br />
                「性愛タイプ」を見つけよう！
              </h1>
            </div>

            {/* サブタイトル */}
            <div className="inline-block px-6 py-2 rounded-full mb-8 bg-pink-100">
              <span className="text-base font-bold text-pink-600">
                あなたの性愛スタイルは？
              </span>
            </div>

            {/* STARTボタン */}
            <button
              onClick={() => setShowGenderModal(true)}
              className="w-full max-w-xs px-12 py-4 rounded-lg font-bold text-white text-xl bg-blue-500 hover:bg-blue-600 transition-all"
            >
              START
            </button>

            {/* 説明テキスト */}
            <p className="text-xs text-gray-500 mt-6">
              ※ 所要時間: 約3分 / 完全匿名・個人情報不要
            </p>
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
      <Footer />
    </>
  );
}
