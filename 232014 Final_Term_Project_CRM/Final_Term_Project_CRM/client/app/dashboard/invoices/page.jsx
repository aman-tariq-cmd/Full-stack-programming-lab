'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await api.get('/api/invoices');
        setInvoices(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/dashboard/invoices/generate">
          <Button><Plus className="w-4 h-4 mr-2" />Generate Invoice</Button>
        </Link>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8"><Spinner /></div>
        ) : error ? (
          <p className="p-5 text-accent-red text-sm">{error}</p>
        ) : invoices.length === 0 ? (
          <p className="p-12 text-center text-text-secondary">No invoices yet</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background text-text-secondary text-left">
                    <th className="px-4 py-3 font-medium">Invoice #</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv._id} className="border-t border-border-subtle hover:bg-bg-elevated">
                      <td className="px-4 py-3 font-mono text-primary">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{inv.customer?.name}</td>
                      <td className="px-4 py-3 font-mono text-text-secondary">{new Date(inv.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-mono text-text-primary">${inv.totalAmount?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border-subtle">
              {invoices.map((inv) => (
                <div key={inv._id} className="p-4">
                  <p className="font-mono text-primary">{inv.invoiceNumber}</p>
                  <p className="text-sm text-text-secondary mt-1">{inv.customer?.name}</p>
                  <div className="flex justify-between mt-2 text-xs font-mono text-text-muted">
                    <span>{new Date(inv.date).toLocaleDateString()}</span>
                    <span className="text-text-primary">${inv.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
