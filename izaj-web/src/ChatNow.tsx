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
    {
      id: 1,
      text: 'Hi there! Got a question?',
      sender: 'izaj',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "I'm here to help you with anything you need.",
      sender: 'izaj',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    setIsTyping(true);

    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: 'Thanks for your message! How else can I assist you?',
        sender: 'izaj',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' && !e.shiftKey) || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    alert('File upload triggered');
  };

  const formattedTimestamp = (timestamp: Date) =>
    formatDistanceToNowStrict(timestamp, { addSuffix: true });

  return (
    <div className="flex flex-col h-96 max-h-screen bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Close button */}
      {onClose && (
        <button 
          onClick={() => onClose()}
          className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close chat"
        >
          <Icon icon="mdi:close" width={24} height={24} />
        </button>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-blue-600 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shadow-sm">
            IZAJ
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">IZAJ Assistant</h1>
            <p className="text-xs text-blue-100">Online - Typically replies instantly</p>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}
            >
              {message.sender === 'izaj' && (
                <div className="bg-white text-blue-600 rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs shadow-sm">
                  IZAJ
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-3 text-sm ${message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="leading-snug">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {formattedTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-2">
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs shadow-sm">
              IZAJ
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-sm text-gray-500">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="relative flex items-center">
          <button
            onClick={handleFileUpload}
            className="absolute left-2 rounded-full p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            <Icon icon="carbon:attachment" width={20} height={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`absolute right-2 rounded-full p-2 focus:outline-none transition-colors ${
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