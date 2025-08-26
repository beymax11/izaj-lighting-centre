import React, { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const Composer: React.FC<ComposerProps> = ({ value, onChange, onSend, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="p-4 border-t bg-white flex gap-2 items-center shadow-md">
      <input
        ref={inputRef}
        className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 transition"
        placeholder="Type your message..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        aria-label="Type your message"
      />
      <button
        className={`px-4 py-2 rounded-full bg-yellow-400 text-black font-medium transition disabled:opacity-60 shadow ${(!value.trim() || disabled) ? 'opacity-40 cursor-not-allowed' : ''}`}
        onClick={onSend}
        disabled={!value.trim() || disabled}
        aria-label="Send message"
      >
        <Icon icon="mdi:send" width={20} height={20} />
      </button>
    </div>
  );
};

export default Composer;


