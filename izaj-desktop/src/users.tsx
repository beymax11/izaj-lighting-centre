// Products.tsx
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';

function Users() {
  // Update the initial state check to include URL parameter
  const [currentView, setCurrentView] = useState<'users' | 'messages'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'messages' ? 'messages' : 'users';
  });
  const [selectedMessage, setSelectedMessage] = useState<null | {
    name: string;
    message: string;
    time: string;
    conversation: string[];
  }>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const [isFloating, setIsFloating] = useState(false);
  const [floatPosition, setFloatPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      name: "Ruiz Miguel Sapio",
      message: "Order received, thank you!",
      time: "2 min ago",
      conversation: [
        "Ruiz Miguel Sapio: Order received, thank you!",
        "You: You're welcome! Let us know if you need anything else.",
        "Ruiz Miguel Sapio: Will do, thanks!"
      ]
    },
    {
      name: "Jerome Bulaktala",
      message: "Can I change my delivery address?",
      time: "10 min ago",
      conversation: [
        "Jerome Bulaktala: Can I change my delivery address?",
        "You: Yes, please send the new address.",
        "Jerome Bulaktala: Sent! Thank you."
      ]
    },
    // ...existing code...
  ];

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedMessage?.conversation]);

  // Handle sending message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || (!chatInput.trim() && chatFiles.length === 0)) return;

    const newMessages = [];
    if (chatInput.trim()) {
      newMessages.push(`You: ${chatInput.trim()}`);
    }
    chatFiles.forEach(file => {
      newMessages.push(`You sent a file: ${file.name}`);
    });

    setSelectedMessage({
      ...selectedMessage,
      conversation: [...selectedMessage.conversation, ...newMessages],
    });
    setChatInput('');
    setChatFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setChatFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveFile = (idx: number) => {
    setChatFiles(files => files.filter((_, i) => i !== idx));
  };

  // Add drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    if (floatRef.current) {
      const rect = floatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && floatRef.current) {
        const maxX = window.innerWidth - floatRef.current.offsetWidth;
        const maxY = window.innerHeight - floatRef.current.offsetHeight;
        
        setFloatPosition({
          x: Math.min(Math.max(0, e.clientX - dragOffset.x), maxX),
          y: Math.min(Math.max(0, e.clientY - dragOffset.y), maxY)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  // Add effect to handle URL parameter changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'messages') {
      setCurrentView('messages');
      // Clear the URL parameter after handling
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const renderMainContent = () => {
    if (currentView === 'messages') {
      if (isFloating && selectedMessage) {
        return (
          <div 
            ref={floatRef}
            className="fixed z-50 bg-white rounded-2xl shadow-2xl max-w-md w-full h-[80vh] flex flex-col pointer-events-auto"
            style={{ 
              left: floatPosition.x,
              top: floatPosition.y,
              cursor: isDragging ? 'grabbing' : 'default',
              transition: isDragging ? 'none' : 'all 0.1s ease',
            }}
          >
            {/* Header - make entire header draggable */}
            <div 
              className="p-6 border-b border-gray-200 flex items-center gap-3 cursor-grab active:cursor-grabbing"
              onMouseDown={handleDragStart}
            >
              <Icon icon="mdi:account-circle" className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="font-semibold text-lg text-gray-800">{selectedMessage.name}</div>
                <div className="text-xs text-gray-400">{selectedMessage.time}</div>
              </div>
              <button
                className="ml-auto text-gray-400 hover:text-gray-600 transition"
                onClick={() => {
                  setIsFloating(false);
                }}
              >
                <Icon icon="mdi:close" className="w-7 h-7" />
              </button>
            </div>
            {/* Rest of conversation content */}
            <div ref={chatBodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
              {selectedMessage.conversation.map((message, idx) => {
                const isYou = message.startsWith("You:");
                const [sender, ...messageParts] = message.split(":");
                const messageContent = messageParts.join(":").trim();

                return (
                  <div
                    key={idx}
                    className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}
                  >
                    {!isYou && (
                      <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                        <Icon icon="mdi:account" className="w-5 h-5 text-yellow-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm
                        ${isYou
                          ? "bg-yellow-400 text-gray-900 rounded-br-none"
                          : "bg-white border border-yellow-100 text-gray-800 rounded-bl-none"
                        }
                      `}
                    >
                      <p>{messageContent}</p>
                      <span className="block text-[10px] text-gray-500 mt-1 text-right">
                        {isYou ? "You" : sender}
                      </span>
                    </div>
                    {isYou && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Icon icon="mdi:account-tie" className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <form 
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white"
            >
              {/* Show attached files */}
              {chatFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {chatFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Icon icon="mdi:file" className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Icon icon="mdi:close" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Input bar */}
              <div className="flex items-center gap-2">
                <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Icon icon="mdi:paperclip" className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
                </label>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() && chatFiles.length === 0}
                  className="px-4 py-2 bg-yellow-400 text-white rounded-xl font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Icon icon="mdi:send" className="w-5 h-5" />
                  Send
                </button>
              </div>
            </form>
          </div>
        );
      }

      return (
        <div className="h-[550px] max-w-[95%] mx-auto bg-white rounded-2xl shadow-2xl w-full flex">
          {/* Messages List */}
          <div className="w-1/4 border-r border-gray-200 flex flex-col min-w-[300px]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
              <button 
                onClick={() => setCurrentView('users')}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="mdi:close" className="w-7 h-7" />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl cursor-pointer transition-all ${
                    selectedMessage?.name === msg.name
                      ? 'bg-yellow-100 shadow-md'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">
                      <Icon icon="mdi:account" className="w-7 h-7 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">{msg.name}</h4>
                      <p className="text-sm text-gray-400">{msg.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation View */}
          <div className="flex-1 flex flex-col">
            {selectedMessage ? (
              <>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">
                      <Icon icon="mdi:account" className="w-7 h-7 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-xl">{selectedMessage.name}</h3>
                      <p className="text-sm text-gray-400">{selectedMessage.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsFloating(true);
                      setFloatPosition({
                        x: window.innerWidth / 2 - 200,
                        y: window.innerHeight / 2 - 300
                      });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Icon icon="mdi:open-in-new" className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div ref={chatBodyRef} className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {selectedMessage.conversation.map((message, idx) => {
                    const isYou = message.startsWith("You:");
                    const [sender, ...messageParts] = message.split(":");
                    const messageContent = messageParts.join(":").trim();

                    return (
                      <div
                        key={idx}
                        className={`flex items-end gap-2 ${isYou ? "justify-end" : "justify-start"}`}
                      >
                        {!isYou && (
                          <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                            <Icon icon="mdi:account" className="w-5 h-5 text-yellow-600" />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm
                            ${isYou
                              ? "bg-yellow-400 text-gray-900 rounded-br-none"
                              : "bg-white border border-yellow-100 text-gray-800 rounded-bl-none"
                            }
                          `}
                        >
                          <p>{messageContent}</p>
                          <span className="block text-[10px] text-gray-500 mt-1 text-right">
                            {isYou ? "You" : sender}
                          </span>
                        </div>
                        {isYou && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Icon icon="mdi:account-tie" className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <form 
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-gray-200 bg-white"
                >
                  {/* Show attached files */}
                  {chatFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {chatFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
                          <Icon icon="mdi:file" className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Icon icon="mdi:close" className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Input bar */}
                  <div className="flex items-center gap-2">
                    <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Icon icon="mdi:paperclip" className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
                    </label>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() && chatFiles.length === 0}
                      className="px-4 py-2 bg-yellow-400 text-white rounded-xl font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Icon icon="mdi:send" className="w-5 h-5" />
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-blue-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:account-group" className="w-10 h-10 text-blue-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">1,234</span>
            <span className="text-gray-500 text-sm">Total Users</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform">
            <Icon icon="mdi:star-outline" className="w-10 h-10 text-yellow-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">345</span>
            <span className="text-gray-500 text-sm">Feedbacks</span>
          </div>
          <div 
            className="bg-white rounded-2xl shadow-lg border-l-4 border-green-300 p-6 flex flex-col items-center hover:scale-[1.025] transition-transform cursor-pointer"
            onClick={() => setCurrentView('messages')}
          >
            <Icon icon="mdi:message-outline" className="w-10 h-10 text-green-400 mb-3" />
            <span className="text-2xl font-bold text-gray-800">89</span>
            <span className="text-gray-500 text-sm">Messages</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4 text-sm">
            {['Feedback', 'Customer Action', 'Message Box'].map((label, idx) => (
              <button
                key={idx}
                className="flex items-center space-x-1 text-gray-700 hover:text-black px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm transition"
              >
                <Icon icon="mdi:checkbox-blank-circle-outline" className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Icon icon="mdi:magnify" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-200 bg-white"
              />
            </div>
            <button className="px-4 py-2 border border-blue-200 rounded-lg text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
              Advance Filter
            </button>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="font-semibold text-gray-700 text-lg">Feedback Table</span>
            <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              <Icon icon="mdi:download" className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3"><input type="checkbox" /></th>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Ratings</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  {
                    id: '#000001',
                    name: 'Progress Lighting Ceiling',
                    rating: 4,
                  },
                  {
                    id: '#000002',
                    name: 'LED Surface Panel Ceiling Light',
                    rating: 3,
                  },
                  {
                    id: '#000003',
                    name: 'Kovacs 1 Light Arc Floor Light',
                    rating: 5,
                  },
                  {
                    id: '#000004',
                    name: 'Plug In Pendant Light',
                    rating: 4,
                  },
                  {
                    id: '#000005',
                    name: 'Progress Floor Light',
                    rating: 3,
                  },
                  {
                    id: '#000006',
                    name: 'Progress Lighting Ceiling',
                    rating: 4,
                  },
                ]
                  .flatMap((entry) => [entry, entry]) // duplicate for row count
                  .map((product, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="accent-blue-400" />
                      </td>
                      <td className="px-4 py-3 font-mono text-blue-700">{product.id}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, starIdx) => (
                            <Icon
                              key={starIdx}
                              icon={starIdx < product.rating ? 'mdi:star' : 'mdi:star-outline'}
                              className={`w-4 h-4 ${starIdx < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">03/10/25</td>
                      <td className="px-4 py-3">
                        <button className="px-4 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="flex-1 px-8 py-8 bg-white overflow-auto">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-2">
          <Icon icon="mdi:account-outline" className="text-blue-400 w-8 h-8" />
          {currentView === 'messages' ? 'Messages' : 'Users & Feedback'}
        </h2>
        <p className="text-gray-500 text-md">
          {currentView === 'messages' 
            ? '' 
            : 'Manage customer feedback and user actions'}
        </p>
      </div>

      {renderMainContent()}
    </main>
  );
}

export default Users;
