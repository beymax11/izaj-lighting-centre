import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Chat = {
  id: number;
  itemName: string;
  itemImage: string;
  lastMessage: string;
  lastDate: string; // ISO string
  unread?: number;
  archived?: boolean;
  pinned?: boolean;
};

export type Message = {
  id: number;
  chatId: number;
  text: string;
  sender: 'izaj' | 'user';
  timestamp: Date;
  seen?: boolean;
};

export function useChat(initialChats: Chat[], initialMessages: Message[]) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(initialChats[0]?.id ?? null);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showArchived] = useState(false);

  const filteredChats = useMemo(() => (
    chats.filter(chat =>
      chat.itemName.toLowerCase().includes(search.toLowerCase()) &&
      (showArchived ? chat.archived : !chat.archived)
    )
  ), [chats, search, showArchived]);

  const sortedChats = useMemo(() => (
    [...filteredChats].sort((a, b) => {
      if ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) !== 0) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime();
    })
  ), [filteredChats]);

  const conversation = useMemo(() => messages.filter(m => m.chatId === selectedChatId), [messages, selectedChatId]);

  const getChatById = useCallback((id: number) => chats.find(c => c.id === id), [chats]);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || !selectedChatId) return;
    const now = new Date();
    const newMsg: Message = { id: messages.length + 1, chatId: selectedChatId, text: inputValue, sender: 'user', timestamp: now, seen: false };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setTimeout(() => {
      setMessages(prev => ([...prev, { id: prev.length + 1, chatId: selectedChatId, text: 'Thanks for your message! How else can I assist you?', sender: 'izaj', timestamp: new Date(), seen: false }]));
    }, 900);
    setChats(prev => prev.map(chat => chat.id === selectedChatId ? { ...chat, lastMessage: inputValue, lastDate: now.toISOString(), unread: 0, archived: false, pinned: chat.pinned } : chat));
  }, [inputValue, messages.length, selectedChatId, setMessages, setChats]);

  const markSelectedAsRead = useCallback(() => {
    if (!selectedChatId) return;
    setChats(prev => prev.map(chat => chat.id === selectedChatId ? { ...chat, unread: 0 } : chat));
    setMessages(prev => prev.map(msg => msg.chatId === selectedChatId ? { ...msg, seen: true } : msg));
  }, [selectedChatId]);

  useEffect(() => { markSelectedAsRead(); }, [selectedChatId, markSelectedAsRead]);

  const unarchive = useCallback((id: number) => setChats(prev => prev.map(c => c.id === id ? { ...c, archived: false } : c)), []);
  const togglePin = useCallback((id: number) => setChats(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c)), []);
  const removeChat = useCallback((id: number) => {
    setChats(prev => prev.filter(c => c.id !== id));
    setMessages(prev => prev.filter(m => m.chatId !== id));
    if (selectedChatId === id) setSelectedChatId(null);
  }, [selectedChatId]);

  const formatMsgTimestamp = useCallback((ts: Date | string) => {
    const date = typeof ts === 'string' ? new Date(ts) : ts;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatListTime = useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-GB');
  }, []);

  const getImagePath = useCallback((img: string) => img.startsWith('/') ? img : `/${img}`, []);

  return {
    chats,
    messages,
    selectedChatId,
    search,
    inputValue,
    sortedChats,
    conversation,
    isArchivedSelected: selectedChatId ? !!getChatById(selectedChatId)?.archived : false,
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
  };
}

export default useChat;


