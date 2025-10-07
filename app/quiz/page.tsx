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
      <div className="min-h-screen flex flex-col items-center justify-center" style={{
        background: 'linear-gradient(180deg, #f8f4f9 0%, #e8d5ed 50%, #d4b5dc 100%)',
        paddingTop: '120px',
        paddingBottom: '100px',
      }}>
        <div className="w-full max-w-xl mx-auto px-8">
          {/* プログレスバー - カードの外 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold tracking-wider" style={{ color: '#4a5568' }}>
                QUESTION
              </span>
              <span className="text-3xl font-black" style={{ color: '#2d3748' }}>
                {currentQuestion + 1} <span className="text-xl font-normal" style={{ color: '#a0aec0' }}>/ {questions.length}</span>
              </span>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #4a90e2 0%, #357abd 100%)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* 質問カード */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-[32px] relative overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.9)'
              }}
            >
              {/* カード内コンテンツ - 大きな余白 */}
              <div className="p-12 sm:p-16">
                {/* 質問文 */}
                <div className="mb-16 text-center">
                  <h2 className="text-2xl sm:text-3xl font-black leading-relaxed" style={{
                    color: '#2d3748',
                    lineHeight: '1.6'
                  }}>
                    {question.text}
                  </h2>
                </div>

                {/* 選択肢 - 余白を大きく */}
                <div className="space-y-5 mb-12">
                  {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectOption(index)}
                        className="w-full text-center rounded-2xl py-6 px-8 transition-all relative"
                        style={{
                          border: isSelected ? '3px solid #4a90e2' : '2px solid #e2e8f0',
                          boxShadow: isSelected ? '0 8px 24px rgba(74,144,226,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
                          background: isSelected ? 'linear-gradient(135deg, #e3f2fd 0%, #f0f9ff 100%)' : 'white'
                        }}
                      >
                        <div className="text-lg sm:text-xl font-bold" style={{
                          color: isSelected ? '#1976d2' : '#2d3748'
                        }}>
                          {option.label}
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: '#4a90e2' }}
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
                  className="text-center py-5 px-6 rounded-2xl mb-10"
                  style={{
                    background: 'rgba(74,144,226,0.08)',
                    color: '#4a5568'
                  }}
                >
                  <span className="text-2xl mr-2">💡</span>
                  <span className="text-base">直感で答えることをおすすめします</span>
                </motion.div>

                {/* ナビゲーションボタン */}
                <div className="flex gap-4">
                  {currentQuestion > 0 && (
                    <button
                      onClick={handleBack}
                      className="px-10 py-5 rounded-2xl font-bold text-base transition-all hover:scale-105"
                      style={{
                        border: '2px solid #e2e8f0',
                        color: '#4a5568',
                        backgroundColor: 'white',
                      }}
                    >
                      ← ひとつ前に戻る
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="flex-1 px-10 py-5 rounded-2xl font-bold text-xl text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                      background: selectedOption !== null ? 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' : '#cbd5e0',
                      boxShadow: selectedOption !== null ? '0 10px 30px rgba(255,107,157,0.35)' : 'none',
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? '結果を見る →' : '次へ →'}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
