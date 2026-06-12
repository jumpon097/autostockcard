SMART STOCK PWA WRAPPER — รุ่นฝัง URL GAS พร้อมใช้

URL GAS ที่ฝังไว้แล้ว:
https://script.google.com/macros/s/AKfycbzeSzHwA6Jju08CDLUYxOK-fSACwD9UjWCDAXxbJh9ZeisK-BVxX4m32wOBkVlzowMX5w/exec

วิธีนำขึ้น GitHub Pages
1. แตก ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดไปไว้ที่ root ของ GitHub repository
3. เข้า Settings → Pages
4. เลือก Deploy from a branch
5. เลือก Branch: main และ Folder: /root
6. เปิด URL github.io ของ repository
7. ระบบจะเปิด GAS Web App ทันที โดยไม่ต้องกรอก URL

ติดตั้งลงคอมพิวเตอร์
- เปิด GitHub Pages URL ผ่าน Chrome หรือ Edge
- กด “ติดตั้งแอป” เมื่อปุ่มปรากฏ
- หากปุ่มไม่ปรากฏ ใช้เมนู browser → Install app

ข้อควรทราบ
- PWA Shell ติดตั้งลงเครื่องได้ แต่ GAS และ Google Sheet ยังต้องใช้อินเทอร์เน็ต
- หาก iframe ว่าง ให้กด “เปิด GAS โดยตรง”
- GAS Code.gs ต้องใช้ .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
- หาก Deploy GAS ใหม่แล้ว URL เปลี่ยน ให้แก้ค่า GAS_WEB_APP_URL ใน config.js เพียงจุดเดียว แล้วอัปโหลด config.js ใหม่
