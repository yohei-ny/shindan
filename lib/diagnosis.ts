import { Scores, DiagnosisType, Orientation, Quadrant, Badge } from '@/types';

/**
 * スコアから診断タイプを判定
 */
export function determineType(scores: Scores): DiagnosisType {
  // Step 1: コア4象限の判定
  const isHighLibido = scores.L >= 9;
  const isEdgy = scores.E >= 7;

  const quadrant: Quadrant =
    isHighLibido && isEdgy ? 'HE' :
    isHighLibido && !isEdgy ? 'HC' :
    !isHighLibido && isEdgy ? 'LE' : 'LC';

  // Step 2: 主導志向の判定
  let orientation: Orientation;

  if ((scores.E >= 7 && scores.B >= 4) || (scores.ST - scores.WA >= 2)) {
    orientation = 'S';
  } else if ((scores.E <= 4 && scores.B <= 3) || (scores.WA - scores.ST >= 2)) {
    orientation = 'M';
  } else {
    orientation = 'N';
  }

  // Step 3: 最終タイプ
  return `${orientation}-${quadrant}`;
}

/**
 * バッジを判定
 */
export function determineBadges(scores: Scores): Badge[] {
  const badges: Badge[] = [];

  const stimBias = scores.ST - scores.WA;

  if (stimBias >= 2) {
    badges.push({ icon: '🔥', text: 'スパイス強め', show: true });
  }
  if (stimBias <= -2) {
    badges.push({ icon: '🤗', text: '抱擁濃いめ', show: true });
  }
  if (scores.E >= 7 && scores.L >= 9) {
    badges.push({ icon: '⚡', text: 'テンポ重視', show: true });
  }
  if (scores.E <= 4 && scores.L <= 8) {
    badges.push({ icon: '🌸', text: '穏やかペース', show: true });
  }

  return badges.filter(b => b.show);
}

/**
 * 回答からスコアを計算
 */
export function calculateScores(answers: Record<number, Partial<Scores>>): Scores {
  const scores: Scores = {
    L: 0,
    E: 1,
    B: 0,
    ST: 1,
    WA: 1
  };

  // 各回答からスコアを加算
  Object.values(answers).forEach(optionScores => {
    if (typeof optionScores === 'object') {
      Object.entries(optionScores).forEach(([key, value]) => {
        const scoreKey = key as keyof Scores;
        if (scoreKey in scores && typeof value === 'number') {
          scores[scoreKey] += value;
        }
      });
    }
  });

  // スコアの範囲を調整
  scores.L = Math.max(0, Math.min(16, scores.L));
  scores.E = Math.max(1, Math.min(9, scores.E));
  scores.B = Math.max(0, Math.min(8, scores.B));
  scores.ST = Math.max(1, Math.min(5, scores.ST));
  scores.WA = Math.max(1, Math.min(5, scores.WA));

  return scores;
}

/**
 * タイプのグラデーションを取得
 */
export function getTypeGradient(type: DiagnosisType): string {
  const gradients: Record<DiagnosisType, string> = {
    'S-HE': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'S-HC': 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    'S-LE': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'S-LC': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'N-HE': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'N-HC': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'N-LE': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'N-LC': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'M-HE': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'M-HC': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'M-LE': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'M-LC': 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  };

  return gradients[type] || gradients['N-LC'];
}
