'use client';

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '@/lib/axios';

const QUICK_COMMANDS = ['Show Customers', 'Add Customer', 'Generate Invoice', 'Help'];

export default function Chatbot({ isOpen, onToggle }) {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm your CRM Assistant. Type 'help' to see what I can do.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'bot', text, timestamp: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { role: 'user', text, timestamp: new Date() }]);
  };

  const processCommand = async (text) => {
    const normalized = text.toLowerCase().trim();

    if (normalized.includes('show customers') || normalized.includes('list customers')) {
      try {
        const { data } = await api.get('/api/customers');
        const names = data.map((c) => c.name).join(', ');
        addBotMessage(`Here are your customers: ${names || 'No customers found'}`);
      } catch {
        addBotMessage('Failed to fetch customers. Please try again.');
      }
      return;
    }

    if (normalized.includes('add customer') || normalized.includes('new customer')) {
      addBotMessage('Navigating to Add Customer...');
      setTimeout(() => router.push('/dashboard/customers/add'), 500);
      return;
    }

    if (normalized.includes('generate invoice') || normalized.includes('new invoice')) {
      addBotMessage('Opening Invoice Generator...');
      setTimeout(() => router.push('/dashboard/invoices/generate'), 500);
      return;
    }

    if (normalized.includes('help') || normalized.includes('commands')) {
      addBotMessage(
        'Available commands:\n• "show customers" — List all customers\n• "add customer" — Go to add customer page\n• "generate invoice" — Open invoice generator\n• "help" — Show this list\n• "hello" — Greeting'
      );
      return;
    }

    if (normalized.includes('hello') || normalized.includes('hi')) {
      addBotMessage("Hello! I'm your CRM Assistant. Type 'help' to see what I can do.");
      return;
    }

    addBotMessage("I don't understand that command. Type 'help' to see available commands.");
  };

  const handleSubmit = async (text) => {
    const message = text || input;
    if (!message.trim()) return;

    addUserMessage(message);
    setInput('');
    await processCommand(message);
  };

  const handleChipClick = (chip) => {
    handleSubmit(chip);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-primary-container text-white shadow-lg flex items-center justify-center hover:bg-primary transition-colors"
          style={{ boxShadow: '0 0 0 4px rgba(77, 158, 255, 0.2)' }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-[calc(100%-2rem)] max-w-sm bg-bg-surface border border-border-subtle rounded-xl shadow-2xl flex flex-col h-[480px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
            <h3 className="font-semibold text-text-primary">CRM Assistant</h3>
            <button onClick={onToggle} className="text-text-secondary hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary-container text-white'
                      : 'bg-bg-elevated border border-border-subtle text-text-primary'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 border-t border-border-subtle">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {QUICK_COMMANDS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="text-xs px-2 py-1 rounded-full bg-bg-elevated text-text-secondary hover:text-primary border border-border-subtle"
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 h-9 px-3 rounded-md bg-bg-elevated border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-border-strong"
              />
              <button
                type="submit"
                className="h-9 w-9 flex items-center justify-center rounded-md bg-primary-container text-white hover:bg-primary"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

Chatbot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
