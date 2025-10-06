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
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}>
        <div className="w-full max-w-md mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* メインカード */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 text-center" style={{ boxShadow: '0 10px 40px rgba(255,107,157,0.15)' }}>
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-5 sm:mb-6" style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}>
                <span className="text-2xl sm:text-3xl">💕</span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 sm:mb-4" style={{ color: 'var(--text-primary)' }}>
                性愛タイプ診断
              </h1>

              <p className="text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                あなたの性愛スタイルを発見しましょう
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGenderModal(true)}
                className="w-full py-3 sm:py-4 rounded-full font-bold text-white text-base sm:text-lg shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                }}
              >
                診断を始める
              </motion.button>
            </div>

            {/* 詳細情報 */}
            <div className="grid gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,157,0.1)' }}>
                  <span className="text-xl sm:text-2xl">⏱️</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>3分で完了</p>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>簡単な質問に答えるだけ</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,157,0.1)' }}>
                  <span className="text-xl sm:text-2xl">🎯</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>精度の高い分析</p>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>12種類の詳細なタイプ分類</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,157,0.1)' }}>
                  <span className="text-xl sm:text-2xl">🔐</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>プライバシー保護</p>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>完全匿名・個人情報不要</p>
                </div>
              </motion.div>
            </div>

            {/* 注意事項 */}
            <div className="text-center pt-2">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                ※ 回答内容は匿名で処理されます
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 性別選択モーダル */}
      {showGenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowGenderModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-[28px] p-8 max-w-md w-full"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                 style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}>
              💕
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
              性別を選択
            </h3>
            <p className="text-center mb-5 sm:mb-6 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              あなたの性別を選択してください
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <button
                onClick={() => setSelectedGender('male')}
                className="relative rounded-[20px] py-6 sm:py-8 px-3 sm:px-4 transition-all"
                style={{
                  background: selectedGender === 'male' ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#f8f9fa',
                  boxShadow: selectedGender === 'male' ? '0 8px 20px rgba(255,107,157,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">👨</div>
                <div className="text-base sm:text-lg font-bold" style={{ color: selectedGender === 'male' ? 'white' : 'var(--text-primary)' }}>
                  男性
                </div>
              </button>

              <button
                onClick={() => setSelectedGender('female')}
                className="relative rounded-[20px] py-6 sm:py-8 px-3 sm:px-4 transition-all"
                style={{
                  background: selectedGender === 'female' ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#f8f9fa',
                  boxShadow: selectedGender === 'female' ? '0 8px 20px rgba(255,107,157,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">👩</div>
                <div className="text-base sm:text-lg font-bold" style={{ color: selectedGender === 'female' ? 'white' : 'var(--text-primary)' }}>
                  女性
                </div>
              </button>
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedGender}
              className="w-full py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: selectedGender ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#ddd',
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
