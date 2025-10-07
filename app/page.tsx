'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(180deg, #f8f4f9 0%, #e8d5ed 50%, #d4b5dc 100%)',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}>
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* メインカード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[40px] p-12 sm:p-16 text-center relative overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            {/* 装飾 */}
            <div className="absolute top-8 right-8 text-6xl opacity-10">✨</div>
            <div className="absolute bottom-8 left-8 text-6xl opacity-10">💫</div>

            {/* アイコン */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-8"
              style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}
            >
              <span className="text-4xl sm:text-5xl">💕</span>
            </motion.div>

            {/* タイトル */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm sm:text-base mb-3 tracking-wider" style={{ color: '#9ca3af' }}>
                10個の質問に答えて、
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight" style={{
                color: '#2d3748',
                letterSpacing: '-0.02em'
              }}>
                あなたの秘めた<br />
                「性愛タイプ」を見つけよう！
              </h1>
            </motion.div>

            {/* サブタイトル */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-6 py-2 rounded-full mb-10"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d20 0%, #ff8fab20 100%)',
                border: '2px solid #ff6b9d40'
              }}
            >
              <span className="text-base font-bold" style={{ color: '#ff6b9d' }}>
                あなたの性愛スタイルは？
              </span>
            </motion.div>

            {/* STARTボタン */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowGenderModal(true)}
              className="px-16 py-6 rounded-2xl font-black text-white text-xl tracking-wider shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
                border: '3px solid #2d5f8d',
                boxShadow: '0 8px 24px rgba(74,144,226,0.4)',
              }}
            >
              START
            </motion.button>

            {/* 説明テキスト */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm mt-8 leading-relaxed"
              style={{ color: '#718096' }}
            >
              ※ 所要時間: 約3分 / 完全匿名・個人情報不要
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 性別選択モーダル */}
      {showGenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowGenderModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[32px] p-10 max-w-md w-full"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl"
                 style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}>
              💕
            </div>
            <h3 className="text-2xl font-black mb-3 text-center" style={{ color: '#2d3748' }}>
              性別を選択
            </h3>
            <p className="text-center mb-8 text-sm leading-relaxed" style={{ color: '#718096' }}>
              あなたの性別を選択してください
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setSelectedGender('male')}
                className="relative rounded-2xl py-10 px-4 transition-all"
                style={{
                  background: selectedGender === 'male' ? 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)' : '#f7fafc',
                  boxShadow: selectedGender === 'male' ? '0 8px 20px rgba(74,144,226,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                  border: selectedGender === 'male' ? '3px solid #2d5f8d' : '2px solid #e2e8f0'
                }}
              >
                <div className="text-5xl mb-3">👨</div>
                <div className="text-lg font-bold" style={{ color: selectedGender === 'male' ? 'white' : '#2d3748' }}>
                  男性
                </div>
              </button>

              <button
                onClick={() => setSelectedGender('female')}
                className="relative rounded-2xl py-10 px-4 transition-all"
                style={{
                  background: selectedGender === 'female' ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#f7fafc',
                  boxShadow: selectedGender === 'female' ? '0 8px 20px rgba(255,107,157,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                  border: selectedGender === 'female' ? '3px solid #e74c8c' : '2px solid #e2e8f0'
                }}
              >
                <div className="text-5xl mb-3">👩</div>
                <div className="text-lg font-bold" style={{ color: selectedGender === 'female' ? 'white' : '#2d3748' }}>
                  女性
                </div>
              </button>
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedGender}
              className="w-full py-5 rounded-2xl text-lg font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: selectedGender ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#cbd5e0',
                boxShadow: selectedGender ? '0 8px 24px rgba(255,107,157,0.4)' : 'none',
              }}
            >
              診断をはじめる
            </button>
          </motion.div>
        </div>
      )}
      <Footer />
    </>
  );
}
