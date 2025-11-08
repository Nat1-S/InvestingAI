
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage, GroundingSource } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { SendIcon, SpinnerIcon } from './icons/Icons';
import { GenerateContentResponse } from '@google/genai';

const Chatbot: React.FC = () => {
  const { t } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await getChatResponse(input);
      const text = response.text;
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources: GroundingSource[] = groundingChunks
        ? groundingChunks.map((chunk: any) => ({
            uri: chunk.web.uri,
            title: chunk.web.title,
          })).filter((source: GroundingSource) => source.uri && source.title)
        : [];
      
      const modelMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text, sources };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: t('chatError') };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[70vh] flex flex-col bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">{t('chatbotTitle')}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                 <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-500">
                    <h4 className="text-xs font-bold mb-1">{t('sources')}:</h4>
                    <ul className="text-xs space-y-1">
                      {msg.sources.map((source, index) => (
                        <li key={index}>
                          <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80">
                            {index + 1}. {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-600 flex items-center space-x-2">
                <SpinnerIcon /> <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chatbotPlaceholder')}
            className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 rounded-full bg-brand-primary text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
