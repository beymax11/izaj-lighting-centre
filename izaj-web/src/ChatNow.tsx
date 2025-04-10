import React, { useState, useRef, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import { Icon } from '@iconify/react';

type Message = {
  id: number;
  text: string;
  sender: 'izaj' | 'user';
  timestamp: Date;
};

interface ChatNowProps {
  onClose?: () => void;
}

const ChatNow: React.FC<ChatNowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi there! Got a question?', sender: 'izaj', timestamp: new Date() },
    { id: 2, text: "I'm here to help you with anything you need.", sender: 'izaj', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollButton(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const userMessage: Message = { id: messages.length + 1, text: newMessage, sender: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: 'Thanks for your message! How else can I assist you?',
        sender: 'izaj',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
      setIsTyping(false);
      scrollToBottom();
    }, 1000);
  };

  const formattedTimestamp = (timestamp: Date) =>
    formatDistanceToNowStrict(timestamp, { addSuffix: true });

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center gap-3 sticky top-0 z-10">
        <div className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow">
          IZAJ
        </div>
        <div>
          <h1 className="font-semibold text-white text-base">IZAJ Assistant</h1>
          <p className="text-xs text-blue-100">{isTyping ? 'Typing...' : 'Online - Replies instantly'}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        )}
      </header>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex max-w-[85%] gap-2">
              {msg.sender === 'izaj' && (
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow">
                  IZAJ
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none shadow'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70">{formattedTimestamp(msg.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow">
              IZAJ
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl shadow text-sm text-gray-500 rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-4 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700"
        >
          <Icon icon="mdi:chevron-down" width={20} height={20} />
        </button>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="relative flex items-center">
          <button onClick={() => alert('File Upload')} className="absolute left-3 text-gray-500 hover:text-blue-600">
            <Icon icon="carbon:attachment" width={20} height={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
            placeholder="Type your message..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`absolute right-3 p-1.5 rounded-full ${
              newMessage.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Icon icon="mdi:send" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatNow;