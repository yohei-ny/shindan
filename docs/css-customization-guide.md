# CSS調整ガイド

このプロジェクトでCSSを調整する方法を説明します。

## 3つのスタイル調整方法

### 1. **グローバルCSS** (`app/globals.css`)
全ページ共通のスタイルを定義する場所

**場所**: `/app/globals.css`

**使用例:**
```css
/* カスタム余白クラス */
.yohaku {
  margin: 20px 10px !important;
}

/* カスタムカードスタイル */
.my-card {
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: white;
}

/* ホバーエフェクト */
.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
```

**TSXでの使用:**
```tsx
<div className="yohaku my-card hover-scale">
  コンテンツ
</div>
```

---

### 2. **インラインスタイル** (各`.tsx`ファイル内)
特定の要素だけにスタイルを適用

**使用例:**
```tsx
<div style={{
  margin: '20px 10px',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  border: '2px solid #e0e0e0'
}}>
  コンテンツ
</div>
```

**メリット:**
- その場ですぐに適用できる
- 動的な値（変数）を使える

**デメリット:**
- 再利用しにくい
- コードが長くなりがち

---

### 3. **Tailwind CSSクラス** (各`.tsx`ファイル内)
事前定義されたユーティリティクラスを使用

**使用例:**
```tsx
<div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg">
  コンテンツ
</div>
```

**よく使うクラス:**
```
// 余白
p-4       : padding 全方向 1rem
px-4      : padding 左右 1rem
py-4      : padding 上下 1rem
m-4       : margin 全方向 1rem
mb-4      : margin 下 1rem

// サイズ
w-full    : width 100%
h-16      : height 4rem
max-w-3xl : max-width 48rem

// 色
bg-white  : 背景白
text-gray-800 : テキスト色

// 角丸
rounded-xl    : border-radius 0.75rem
rounded-2xl   : border-radius 1rem
rounded-full  : border-radius 9999px

// シャドウ
shadow-sm : 小さい影
shadow-lg : 大きい影
```

---

## 実際の編集例

### 例1: カスタムクラスを作成して使う

**1. `app/globals.css` に追加:**
```css
.detail-card {
  margin: 20px 10px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.detail-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

**2. TSXで使用:**
```tsx
<div className="detail-card">
  <h2>タイトル</h2>
  <p>本文</p>
</div>
```

---

### 例2: CSS変数を使う

**1. `app/globals.css` で変数を定義:**
```css
:root {
  --card-spacing: 20px 10px;
  --card-padding: 30px;
  --card-border-radius: 16px;
  --card-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
```

**2. CSSクラスで使用:**
```css
.my-card {
  margin: var(--card-spacing);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
}
```

**3. インラインスタイルでも使える:**
```tsx
<div style={{
  margin: 'var(--card-spacing)',
  padding: 'var(--card-padding)'
}}>
```

---

### 例3: レスポンシブなカスタムクラス

```css
/* モバイル（デフォルト） */
.responsive-card {
  padding: 15px;
  margin: 10px 5px;
  font-size: 14px;
}

/* タブレット以上（768px以上） */
@media (min-width: 768px) {
  .responsive-card {
    padding: 20px;
    margin: 15px 10px;
    font-size: 16px;
  }
}

/* PC（1024px以上） */
@media (min-width: 1024px) {
  .responsive-card {
    padding: 30px;
    margin: 20px 15px;
    font-size: 18px;
  }
}
```

---

## どの方法を使うべきか？

### グローバルCSS (`globals.css`) を使うべき場合
✅ 複数の場所で同じスタイルを使う
✅ アニメーションを定義したい
✅ プロジェクト全体のテーマカラーを管理
✅ カスタムクラスを作りたい

**例:**
- `.yohaku` - 余白の統一
- `.card-hover` - カード共通のホバーエフェクト
- CSS変数（`:root`）でのカラー管理

---

### インラインスタイルを使うべき場合
✅ その要素だけの特別なスタイル
✅ JavaScriptの変数を使いたい
✅ 動的に色や値を変更したい

**例:**
```tsx
// タイプカラーを動的に使用
style={{ border: `2px solid ${typeColor}20` }}

// 計算した値を使用
style={{ width: `${(score / max) * 100}%` }}
```

---

### Tailwind CSSを使うべき場合
✅ よくある一般的なスタイル
✅ レスポンシブデザイン（`lg:`など）
✅ 素早く実装したい

**例:**
```tsx
className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg"
```

---

## 現在のプロジェクトでの使い分け

### 詳細カードの例

**現在のコード:**
```tsx
<div className="bg-white rounded-2xl p-8 lg:p-10 relative overflow-hidden yohaku"
     style={{
       boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
       border: `2px solid ${typeColor}20`
     }}>
```

**内訳:**
- `bg-white rounded-2xl p-8 lg:p-10 relative overflow-hidden` → **Tailwind CSS**（一般的なスタイル）
- `yohaku` → **カスタムクラス**（`globals.css`で定義、`margin: 20px 10px`）
- `style={{...}}` → **インラインスタイル**（動的な値を使用）

---

## よくある質問

### Q1: クラス名と `style={{}}` を両方使える？
**A:** はい、併用可能です。

```tsx
<div className="bg-white rounded-xl" style={{ margin: '20px 10px' }}>
```

### Q2: `!important` はいつ使う？
**A:** 他のスタイルを確実に上書きしたいとき。

```css
.yohaku {
  margin: 20px 10px !important;  /* 他のmarginを上書き */
}
```

### Q3: CSS変数の利点は？
**A:** 一箇所で変更すれば全体に反映される。

```css
:root {
  --primary-color: #ff6b9d;
}

/* これを変更すれば、使っている全ての箇所が変わる */
```

---

## トラブルシューティング

### スタイルが適用されない
1. **ファイルを保存したか確認**
2. **ブラウザのキャッシュをクリア**（Ctrl+Shift+R / Cmd+Shift+R）
3. **クラス名のスペルミス確認**
4. **開発サーバーを再起動**（Ctrl+C → `npm run dev`）

### スタイルが上書きされる
1. **詳細度を確認**（より具体的なセレクタが優先）
2. **`!important`を使う**（最終手段）
3. **インラインスタイルを使う**（最も優先度が高い）

---

## 実践例：余白を統一する

### Before（バラバラ）
```tsx
// ファイルA
<div style={{ margin: '20px 10px' }}>

// ファイルB
<div style={{ margin: '20px 10px' }}>

// ファイルC
<div style={{ margin: '20px 10px' }}>
```

### After（統一）

**1. `app/globals.css` に追加:**
```css
.card-spacing {
  margin: 20px 10px;
}
```

**2. 全ファイルで使用:**
```tsx
// ファイルA, B, C
<div className="card-spacing">
```

**3. 変更が簡単:**
```css
/* globals.cssで一箇所変更すればOK */
.card-spacing {
  margin: 30px 15px;  /* 全ファイルに反映 */
}
```

---

## まとめ

| 方法 | 場所 | 用途 | メリット | デメリット |
|------|------|------|----------|------------|
| グローバルCSS | `app/globals.css` | 共通スタイル | 再利用可能、一括管理 | ファイルが増える |
| インラインスタイル | `.tsx`ファイル | 個別・動的 | 柔軟、動的値OK | 再利用しにくい |
| Tailwind CSS | `.tsx`ファイル | 一般的なスタイル | 素早い、レスポンシブ | カスタマイズ制限 |

**おすすめの使い分け:**
1. **共通のスタイル** → グローバルCSS
2. **動的な値を使う** → インラインスタイル
3. **素早く実装** → Tailwind CSS

このガイドを参考に、効率的にスタイルを調整してください！
