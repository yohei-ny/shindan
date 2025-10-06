# SEXタイプ診断サイト - コード構造ガイド

このドキュメントでは、SEXタイプ診断サイトのコード構造と、自分で編集・カスタマイズする方法を説明します。

## 目次
1. [プロジェクト構造](#プロジェクト構造)
2. [主要ファイルの役割](#主要ファイルの役割)
3. [ページごとの編集方法](#ページごとの編集方法)
4. [スタイル・デザインの変更](#スタイルデザインの変更)
5. [診断ロジックの変更](#診断ロジックの変更)
6. [よくある編集作業](#よくある編集作業)

---

## プロジェクト構造

```
sex-type-diagnosis/
├── app/                      # ページコンポーネント（Next.js App Router）
│   ├── page.tsx             # トップページ（性別選択）
│   ├── quiz/page.tsx        # 質問ページ
│   ├── result/[type]/page.tsx # 結果ページ
│   ├── layout.tsx           # 全体レイアウト
│   └── globals.css          # グローバルスタイル
├── components/              # 再利用可能なコンポーネント
│   └── Header.tsx          # ヘッダーコンポーネント
├── lib/                     # ビジネスロジック
│   ├── types.ts            # 12タイプの説明データ
│   ├── questions.ts        # 質問データ
│   └── diagnosis.ts        # 診断アルゴリズム
├── types/                   # TypeScript型定義
│   └── index.ts
├── public/                  # 静的ファイル
├── docs/                    # ドキュメント
└── package.json            # 依存関係
```

---

## 主要ファイルの役割

### 1. `app/page.tsx` - トップページ
**役割**: 性別選択とスタート画面

**主な要素**:
```tsx
export default function Home() {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  // 診断開始処理
  const handleStart = () => {
    localStorage.setItem('gender', selectedGender);
    router.push('/quiz');
  };

  return (
    // UIコンポーネント
  );
}
```

**編集ポイント**:
- `background`: 背景グラデーション
- `px-5`: 左右のパディング
- `py-4`: 上下のパディング
- `rounded-full`: 角丸の大きさ

### 2. `app/quiz/page.tsx` - 質問ページ
**役割**: 質問を表示し、回答を収集

**主な要素**:
```tsx
export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 回答処理
  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断実行
      const result = calculateDiagnosis(newAnswers, gender);
      router.push(`/result/${result.type}`);
    }
  };
}
```

**編集ポイント**:
- `questions`: 質問データ（`lib/questions.ts`）
- プログレスバーのスタイル
- ボタンのスタイルと配置

### 3. `app/result/[type]/page.tsx` - 結果ページ
**役割**: 診断結果を表示

**主な構造**:
```tsx
export default function ResultPage() {
  const type = params.type as DiagnosisType;
  const typeInfo = getTypeDescription(type);
  const typeColor = getTypeColor(type);

  return (
    <>
      {/* タイプヒーロー */}
      {/* スコアグリッド */}
      {/* 詳細カード */}
      {/* シェアボタン */}
      {/* アクションボタン */}
    </>
  );
}
```

### 4. `lib/types.ts` - タイプ説明データ
**役割**: 12タイプの名前・説明を定義

```tsx
export const typeData: Record<DiagnosisType, TypeData> = {
  'S-HE': {
    id: 'S-HE',
    name: '快感の演出家',
    tagline: '段取りを引き、合図や強弱を滑らかに切り替える主導型',
    description: {
      manifest: '顕在的な特徴の説明...',
      latent: '潜在的な特徴の説明...'
    }
  },
  // ... 他の11タイプ
};
```

### 5. `lib/questions.ts` - 質問データ
**役割**: 質問文と重み付けを定義

```tsx
export const questions: Question[] = [
  {
    id: 1,
    text: "性的な関わりの頻度について、あなたの理想に近いのは？",
    options: [
      { text: "週に複数回", value: 0, weights: { L: 4 } },
      { text: "週に1回程度", value: 1, weights: { L: 2 } },
      // ...
    ]
  },
  // ... 他の9問
];
```

### 6. `lib/diagnosis.ts` - 診断アルゴリズム
**役割**: 回答からタイプを判定

```tsx
export function calculateDiagnosis(
  answers: number[],
  gender: Gender
): DiagnosisResult {
  // スコア計算
  const scores = calculateScores(answers);

  // タイプ判定
  const type = determineType(scores);

  // バッジ判定
  const badges = determineBadges(scores);

  return { type, scores, badges };
}
```

---

## ページごとの編集方法

### トップページの編集

#### 背景色を変更する
```tsx
// app/page.tsx
<div className="min-h-screen" style={{
  background: 'linear-gradient(135deg, #fff5f8 0%, #ffe9f0 100%)',
  // ↑ この部分を変更
}}>
```

#### ボタンの色を変更する
```tsx
<button
  style={{
    background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
    // ↑ この部分を変更
  }}
>
```

#### 余白を調整する
```tsx
// パディング（内側の余白）
className="p-8"      // 全方向8
className="px-5"     // 左右5
className="py-4"     // 上下4

// マージン（外側の余白）
className="mb-6"     // 下に6
className="mt-4"     // 上に4
```

### 質問ページの編集

#### 質問文を変更する
```tsx
// lib/questions.ts
export const questions: Question[] = [
  {
    id: 1,
    text: "ここに質問文を入力",  // ← 変更
    options: [
      { text: "選択肢1", value: 0, weights: { L: 4 } },
      // ...
    ]
  },
];
```

#### プログレスバーの色を変更する
```tsx
// app/quiz/page.tsx
<div style={{
  background: 'linear-gradient(90deg, #ff6b9d 0%, #ff8fab 100%)',
  // ↑ この部分を変更
}}>
```

### 結果ページの編集

#### タイプ説明を変更する
```tsx
// lib/types.ts
'S-HE': {
  name: '快感の演出家',          // タイプ名
  tagline: 'キャッチフレーズ',   // サブタイトル
  description: {
    manifest: '顕在的な特徴の説明...',
    latent: '潜在的な特徴の説明...'
  }
}
```

#### タイプの色を変更する
```tsx
// app/result/[type]/page.tsx
function getTypeColor(type: DiagnosisType): string {
  const colors: Record<string, string> = {
    'S-HE': '#e74c3c',  // ← この色を変更
    'S-HC': '#e67e22',
    // ...
  };
}
```

#### スコアカードの余白を調整する
```tsx
// app/result/[type]/page.tsx
<div className="grid grid-cols-5 gap-5"
     style={{ margin: '5px 5px 15px 5px' }}>
  // ↑ この margin を変更
</div>
```

#### 文章の余白を調整する
```tsx
<div className="px-4 lg:px-6 py-2">
  // px-4: 左右のパディング（小画面）
  // lg:px-6: 左右のパディング（大画面）
  // py-2: 上下のパディング
</div>
```

---

## スタイル・デザインの変更

### Tailwind CSSのクラス名

#### 余白系
```
p-4      : padding 全方向 1rem (16px)
px-4     : padding 左右 1rem
py-4     : padding 上下 1rem
m-4      : margin 全方向 1rem
mb-4     : margin 下 1rem
gap-4    : grid/flexのアイテム間隔
```

#### サイズ系
```
w-full   : width 100%
h-16     : height 4rem (64px)
max-w-3xl: max-width 48rem
text-xl  : font-size 1.25rem
text-base: font-size 1rem
```

#### 角丸系
```
rounded-xl    : border-radius 0.75rem (12px)
rounded-2xl   : border-radius 1rem (16px)
rounded-full  : border-radius 9999px (完全な円)
```

#### 色・透明度系
```
bg-white      : background-color white
opacity-90    : opacity 0.9
shadow-lg     : box-shadow (大)
```

### インラインスタイル

```tsx
<div style={{
  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  border: '2px solid #e74c3c',
  color: '#333',
  fontSize: '16px',
  lineHeight: '2.2',
  letterSpacing: '0.03em',
  margin: '15px 5px',
  padding: '10px 20px'
}}>
```

### レスポンシブデザイン

```tsx
// 画面サイズに応じて変更
className="text-base lg:text-xl"
// ↑ 通常: text-base (1rem)
//    大画面: text-xl (1.25rem)

className="p-4 lg:p-8"
// ↑ 通常: padding 1rem
//    大画面: padding 2rem
```

プレフィックス:
- なし: すべての画面サイズ
- `sm:`: 640px以上
- `lg:`: 1024px以上

---

## 診断ロジックの変更

### スコア指標の調整

```tsx
// lib/diagnosis.ts
const scores: Scores = {
  L: 0,   // 性欲（最大16）
  E: 0,   // 新奇性（最大9）
  B: 0,   // BDSM（最大8）
  ST: 0,  // 刺激（最大5）
  WA: 0   // 温もり（最大5）
};
```

### 質問の重み付け変更

```tsx
// lib/questions.ts
{
  text: "選択肢1",
  value: 0,
  weights: {
    L: 4,   // Lスコアに4ポイント加算
    E: 2    // Eスコアに2ポイント加算
  }
}
```

### タイプ判定ロジックの変更

```tsx
// lib/diagnosis.ts
function determineType(scores: Scores): DiagnosisType {
  // S/M/N の判定（主導性）
  const dominance = scores.L >= 12 ? 'S'
                  : scores.L <= 7 ? 'M'
                  : 'N';

  // HE/HC/LE/LC の判定（頻度×新奇性）
  const frequency = scores.L >= 12 ? 'H' : 'L';
  const novelty = scores.E >= 5 ? 'E' : 'C';

  return `${dominance}-${frequency}${novelty}` as DiagnosisType;
}
```

---

## よくある編集作業

### 1. 色を統一的に変更する

#### 全体のテーマカラーを変更
```tsx
// app/globals.css
:root {
  --primary-color: #ff6b9d;  // ピンク
  --secondary-color: #ff8fab;
}

// 使用例
style={{ color: 'var(--primary-color)' }}
```

### 2. 余白を全体的に調整する

#### 各セクションの余白
```tsx
// 結果ページの各セクション
<motion.div className="my-16">  // 上下の余白
<motion.div className="mb-12">  // 下の余白
<motion.div style={{ margin: '15px 5px' }}>  // カスタム余白
```

### 3. フォントサイズを調整する

```tsx
// 見出し
className="text-3xl lg:text-4xl"  // 大きく
className="text-xl lg:text-2xl"   // 中
className="text-base lg:text-lg"  // 通常

// 本文
style={{ fontSize: '16px' }}       // 固定サイズ
style={{ lineHeight: '2.2' }}      // 行間
```

### 4. アニメーションの速度を変更する

```tsx
// Framer Motionのアニメーション
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.3,      // 開始遅延
    duration: 0.5    // アニメーション時間
  }}
>
```

### 5. シェアボタンのカスタマイズ

```tsx
// app/result/[type]/page.tsx
const handleShare = (platform: 'twitter' | 'line') => {
  const url = window.location.href;
  const text = `私は「${typeInfo.name}」でした！`;  // ← シェア文言

  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  }
};
```

---

## 開発コマンド

### ローカル開発サーバーの起動
```bash
npm run dev
```
→ http://localhost:3000 でアクセス

### ビルド（本番用）
```bash
npm run build
```

### コードの整形
```bash
npm run lint
```

### Git操作
```bash
# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# プッシュ
git push
```

---

## トラブルシューティング

### 変更が反映されない
1. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）
2. 開発サーバーを再起動（Ctrl+C → `npm run dev`）

### エラーが出た場合
1. コンソール（F12）でエラーメッセージを確認
2. 構文エラー（`,` や `}` の不足）をチェック
3. ファイルを保存したか確認

### レイアウトが崩れた
1. クラス名のスペルミスを確認
2. 閉じタグ（`</div>`）の不足をチェック
3. インラインスタイルの構文を確認

---

## 参考リンク

- **Next.js公式ドキュメント**: https://nextjs.org/docs
- **Tailwind CSS公式**: https://tailwindcss.com/docs
- **Framer Motion公式**: https://www.framer.com/motion/
- **TypeScript公式**: https://www.typescriptlang.org/docs/

---

## まとめ

### 編集の基本フロー
1. **ファイルを特定**: 変更したい部分がどのファイルにあるか確認
2. **該当箇所を編集**: クラス名やスタイルを変更
3. **保存して確認**: ブラウザで変更を確認
4. **コミット&プッシュ**: Gitで変更を保存

### よく編集するファイル
- **色・デザイン**: 各ページの`.tsx`ファイル
- **文章**: `lib/types.ts`, `lib/questions.ts`
- **診断ロジック**: `lib/diagnosis.ts`
- **全体スタイル**: `app/globals.css`

このガイドを参考に、自由にカスタマイズしてください！
