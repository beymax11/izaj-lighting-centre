import React from 'react';
import { Icon } from '@iconify/react';
import { Message } from '../../hooks/useChat';

interface MessageListProps {
  messages: Message[];
  formatMsgTimestamp: (ts: Date | string) => string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, formatMsgTimestamp }) => {
  return (
    <div>
      {messages.length === 0 ? (
        <div className="text-gray-400 flex flex-col items-center justify-center h-full pt-20">
          No messages yet.
        </div>
      ) : (
        messages.map(msg => (
          <div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-4 py-2 text-sm max-w-xs relative shadow ${msg.sender === 'user' ? 'bg-yellow-200 text-black rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
              {msg.text}
              <div className="flex justify-end mt-1 gap-1 items-center">
                <span className="text-[10px] text-gray-400">{formatMsgTimestamp(msg.timestamp)}</span>
                {msg.sender === 'user' && msg.seen && (
                  <span title="Seen">
                    <Icon icon="mdi:check-all" width={14} height={14} className="ml-1 text-gray-400" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;


