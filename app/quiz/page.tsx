'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  const question = questions[currentQuestion];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);

    // 選択肢を記録
    const newAnswers = {
      ...answers,
      [question.id]: question.options[optionIndex].scores
    };
    setAnswers(newAnswers);

    // 少し遅延してから次の質問へ
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // 最後の質問なら結果ページへ
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
    }, 300);
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
      <div className="min-h-screen bg-white pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto py-8">
          {/* プログレスバー */}
          <div className="text-center mb-12">
            <div className="text-xs sm:text-sm font-bold text-gray-700 mb-3 tracking-wider">QUESTION</div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-5xl sm:text-6xl font-bold text-gray-900">{currentQuestion + 1}</span>
              <span className="text-2xl sm:text-3xl text-gray-400">/ {questions.length}</span>
            </div>
          </div>

          {/* 質問文 */}
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-16 px-4 leading-relaxed" style={{ color: '#006CAC' }}>
            {question.text}
          </h2>

          {/* 選択肢 */}
          <div className="mb-12 px-4 max-w-xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 28px)' }}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className="w-full relative group hover:scale-[1.07] transition-all duration-1000"
                  style={{
                    padding: '5px',
                    borderRadius: '12px',
                    backgroundColor: '#F7C54D',
                    border: '1px solid #E96AB0'
                  }}
                >
                  {/* 内側ボーダー */}
                  <div
                    className="absolute rounded-[10px] pointer-events-none z-10 transition-all duration-1000"
                    style={{
                      border: '1px solid #E96AB0',
                      inset: isSelected ? '2px' : '3px',
                      margin: '0'
                    }}
                  />
                  {/* 背景 */}
                  <div
                    className="absolute rounded-[10px] z-0 transition-all duration-1000"
                    style={{
                      backgroundColor: '#ffffff',
                      inset: isSelected ? '2px' : '3px',
                      margin: '0'
                    }}
                  />
                  {/* テキスト */}
                  <div className="relative z-20 text-base sm:text-lg font-medium" style={{ color: '#006CAC', margin: '0', padding: '14px 20px' }}>
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ナビゲーションボタン */}
          <div className="px-4 mt-12 max-w-xl mx-auto">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="w-full px-6 py-3 text-sm sm:text-base font-medium text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: '#EDA7D1', border: '1px solid #E96AB0', borderRadius: '12px' }}
              >
                <span>←</span>
                ひとつ前に戻る
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
