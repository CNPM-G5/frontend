import { useState, useRef, useEffect } from 'react';
import { chatWithAiApi } from '../../api/aiApi';

const AiChat = ({ lessonId, courseId }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Xin chào! Tôi là trợ lý AI. Hỏi tôi bất cứ điều gì về bài học này nhé 🤖', degraded: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const data = await chatWithAiApi(text, lessonId, courseId);
      setMessages(prev => [...prev, { role: 'ai', text: data.message, degraded: data.degraded }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.',
        degraded: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mt-10 border rounded-xl border-primary/20 bg-background-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-primary/20 bg-background-sidebar">
        <span className="text-xl">🤖</span>
        <span className="font-bold text-text-light">Trợ lý AI</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-5 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-br-sm'
                : 'bg-background-sidebar text-text-light border border-primary/20 rounded-bl-sm'
            }`}>
              {msg.text}
              {msg.degraded && (
                <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full">
                  Degraded mode
                </span>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl rounded-bl-sm bg-background-sidebar border border-primary/20 text-text-muted text-sm italic">
              Đang suy nghĩ...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 px-4 py-3 border-t border-primary/20">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi... (Enter gửi, Shift+Enter xuống dòng)"
          rows={1}
          className="flex-1 resize-none bg-background-dark border border-primary/20 rounded-lg px-3 py-2 text-sm text-text-light placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
          style={{ maxHeight: '120px' }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-lg bg-gradient-primary text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-neon transition-all"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default AiChat;
