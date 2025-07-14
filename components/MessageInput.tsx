import React, { useState } from 'react';
import { SendIcon } from './Icons';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about your dog's health..."
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-slate-200 disabled:text-slate-500 placeholder:text-slate-400"
        aria-label="Ask about your dog's health"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="bg-brand-blue text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default MessageInput;
