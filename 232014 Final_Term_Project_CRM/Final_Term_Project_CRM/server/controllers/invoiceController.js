import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';

export const createInvoice = async (req, res) => {
  try {
    const { customer, services, tax, dueDate, notes } = req.body;

    if (!customer || !services || !Array.isArray(services) || services.length < 1) {
      return res.status(400).json({ message: 'Customer and at least one service are required' });
    }

    const customerExists = await Customer.findOne({
      _id: customer,
      createdBy: req.user._id,
    });

    if (!customerExists) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const computedServices = services.map((service) => ({
      description: service.description,
      quantity: service.quantity,
      unitPrice: service.unitPrice,
      total: service.quantity * service.unitPrice,
    }));

    const subtotal = computedServices.reduce((sum, s) => sum + s.total, 0);
    const taxAmount = tax || 0;
    const totalAmount = subtotal + (subtotal * taxAmount) / 100;

    const invoiceNumber = `INV-2026-${Date.now().toString().slice(-4)}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      customer,
      createdBy: req.user._id,
      services: computedServices,
      subtotal,
      tax: taxAmount,
      totalAmount,
      dueDate,
      notes,
    });

    const populated = await Invoice.findById(invoice._id).populate('customer', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const query = { createdBy: req.user._id };

    if (req.query.customerId) {
      query.customer = req.query.customerId;
    }

    const invoices = await Invoice.find(query)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    }).populate('customer', 'name email phone company address');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
