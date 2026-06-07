'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/axios';
import CustomerForm from '@/components/customers/CustomerForm';
import Spinner from '@/components/ui/Spinner';
import { getToast } from '@/components/providers/ToastProvider';

export default function EditCustomerPage() {
  const router = useRouter();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await api.get(`/api/customers/${id}`);
        setCustomer(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleSubmit = async (form) => {
    await api.put(`/api/customers/${id}`, form);
    getToast().success('Customer updated');
    router.push('/dashboard/customers');
  };

  if (loading) return <Spinner className="py-12" />;
  if (error) return <p className="text-accent-red text-sm">{error}</p>;

  return <CustomerForm initialData={customer} onSubmit={handleSubmit} submitLabel="Update Customer" />;
}
