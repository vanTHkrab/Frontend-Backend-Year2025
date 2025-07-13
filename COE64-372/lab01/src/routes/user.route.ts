// src/routes/user.route.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware'; // สมมติว่ามี middleware ตรวจสอบสิทธิ์

const router = Router();

// Routes สำหรับ User
router.post('/', UserController.createUser); // สร้าง User
router.get('/', authenticate(['admin']), UserController.getAllUsers); // ดึง User ทั้งหมด (ต้องเป็น admin)
router.get('/:id', authenticate(['user', 'admin']), UserController.getUserById); // ดึง User ด้วย ID
router.put('/:id', authenticate(['user', 'admin']), UserController.updateUser); // อัปเดต User
router.delete('/:id', authenticate(['admin']), UserController.deleteUser); // ลบ User (ต้องเป็น admin)

export default router;