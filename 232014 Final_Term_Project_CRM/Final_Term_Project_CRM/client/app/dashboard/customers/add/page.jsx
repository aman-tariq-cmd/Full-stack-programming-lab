'use client';

import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import CustomerForm from '@/components/customers/CustomerForm';
import { getToast } from '@/components/providers/ToastProvider';

export default function AddCustomerPage() {
  const router = useRouter();

  const handleSubmit = async (form) => {
    await api.post('/api/customers', form);
    getToast().success('Customer added successfully');
    router.push('/dashboard/customers');
  };

  return <CustomerForm onSubmit={handleSubmit} submitLabel="Add Customer" />;
}
