import React, { useEffect } from 'react';

const TelegramLogin = ({ onLogin }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'Tinapatelbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.getElementById('telegram-login-container').appendChild(script);

    window.onTelegramAuth = function (user) {
      localStorage.setItem('username', user.username);
      localStorage.setItem('telegram_id', user.id);
      if (onLogin) onLogin(user);
    };
  }, []);

  return <div id="telegram-login-container" className="flex justify-center py-6" />;
};

export default TelegramLogin;
