import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Customer from './models/Customer.js';
import { CUSTOMER_STATUS } from './constants/customerStatus.js';

dotenv.config();

const customers = [
  { name: 'John Smith', email: 'john.smith@acme.com', phone: '+1-555-0101', company: 'Acme Corp', address: '123 Main St, New York, NY', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Sarah Johnson', email: 'sarah.j@techflow.io', phone: '+1-555-0102', company: 'TechFlow', address: '456 Oak Ave, San Francisco, CA', status: CUSTOMER_STATUS.LEAD },
  { name: 'Michael Chen', email: 'mchen@globalnet.com', phone: '+1-555-0103', company: 'GlobalNet', address: '789 Pine Rd, Seattle, WA', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Emily Davis', email: 'emily.davis@startup.co', phone: '+1-555-0104', company: 'StartupCo', address: '321 Elm St, Austin, TX', status: CUSTOMER_STATUS.INACTIVE },
  { name: 'Robert Wilson', email: 'rwilson@enterprise.com', phone: '+1-555-0105', company: 'Enterprise Inc', address: '654 Maple Dr, Chicago, IL', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Lisa Anderson', email: 'lisa.a@designhub.com', phone: '+1-555-0106', company: 'DesignHub', address: '987 Cedar Ln, Portland, OR', status: CUSTOMER_STATUS.LEAD },
  { name: 'David Martinez', email: 'dmartinez@cloudsys.io', phone: '+1-555-0107', company: 'CloudSys', address: '147 Birch Blvd, Denver, CO', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Jennifer Taylor', email: 'jtaylor@mediagrp.com', phone: '+1-555-0108', company: 'Media Group', address: '258 Walnut St, Boston, MA', status: CUSTOMER_STATUS.INACTIVE },
  { name: 'James Brown', email: 'jbrown@fintech.io', phone: '+1-555-0109', company: 'FinTech Solutions', address: '369 Spruce Ave, Miami, FL', status: CUSTOMER_STATUS.LEAD },
  { name: 'Amanda White', email: 'awhite@healthplus.com', phone: '+1-555-0110', company: 'HealthPlus', address: '741 Ash Ct, Phoenix, AZ', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Christopher Lee', email: 'clee@logistics.com', phone: '+1-555-0111', company: 'LogiTrack', address: '852 Poplar Way, Atlanta, GA', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Michelle Garcia', email: 'mgarcia@edutech.edu', phone: '+1-555-0112', company: 'EduTech', address: '963 Willow Pl, Nashville, TN', status: CUSTOMER_STATUS.LEAD },
  { name: 'Daniel Rodriguez', email: 'drodriguez@retailmax.com', phone: '+1-555-0113', company: 'RetailMax', address: '174 Hickory Rd, Dallas, TX', status: CUSTOMER_STATUS.INACTIVE },
  { name: 'Jessica Moore', email: 'jmoore@greenenergy.co', phone: '+1-555-0114', company: 'GreenEnergy', address: '285 Sycamore St, San Diego, CA', status: CUSTOMER_STATUS.ACTIVE },
  { name: 'Matthew Clark', email: 'mclark@consultpro.com', phone: '+1-555-0115', company: 'ConsultPro', address: '396 Magnolia Dr, Philadelphia, PA', status: CUSTOMER_STATUS.LEAD },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Customer.deleteMany({});
    await User.deleteMany({ email: 'admin@crm.com' });

    const user = await User.create({
      name: 'Admin User',
      email: 'admin@crm.com',
      password: 'admin123',
    });

    const customerDocs = customers.map((c) => ({
      ...c,
      createdBy: user._id,
    }));

    await Customer.insertMany(customerDocs);

    console.log('Seed completed successfully');
    console.log(`Created user: admin@crm.com / admin123`);
    console.log(`Created ${customerDocs.length} customers`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
