// messages.js からデータを読み込む
import { messagesData } from './messages.js';

// React コンポーネント
const MemoryBoardWithEdit = () => {
  // 初期データとして messagesData を使用
  const [messages, setMessages] = useState(messagesData);
  
  // 残りのコード（省略）
}

// HTML の <div id="root"></div> にアプリを表示
ReactDOM.render(<MemoryBoardWithEdit />, document.getElementById('root'));
