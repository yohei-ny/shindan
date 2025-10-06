import { Question } from '@/types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'あなたの性欲の強さはどれくらいですか？',
    scoreType: 'single',
    options: [
      {
        label: 'とても強い',
        subLabel: '頻繁に性的な欲求を感じる',
        scores: { L: 4 }
      },
      {
        label: 'やや強い',
        subLabel: '定期的に性的な欲求を感じる',
        scores: { L: 3 }
      },
      {
        label: 'ふつう',
        subLabel: 'バランスが取れている',
        scores: { L: 2 }
      },
      {
        label: 'やや弱い',
        subLabel: 'たまに性的な欲求を感じる',
        scores: { L: 1 }
      },
      {
        label: '弱い',
        subLabel: 'あまり性的な欲求を感じない',
        scores: { L: 0 }
      }
    ]
  },
  {
    id: 2,
    text: '新しい体験や刺激的なプレイに対してどう感じますか？',
    scoreType: 'single',
    options: [
      {
        label: '積極的に試したい',
        subLabel: '新しいことに興味津々',
        scores: { E: 3 }
      },
      {
        label: 'やや興味がある',
        subLabel: '機会があれば試してみたい',
        scores: { E: 2 }
      },
      {
        label: 'どちらでもない',
        subLabel: '相手次第',
        scores: { E: 1 }
      },
      {
        label: 'あまり興味がない',
        subLabel: '慣れたことが好き',
        scores: { E: 0 }
      },
      {
        label: '全く興味がない',
        subLabel: '安定を求める',
        scores: { E: 0 }
      }
    ]
  },
  {
    id: 3,
    text: '性行為の頻度について、あなたの理想は？',
    scoreType: 'single',
    options: [
      {
        label: 'できるだけ頻繁に',
        subLabel: '週に3回以上が理想',
        scores: { L: 4 }
      },
      {
        label: '週に2-3回',
        subLabel: '定期的に楽しみたい',
        scores: { L: 3 }
      },
      {
        label: '週に1回',
        subLabel: 'バランス重視',
        scores: { L: 2 }
      },
      {
        label: '月に2-3回',
        subLabel: 'たまに楽しめればいい',
        scores: { L: 1 }
      },
      {
        label: '月に1回以下',
        subLabel: 'あまり必要性を感じない',
        scores: { L: 0 }
      }
    ]
  },
  {
    id: 4,
    text: '主導権について、あなたはどちらのタイプですか？',
    scoreType: 'single',
    options: [
      {
        label: '完全にリードしたい',
        subLabel: '自分が主導権を握りたい',
        scores: { B: 3, ST: 1 }
      },
      {
        label: 'ややリードしたい',
        subLabel: '基本的には主導したい',
        scores: { B: 2, ST: 1 }
      },
      {
        label: 'どちらでもいい',
        subLabel: '状況に応じて柔軟に',
        scores: { B: 0 }
      },
      {
        label: 'やや任せたい',
        subLabel: '基本的には任せたい',
        scores: { B: -2, WA: 1 }
      },
      {
        label: '完全に任せたい',
        subLabel: 'リードしてほしい',
        scores: { B: -3, WA: 1 }
      }
    ]
  },
  {
    id: 5,
    text: '行為中の雰囲気について、どちらが好みですか？',
    scoreType: 'single',
    options: [
      {
        label: '激しく情熱的に',
        subLabel: '刺激的な雰囲気が好き',
        scores: { E: 2, ST: 1 }
      },
      {
        label: 'やや情熱的に',
        subLabel: 'ある程度の刺激は欲しい',
        scores: { E: 1, ST: 1 }
      },
      {
        label: 'バランス良く',
        subLabel: '時と場合による',
        scores: { E: 1 }
      },
      {
        label: 'やや優しく',
        subLabel: '穏やかな雰囲気が好き',
        scores: { E: 0, WA: 1 }
      },
      {
        label: '優しく穏やかに',
        subLabel: 'ゆったりとした雰囲気が好き',
        scores: { E: 0, WA: 1 }
      }
    ]
  },
  {
    id: 6,
    text: '拘束や支配といった要素に興味はありますか？',
    scoreType: 'single',
    options: [
      {
        label: '強く興味がある',
        subLabel: '積極的に取り入れたい',
        scores: { B: 3, E: 2 }
      },
      {
        label: 'やや興味がある',
        subLabel: '試してみたい気持ちはある',
        scores: { B: 2, E: 1 }
      },
      {
        label: 'どちらでもない',
        subLabel: '特に考えたことがない',
        scores: { B: 0 }
      },
      {
        label: 'あまり興味がない',
        subLabel: '必要性を感じない',
        scores: { B: -1 }
      },
      {
        label: '全く興味がない',
        subLabel: 'そういうのは苦手',
        scores: { B: -2 }
      }
    ]
  },
  {
    id: 7,
    text: '行為において何を最も重視しますか？',
    scoreType: 'single',
    options: [
      {
        label: '肉体的な快感',
        subLabel: '気持ち良さを最優先',
        scores: { ST: 1, L: 1 }
      },
      {
        label: '精神的な繋がり',
        subLabel: '心の交流を大切にしたい',
        scores: { WA: 1 }
      },
      {
        label: '新しい体験',
        subLabel: 'いつもと違うことを楽しみたい',
        scores: { E: 2 }
      },
      {
        label: '相手の喜び',
        subLabel: 'パートナーの満足が一番',
        scores: { WA: 1 }
      },
      {
        label: 'バランス',
        subLabel: 'すべてが調和していることが大切',
        scores: { L: 1 }
      }
    ]
  },
  {
    id: 8,
    text: 'おもちゃやアイテムの使用についてどう思いますか？',
    scoreType: 'single',
    options: [
      {
        label: '積極的に使いたい',
        subLabel: '色々試してみたい',
        scores: { E: 2, L: 1 }
      },
      {
        label: 'やや使ってみたい',
        subLabel: '興味はある',
        scores: { E: 1 }
      },
      {
        label: 'どちらでもない',
        subLabel: '相手次第',
        scores: { }
      },
      {
        label: 'あまり使いたくない',
        subLabel: 'なくても十分',
        scores: { E: -1 }
      },
      {
        label: '使いたくない',
        subLabel: '自然な方が好き',
        scores: { E: -1 }
      }
    ]
  },
  {
    id: 9,
    text: 'スキンシップやアフターケアについて',
    scoreType: 'single',
    options: [
      {
        label: 'とても重要',
        subLabel: '行為の前後も大切にしたい',
        scores: { WA: 1, L: 1 }
      },
      {
        label: 'やや重要',
        subLabel: 'できればしたい',
        scores: { WA: 1 }
      },
      {
        label: 'どちらでもない',
        subLabel: '特にこだわりはない',
        scores: { }
      },
      {
        label: 'あまり重要でない',
        subLabel: '行為そのものに集中したい',
        scores: { ST: 1 }
      },
      {
        label: '重要でない',
        subLabel: '必要性を感じない',
        scores: { ST: 1 }
      }
    ]
  },
  {
    id: 10,
    text: '場所や状況の変化について',
    scoreType: 'single',
    options: [
      {
        label: '色々な場所で試したい',
        subLabel: 'いつもと違う場所に興奮する',
        scores: { E: 2, L: 1 }
      },
      {
        label: 'たまには変えたい',
        subLabel: 'マンネリは避けたい',
        scores: { E: 1 }
      },
      {
        label: 'どちらでもない',
        subLabel: '特にこだわらない',
        scores: { }
      },
      {
        label: 'いつもの場所がいい',
        subLabel: '安心できる場所が好き',
        scores: { WA: 1 }
      },
      {
        label: '絶対にいつもの場所',
        subLabel: '変化は苦手',
        scores: { WA: 1, E: -1 }
      }
    ]
  }
];
