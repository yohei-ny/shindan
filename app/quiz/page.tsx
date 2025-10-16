'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { calculateScores, determineType, determineBadges } from '@/lib/diagnosis';

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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-2xl">🔥</div>
        <h1 className="text-xl font-bold text-[#D4AF77] tracking-wider">性愛診断</h1>
        <div className="text-2xl">🎁</div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* プログレスバー */}
          <div className="text-center mb-12">
            <div className="text-xs sm:text-sm font-bold mb-3 tracking-wider" style={{ color: '#cbd5e0' }}>QUESTION</div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="text-3xl disabled:opacity-30 hover:scale-110 transition-transform"
                style={{ color: '#e2e8f0' }}
              >
                ◀
              </button>
              <div className="flex items-center gap-2">
                <span className="text-5xl sm:text-6xl font-bold" style={{ color: '#f7fafc' }}>{currentQuestion + 1}</span>
                <span className="text-2xl sm:text-3xl" style={{ color: '#cbd5e0' }}>/ {questions.length}</span>
              </div>
              <div className="text-3xl opacity-30" style={{ color: '#e2e8f0' }}>▶</div>
            </div>
          </div>

          {/* 質問文 */}
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-16 px-4 leading-relaxed" style={{ color: '#f7fafc' }}>
            {question.text}
          </h2>

          {/* 選択肢 */}
          <div className="mb-12 px-4 max-w-xl mx-auto">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className="w-full rounded-xl hover:opacity-90 transition-all duration-300"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
                      : 'linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)',
                    padding: '18px 24px',
                    border: isSelected ? '2px solid #f472b6' : '1px solid #4a4a4a',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isSelected ? '0 8px 24px rgba(236, 72, 153, 0.3)' : 'none',
                    margin: '12px 0'
                  }}
                >
                  <div
                    className="text-base sm:text-lg font-medium"
                    style={{
                      color: isSelected ? '#ffffff' : '#e5e5e5',
                      fontWeight: isSelected ? 'bold' : 'medium'
                    }}
                  >
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
                className="w-full px-6 py-3 text-sm sm:text-base font-medium text-white flex items-center justify-center gap-2 rounded-xl hover:opacity-80 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #4a4a4a 0%, #2d2d2d 100%)',
                  border: '1px solid #6b6b6b'
                }}
              >
                <span>←</span>
                ひとつ前に戻る
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
