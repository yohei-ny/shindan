// 性別タイプ
export type Gender = 'male' | 'female';

// タイプの向き（S/M/N）
export type Orientation = 'S' | 'M' | 'N';

// 象限（HE/HC/LE/LC）
export type Quadrant = 'HE' | 'HC' | 'LE' | 'LC';

// 診断タイプ (例: S-HE, M-LC, N-HE)
export type DiagnosisType = `${Orientation}-${Quadrant}`;

// スコアタイプ
export interface Scores {
  L: number;   // Libido: 0-16
  E: number;   // Edgy: 1-9
  B: number;   // BDSM: 0-8
  ST: number;  // Stimulation: 1-5
  WA: number;  // Warmth: 1-5
}

// 質問の選択肢
export interface QuestionOption {
  label: string;
  subLabel: string;
  scores: Partial<Scores>;
}

// 質問データ
export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  scoreType: 'single' | 'multiple';
}

// バッジ
export interface Badge {
  icon: string;
  text: string;
  show: boolean;
}

// タイプデータ
export interface TypeData {
  id: DiagnosisType;
  name: string;
  tagline: string;
  description: {
    manifest: string;
    latent: string;
  };
  compatibility?: {
    best: DiagnosisType[];
    good: DiagnosisType[];
    needsWork: DiagnosisType[];
  };
}

// 相性ランク
export type CompatibilityRank = '◎' | '○' | '△' | '▲';

// 相性情報
export interface CompatibilityInfo {
  rank: CompatibilityRank;
  score: number;
  types: DiagnosisType[];
}

// 診断結果
export interface DiagnosisResult {
  type: DiagnosisType;
  scores: Scores;
  badges: Badge[];
  gender: Gender;
  timestamp: number;
}
