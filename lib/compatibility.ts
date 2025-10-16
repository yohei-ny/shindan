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

/**
 * 相性データ型定義
 */
export interface CompatibilityInfo {
  type: DiagnosisType;
  description: string;
}

export interface CompatibilityData {
  best: CompatibilityInfo[];
  good: CompatibilityInfo[];
  challenging: CompatibilityInfo[];
}

/**
 * タイプ別相性データ
 */
export const compatibilityData: Record<DiagnosisType, CompatibilityData> = {
  'S-HE': {
    best: [
      { type: 'M-HE', description: '受け上手で反応が素直。設計が生きる' },
      { type: 'M-HC', description: '安心土台が厚く、主導の手応えがクリア' },
    ],
    good: [
      { type: 'N-HE', description: '攻受の切替が速い協働型' },
      { type: 'M-LE', description: '点で効かせる新奇が刺さる' },
      { type: 'N-LC', description: '王道の厚みを一緒に磨ける' },
    ],
    challenging: [
      { type: 'S-HE', description: '主導×主導で競り合いがち' },
      { type: 'S-HC', description: '新奇濃度でズレやすい' },
      { type: 'M-LC', description: '変化は小さく、安心最優先で' },
    ],
  },
  'N-HE': {
    best: [
      { type: 'M-HE', description: '受け反応が豊かで切替の速さが活きる' },
      { type: 'M-HC', description: '安心土台が厚く共創ペースが安定' },
    ],
    good: [
      { type: 'S-HE', description: '要所で主導を委ねるとメリハリ増す' },
      { type: 'N-LE', description: '"小冒険"の温度が近い' },
      { type: 'N-HC', description: '濃度の出し方を一緒に磨ける' },
    ],
    challenging: [
      { type: 'S-HC', description: '新奇配分の調整が必要' },
      { type: 'M-LC', description: 'ピーク不足に注意' },
      { type: 'S-LE', description: '瞬発型に巻き込まれすぎない枠組みを' },
    ],
  },
  'M-HE': {
    best: [
      { type: 'S-HE', description: '設計主導と反応の良さが噛み合う' },
      { type: 'S-HC', description: '王道テンポ設計に乗ると満足度高い' },
    ],
    good: [
      { type: 'N-HE', description: '攻守の切替が柔らかく安心の上で新奇を楽しめる' },
      { type: 'S-LE', description: '点でキメる瞬発型、上限共有でより良く' },
      { type: 'N-HC', description: '濃度が丁寧で受けの魅力が映える' },
    ],
    challenging: [
      { type: 'S-LC', description: '頻度差に注意、回数より質の合意が鍵' },
      { type: 'M-LC', description: '受け×受けで停滞しやすい' },
      { type: 'M-HE', description: '主導待ちが重なると停滞、時間で役割交代を' },
    ],
  },
  'S-HC': {
    best: [
      { type: 'M-HC', description: '王道×受けで安定の相補' },
      { type: 'M-HE', description: '受けの反応が豊かでテンポ設計が映える' },
    ],
    good: [
      { type: 'N-HC', description: '濃度づくりを一緒に磨ける' },
      { type: 'N-HE', description: '時折主導を委ねると幅が広がる' },
      { type: 'S-LE', description: '計画的に"一点豪華"を差し込むと好相性' },
    ],
    challenging: [
      { type: 'S-HE', description: '新奇濃度の線引きを明確に' },
      { type: 'M-LC', description: '頻度差に配慮、間を温める工夫を' },
      { type: 'N-LE', description: '気分型に振り回されない枠組み作りが鍵' },
    ],
  },
  'N-HC': {
    best: [
      { type: 'S-HC', description: 'テンポと濃度づくりが噛み合う' },
      { type: 'M-HC', description: '安心と受容を厚く分担できる' },
    ],
    good: [
      { type: 'S-HE', description: '新奇3割を合意して取り入れると伸びる' },
      { type: 'N-LC', description: '安らぎと調和の価値観が近い' },
      { type: 'M-HE', description: '受けの反応を活かし濃度を丁寧に' },
    ],
    challenging: [
      { type: 'S-LE', description: '瞬発型に合わせすぎず枠の共有を' },
      { type: 'N-HE', description: '新奇の割当を事前に決める' },
      { type: 'M-LE', description: '頻度差のすり合わせが前提' },
    ],
  },
  'M-HC': {
    best: [
      { type: 'S-HC', description: '王道設計×受けの相補' },
      { type: 'S-HE', description: '新奇は小出しに、王道を厚く' },
    ],
    good: [
      { type: 'N-HC', description: '濃度作りの共同作業が合う' },
      { type: 'N-HE', description: '攻守の切替が心地よい' },
      { type: 'S-LC', description: '低頻度側とも質設計で噛み合う' },
    ],
    challenging: [
      { type: 'S-LE', description: '瞬発強度は"点"に限定' },
      { type: 'M-LE', description: '受け×受けで停滞しないよう小提案を' },
      { type: 'M-LC', description: '安心は共有できるがピーク不足に注意' },
    ],
  },
  'S-LE': {
    best: [
      { type: 'M-HE', description: '反応の良さが瞬発設計と噛み合う' },
      { type: 'M-LE', description: '低頻度同士で計画が立てやすい' },
    ],
    good: [
      { type: 'S-HC', description: '王道の枠に"一点豪華"を差し込む協働' },
      { type: 'N-HE', description: '役割交代で新鮮さを保てる' },
      { type: 'N-LC', description: '安らぎ基調にスパイスを載せやすい' },
    ],
    challenging: [
      { type: 'S-HE', description: '頻度差に注意、大型回を合意して合わせる' },
      { type: 'M-LC', description: '新奇耐性に合わせ軽微な変化から' },
      { type: 'N-LE', description: '気分と計画の齟齬を整える必要' },
    ],
  },
  'N-LE': {
    best: [
      { type: 'S-HE', description: '設計主導に柔らかく乗れる' },
      { type: 'S-LC', description: '低頻度側の計画と噛み合う' },
    ],
    good: [
      { type: 'N-HE', description: '攻守の切替が似ており呼吸が合う' },
      { type: 'M-HE', description: '受けの反応に合わせて小冒険を' },
      { type: 'N-LC', description: '安らぎ基調に軽いスパイスを添えやすい' },
    ],
    challenging: [
      { type: 'S-LE', description: '計画密度が高く気分との折り合いが必要' },
      { type: 'M-LC', description: '冒険頻度の期待値を先に合わせる' },
      { type: 'S-HC', description: 'テンポ設計に飲み込まれない余白の確保' },
    ],
  },
  'M-LE': {
    best: [
      { type: 'S-HE', description: '主導×受けで安心の上に新奇を' },
      { type: 'S-LE', description: '瞬発型の設計に寄り添える' },
    ],
    good: [
      { type: 'N-HC', description: '濃度を丁寧に積み上げられる' },
      { type: 'N-HE', description: '柔らかな切替が心地よい' },
      { type: 'S-LC', description: '低頻度設計で安心を確保' },
    ],
    challenging: [
      { type: 'S-HC', description: 'テンポの速さに飲み込まれない合図が必要' },
      { type: 'M-LC', description: '受け×受けで停滞しやすい' },
      { type: 'M-LE', description: '相手任せが重なると停滞' },
    ],
  },
  'S-LC': {
    best: [
      { type: 'M-LC', description: '王道×受けで快適を最大化' },
      { type: 'M-HC', description: '濃密ケアと相補' },
    ],
    good: [
      { type: 'N-LC', description: '調和基調が一致' },
      { type: 'M-HE', description: '受け反応が設計を引き立てる' },
      { type: 'N-HC', description: '濃度の最適化を共同で' },
    ],
    challenging: [
      { type: 'S-HE', description: '新奇濃度の線引きを明確に' },
      { type: 'S-LE', description: '瞬発強度は"点"に限定' },
      { type: 'N-HE', description: '配分宣言で迷いを減らす' },
    ],
  },
  'N-LC': {
    best: [
      { type: 'S-LC', description: '設計×調和の安定タッグ' },
      { type: 'S-HC', description: 'テンポの明確さで迷いが減る' },
    ],
    good: [
      { type: 'N-HC', description: '濃度の作り方が近い' },
      { type: 'M-HE', description: '受け反応を引き出しやすい' },
      { type: 'M-HC', description: '安心の厚みが相互増幅' },
    ],
    challenging: [
      { type: 'S-HE', description: '新奇配分の事前合意が鍵' },
      { type: 'S-LE', description: '瞬発型に合わせる枠組みを' },
      { type: 'N-LE', description: '気分の揺れに引っ張られない軸を' },
    ],
  },
  'M-LC': {
    best: [
      { type: 'S-LC', description: '王道設計に安心して寄り添える' },
      { type: 'S-HC', description: 'テンポの明確さが頼もしい' },
    ],
    good: [
      { type: 'N-LC', description: '調和の基調が近い' },
      { type: 'S-HE', description: '新奇は"ごく小さく"なら心地よい' },
      { type: 'N-HC', description: '濃度を丁寧に重ねられる' },
    ],
    challenging: [
      { type: 'S-LE', description: '瞬発強度は事前の線引きが必須' },
      { type: 'N-HE', description: '切替の速さに飲み込まれない合図を' },
      { type: 'M-HE', description: '受け×受けの停滞に注意' },
    ],
  },
};

/**
 * タイプの相性データを取得
 */
export function getCompatibilityData(type: DiagnosisType): CompatibilityData {
  return compatibilityData[type];
}
