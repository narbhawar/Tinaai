import React from 'react';
import TinaMobileChat from './TinaMobileChat';
import TelegramLogin from './TelegramLogin';

const App = () => {
  return (
    <div className="w-full h-screen bg-pink-50">
      <TelegramLogin onLogin={(user) => console.log('Logged in:', user)} />
      <TinaMobileChat />
    </div>
  );
};

export default App;
