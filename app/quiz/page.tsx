'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/lib/questions';
import { calculateScores, determineType, determineBadges } from '@/lib/diagnosis';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Partial<import('@/types').Scores>>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gender = localStorage.getItem('gender');
      if (!gender) {
        router.push('/');
      }
    }
  }, [router]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('選択肢を選んでください');
      return;
    }

    const newAnswers = {
      ...answers,
      [question.id]: question.options[selectedOption].scores
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      const scores = calculateScores(newAnswers);
      const type = determineType(scores);
      const badges = determineBadges(scores);
      const gender = localStorage.getItem('gender');

      const result = {
        type,
        scores,
        badges,
        gender,
        timestamp: Date.now()
      };
      localStorage.setItem('diagnosisResult', JSON.stringify(result));
      router.push(`/result/${type}`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col" style={{
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 50%, #ffd6e7 100%)',
        paddingTop: '80px',
      }}>
        {/* プログレスバー */}
        <div className="bg-white/98 backdrop-blur-xl shadow-sm py-8">
          <div className="max-w-3xl mx-auto px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                  質問 {currentQuestion + 1} / {questions.length}
                </div>
                <div className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                  {Math.round(progress)}%
                </div>
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white"
                style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}
              >
                {currentQuestion + 1}
              </motion.div>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #ff6b9d 0%, #ff8fab 100%)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* 質問文 */}
              <div className="mb-14 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block px-6 py-3 rounded-full mb-10"
                  style={{ backgroundColor: 'rgba(255, 107, 157, 0.1)' }}
                >
                  <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>Q{currentQuestion + 1}</span>
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-black leading-relaxed px-6" style={{ color: 'var(--text-primary)' }}>
                  {question.text}
                </h2>
              </div>

              {/* 選択肢 */}
              <div className="space-y-6 mb-10">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(index)}
                      className="w-full text-left bg-white rounded-[28px] lg:rounded-[32px] p-8 lg:p-10 transition-all relative overflow-hidden group"
                      style={{
                        border: isSelected ? '3px solid var(--primary)' : '2px solid #f0f0f0',
                        boxShadow: isSelected ? '0 12px 32px rgba(255,107,157,0.2)' : '0 2px 12px rgba(0,0,0,0.04)',
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="selectedBg"
                          className="absolute inset-0 rounded-[28px] lg:rounded-[32px]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(255,143,171,0.08) 100%)',
                          }}
                          initial={false}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      <div className="relative flex items-start gap-5">
                        <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-base lg:text-lg font-bold transition-all"
                             style={{
                               background: isSelected ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#f8f9fa',
                               color: isSelected ? 'white' : 'var(--text-muted)',
                             }}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <div className="text-xl lg:text-2xl font-bold mb-3 leading-snug transition-colors"
                               style={{ color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                            {option.label}
                          </div>
                          <div className="text-base lg:text-lg leading-relaxed"
                               style={{ color: isSelected ? 'var(--primary)' : 'var(--text-secondary)', opacity: 0.85 }}>
                            {option.subLabel}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                          className="absolute top-4 lg:top-6 right-4 lg:right-6 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                            <path d="M11.6666 3.5L5.24998 9.91667L2.33331 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* ヒント */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3 text-base px-8 py-5 rounded-2xl mb-12"
                style={{
                  color: 'var(--text-muted)',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                }}
              >
                <span className="text-2xl">💡</span>
                <span>直感で答えることをおすすめします</span>
              </motion.div>

              {/* ナビゲーションボタン */}
              <div className="flex gap-6">
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className="px-10 py-6 rounded-2xl font-bold text-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  style={{
                    border: '2px solid #e0e0e0',
                    color: 'var(--text-primary)',
                    backgroundColor: 'white',
                    minWidth: '140px',
                  }}
                >
                  ← 戻る
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="flex-1 px-10 py-6 rounded-2xl font-bold text-xl text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    background: selectedOption !== null ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#ddd',
                    boxShadow: selectedOption !== null ? '0 8px 24px rgba(255,107,157,0.35)' : 'none',
                  }}
                >
                  {currentQuestion === questions.length - 1 ? '結果を見る →' : '次へ →'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

        {/* スペーサー（フッター用） */}
        <div style={{ height: '40px' }}></div>
      </div>
      <Footer />
    </>
  );
}
