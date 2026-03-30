// Calculate the total for a single product row (qty x price)
const calculateProductTotal = (qty, price) =>
  (Number(qty) || 0) * (Number(price) || 0)

// Right side — live invoice preview that updates as the user types
function InvoicePreview({ invoiceMeta, supplier, customer, products, taxRate, discount, onPrint }) {
  // Total amount calculations
  const subtotal = products.reduce((acc, p) => acc + calculateProductTotal(p.qty, p.price), 0)
  const taxAmount = (subtotal * taxRate) / 100
  const grandTotal = subtotal + taxAmount - Number(discount)

  return (
    <div className="preview-section">
      {/* Print button bar — hidden when printing */}
      <div className="card no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>Invoice Preview</span>
        <button className="btn btn-accent" onClick={onPrint}>🖨 Print Invoice</button>
      </div>

      <div className="preview-wrapper">
        {/* The actual invoice layout — this is what gets printed */}
        <div className="invoice-preview print-only invoice-container">

          {/* Invoice title, number, and date */}
          <div className="invoice-header">
            <div className="invoice-title-wrapper">
              <h1>INVOICE</h1>
            </div>
            <div className="invoice-meta">
              <p>Invoice No: <strong>{invoiceMeta.invoiceNumber || 'N/A'}</strong></p>
              <p>Date: <strong>{invoiceMeta.date ? new Date(invoiceMeta.date).toLocaleDateString() : 'N/A'}</strong></p>
            </div>
          </div>

          {/* From (supplier) and Bill To (customer) address blocks */}
          <div className="invoice-addresses">
            <div className="address-block from-address">
              <h3>From</h3>
              <strong>{supplier.name || 'Your Business Name'}</strong>
              {supplier.address && <p>{supplier.address}</p>}
              {supplier.contact && <p>{supplier.contact}</p>}
              {supplier.gst && <p>Tax ID: {supplier.gst}</p>}
            </div>
            <div className="address-block to-address">
              <h3>Bill To</h3>
              <strong>{customer.name || 'Customer Name'}</strong>
              {customer.address ? <p>{customer.address}</p> : <p className="text-muted no-print" style={{ fontStyle: 'italic' }}>Address not provided</p>}
              {customer.contact && <p>{customer.contact}</p>}
            </div>
          </div>

          {/* Product table showing description, qty, price, and amount */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                item.name || item.price > 0 || item.qty > 0 ? (
                  <tr key={index}>
                    <td>{item.name || <span className="text-muted no-print" style={{ fontStyle: 'italic' }}>Unnamed Item</span>}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-right">₹{Number(item.price).toLocaleString('en-IN')}</td>
                    <td className="text-right font-semibold">₹{calculateProductTotal(item.qty, item.price).toLocaleString('en-IN')}</td>
                  </tr>
                ) : null
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center no-print" style={{ padding: '30px', color: '#9ca3af', fontStyle: 'italic' }}>
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals section — subtotal, tax, discount, and grand total */}
          <div className="invoice-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {taxRate > 0 && (
              <div className="total-row">
                <span>Tax ({taxRate}%):</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="total-row" style={{ color: '#ef4444' }}>
                <span>Discount:</span>
                <span>-₹{Number(discount).toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Footer message at the bottom of the invoice */}
          <div className="invoice-footer">
            <p>Thank you for choosing {supplier.name || 'us'}.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InvoicePreview
