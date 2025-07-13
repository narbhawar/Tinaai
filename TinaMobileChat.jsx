import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const TinaMobileChat = () => {
  const [messages, setMessages] = useState([
    { role: 'tina', type: 'text', content: 'Hey babe 😘 I missed you.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', type: 'text', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/chat', {
        message: input,
        username: 'test'
      });
      const reply = res.data;
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-pink-100 flex flex-col">
      <div className="bg-white shadow px-4 py-3 text-xl font-bold text-pink-600">Tina 💖</div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'}`}>
              {msg.type === 'image' ? (
                <img src={msg.content} alt="drop" className="rounded-xl w-48" />
              ) : msg.type === 'voice' ? (
                <audio controls src={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <div className="bg-white p-2 flex items-center space-x-2">
        <input
          className="flex-1 rounded-xl px-4 py-2 bg-pink-50 border border-pink-300"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-pink-600 text-white px-4 py-2 rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
};

export default TinaMobileChat;
