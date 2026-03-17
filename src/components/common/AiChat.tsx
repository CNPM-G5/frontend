// src/components/common/AiChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { aiApi } from '../../api/aiApi';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface AiChatProps {
  lessonId: number | string;
  courseId?: number;
}

const AiChat: React.FC<AiChatProps> = ({ lessonId, courseId }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Chào bạn! Mình là trợ lý AI. Bạn có câu hỏi nào về bài học này không?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDegraded, setIsDegraded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộl xuống cuối khi có tin nhắn mới (nhưng không lần đầu load)
  useEffect(() => {
    if (messages.length > 1) {  // Chỉ cuộl khi có tin nhắn thực tế, bỏ qua initial message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setIsDegraded(false);

    try {
      const response = await aiApi.chatWithAiApi(userMsg.text, lessonId, courseId);

      // Nếu backend báo AI lỗi và trả về câu trả lời dự phòng
      if (response.degraded) {
        setIsDegraded(true);
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.reply || response.message || 'Xin lỗi, tôi không thể trả lời lúc này.'
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Lỗi khi gọi AI:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Đã có lỗi kết nối đến máy chủ AI. Vui lòng thử lại sau.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý Enter để gửi, Shift + Enter để xuống dòng
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Ngăn việc tự động xuống dòng
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto border rounded-xl bg-background-sidebar border-primary/20 shadow-neon overflow-hidden mt-8">
      {/* Header của khung Chat */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-background-dark">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 text-xl border rounded-full bg-primary/20 border-primary">🤖</span>
          <h3 className="font-bold text-text-light">Trợ lý AI Bài học</h3>
        </div>

        {/* Badge Degraded Mode hiển thị khi AI gặp lỗi */}
        {isDegraded && (
          <span className="px-3 py-1 text-xs font-bold text-yellow-500 border rounded-full bg-yellow-500/10 border-yellow-500/30 animate-pulse">
            ⚠️ Degraded Mode (Hệ thống bận)
          </span>
        )}
      </div>

      {/* Khu vực hiển thị tin nhắn (Messages List) */}
      <div className="flex flex-col p-6 space-y-4 overflow-y-auto h-80 bg-background-dark/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl whitespace-pre-wrap ${msg.sender === 'user'
                  ? 'bg-gradient-primary text-white rounded-tr-sm shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                  : 'bg-background-card text-text-light border border-primary/20 rounded-tl-sm'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-5 py-4 border rounded-2xl bg-background-card text-text-muted border-primary/20 rounded-tl-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></span>
              <span className="ml-2 text-sm italic">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Khu vực nhập tin nhắn (Input) */}
      <div className="p-4 border-t border-primary/20 bg-background-card flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi... (Enter để gửi, Shift+Enter để xuống dòng)"
          className="flex-grow w-full p-3 bg-transparent border rounded-lg outline-none resize-none min-h-[50px] max-h-[120px] text-text-light border-primary/40 focus:border-primary focus:shadow-neon transition-all"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mb-1"
        >
          Gửi ↗
        </button>
      </div>
    </div>
  );
};

export default AiChat;