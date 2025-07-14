
import React from 'react';
import { type Message } from '../types';
import { DogPawIcon } from './Icons';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-brand-blue text-white self-end'
    : 'bg-white text-slate-700 self-start';
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  const formattedText = message.text.split('\n').map((line, index) => (
    <span key={index}>
      {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
      <br />
    </span>
  ));
  
  const renderTextWithFormatting = () => {
    // A simple markdown-like parser for bold text.
    return message.text.split('\n').map((paragraph, pIndex) => (
      <p key={pIndex} className="my-1" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />
    ));
  };

  return (
    <div className={`flex items-end gap-2 ${containerClasses}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
          <DogPawIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-xl lg:max-w-2xl rounded-2xl px-4 py-3 shadow-md ${bubbleClasses}`}
      >
        <div className="prose prose-sm text-inherit leading-relaxed">
         {renderTextWithFormatting()}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
