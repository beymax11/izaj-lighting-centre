import React, { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import useChat, { Chat, Message } from './hooks/useChat';
import ChatList from './components/chat/ChatList';
import MessageList from './components/chat/MessageList';
import Composer from './components/chat/Composer';

// Types moved to hook

interface ChatNowProps {
  onClose?: () => void;
}

// Mock data
const mockChats: Chat[] = [
  {
    id: 1,
    itemName: "Aberdeen Chandelier",
    itemImage: "aber.webp",
    lastMessage: "Hi there! Got a question?",
    lastDate: new Date().toISOString(),
    unread: 1,
    pinned: true,
  },
  {
    id: 2,
    itemName: "Floor Lamp",
    itemImage: "floor.jpg",
    lastMessage: "Can I get a discount?",
    lastDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    unread: 0,
    archived: false,
  },
];

const mockMessages: Message[] = [
  { id: 1, chatId: 1, text: "Hi there! Got a question?", sender: 'izaj', timestamp: new Date() },
  { id: 2, chatId: 1, text: "I'm here to help you with anything you need.", sender: 'izaj', timestamp: new Date() },
  { id: 3, chatId: 2, text: "Can I get a discount?", sender: 'user', timestamp: new Date(Date.now() - 86400000 * 2) },
  { id: 4, chatId: 2, text: "I'll check for you!", sender: 'izaj', timestamp: new Date(Date.now() - 86400000 * 2) },
];

const ChatNow: React.FC<ChatNowProps> = ({ onClose }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const {
    chats,
    messages,
    selectedChatId,
    search,
    inputValue,
    sortedChats,
    conversation,
    isArchivedSelected,
    setSelectedChatId,
    setSearch,
    setInputValue,
    sendMessage,
    unarchive,
    togglePin,
    removeChat,
    getChatById,
    formatMsgTimestamp,
    formatListTime,
    getImagePath,
  } = useChat(mockChats, mockMessages);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedChatId]);
  // Add chat (demo) and image path handled in hook

  return (
    <div className="fixed inset-0 z-50 flex flex-col min-h-0 items-center justify-center p-2 bg-black/30 backdrop-blur-sm" onClick={() => onClose && onClose()}>
      <div
        className="flex h-[90vh] w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        style={{ height: '90vh', minHeight: 540, maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left: Chat list */}
        <div className="w-1/3 min-w-[260px] max-w-[350px] border-r bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col relative">
          <div className="flex items-center p-4 border-b bg-white sticky top-0 z-10 gap-2">
            <span className="text-2xl font-extrabold text-black tracking-tight">IZAJ Assistant</span>
            <span className="ml-2 text-black text-base font-semibold bg-white/30 rounded px-2">{chats.filter(c => !c.archived).length}</span>
          </div>
          <div className="p-2 flex gap-2 items-center bg-white sticky top-[64px] z-10">
            <input
              className="w-full px-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200 transition"
              placeholder="Search item or chat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <ChatList
            chats={sortedChats}
            selectedChatId={selectedChatId}
            onSelect={setSelectedChatId}
            formatListTime={formatListTime}
            onPin={togglePin}
            onDelete={removeChat}
            onUnarchive={unarchive}
            getImagePath={getImagePath}
          />
        </div>
        {/* Right: Conversation */}
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-white to-yellow-50 relative">
          {!selectedChatId ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <Icon icon="mdi:chat-outline" className="text-yellow-200" width={80} height={80} />
              <div className="font-extrabold text-2xl mt-6 mb-2 text-yellow-600">Welcome to ChatNow</div>
              <div className="text-gray-500 mb-10">Start responding to your buyers now!</div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center p-4 border-b gap-3 bg-white sticky top-0 z-10 shadow-sm">
                <img src={getImagePath(getChatById(selectedChatId)?.itemImage || '')} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                <span className="font-bold text-black text-lg">
                  {getChatById(selectedChatId)?.itemName}
                </span>
                {getChatById(selectedChatId)?.archived && (
                  <span className="ml-2 px-2 py-1 text-xs bg-red-100 rounded text-red-500 font-bold">ARCHIVED</span>
                )}
                <button
                  className="ml-auto text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded p-1 transition"
                  onClick={onClose}
                >
                  <Icon icon="mdi:close" width={20} height={20} />
                </button>
              </div>
              {/* Messages */}
              <div
                ref={conversationRef}
                className="flex-1 min-h-0 overflow-y-auto px-4 py-2 bg-gradient-to-b from-yellow-50/40 to-white scrollbar-thin"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#fbbf24 #f3f4f6',
                  msOverflowStyle: 'auto'
                }}
              >
                <style>
                  {`
                  /* Custom scrollbar for conversation area */
                  .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                  }
                  .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #fbbf24;
                    border-radius: 8px;
                  }
                  .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f3f4f6;
                  }
                  `}
                </style>
                <div>
                  <MessageList messages={conversation} formatMsgTimestamp={formatMsgTimestamp} />
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <Composer
                value={inputValue}
                onChange={setInputValue}
                onSend={sendMessage}
                disabled={!selectedChatId || isArchivedSelected}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatNow;