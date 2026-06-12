SMART STOCK PWA WRAPPER — NO HEADER

รุ่นนี้ฝัง URL GAS ไว้แล้ว และไม่มี Header ด้านบน
เปิด GitHub Pages แล้วจะแสดงหน้า GAS เต็มจอทันที

URL GAS ที่ฝังไว้:
https://script.google.com/macros/s/AKfycbzeSzHwA6Jju08CDLUYxOK-fSACwD9UjWCDAXxbJh9ZeisK-BVxX4m32wOBkVlzowMX5w/exec

ปุ่มลอยมุมขวาล่าง
- ⬇ ติดตั้งแอป: ปรากฏเมื่อ Browser รองรับและพร้อมติดตั้ง
- ↻ รีโหลดหน้า GAS
- ↗ เปิด GAS โดยตรงในแท็บใหม่

ปุ่มลอยจะแสดงจาง ๆ และชัดขึ้นเมื่อชี้เมาส์ เพื่อไม่รบกวนหน้าทำงาน

วิธีนำขึ้น GitHub Pages
1. แตก ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดไปไว้ที่ root ของ GitHub repository
3. เข้า Settings → Pages
4. เลือก Deploy from a branch
5. เลือก Branch: main และ Folder: /root
6. เปิด URL github.io ของ repository
7. หากเคยใช้ PWA รุ่นเก่า ให้กด Ctrl + F5 หนึ่งครั้ง หรือปิดและเปิดแอปใหม่

ข้อควรทราบ
- PWA Shell ติดตั้งลงเครื่องได้ แต่ GAS และ Google Sheet ยังต้องใช้อินเทอร์เน็ต
- GAS Code.gs ต้องใช้ .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
