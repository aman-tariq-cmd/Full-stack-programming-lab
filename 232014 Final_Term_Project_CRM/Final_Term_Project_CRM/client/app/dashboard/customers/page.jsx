'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import api from '@/lib/axios';
import { CUSTOMER_STATUS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import Spinner from '@/components/ui/Spinner';
import { ConfirmModal } from '@/components/ui/Modal';
import { getToast } from '@/components/providers/ToastProvider';

function CustomersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCustomers = useCallback(async (searchVal, statusVal) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchVal) params.set('search', searchVal);
      if (statusVal) params.set('status', statusVal);
      const query = params.toString() ? `?${params.toString()}` : '';
      const { data } = await api.get(`/api/customers${query}`);
      setCustomers(data);
    } catch (err) {
      getToast().error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const query = params.toString();
      router.replace(`/dashboard/customers${query ? `?${query}` : ''}`, { scroll: false });
      fetchCustomers(search, status);
    }, search ? 300 : 0);

    return () => clearTimeout(timer);
  }, [search, status, fetchCustomers, router]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/api/customers/${deleteId}`);
      setCustomers((prev) => prev.filter((c) => c._id !== deleteId));
      getToast().success('Customer deleted');
      setDeleteId(null);
    } catch (err) {
      getToast().error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full h-9 pl-9 pr-3 rounded-md bg-bg-elevated border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-border-strong"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 px-3 rounded-md bg-bg-elevated border border-border-subtle text-sm text-text-primary focus:outline-none"
          >
            <option value="">All Status</option>
            <option value={CUSTOMER_STATUS.LEAD}>Lead</option>
            <option value={CUSTOMER_STATUS.ACTIVE}>Active</option>
            <option value={CUSTOMER_STATUS.INACTIVE}>Inactive</option>
          </select>
        </div>
        <Link href="/dashboard/customers/add">
          <Button><Plus className="w-4 h-4 mr-2" />Add Customer</Button>
        </Link>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8"><Spinner /></div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-text-secondary">No customers found</p>
            <p className="text-text-muted text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background text-text-secondary text-left">
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date Added</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, i) => (
                    <tr key={c._id} className="border-t border-border-subtle hover:bg-bg-elevated">
                      <td className="px-4 py-3 font-mono text-text-muted">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/customers/${c._id}`} className="font-mono text-primary hover:underline">{c.name}</Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{c.email}</td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{c.phone}</td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{c.company || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{formatDate(c.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/dashboard/customers/${c._id}/edit`} className="p-1.5 rounded text-text-secondary hover:text-primary hover:bg-bg-overlay">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => setDeleteId(c._id)} className="p-1.5 rounded text-text-secondary hover:text-accent-red hover:bg-bg-overlay">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border-subtle">
              {customers.map((c, i) => (
                <div key={c._id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-text-muted font-mono">#{i + 1}</span>
                      <Link href={`/dashboard/customers/${c._id}`} className="block font-medium text-primary">{c.name}</Link>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-xs font-mono text-text-secondary">{c.email} · {c.phone}</p>
                  <div className="flex gap-2 pt-1">
                    <Link href={`/dashboard/customers/${c._id}/edit`} className="text-xs text-primary">Edit</Link>
                    <button onClick={() => setDeleteId(c._id)} className="text-xs text-accent-red">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        loading={deleting}
      />
    </div>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={<Spinner className="py-12" />}>
      <CustomersContent />
    </Suspense>
  );
}
