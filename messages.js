// メッセージデータを定義
const messagesData = [
  // 部付メンバーのメッセージ
  { 
    id: 1, 
    name: '山田 太郎', 
    role: 'エンジニア',
    group: '部付',
    message: 'いつも的確なアドバイスをありがとうございました。部長のおかげで新しい技術への挑戦が楽しめました！', 
    avatar: 'https://via.placeholder.com/100',
    memory: { title: 'プロジェクトAの打ち上げ', image: 'https://via.placeholder.com/150x100' } 
  },
  
  // DX企画Gメンバーのメッセージ
  { 
    id: 2, 
    name: '佐藤 花子', 
    role: 'UXデザイナー',
    group: 'DX企画G',
    message: '部長の温かいリーダーシップがなければ、あのプロジェクトは成功しなかったと思います。本当に感謝しています。', 
    avatar: 'https://via.placeholder.com/100',
    memory: { title: 'デザイン合宿での一コマ', image: 'https://via.placeholder.com/150x100' }
  },
  { 
    id: 3, 
    name: '鈴木 一郎', 
    role: 'プロダクトマネージャー',
    group: 'DX企画G',
    message: '部長との対話から学んだことは私の財産です。これからもその教えを活かしていきます！', 
    avatar: 'https://via.placeholder.com/100',
    memory: { title: '初めての顧客プレゼン', image: 'https://via.placeholder.com/150x100' }
  }
  // 必要に応じて他のメッセージを追加
];