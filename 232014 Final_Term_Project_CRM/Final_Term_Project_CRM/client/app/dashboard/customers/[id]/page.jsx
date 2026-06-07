'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import api from '@/lib/axios';
import StatusBadge from '@/components/ui/StatusBadge';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/Modal';
import { getToast } from '@/components/providers/ToastProvider';

export default function CustomerDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, invoicesRes] = await Promise.all([
          api.get(`/api/customers/${id}`),
          api.get(`/api/invoices?customerId=${id}`),
        ]);
        setCustomer(customerRes.data);
        setInvoices(invoicesRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load customer');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/customers/${id}`);
      getToast().success('Customer deleted');
      router.push('/dashboard/customers');
    } catch (err) {
      getToast().error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner className="py-12" />;
  if (error) return <p className="text-accent-red text-sm">{error}</p>;

  const fields = [
    { label: 'Email', value: customer.email },
    { label: 'Phone', value: customer.phone },
    { label: 'Company', value: customer.company || '—' },
    { label: 'Address', value: customer.address || '—' },
    { label: 'Status', value: <StatusBadge status={customer.status} /> },
    { label: 'Notes', value: customer.notes || '—' },
    { label: 'Created', value: new Date(customer.createdAt).toLocaleString() },
    { label: 'Updated', value: new Date(customer.updatedAt).toLocaleString() },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-text-primary">{customer.name}</h2>
        <div className="flex gap-2">
          <Link href={`/dashboard/customers/${id}/edit`}>
            <Button variant="secondary"><Pencil className="w-4 h-4 mr-2" />Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDelete(true)}>
            <Trash2 className="w-4 h-4 mr-2" />Delete
          </Button>
        </div>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs uppercase tracking-wider text-text-muted mb-1">{label}</p>
            <div className="text-sm font-mono text-text-primary">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border-subtle">
          <h3 className="font-semibold text-text-primary">Invoice History</h3>
        </div>
        {invoices.length === 0 ? (
          <p className="p-5 text-text-secondary text-sm">No invoices for this customer</p>
        ) : (
          <div className="divide-y divide-border-subtle">
            {invoices.map((inv) => (
              <div key={inv._id} className="px-5 py-3 flex justify-between items-center hover:bg-bg-elevated">
                <div>
                  <p className="font-mono text-sm text-primary">{inv.invoiceNumber}</p>
                  <p className="text-xs text-text-muted">{new Date(inv.date).toLocaleDateString()}</p>
                </div>
                <p className="font-mono text-sm text-text-primary">${inv.totalAmount?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        loading={deleting}
      />
    </div>
  );
}
