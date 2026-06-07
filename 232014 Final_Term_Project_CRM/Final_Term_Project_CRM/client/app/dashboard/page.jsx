'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import api from '@/lib/axios';
import { getToken } from '@/lib/auth';
import { CUSTOMER_STATUS } from '@/lib/constants';
import StatCard from '@/components/ui/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/api/customers');
        setCustomers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === CUSTOMER_STATUS.ACTIVE).length,
    leads: customers.filter((c) => c.status === CUSTOMER_STATUS.LEAD).length,
    inactive: customers.filter((c) => c.status === CUSTOMER_STATUS.INACTIVE).length,
  };

  const recentCustomers = customers.slice(0, 5);

  if (error) {
    return <p className="text-accent-red text-sm">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={stats.total} accent="primary" loading={loading} />
        <StatCard title="Active Customers" value={stats.active} accent="secondary" loading={loading} />
        <StatCard title="Leads" value={stats.leads} accent="tertiary" loading={loading} />
        <StatCard title="Inactive" value={stats.inactive} accent="muted" loading={loading} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/customers/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </Link>
        <Link href="/dashboard/invoices/generate">
          <Button variant="secondary">
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
        </Link>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border-subtle">
          <h2 className="text-lg font-semibold text-text-primary">Recent Customers</h2>
        </div>

        {loading ? (
          <div className="p-8"><Spinner /></div>
        ) : recentCustomers.length === 0 ? (
          <p className="p-8 text-center text-text-secondary text-sm">
            No customers yet. Add customers or log in with the seeded account (admin@crm.com).
          </p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background text-text-secondary text-left">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Company</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map((c) => (
                    <tr key={c._id} className="border-t border-border-subtle hover:bg-bg-elevated transition-colors">
                      <td className="px-5 py-3 font-mono">
                        <Link href={`/dashboard/customers/${c._id}`} className="text-primary hover:underline">
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-mono text-text-secondary">{c.email}</td>
                      <td className="px-5 py-3 font-mono text-text-secondary">{c.company || '—'}</td>
                      <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border-subtle">
              {recentCustomers.map((c) => (
                <Link key={c._id} href={`/dashboard/customers/${c._id}`} className="block p-4 hover:bg-bg-elevated">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-text-primary">{c.name}</p>
                      <p className="text-xs text-text-secondary font-mono mt-1">{c.email}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
