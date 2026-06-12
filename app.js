(() => {
  'use strict';

  const cfg = window.SMART_STOCK_CONFIG || {};
  const frame = document.getElementById('gas-frame');
  const statusbar = document.getElementById('statusbar');
  const installBtn = document.getElementById('install-btn');
  let deferredInstallPrompt = null;

  document.getElementById('app-title').textContent = cfg.APP_NAME || 'Smart Stock Card';

  function normalizeUrl(value) {
    const text = String(value || '').trim();
    if (!text) throw new Error('ยังไม่ได้กำหนด GAS Web App URL ใน config.js');
    try {
      const url = new URL(text);
      if (url.protocol !== 'https:') throw new Error('GAS URL ต้องใช้ https');
      return url.toString();
    } catch (error) {
      throw new Error('GAS Web App URL ใน config.js ไม่ถูกต้อง');
    }
  }

  function setStatus(message, offline = false) {
    statusbar.textContent = message;
    statusbar.classList.toggle('offline', Boolean(offline));
  }

  function getGasUrl() {
    return normalizeUrl(cfg.GAS_WEB_APP_URL);
  }

  function loadGasApp() {
    try {
      const url = getGasUrl();
      setStatus('กำลังเปิด Smart Stock จาก GAS...');
      frame.src = url;
    } catch (error) {
      setStatus(error.message, true);
      frame.removeAttribute('src');
    }
  }

  frame.addEventListener('load', () => {
    setStatus(navigator.onLine
      ? 'Smart Stock พร้อมใช้งาน · หากกรอบว่าง ให้กด “เปิด GAS โดยตรง”'
      : 'ออฟไลน์ · PWA เปิดได้ แต่ GAS และ Google Sheet ต้องใช้อินเทอร์เน็ต', !navigator.onLine);
  });

  document.getElementById('reload-btn').addEventListener('click', () => {
    frame.removeAttribute('src');
    setTimeout(loadGasApp, 80);
  });

  document.getElementById('open-direct-btn').addEventListener('click', () => {
    try {
      window.open(getGasUrl(), '_blank', 'noopener');
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  window.addEventListener('online', () => {
    setStatus('กลับมาออนไลน์แล้ว · กำลังรีโหลดระบบ');
    loadGasApp();
  });
  window.addEventListener('offline', () => {
    setStatus('ออฟไลน์ · PWA เปิดได้ แต่ GAS และ Google Sheet ต้องใช้อินเทอร์เน็ต', true);
  });

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.classList.remove('hidden');
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.add('hidden');
  });

  window.addEventListener('appinstalled', () => installBtn.classList.add('hidden'));

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.error));
  }

  loadGasApp();
})();
