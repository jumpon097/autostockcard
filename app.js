(() => {
  'use strict';

  const cfg = window.SMART_STOCK_CONFIG || {};
  const frame = document.getElementById('gas-frame');
  const statusPill = document.getElementById('status-pill');
  const installBtn = document.getElementById('install-btn');
  let deferredInstallPrompt = null;
  let statusTimer = null;

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

  function setStatus(message, offline = false, autoHide = false) {
    clearTimeout(statusTimer);
    statusPill.textContent = message;
    statusPill.classList.toggle('offline', Boolean(offline));
    statusPill.classList.remove('fade');
    if (autoHide) {
      statusTimer = setTimeout(() => statusPill.classList.add('fade'), 2200);
    }
  }

  function getGasUrl() {
    return normalizeUrl(cfg.GAS_WEB_APP_URL);
  }

  function loadGasApp() {
    try {
      const url = getGasUrl();
      setStatus('กำลังเปิด Smart Stock...');
      frame.src = url;
    } catch (error) {
      setStatus(error.message, true);
      frame.removeAttribute('src');
    }
  }

  frame.addEventListener('load', () => {
    setStatus(navigator.onLine
      ? 'Smart Stock พร้อมใช้งาน'
      : 'ออฟไลน์ · GAS และ Google Sheet ต้องใช้อินเทอร์เน็ต', !navigator.onLine, navigator.onLine);
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
    setStatus('ออฟไลน์ · GAS และ Google Sheet ต้องใช้อินเทอร์เน็ต', true);
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
