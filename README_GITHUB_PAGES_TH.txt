SMART STOCK PWA WRAPPER สำหรับ GitHub Pages

วิธีใช้
1. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ไปยัง root ของ GitHub repo
2. เปิด GitHub Pages
3. เข้า URL github.io ของ repo
4. กด ตั้งค่า URL และวาง GAS Web App URL ที่ลงท้าย /exec
5. กด ติดตั้งแอป เมื่อปุ่มปรากฏ หรือใช้เมนู Install app ใน Chrome / Edge

ทางเลือก
- สามารถใส่ URL ถาวรใน config.js ที่ GAS_WEB_APP_URL ได้
- หน้า Wrapper จำ URL ด้วย localStorage แยกตามเครื่อง

ข้อควรทราบ
- PWA Shell เปิดแบบติดตั้งได้ แต่ข้อมูล GAS และ Google Sheet ยังต้องต่ออินเทอร์เน็ต
- GAS Code.gs ต้องใช้ .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) ตามไฟล์รุ่น V3.4 มิฉะนั้น iframe อาจว่าง
