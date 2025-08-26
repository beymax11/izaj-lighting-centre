import React from 'react';
import { Icon } from '@iconify/react';
import { Chat } from '../../hooks/useChat';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: number | null;
  onSelect: (id: number) => void;
  formatListTime: (dateStr: string) => string;
  onPin: (id: number) => void;
  onDelete: (id: number) => void;
  onUnarchive: (id: number) => void;
  getImagePath: (img: string) => string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelect, formatListTime, onPin, onDelete, onUnarchive, getImagePath }) => {
  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {chats.length > 0 ? (
        chats.map(chat => (
          <div key={chat.id} className={`flex items-center gap-3 px-4 py-3 cursor-pointer group hover:bg-yellow-50 border-b border-gray-100 transition relative ${chat.id === selectedChatId ? 'bg-yellow-100' : ''}`} onClick={() => onSelect(chat.id)}>
            <img src={getImagePath(chat.itemImage)} alt={chat.itemName} className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base truncate flex items-center gap-1 text-black">
                {chat.itemName}
                {chat.pinned && (
                  <span title="Pinned">
                    <Icon icon="mdi:pin" width={16} height={16} className="text-yellow-400" />
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[45px]">
              <div className="text-[11px] text-gray-400">{formatListTime(chat.lastDate)}</div>
              {!!chat.unread && (
                <span className="bg-red-500 text-white rounded-full px-2 py-[2px] text-xs font-bold">{chat.unread}</span>
              )}
            </div>
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition">
              {!chat.archived ? (
                <div className="flex gap-2">
                  <button className="rounded-full hover:bg-yellow-200 p-1" onClick={e => { e.stopPropagation(); onPin(chat.id); }}>
                    <span title={chat.pinned ? "Unpin chat" : "Pin chat"}>
                      <Icon icon={chat.pinned ? "mdi:pin-off" : "mdi:pin"} width={17} height={17} />
                    </span>
                  </button>
                  <button className="rounded-full hover:bg-gray-200 p-1" onClick={e => { e.stopPropagation(); onDelete(chat.id); }}>
                    <span title="Delete chat">
                      <Icon icon="mdi:delete" width={17} height={17} />
                    </span>
                  </button>
                </div>
              ) : (
                <button className="rounded-full hover:bg-green-100 p-1" onClick={e => { e.stopPropagation(); onUnarchive(chat.id); }}>
                  <span title="Unarchive chat">
                    <Icon icon="mdi:archive-arrow-up" width={17} height={17} />
                  </span>
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-12">No chats found.</div>
      )}
    </div>
  );
};

export default ChatList;


