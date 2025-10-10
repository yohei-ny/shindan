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

    // 少し遅延してから次の質問へ（アニメーション時間を考慮）
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
    }, 500);
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
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center relative overflow-hidden"
           style={{
             background: 'linear-gradient(to bottom, #2563A8 0%, #4A7BB8 30%, #E891C1 70%, #F5B3D4 100%)'
           }}>
        {/* 装飾的な雲 */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-60 pointer-events-none">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path d="M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.3)"/>
            <path d="M0,80 Q200,50 400,80 T800,80 T1200,80 L1200,120 L0,120 Z" fill="rgba(255,192,203,0.3)"/>
          </svg>
        </div>

        {/* キラキラ装飾 */}
        <div className="absolute top-16 right-8 text-yellow-200 text-3xl opacity-80">✦</div>
        <div className="absolute top-32 left-12 text-yellow-200 text-2xl opacity-60">✦</div>
        <div className="absolute bottom-40 right-20 text-yellow-200 text-2xl opacity-70">✦</div>

        <div className="w-full max-w-2xl mx-auto py-8 relative z-10">
          {/* プログレスバー */}
          <div className="text-center mb-8">
            <div className="text-xs sm:text-sm font-bold text-blue-100 mb-3 tracking-wider">QUESTION</div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="text-white text-3xl disabled:opacity-30 hover:scale-110 transition-transform"
              >
                ◀
              </button>
              <div className="flex items-center gap-2">
                <span className="text-5xl sm:text-6xl font-bold text-white">{currentQuestion + 1}</span>
                <span className="text-2xl sm:text-3xl text-blue-100">/ {questions.length}</span>
              </div>
              <div className="text-white text-3xl opacity-30">▶</div>
            </div>
          </div>

          {/* 質問文 */}
          <h2 className="text-lg sm:text-xl font-bold text-center mb-12 px-4 leading-relaxed text-purple-900">
            {question.text}
          </h2>

          {/* 選択肢 */}
          <div className="mb-8 px-4 max-w-xl mx-auto space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className="w-full py-4 px-6 rounded-2xl text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: isSelected ? '#F5B800' : '#FFF9E6',
                    border: isSelected ? '3px solid #F5B800' : '2px solid #FFE4B5',
                    color: '#4A5568',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isSelected ? '0 4px 12px rgba(245, 184, 0, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                    fontWeight: isSelected ? 'bold' : 'medium'
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* ナビゲーションボタン */}
          <div className="px-4 mt-8 max-w-xl mx-auto">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="w-full px-6 py-3 text-sm sm:text-base font-medium text-white flex items-center justify-center gap-2 rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(236, 112, 167, 0.9)',
                  boxShadow: '0 4px 12px rgba(236, 112, 167, 0.3)'
                }}
              >
                <span>◀</span>
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
