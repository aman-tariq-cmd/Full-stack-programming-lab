import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import { CUSTOMER_STATUS } from '../constants/customerStatus.js';

const getUserId = (req) => {
  const id = req.user?._id || req.user?.id;
  return mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
};

export const getCustomers = async (req, res) => {
  try {
    const { search, status } = req.query;
    const userId = getUserId(req);
    const conditions = [{ createdBy: userId }];

    if (search) {
      conditions.push({ name: { $regex: search, $options: 'i' } });
    }

    if (status && Object.values(CUSTOMER_STATUS).includes(status)) {
      conditions.push({ status });
    }

    const query = conditions.length > 1 ? { $and: conditions } : conditions[0];

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, address, status, notes } = req.body;

    if (!name || !email || !phone || !status) {
      return res.status(400).json({ message: 'Name, email, phone, and status are required' });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      address,
      status,
      notes,
      createdBy: getUserId(req),
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: getUserId(req),
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: getUserId(req),
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const { name, email, phone, company, address, status, notes } = req.body;

    if (name !== undefined) customer.name = name;
    if (email !== undefined) customer.email = email;
    if (phone !== undefined) customer.phone = phone;
    if (company !== undefined) customer.company = company;
    if (address !== undefined) customer.address = address;
    if (status !== undefined) customer.status = status;
    if (notes !== undefined) customer.notes = notes;
    customer.updatedAt = Date.now();

    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: getUserId(req),
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.deleteOne();
    res.status(200).json({ message: 'Customer removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
