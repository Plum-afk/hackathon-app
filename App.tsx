
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { type Message, type Veterinarian } from './types';
import { type Chat } from '@google/genai';
import { initializeChat } from './services/geminiService';
import { LOCAL_VETS } from './constants';
import ChatBubble from './components/ChatBubble';
import MessageInput from './components/MessageInput';
import VetCard from './components/VetCard';
import { DogPawIcon, PhoneIcon } from './components/Icons';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-ai-message',
      sender: 'ai',
      text: "Hello! I'm an AI Vet Assistant for dogs. How can I help you today? Please describe your dog's symptoms or ask any health-related questions. \n\n**Disclaimer:** I am an AI and not a substitute for a real veterinarian. For a proper diagnosis, please consult a professional.",
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatInstance = initializeChat();
    setChat(chatInstance);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading || !chat) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    // Add a placeholder for the AI response
    setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '' }]);
    
    try {
      const stream = await chat.sendMessageStream({ message: inputText });
      let streamedText = '';
      for await (const chunk of stream) {
        streamedText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: streamedText } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = "I'm sorry, but I encountered an error. Please check your connection or API key and try again.";
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: errorMessage } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-slate-50 text-slate-800">
      {/* Left Panel: Chat Interface */}
      <div className="flex flex-col w-full md:w-2/3 h-full bg-white shadow-lg">
        <header className="flex items-center p-4 border-b border-slate-200 bg-slate-50">
          <DogPawIcon className="w-8 h-8 text-brand-blue" />
          <h1 className="text-2xl font-bold ml-3 text-slate-700">Veterinarian AI Chat</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-100">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isLoading && messages[messages.length-1].sender === 'user' && (
              <ChatBubble message={{id: 'loading', sender: 'ai', text: '...'}} />
          )}
          <div ref={chatEndRef} />
        </main>
        <footer className="p-4 border-t border-slate-200 bg-slate-50">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </footer>
      </div>

      {/* Right Panel: Local Vets */}
      <div className="w-full md:w-1/3 h-full flex flex-col bg-slate-100 border-l border-slate-200">
        <header className="flex items-center p-4 border-b border-slate-200">
          <PhoneIcon className="w-6 h-6 text-brand-green" />
          <h2 className="text-xl font-bold ml-3 text-slate-700">Local Veterinarians</h2>
        </header>
        <div className="overflow-y-auto p-4 space-y-4">
          {LOCAL_VETS.map((vet: Veterinarian) => (
            <VetCard key={vet.id} vet={vet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
