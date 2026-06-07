'use client';

import { useEffect, useState, useMemo } from 'react';
import { Plus, Trash2, Eye, Download, Save } from 'lucide-react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Spinner from '@/components/ui/Spinner';
import InvoicePreview from '@/components/invoices/InvoicePreview';
import { generateInvoicePdf } from '@/lib/generatePdf';
import { getToast } from '@/components/providers/ToastProvider';

const emptyService = { description: '', quantity: 1, unitPrice: 0 };

export default function GenerateInvoicePage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [services, setServices] = useState([{ ...emptyService }]);
  const [tax, setTax] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedInvoiceNumber, setSavedInvoiceNumber] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/api/customers');
        setCustomers(data);
      } catch (err) {
        getToast().error(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const selectedCustomer = customers.find((c) => c._id === customerId);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return customers;
    return customers.filter((c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase())
    );
  }, [customers, customerSearch]);

  const subtotal = services.reduce((sum, s) => sum + (s.quantity || 0) * (s.unitPrice || 0), 0);
  const totalAmount = subtotal + (subtotal * (tax || 0)) / 100;

  const updateService = (index, field, value) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: field === 'description' ? value : Number(value) } : s))
    );
  };

  const addRow = () => setServices((prev) => [...prev, { ...emptyService }]);

  const removeRow = (index) => {
    if (services.length <= 1) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const toast = getToast();
    if (!customerId) {
      toast.error('Please select a customer');
      return;
    }
    if (services.some((s) => !s.description || !s.quantity || s.unitPrice === undefined)) {
      toast.error('Please fill all required fields');
      return;
    }

    setSaving(true);
    try {
      const { data } = await api.post('/api/invoices', {
        customer: customerId,
        services,
        tax,
        dueDate: dueDate || undefined,
        notes,
      });
      setSavedInvoiceNumber(data.invoiceNumber);
      toast.success('Invoice saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!selectedCustomer) {
      getToast().error('Please select a customer');
      return;
    }
    generateInvoicePdf({
      invoiceNumber: savedInvoiceNumber || `INV-2026-${Date.now().toString().slice(-4)}`,
      customer: selectedCustomer,
      services,
      subtotal,
      tax,
      totalAmount,
      date: new Date(),
      dueDate,
      notes,
    });
  };

  if (loading) return <Spinner className="py-12" />;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Step 1: Customer */}
      <section className="bg-bg-surface border border-border-subtle rounded-lg p-5">
        <h3 className="text-sm font-medium uppercase tracking-wider text-text-muted mb-4">Step 1 — Select Customer</h3>
        <input
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full h-9 px-3 mb-3 rounded-md bg-bg-elevated border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-border-strong"
        />
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full h-9 px-3 rounded-md bg-bg-elevated border border-border-subtle text-sm text-text-primary focus:outline-none"
        >
          <option value="">Select a customer...</option>
          {filteredCustomers.map((c) => (
            <option key={c._id} value={c._id}>{c.name} — {c.email}</option>
          ))}
        </select>
      </section>

      {/* Step 2: Services */}
      <section className="bg-bg-surface border border-border-subtle rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-text-muted">Step 2 — Services</h3>
          <Button variant="ghost" onClick={addRow}><Plus className="w-4 h-4 mr-1" />Add Row</Button>
        </div>

        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
              <div className="sm:col-span-5">
                <Input
                  label={i === 0 ? 'Description' : undefined}
                  value={s.description}
                  onChange={(e) => updateService(i, 'description', e.target.value)}
                  placeholder="Service description"
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label={i === 0 ? 'Qty' : undefined}
                  type="number"
                  min="1"
                  value={s.quantity}
                  onChange={(e) => updateService(i, 'quantity', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label={i === 0 ? 'Unit Price' : undefined}
                  type="number"
                  min="0"
                  step="0.01"
                  value={s.unitPrice}
                  onChange={(e) => updateService(i, 'unitPrice', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                {i === 0 && <label className="block text-sm font-medium text-text-secondary mb-1.5">Total</label>}
                <p className="h-9 flex items-center font-mono text-sm text-text-primary">
                  ${((s.quantity || 0) * (s.unitPrice || 0)).toFixed(2)}
                </p>
              </div>
              <div className="sm:col-span-1">
                <button
                  onClick={() => removeRow(i)}
                  disabled={services.length <= 1}
                  className="h-9 w-9 flex items-center justify-center rounded-md text-text-secondary hover:text-accent-red disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3: Summary */}
      <section className="bg-bg-surface border border-border-subtle rounded-lg p-5">
        <h3 className="text-sm font-medium uppercase tracking-wider text-text-muted mb-4">Step 3 — Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input label="Tax (%)" type="number" min="0" value={tax} onChange={(e) => setTax(Number(e.target.value))} />
          <Input label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div className="mt-4 p-4 bg-bg-elevated rounded-md space-y-1 text-sm max-w-xs ml-auto">
          <div className="flex justify-between">
            <span className="text-text-secondary">Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Tax ({tax}%)</span>
            <span className="font-mono">${((subtotal * tax) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t border-border-subtle pt-2">
            <span>Total</span>
            <span className="font-mono">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
          <Eye className="w-4 h-4 mr-2" />Preview
        </Button>
        <Button variant="secondary" onClick={handleDownloadPdf}>
          <Download className="w-4 h-4 mr-2" />Download PDF
        </Button>
        <Button onClick={handleSave} loading={saving}>
          <Save className="w-4 h-4 mr-2" />Save Invoice
        </Button>
      </div>

      {showPreview && selectedCustomer && (
        <div className="mt-6">
          <InvoicePreview
            invoiceNumber={savedInvoiceNumber}
            customer={selectedCustomer}
            services={services}
            subtotal={subtotal}
            tax={tax}
            totalAmount={totalAmount}
            date={new Date()}
            dueDate={dueDate}
            notes={notes}
          />
        </div>
      )}
    </div>
  );
}
