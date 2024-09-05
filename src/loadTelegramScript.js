export function loadTelegramScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Telegram WebApp script'));
      document.body.appendChild(script);
    });
  }