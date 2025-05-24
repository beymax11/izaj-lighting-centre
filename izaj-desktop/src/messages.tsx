import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';

// Dummy data for messages
const messageListData = [
	{
		id: 1,
		name: 'Juan Dela Cruz',
		lastMessage: 'Hello, I have a question about my order.',
		time: '10:30 AM',
		unread: true,
		avatar: '/profile.webp',
		conversation: [
			{
				fromMe: false,
				text: 'Hello, I have a question about my order.',
				time: '10:30 AM',
			},
			{
				fromMe: true,
				text: 'Hi Juan! Sure, how can I help you?',
				time: '10:31 AM',
			},
			{
				fromMe: false,
				text: 'I want to know the status of my shipment.',
				time: '10:32 AM',
			},
		],
	},
	{
		id: 2,
		name: 'Maria Santos',
		lastMessage: 'Thank you for the fast delivery!',
		time: 'Yesterday',
		unread: false,
		avatar: '/profile.webp',
		conversation: [
			{
				fromMe: false,
				text: 'Thank you for the fast delivery!',
				time: '09:00 AM',
			},
			{
				fromMe: true,
				text: 'You\'re welcome, Maria!',
			 time: '09:01 AM',
			},
		],
	},
	{
		id: 3,
		name: 'System',
		lastMessage: 'Your invoice for June is ready.',
		time: '2d ago',
		unread: false,
		avatar: '/izaj.jpg',
		conversation: [
			{
				fromMe: false,
				text: 'Your invoice for June is ready.',
				time: '2d ago',
			},
		],
	},
];

function Messages(props: {
  showFloat?: boolean;
  setShowFloat?: (v: boolean) => void;
  floatPos?: { x: number; y: number };
  setFloatPos?: (pos: { x: number; y: number }) => void;
  dragging?: boolean;
  setDragging?: (v: boolean) => void;
  showFloatIcon?: boolean;
  setShowFloatIcon?: (v: boolean) => void;
  handleDragStart?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedMessageId?: number | null;
  setSelectedMessageId?: (id: number) => void;
}) {
  // Use selectedMessageId from props if provided, else local state
  const [selectedId, setSelectedId] = useState(messageListData[0].id);
  const selectedMessageId = props.selectedMessageId ?? selectedId;
  const setSelectedIdCombined = props.setSelectedMessageId ?? setSelectedId;

  const [messageList, setMessageList] = useState(messageListData);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Keep local selectedId in sync with prop if provided
  useEffect(() => {
    if (props.selectedMessageId !== undefined && props.selectedMessageId !== null) {
      setSelectedId(props.selectedMessageId);
    }
  }, [props.selectedMessageId]);

  const selectedMessage = messageList.find((msg) => msg.id === selectedMessageId) ?? messageList[0];

  // Filtered messages for search
  const filteredMessages = messageList.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  // Scroll to bottom on new message
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMessageId, selectedMessage?.conversation.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessageList((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              lastMessage: input,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              conversation: [
                ...(msg.conversation || []),
                {
                  fromMe: true,
                  text: input,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ],
            }
          : msg
      )
    );
    setInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (id: number) => {
    setSelectedIdCombined(id);
    setMessageList((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };

  // fallback no-op for setShowFloat
  const setShowFloatSafe = props.setShowFloat ?? (() => {});

  return (
    <div className="w-full h-[70vh] flex items-center justify-center mt-18">
      <div className="flex h-[80vh] w-[1200px] bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-3xl shadow-2xl overflow-hidden border border-yellow-100">
        {/* Left: Messages List */}
        <div className="w-88 min-w-[320px] border-r border-yellow-100 bg-gradient-to-b from-white via-yellow-50 to-white flex flex-col backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-3 px-7 py-7 border-b border-yellow-100 bg-gradient-to-r from-yellow-50 to-white">
            <Icon icon="mdi:message-outline" className="text-yellow-400 w-8 h-8 drop-shadow" />
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide drop-shadow">Messages</h2>
            {/* Removed search icon button */}
          </div>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white shadow transition-all duration-200 focus:shadow-lg"
            />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredMessages.length === 0 && (
              <div className="text-center text-gray-400 py-8">No messages found.</div>
            )}
            {filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg.id)}
                className={`w-full flex items-center gap-4 px-7 py-5 transition group border-b border-yellow-50
                ${selectedId === msg.id ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-inner ring-2 ring-yellow-200' : 'hover:bg-yellow-50'}
                ${msg.unread ? 'font-semibold' : ''}
                rounded-xl mb-1
              `}
              >
                <div className="relative">
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-12 h-12 rounded-full border-2 border-yellow-200 bg-gray-100 shadow-lg"
                  />
                  {msg.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow"></span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 group-hover:text-yellow-600">{msg.name}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <span className="text-sm text-gray-500 truncate block mt-1">{msg.lastMessage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Right: Conversation */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-yellow-50 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-4 px-10 py-7 border-b border-yellow-100 bg-gradient-to-r from-yellow-50 to-white">
            <div className="ml-auto flex gap-2">
              <button
                className="p-2 rounded-full hover:bg-yellow-100 transition"
                onClick={() => setShowFloatSafe(true)}
              >
                <Icon icon="mdi:arrow-expand" className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-10 py-8 bg-transparent custom-scrollbar">
            <div className="flex flex-col gap-6">
              {selectedMessage?.conversation?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!msg.fromMe && (
                    <img
                      src={selectedMessage.avatar}
                      alt={selectedMessage.name}
                      className="w-8 h-8 rounded-full border border-yellow-100 shadow"
                    />
                  )}
                  <div
                    className={`relative max-w-md px-5 py-3 rounded-3xl shadow-lg transition-all duration-200
                    ${msg.fromMe
											? 'bg-gradient-to-br from-yellow-200/80 to-yellow-100/90 text-gray-800 rounded-br-md'
											: 'bg-gradient-to-br from-white/80 to-gray-100/90 text-gray-700 rounded-bl-md border border-yellow-50'
										}
                    ${msg.fromMe ? 'ml-8' : 'mr-2'}
                  `}
                  >
                    <div className="text-base leading-relaxed">{msg.text}</div>
                    <div className="text-xs text-gray-400 mt-2 text-right">{msg.time}</div>
                    {msg.fromMe && (
                      <Icon icon="mdi:check-all" className="absolute bottom-2 right-2 w-4 h-4 text-blue-400" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>
          </div>
          {/* Message input */}
          <div className="px-10 py-5 border-t border-yellow-100 bg-gradient-to-r from-yellow-50 to-white">
            <form className="flex items-center gap-3" onSubmit={handleSend}>
              <button type="button" className="p-2 rounded-full hover:bg-yellow-100 transition" tabIndex={-1}>
                <Icon icon="mdi:paperclip" className="w-6 h-6 text-yellow-400" />
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }}
                className="flex-1 px-5 py-3 border border-yellow-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white shadow transition-all duration-200 focus:shadow-lg"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition flex items-center gap-2"
                disabled={!input.trim()}
              >
                <Icon icon="mdi:send" className="w-5 h-5" />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Remove floating modal and icon from here */}
    </div>
  );
}

// Floating Conversation Modal as a separate component
Messages.FloatingModal = function FloatingModal({
  showFloat,
  setShowFloat,
  floatPos,
  dragging,
  handleDragStart,
  selectedMessageId,
  setShowFloatIcon,
}: {
  showFloat: boolean;
  setShowFloat: (v: boolean) => void;
  floatPos: { x: number; y: number };
  dragging: boolean;
  handleDragStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedMessageId: number | null;
  setShowFloatIcon: (v: boolean) => void;
}) {
  const [messageList, setMessageList] = useState(messageListData);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const selectedMessage = messageList.find((msg) => msg.id === selectedMessageId) ?? messageList[0];
  const [input, setInput] = useState('');

  // Scroll to bottom on new message
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMessageId, selectedMessage?.conversation.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessageList((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              lastMessage: input,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              conversation: [
                ...(msg.conversation || []),
                {
                  fromMe: true,
                  text: input,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ],
            }
          : msg
      )
    );
    setInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // fallback for optional props
  const setShowFloatIconSafe = setShowFloatIcon ?? (() => {});
  const handleDragStartSafe = handleDragStart ?? (() => {});

  if (!showFloat) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="draggable-modal relative rounded-3xl shadow-2xl border border-yellow-100 w-[500px] max-w-full h-[80vh] flex flex-col pointer-events-auto"
        style={{
          position: 'absolute',
          left: Math.max(0, Math.min(floatPos.x, window.innerWidth - 500)),
          top: Math.max(0, Math.min(floatPos.y, window.innerHeight - (window.innerHeight * 0.8))),
          maxWidth: '100vw',
          maxHeight: '80vh',
          cursor: dragging ? 'grabbing' : 'default',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-yellow-100 bg-gradient-to-r from-yellow-50 to-white rounded-t-3xl cursor-move select-none"
          onMouseDown={handleDragStartSafe}
        >
          <span className="font-bold text-gray-800 text-lg drop-shadow">
            {selectedMessage?.name || 'Conversation'}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-yellow-100 transition"
              onClick={() => {
                setShowFloat(false);
                setShowFloatIconSafe(true);
              }}
              aria-label="Minimize"
            >
              <Icon icon="mdi:minus" className="w-5 h-5 text-gray-400" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-yellow-100 transition"
              onClick={() => setShowFloat(false)}
              aria-label="Close"
            >
              <Icon icon="mdi:close" className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-transparent custom-scrollbar">
          <div className="flex flex-col gap-6">
            {selectedMessage?.conversation?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {!msg.fromMe && (
                  <img
                    src={selectedMessage.avatar}
                    alt={selectedMessage.name}
                    className="w-7 h-7 rounded-full border border-yellow-100 shadow"
                  />
                )}
                <div
                  className={`relative max-w-xs px-4 py-2 rounded-3xl shadow-lg transition-all duration-200
                    ${msg.fromMe
                      ? 'bg-gradient-to-br from-yellow-200/80 to-yellow-100/90 text-gray-800 rounded-br-md'
                      : 'bg-gradient-to-br from-white/80 to-gray-100/90 text-gray-700 rounded-bl-md border border-yellow-50'
                    }
                    ${msg.fromMe ? 'ml-8' : 'mr-2'}
                  `}
                >
                  <div className="text-base leading-relaxed">{msg.text}</div>
                  <div className="text-xs text-gray-400 mt-2 text-right">{msg.time}</div>
                  {msg.fromMe && (
                    <Icon icon="mdi:check-all" className="absolute bottom-2 right-2 w-4 h-4 text-blue-400" />
                  )}
                </div>
              </div>
            ))}
            <div ref={conversationEndRef} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-yellow-100 bg-gradient-to-r from-yellow-50 to-white rounded-b-3xl">
          <form className="flex items-center gap-3" onSubmit={handleSend}>
            <button type="button" className="p-2 rounded-full hover:bg-yellow-100 transition" tabIndex={-1}>
              <Icon icon="mdi:paperclip" className="w-6 h-6 text-yellow-400" />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
              className="flex-1 px-5 py-3 border border-yellow-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white shadow transition-all duration-200 focus:shadow-lg"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition flex items-center gap-2"
              disabled={!input.trim()}
            >
              <Icon icon="mdi:send" className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Floating message icon (lower right)
Messages.FloatingIcon = function FloatingIcon({
  showFloatIcon,
  setShowFloatIcon,
  setShowFloat,
}: {
  showFloatIcon: boolean;
  setShowFloatIcon: (v: boolean) => void;
  setShowFloat: (v: boolean) => void;
}) {
  if (!showFloatIcon) return null;
  return (
    <button
      className="fixed z-50 bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg p-4 transition flex items-center justify-center animate-bounce"
      style={{
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px) saturate(180%)',
      }}
      onClick={() => {
        setShowFloat(true);
        setShowFloatIcon(false);
      }}
      aria-label="Open Messages"
    >
      <Icon icon="mdi:message-outline" className="w-7 h-7 drop-shadow" />
    </button>
  );
};

export default Messages;
