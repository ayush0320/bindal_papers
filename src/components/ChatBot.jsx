import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiAPI';

// In your chatbot component
const handleSendMessage = async (message) => {
    try {
        const response = await generateResponse(message);
        // Update your chat state with the response
        setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
        console.error('Failed to get response:', error);
    }
};
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm here to help you with Bindal Papers product information. What would you like to know?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Get API key safely
    const getApiKey = () => {
        try {
            return process.env.REACT_APP_GEMINI_API_KEY;
        } catch (error) {
            console.warn('Environment variable not found');
            return null;
        }
    };

    const generateBotResponse = async (userMessage) => {
        const apiKey = getApiKey();

        // Fallback responses if no API key
        if (!apiKey) {
            const fallbackResponses = {
                'hello': 'Hello! Welcome to Bindal Papers. We manufacture high-quality paper products.',
                'products': 'We offer a wide range of paper products including writing paper, printing paper, and specialty papers.',
                'quality': 'At Bindal Papers, we maintain the highest quality standards in all our manufacturing processes.',
                'contact': 'You can reach us through our website contact form or call our customer service.',
                'environment': 'We are committed to sustainable practices - "From Nature To Paper" with environmental responsibility.',
                'default': 'Thank you for your interest in Bindal Papers! We specialize in high-quality paper manufacturing. Please contact our sales team for specific product inquiries.'
            };

            const lowerMessage = userMessage.toLowerCase();
            for (const [key, response] of Object.entries(fallbackResponses)) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }
            return fallbackResponses.default;
        }

        try {
            setIsLoading(true);

            const context = `You are a helpful assistant for Bindal Papers Mills Limited, a paper manufacturing company. 
      The company specializes in paper manufacturing with the tagline "From Nature To Paper" and "A SPECTRUM OF EXCELLENCE".
      
      Answer questions about:
      - Paper products and specifications
      - Manufacturing processes
      - Company information
      - Product applications and uses
      - Quality standards
      - Environmental practices
      
      Keep responses helpful, professional, and focused on paper industry topics.
      
      User question: ${userMessage}`;

            const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: context
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I'm sorry, I couldn't process your request. Please try again.";

            return botResponse;
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return "I'm experiencing technical difficulties. Please contact our support team for assistance.";
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');

        try {
            const botResponseText = await generateBotResponse(currentInput);

            const botMessage = {
                id: Date.now() + 1,
                text: botResponseText,
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, I encountered an error. Please try again.",
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-gradient hover:bg-secondary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label={isOpen ? 'Close chat' : 'Open chat'}
                >
                    {isOpen ? (
                        // Close icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Chat icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-primary border border-gray-600 rounded-lg shadow-2xl z-40 flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-gradient text-white p-4 rounded-t-lg">
                        <h3 className="font-poppins font-semibold text-lg">Bindal Papers Assistant</h3>
                        <p className="text-sm opacity-90">Ask me about our products</p>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.isBot
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-blue-gradient text-white'
                                        }`}
                                >
                                    <p className="text-sm font-poppins whitespace-pre-wrap">{message.text}</p>
                                    <span className="text-xs opacity-70 mt-1 block">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 text-white p-3 rounded-lg">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-600">
                        <div className="flex space-x-2">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about our paper products..."
                                className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none h-10 font-poppins text-sm focus:outline-none focus:border-secondary"
                                rows="1"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-blue-gradient hover:bg-secondary text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                {/* Send icon using SVG instead of imported asset */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;