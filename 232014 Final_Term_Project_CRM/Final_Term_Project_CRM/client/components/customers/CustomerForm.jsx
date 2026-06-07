'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CUSTOMER_STATUS } from '@/lib/constants';
import { getToast } from '@/components/providers/ToastProvider';

const statusOptions = [
  { value: CUSTOMER_STATUS.LEAD, label: 'Lead' },
  { value: CUSTOMER_STATUS.ACTIVE, label: 'Active' },
  { value: CUSTOMER_STATUS.INACTIVE, label: 'Inactive' },
];

export default function CustomerForm({ initialData = {}, onSubmit, submitLabel = 'Save Customer' }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    company: initialData.company || '',
    address: initialData.address || '',
    status: initialData.status || CUSTOMER_STATUS.LEAD,
    notes: initialData.notes || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toast = getToast();

    if (!form.name || !form.email || !form.phone || !form.status) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-bg-surface border border-border-subtle rounded-lg p-5 md:p-6 space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name *" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email *" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Phone *" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Company" name="company" value={form.company} onChange={handleChange} />
      </div>
      <Input label="Address" name="address" value={form.address} onChange={handleChange} />
      <Select label="Status *" name="status" value={form.status} onChange={handleChange} options={statusOptions} id="status" />
      <Textarea label="Notes" name="notes" value={form.notes} onChange={handleChange} />
      <Button type="submit" loading={loading}>{submitLabel}</Button>
    </form>
  );
}

CustomerForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};
