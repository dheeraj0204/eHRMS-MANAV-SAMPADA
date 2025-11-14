'use client'

import { ChevronLeft, Mic, Send, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import ChatMessage from '@/components/chatbot/message'
import QuickReplies from '@/components/chatbot/quick-replies'
import VoiceButton from '@/components/chatbot/voice-button'

export default function ChatbotPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Hello Rajesh! 👋 I\'m your HR Assistant. How can I help you today? You can ask me about salary, leave, promotions, policies, or anything HR-related.',
        timestamp: Date.now()
      }
    ])
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: Date.now()
    }

    setMessages([...messages, userMessage])
    setInputValue('')

    setTimeout(() => {
      const botResponses = [
        'Your current salary is ₹75,000 per month. You can view detailed breakdowns in the Payroll section.',
        'You have 15 leave days remaining this year. You can apply for leave through the dashboard.',
        'Your promotion timeline shows you\'re currently in the Selection Committee stage. Expected decision by January 2025.',
        'You are eligible for a year-end bonus of ₹5,000 based on your performance rating.',
        'Your next salary will be deposited on 30th of this month to your registered account.'
      ]
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: randomResponse,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, botMessage])
    }, 800)
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">HR Assistant Chat</h1>
              <p className="text-xs text-slate-500">AI-powered HR support available 24/7</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
            <MoreVertical className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-y-auto space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <QuickReplies onSelectReply={handleQuickReply} />
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 max-w-4xl w-full mx-auto px-6 py-6 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg p-3 flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about HR policies, salary, leave..."
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-500 outline-none text-sm"
          />
          <VoiceButton isListening={isListening} setIsListening={setIsListening} />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
