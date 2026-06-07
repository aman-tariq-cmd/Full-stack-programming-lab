import { jsPDF } from 'jspdf';

export function generateInvoicePdf({ invoiceNumber, customer, services, subtotal, tax, totalAmount, date, dueDate, notes }) {
  const doc = new jsPDF();
  const taxAmount = (subtotal * tax) / 100;

  doc.setFontSize(22);
  doc.text('INVOICE', 20, 25);
  doc.setFontSize(10);
  doc.text('CRM Pro', 20, 32);

  doc.setFontSize(10);
  doc.text(`Invoice Number: ${invoiceNumber || 'DRAFT'}`, 140, 25);
  doc.text(`Date: ${date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()}`, 140, 32);
  if (dueDate) {
    doc.text(`Due: ${new Date(dueDate).toLocaleDateString()}`, 140, 39);
  }

  doc.setFontSize(11);
  doc.text('Bill To:', 20, 50);
  doc.setFontSize(10);
  doc.text(customer?.name || '', 20, 57);
  doc.text(customer?.email || '', 20, 63);

  let y = 80;
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text('Description', 20, y);
  doc.text('Qty', 110, y);
  doc.text('Unit Price', 130, y);
  doc.text('Total', 170, y);
  doc.setFont(undefined, 'normal');

  y += 8;
  services.forEach((s) => {
    const total = s.quantity * s.unitPrice;
    doc.text(s.description.substring(0, 40), 20, y);
    doc.text(String(s.quantity), 110, y);
    doc.text(`$${Number(s.unitPrice).toFixed(2)}`, 130, y);
    doc.text(`$${total.toFixed(2)}`, 170, y);
    y += 7;
  });

  y += 10;
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, y);
  y += 7;
  doc.text(`Tax (${tax}%): $${taxAmount.toFixed(2)}`, 140, y);
  y += 7;
  doc.setFont(undefined, 'bold');
  doc.text(`Total: $${totalAmount.toFixed(2)}`, 140, y);

  if (notes) {
    y += 15;
    doc.setFont(undefined, 'normal');
    doc.text('Notes:', 20, y);
    doc.text(notes.substring(0, 80), 20, y + 7);
  }

  doc.save(`${invoiceNumber || 'invoice-draft'}.pdf`);
}
