import { Scores, DiagnosisType, Gender, CompatibilityRank } from '@/types';

/**
 * 相性スコアを計算
 */
export function calculateCompatibility(
  userType: DiagnosisType,
  targetType: DiagnosisType,
  userScores: Scores,
  targetScores: Scores,
  userGender: Gender,
  targetGender: Gender
): number {
  // 異性間のみ計算
  if (userGender === targetGender) return 0;

  let score = 0;

  // 主導補完（0-40点）
  const userOrientation = userType.split('-')[0];
  const targetOrientation = targetType.split('-')[0];

  if (
    (userOrientation === 'S' && targetOrientation === 'M') ||
    (userOrientation === 'M' && targetOrientation === 'S')
  ) {
    score += 40;
  } else if (userOrientation === 'N' && targetOrientation !== 'N') {
    score += 25;
  } else if (userOrientation === 'N' && targetOrientation === 'N') {
    score += 20;
  } else {
    score += 10;
  }

  // 新奇整合（0-20点）
  const userQuadrant = userType.split('-')[1];
  const targetQuadrant = targetType.split('-')[1];
  const userEdgy = userQuadrant.includes('E');
  const targetEdgy = targetQuadrant.includes('E');

  score += userEdgy === targetEdgy ? 20 : 10;

  // 頻度整合（0-20点）
  const libidoDiff = Math.abs(userScores.L - targetScores.L);
  score += Math.max(0, 20 - 2 * libidoDiff);

  // 刺激/ぬくもり（0-10点）
  const userStimBias = userScores.ST - userScores.WA;
  const targetStimBias = targetScores.ST - targetScores.WA;

  if (Math.abs(userStimBias) <= 1 || Math.abs(targetStimBias) <= 1) {
    score += 10;
  } else if (userStimBias * targetStimBias > 0) {
    score += 8;
  } else {
    score += 9;
  }

  // ボーナス（0-10点）
  if (
    (userScores.B >= 5 && targetScores.B <= 3) ||
    (userScores.B <= 3 && targetScores.B >= 5)
  ) {
    score += 5;
  }
  if (userScores.E >= 7 && targetScores.E >= 7) {
    score += 5;
  }

  return score;
}

/**
 * スコアからランクを判定
 */
export function getCompatibilityRank(score: number): CompatibilityRank {
  if (score >= 85) return '◎';
  if (score >= 70) return '○';
  if (score >= 55) return '△';
  return '▲';
}

/**
 * ランクの色を取得
 */
export function getRankColor(rank: CompatibilityRank): string {
  const colors: Record<CompatibilityRank, string> = {
    '◎': '#ffd700', // ゴールド
    '○': '#c0c0c0', // シルバー
    '△': '#cd7f32', // ブロンズ
    '▲': '#808080', // グレー
  };
  return colors[rank];
}

/**
 * ランクの説明を取得
 */
export function getRankLabel(rank: CompatibilityRank): string {
  const labels: Record<CompatibilityRank, string> = {
    '◎': '最良',
    '○': '良好',
    '△': '要工夫',
    '▲': '難しい',
  };
  return labels[rank];
}
