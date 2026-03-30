import { isInvalidContact, isInvalidGST } from '../utils/validation'

// Invoice details, supplier info, and customer info forms
function InvoiceForm({ invoiceMeta, setInvoiceMeta, supplier, setSupplier, customer, setCustomer }) {
  return (
    <>
      {/* Invoice number, date, and supplier details */}
      <div className="card">
        <h2 className="card-title">Invoice Details</h2>
        <div className="form-grid-2">
          <div className="form-group">
            <label>Invoice Number</label>
            <input
              type="text"
              value={invoiceMeta.invoiceNumber}
              onChange={(e) => setInvoiceMeta({ ...invoiceMeta, invoiceNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Issue Date</label>
            <input
              type="date"
              value={invoiceMeta.date}
              onChange={(e) => setInvoiceMeta({ ...invoiceMeta, date: e.target.value })}
            />
          </div>
        </div>

        {/* Supplier business information */}
        <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '1rem', color: 'var(--text-muted)' }}>
          Your Details (Supplier)
        </h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              value={supplier.name}
              onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
              placeholder="Your Business Name"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={supplier.address}
              onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
              placeholder="Street, City, Zip"
            />
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                value={supplier.contact}
                onChange={(e) => setSupplier({ ...supplier, contact: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                placeholder="10-digit mobile number"
                style={isInvalidContact(supplier.contact) ? { borderColor: '#c0392b' } : {}}
              />
              {isInvalidContact(supplier.contact) && <span className="field-error">Enter a valid 10-digit number</span>}
            </div>
            <div className="form-group">
              <label>Tax/GST Number (Optional)</label>
              <input
                type="text"
                value={supplier.gst}
                onChange={(e) => setSupplier({ ...supplier, gst: e.target.value.toUpperCase().slice(0, 15) })}
                placeholder="e.g. 22ABCDE1234F1Z5"
                style={isInvalidGST(supplier.gst) ? { borderColor: '#c0392b' } : {}}
              />
              {isInvalidGST(supplier.gst) && <span className="field-error">Invalid GST format (e.g. 22ABCDE1234F1Z5)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Customer information  */}
      <div className="card">
        <h2 className="card-title">Bill To (Customer)</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="Client or Company Name"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              placeholder="Client's Address"
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={customer.contact}
              onChange={(e) => setCustomer({ ...customer, contact: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="10-digit mobile number"
              style={isInvalidContact(customer.contact) ? { borderColor: '#c0392b' } : {}}
            />
            {isInvalidContact(customer.contact) && <span className="field-error">Enter a valid 10-digit number</span>}
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceForm
