(() => {
  'use strict';

  const STORAGE_KEY = 'smartStockGasWebAppUrl';
  const cfg = window.SMART_STOCK_CONFIG || {};
  const frame = document.getElementById('gas-frame');
  const statusbar = document.getElementById('statusbar');
  const emptyState = document.getElementById('empty-state');
  const dialog = document.getElementById('settings-dialog');
  const gasUrlInput = document.getElementById('gas-url');
  const installBtn = document.getElementById('install-btn');
  let deferredInstallPrompt = null;

  document.getElementById('app-title').textContent = cfg.APP_NAME || 'Smart Stock Card';

  function normalizeUrl(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    try {
      const url = new URL(text);
      if (!/^https:$/.test(url.protocol)) throw new Error('ต้องเป็น https');
      return url.toString();
    } catch (error) {
      throw new Error('URL ไม่ถูกต้อง กรุณาวาง GAS Web App URL ที่ขึ้นต้นด้วย https://');
    }
  }

  function setStatus(message, offline = false) {
    statusbar.textContent = message;
    statusbar.classList.toggle('offline', Boolean(offline));
  }

  function getSavedUrl() {
    return localStorage.getItem(STORAGE_KEY) || cfg.GAS_WEB_APP_URL || '';
  }

  function loadGasApp() {
    const rawUrl = getSavedUrl();
    if (!rawUrl) {
      emptyState.classList.remove('hidden');
      frame.removeAttribute('src');
      setStatus('ยังไม่ได้ตั้งค่า GAS Web App URL');
      return;
    }
    let url;
    try { url = normalizeUrl(rawUrl); }
    catch (error) {
      emptyState.classList.remove('hidden');
      setStatus(error.message);
      return;
    }
    emptyState.classList.add('hidden');
    setStatus('กำลังเปิด Smart Stock จาก GAS...');
    frame.src = url;
  }

  function openSettings() {
    gasUrlInput.value = getSavedUrl();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    setTimeout(() => gasUrlInput.focus(), 50);
  }

  frame.addEventListener('load', () => {
    setStatus(navigator.onLine
      ? 'เปิดระบบแล้ว · หากกรอบด้านล่างว่าง ให้ตรวจว่า Code.gs ใช้ XFrameOptionsMode.ALLOWALL'
      : 'ออฟไลน์ · เปิดได้เฉพาะ PWA Shell แต่ข้อมูล GAS ต้องใช้อินเทอร์เน็ต', !navigator.onLine);
  });

  document.getElementById('settings-btn').addEventListener('click', openSettings);
  document.getElementById('empty-settings-btn').addEventListener('click', openSettings);
  document.getElementById('reload-btn').addEventListener('click', () => loadGasApp());
  document.getElementById('open-direct-btn').addEventListener('click', () => {
    const rawUrl = getSavedUrl();
    if (!rawUrl) return openSettings();
    window.open(rawUrl, '_blank', 'noopener');
  });
  document.getElementById('cancel-settings-btn').addEventListener('click', () => dialog.close());
  document.getElementById('clear-url-btn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    gasUrlInput.value = '';
    dialog.close();
    loadGasApp();
  });
  document.getElementById('settings-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      const url = normalizeUrl(gasUrlInput.value);
      localStorage.setItem(STORAGE_KEY, url);
      dialog.close();
      loadGasApp();
    } catch (error) {
      setStatus(error.message);
      gasUrlInput.focus();
    }
  });

  window.addEventListener('online', () => { setStatus('กลับมาออนไลน์แล้ว'); loadGasApp(); });
  window.addEventListener('offline', () => setStatus('ออฟไลน์ · PWA Shell ยังเปิดได้ แต่ GAS และ Google Sheet ต้องใช้อินเทอร์เน็ต', true));

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
