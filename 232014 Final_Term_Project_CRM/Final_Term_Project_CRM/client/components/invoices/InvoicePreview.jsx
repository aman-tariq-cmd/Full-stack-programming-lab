'use client';

import PropTypes from 'prop-types';

export default function InvoicePreview({ invoiceNumber, customer, services, subtotal, tax, totalAmount, date, dueDate, notes }) {
  const taxAmount = (subtotal * tax) / 100;

  return (
    <div className="bg-white text-gray-900 rounded-lg p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
          <p className="text-sm text-gray-500 mt-1">CRM Pro</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Invoice Number</p>
          <p className="font-mono font-semibold text-lg">{invoiceNumber || 'DRAFT'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bill To</p>
          <p className="font-semibold">{customer?.name}</p>
          <p className="text-sm text-gray-600">{customer?.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm"><span className="text-gray-500">Date: </span>{date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
          {dueDate && (
            <p className="text-sm"><span className="text-gray-500">Due: </span>{new Date(dueDate).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <table className="w-full text-sm mb-6">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 text-gray-500">Description</th>
            <th className="text-right py-2 text-gray-500">Qty</th>
            <th className="text-right py-2 text-gray-500">Unit Price</th>
            <th className="text-right py-2 text-gray-500">Total</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-2">{s.description}</td>
              <td className="py-2 text-right font-mono">{s.quantity}</td>
              <td className="py-2 text-right font-mono">${Number(s.unitPrice).toFixed(2)}</td>
              <td className="py-2 text-right font-mono">${(s.quantity * s.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-48 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-mono">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax ({tax}%)</span>
            <span className="font-mono">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
            <span>Total</span>
            <span className="font-mono">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Notes</p>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}
    </div>
  );
}

InvoicePreview.propTypes = {
  invoiceNumber: PropTypes.string,
  customer: PropTypes.object,
  services: PropTypes.array.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dueDate: PropTypes.string,
  notes: PropTypes.string,
};
