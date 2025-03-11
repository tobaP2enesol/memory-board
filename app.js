// メインのReactコンポーネント
// 編集ページコンポーネント
const EditMessagesPage = ({ messages, onSaveMessages, onBack }) => {
  const [editedMessages, setEditedMessages] = React.useState([...messages]);
  // 新規メッセージ用の状態
  const [newMessage, setNewMessage] = React.useState({
    name: '',
    group: '部付',
    message: '',
    avatar: 'https://via.placeholder.com/100'
  });

  const handleInputChange = (id, field, value) => {
    setEditedMessages(editedMessages.map(msg => 
      msg.id === id ? { ...msg, [field]: value } : msg
    ));
  };

  // 新規メッセージの入力処理
  const handleNewMessageChange = (field, value) => {
    setNewMessage({
      ...newMessage,
      [field]: value
    });
  };

  // 新規メッセージの追加処理
  const handleAddMessage = () => {
    // 入力チェック
    if (!newMessage.name || !newMessage.message) {
      alert('名前とメッセージを入力してください');
      return;
    }

    // 新しいIDを生成（既存の最大ID + 1）
    const maxId = editedMessages.length > 0 
      ? Math.max(...editedMessages.map(msg => msg.id)) 
      : 0;
    
    // 新しいメッセージを作成
    const messageToAdd = {
      ...newMessage,
      id: maxId + 1
    };

    // メッセージリストに追加
    setEditedMessages([...editedMessages, messageToAdd]);
    
    // 入力フォームをリセット
    setNewMessage({
      name: '',
      group: '部付',
      message: '',
      avatar: 'https://via.placeholder.com/100'
    });
  };

  const handleSave = () => {
    onSaveMessages(editedMessages);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">メッセージ編集</h1>
          <div className="space-x-4">
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              キャンセル
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              保存する
            </button>
          </div>
        </div>

        {/* 新規メッセージ追加フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 border-l-4 border-green-400">
          <h2 className="text-xl font-bold text-gray-900 mb-4">新しいメッセージを追加</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">名前 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={newMessage.name}
                onChange={(e) => handleNewMessageChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="名前を入力"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">グループ</label>
              <select
                value={newMessage.group}
                onChange={(e) => handleNewMessageChange('group', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="部付">部付</option>
                <option value="DX企画G">DX企画G</option>
                <option value="FAシステムG">FAシステムG</option>
                <option value="生産DXG">生産DXG</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
            <textarea
              value={newMessage.message}
              onChange={(e) => handleNewMessageChange('message', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-24"
              placeholder="メッセージを入力"
            />
          </div>
          
          <div className="text-right">
            <button 
              onClick={handleAddMessage}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              メッセージを追加
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">メッセージ一覧</h2>
        {/* 既存メッセージ編集フォーム */}
        {editedMessages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
                <input
                  type="text"
                  value={msg.name}
                  onChange={(e) => handleInputChange(msg.id, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">グループ</label>
                <select
                  value={msg.group}
                  onChange={(e) => handleInputChange(msg.id, 'group', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="部付">部付</option>
                  <option value="DX企画G">DX企画G</option>
                  <option value="FAシステムG">FAシステムG</option>
                  <option value="生産DXG">生産DXG</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
              <textarea
                value={msg.message}
                onChange={(e) => handleInputChange(msg.id, 'message', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// メインコンポーネント
const MemoryBoardWithEdit = () => {
  // 編集機能の有効期限
  const EDIT_ENABLED_UNTIL = new Date('2025-03-27'); // 例：2025年3月27日まで編集可能
  
  // 編集機能の有効・無効を判定
  const isEditingEnabled = () => {
    return new Date() < EDIT_ENABLED_UNTIL;
  };
  
  // ページの状態管理
  const [currentPage, setCurrentPage] = React.useState('main');
  
  // messagesData から初期データを取得
  const [messages, setMessages] = React.useState(messagesData);

  // アクティブなカードの状態管理
  const [activeCard, setActiveCard] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState(null);
  
  // 各カードのホバー効果
  const handleCardHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
  };
  
  // 音声の再生・停止
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };
  
  // 部署ごとにメッセージをグループ化
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.group]) {
      acc[message.group] = [];
    }
    acc[message.group].push(message);
    return acc;
  }, {});

  // メッセージを保存する処理
  const handleSaveMessages = (updatedMessages) => {
    setMessages(updatedMessages);
    // ローカルストレージにも保存しておく
    localStorage.setItem('memoryBoardMessages', JSON.stringify(updatedMessages));
  };

  // 編集ページに切り替える
  const goToEditPage = () => {
    setCurrentPage('edit');
  };

  // メインページに戻る
  const goToMainPage = () => {
    setCurrentPage('main');
  };

  // ローカルストレージからメッセージを読み込む
  React.useEffect(() => {
    const savedMessages = localStorage.getItem('memoryBoardMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 現在のページに応じたコンポーネントをレンダリング
  if (currentPage === 'edit') {
    return <EditMessagesPage 
      messages={messages} 
      onSaveMessages={handleSaveMessages} 
      onBack={goToMainPage} 
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* ヘッダー */}
      <header className="relative text-center mb-12">
        {/* 編集ボタン - 期限内のみ表示 */}
        {isEditingEnabled() && (
          <div className="absolute top-0 right-0">
            <button
              onClick={goToEditPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              編集する
            </button>
          </div>
        )}
        
        <h1 className="text-5xl font-bold mb-2 text-gray-900 tracking-tight">
          思い出のメモリーボード
        </h1>
        <p className="text-xl text-gray-600 font-light">DX推進部 部長への感謝を込めて</p>
        
        {/* 音声再生ボタン */}
        <button 
          onClick={toggleAudio} 
          className="mt-4 flex items-center justify-center mx-auto text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isPlaying ? (
              <>
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <line x1="10" y1="15" x2="10" y2="9"></line>
                <line x1="14" y1="15" x2="14" y2="9"></line>
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </>
            )}
          </svg>
          <span className="ml-2 text-sm">{isPlaying ? 'BGMを停止' : 'BGMを再生'}</span>
        </button>
      </header>
      
      {/* メッセージエリア */}
      <div className="max-w-6xl mx-auto">
        {/* 部署ごとのセクション */}
        {Object.keys(groupedMessages).map(groupName => (
          <div key={groupName} className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-gray-200">{groupName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedMessages[groupName].map(msg => (
                <div 
                  key={msg.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 hover:shadow-xl transition-all duration-300"
                  style={{ 
                    borderLeftColor: groupName === '部付' ? '#3b82f6' : 
                                    groupName === 'DX企画G' ? '#8b5cf6' : 
                                    groupName === 'FAシステムG' ? '#10b981' : 
                                    '#f97316',
                    transform: hoveredCard === msg.id ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === msg.id ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : ''
                  }}
                  onClick={() => setActiveCard(activeCard === msg.id ? null : msg.id)}
                  onMouseEnter={() => handleCardHover(msg.id, true)}
                  onMouseLeave={() => handleCardHover(msg.id, false)}
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      {/* 顔写真 */}
                      <div 
                        className="mr-4 flex-shrink-0 transition-transform duration-300"
                        style={{ transform: hoveredCard === msg.id ? 'scale(1.1)' : 'scale(1)' }}
                      >
                        <img 
                          src={msg.avatar} 
                          alt={msg.name} 
                          className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover shadow-sm"
                        />
                      </div>
                      
                      {/* メッセージ内容 */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{msg.role}</p>
                        <p className="text-gray-800 leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 展開時に表示される思い出の写真 */}
                  {activeCard === msg.id && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700 mb-2">思い出の一コマ: {msg.memory.title}</p>
                      <img 
                        src={msg.memory.image} 
                        alt={msg.memory.title} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* タイムライン */}
      <div className="max-w-4xl mx-auto mt-16 mb-16">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">DX推進部のあゆみと未来</h2>

        <div className="relative ml-4 md:mx-auto">
          {/* 縦線 - 途中まで一本、その後分岐 */}
          <div className="absolute left-8 top-0 h-3/4 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-green-500"></div>
          
          {/* 分岐線 - 生産本部へ（グラデーション） */}
          <div 
            className="absolute left-8 top-3/4 h-1/4 w-1 transform rotate-45 origin-top"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6, rgba(59, 130, 246, 0.1))'
            }}
          ></div>
          
          {/* 分岐線 - VI本部へ（グラデーション） */}
          <div 
            className="absolute left-8 top-3/4 h-1/4 w-1"
            style={{
              background: 'linear-gradient(to bottom, #8b5cf6, rgba(139, 92, 246, 0.1))'
            }}
          ></div>
          
          {/* 分岐線 - 会社直轄本部へ（グラデーション） */}
          <div 
            className="absolute left-8 top-3/4 h-1/4 w-1 transform -rotate-45 origin-top"
            style={{
              background: 'linear-gradient(to bottom, #6366f1, rgba(99, 102, 241, 0.1))'
            }}
          ></div>
          
          {/* タイムラインアイテム */}
          <div className="relative mb-16">
            <div className="absolute left-8 transform -translate-x-1/2 z-10">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-blue-500 shadow-md flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="ml-16 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-400">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">部署立ち上げ</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">2023年4月</span>
              </div>
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://via.placeholder.com/600x300" 
                  alt="部署立ち上げ" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700">DX推進部が発足し、新たな挑戦がスタートしました。</p>
            </div>
          </div>
          
          {/* 分岐後のタイムラインアイテム */}
          <div className="relative mb-8 ml-12">
            <div className="absolute left-8 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rotate-45">
              <div className="w-8 h-8 bg-white rounded-full border-3 border-blue-500 shadow-md flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            
            <div 
              className="ml-16 bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-400"
              style={{
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)'
              }}
            >
              <h3 className="text-lg font-bold text-blue-600">生産本部</h3>
              <p className="text-gray-700 text-sm">製造プロセスのデジタル化を推進します。</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 感謝メッセージ */}
      <div className="text-center mb-16 relative py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl mx-4 md:mx-12 shadow-sm">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-red-100">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <h2 className="text-4xl font-light text-gray-900 tracking-tight mb-3 relative z-10">
          今までありがとうございました
        </h2>
        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto relative z-10">
          部長の温かいリーダーシップのもと、私たちは多くのことを学び、成長することができました。
          この感謝の気持ちをこれからも忘れずに、それぞれの道で活躍していきます。
        </p>
      </div>
      
      {/* 署名 */}
      <div className="text-right max-w-4xl mx-auto mb-12 pr-8">
        <p className="text-gray-700 font-medium">DX推進部一同より</p>
        <p className="text-gray-600 text-sm">2023年4月〜2025年3月</p>
      </div>
      
      {/* 音声再生用 */}
      {isPlaying && (
        <audio 
          autoPlay 
          loop
          src="https://soundbible.com/mp3/Cheerful_Melody-Mike_Koenig-1562070454.mp3"
        />
      )}
    </div>
  );
};

// レンダリング
ReactDOM.render(
  <MemoryBoardWithEdit />,
  document.getElementById('root')
);
