const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const API_BASE = process.env.API_BASE || 'http://localhost:4000/api';
const PORT = process.env.PORT || 4001;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Helper: รูปแบบราคาไทย
function formatTHB(n) {
  try { return new Intl.NumberFormat('th-TH').format(Number(n || 0)); }
  catch { return n; }
}

// helper: แปลง error จาก axios ให้อ่านง่าย
function apiError(err) {
  if (err.response) {
    const m = err.response.data?.error || err.response.data?.message || err.message;
    return `${m} (HTTP ${err.response.status})`;
  }
  if (err.request) return 'เชื่อมต่อ API ไม่ได้';
  return err.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';
}

// หน้าแรก -> รายการ
app.get('/', (req, res) => res.redirect('/products'));

// LIST + SEARCH (ดึงจาก API ภายนอก)
app.get('/products', async (req, res) => {
  const q = (req.query.q || '').trim();
  try {
    const { data } = await axios.get(`${API_BASE}/products`, {
      params: { q, limit: 20 }
    });
    // รองรับทั้งกรณี API คืน array ตรงๆ หรือห่อ {data: []}
    const items = Array.isArray(data) ? data : (data.data || []);
    res.render('products/index', { items, q, formatTHB });
  } catch (err) {
    res.status(502).send(`โหลดรายการสินค้าไม่สำเร็จ: ${apiError(err)}`);
  }
});

// ฟอร์มเพิ่ม
app.get('/products/new', (req, res) => {
  res.render('products/new', { error: null, form: {} });
});

// CREATE (โพสต์ไป API ภายนอก)
app.post('/products', async (req, res) => {
  const { id, name, price, category, description, imageUrl } = req.body;
  const priceNum = Number(price);

  // ตรวจสอบเบื้องต้นฝั่ง server ของเรา (นอกเหนือจาก validation ของ API จริง)
  if (!id || !name || Number.isNaN(priceNum) || priceNum < 0) {
    return res.status(400).render('products/new', {
      error: 'กรุณากรอก ID / ชื่อ / ราคา ให้ถูกต้อง',
      form: { id, name, price, category, description, imageUrl }
    });
  }

  try {
    const payload = { id, name, price: priceNum, category, description, imageUrl };
    const resp = await axios.post(`${API_BASE}/products`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // หา id จากผลลัพธ์เพื่อ redirect ไปหน้า show
    const created = resp.data || {};
    const createdId = created.id || id;
    return res.redirect(`/products/${encodeURIComponent(createdId)}`);
  } catch (err) {
    return res.status(400).render('products/new', {
      error: apiError(err),
      form: { id, name, price, category, description, imageUrl }
    });
  }
});

// DETAIL (ดึงจาก API ภายนอก)
app.get('/products/:id', async (req, res) => {
  try {
    const { data: item } = await axios.get(`${API_BASE}/products/${encodeURIComponent(req.params.id)}`);
    res.render('products/show', { item, formatTHB });
  } catch (err) {
    // ถ้าไม่เจอ แสดงหน้าไม่พบ
    res.status(404).render('products/show', { item: null, formatTHB });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT} (using ${API_BASE})`);
});
