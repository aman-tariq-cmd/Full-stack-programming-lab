import express from 'express';
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
} from '../controllers/invoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getInvoices);
router.post('/', createInvoice);
router.get('/:id', getInvoiceById);

export default router;
