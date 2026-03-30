import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Keep track of all the form data using state
  const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
  })

  // Supplier (your business) details
  const [supplier, setSupplier] = useState({
    name: 'TechNova Solutions',
    address: '123 silicon Shopers Udhna Surat 394210',
    contact: '9696609990',
    gst: '22ABCDE1234F1Z5',
  })

  // Customer (bill to) details
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    contact: '',
  })

  // List of products or services added to the invoice
  const [products, setProducts] = useState([
    { id: 1, name: '', qty: 0, price: 0 },
  ])

  // Tax rate and discount values for the invoice
  const [taxRate, setTaxRate] = useState(18)
  const [discount, setDiscount] = useState(0)

  // Validation helpers — contact must be exactly 10 digits, GST must match the standard 15-char format
  const isInvalidContact = (val) => val.trim() !== '' && !/^[0-9]{10}$/.test(val.trim())
  const isInvalidGST = (val) => val.trim() !== '' && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val.trim())

  // Calculate the total for a single product row (qty x price)
  const calculateProductTotal = (qty, price) => {
    return (Number(qty) || 0) * (Number(price) || 0);
  }

  // Add up all product totals to get the subtotal
  const subtotal = products.reduce(
    (acc, product) => acc + calculateProductTotal(product.qty, product.price),
    0
  );
  
  // Work out tax amount and the final grand total after discount
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount - Number(discount);

  // Update a specific field in a product row when the user types
  const handleProductChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  // Add a new empty product row to the list
  const addProduct = () => {
    setProducts([...products, { id: Date.now(), name: '', qty: 1, price: 0 }]);
  }

  // Remove a product row — at least one row must stay
  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  }

  // Trigger the browser print dialog to print the invoice
  const handlePrint = () => {
    window.print();
  }

  // Render the full page layout
  return (
    <div className="app-container">
      {/* Page header — shown on screen only, hidden when printing */}
      <header className="header no-print">
        <h1>Invoice Generator</h1>
        <p>Fill in the details on the left to generate a printable invoice.</p>
      </header>

      <div className="split-layout">
        {/* Left column — all the input forms, hidden when printing */}
        <div className="form-section no-print">
          
          {/* Invoice number, date, and supplier details */}
          <div className="card">
            <h2 className="card-title">Invoice Details</h2>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Invoice Number</label>
                <input 
                  type="text" 
                  value={invoiceMeta.invoiceNumber} 
                  onChange={(e) => setInvoiceMeta({...invoiceMeta, invoiceNumber: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Issue Date</label>
                <input 
                  type="date" 
                  value={invoiceMeta.date} 
                  onChange={(e) => setInvoiceMeta({...invoiceMeta, date: e.target.value})} 
                />
              </div>
            </div>

            {/* Supplier business information */}
            <h3 style={{marginTop: '20px', marginBottom: '10px', fontSize: '1rem', color: 'var(--text-muted)'}}>Your Details (Supplier)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  value={supplier.name} 
                  onChange={(e) => setSupplier({...supplier, name: e.target.value})} 
                  placeholder="Your Business Name"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={supplier.address} 
                  onChange={(e) => setSupplier({...supplier, address: e.target.value})} 
                  placeholder="Street, City, Zip"
                />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    value={supplier.contact}
                    onChange={(e) => setSupplier({...supplier, contact: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                    placeholder="10-digit mobile number"
                    style={isInvalidContact(supplier.contact) ? {borderColor: '#c0392b'} : {}}
                  />
                  {isInvalidContact(supplier.contact) && <span className="field-error">Enter a valid 10-digit number</span>}
                </div>
                <div className="form-group">
                  <label>Tax/GST Number (Optional)</label>
                  <input
                    type="text"
                    value={supplier.gst}
                    onChange={(e) => setSupplier({...supplier, gst: e.target.value.toUpperCase().slice(0, 15)})}
                    placeholder="e.g. 22ABCDE1234F1Z5"
                    style={isInvalidGST(supplier.gst) ? {borderColor: '#c0392b'} : {}}
                  />
                  {isInvalidGST(supplier.gst) && <span className="field-error">Invalid GST format (e.g. 22ABCDE1234F1Z5)</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Customer information*/}
          <div className="card">
            <h2 className="card-title">Bill To (Customer)</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  value={customer.name} 
                  onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                  placeholder="Client or Company Name"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={customer.address} 
                  onChange={(e) => setCustomer({...customer, address: e.target.value})} 
                  placeholder="Client's Address"
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  value={customer.contact}
                  onChange={(e) => setCustomer({...customer, contact: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                  placeholder="10-digit mobile number"
                  style={isInvalidContact(customer.contact) ? {borderColor: '#c0392b'} : {}}
                />
                {isInvalidContact(customer.contact) && <span className="field-error">Enter a valid 10-digit number</span>}
              </div>
            </div>
          </div>

          {/* Product list — each row is one item with qty, price, and total */}
          <div className="card">
            <h2 className="card-title">Products &amp; Services</h2>
            
            <table className="products-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="text-center" style={{width: '70px'}}>Qty</th>
                  <th className="text-right" style={{width: '110px'}}>Price (₹)</th>
                  <th className="text-right" style={{width: '110px'}}>Total</th>
                  <th style={{width: '36px'}}></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input type="text" placeholder="Item description" value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="1" placeholder="1" value={product.qty}
                        style={{textAlign: 'center'}}
                        onChange={(e) => handleProductChange(product.id, 'qty', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" min="0" placeholder="0" value={product.price}
                        style={{textAlign: 'right'}}
                        onChange={(e) => handleProductChange(product.id, 'price', e.target.value)} />
                    </td>
                    <td className="product-total-cell">
                      ₹{calculateProductTotal(product.qty, product.price).toLocaleString('en-IN')}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <button className="btn btn-danger btn-icon" onClick={() => removeProduct(product.id)}
                        disabled={products.length === 1} style={{opacity: products.length === 1 ? 0.4 : 1}}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button className="btn btn-primary" onClick={addProduct} style={{marginTop: '8px'}}>+ Add Item</button>
          </div>

          {/* Tax rate and discount inputs */}
          <div className="card calculation-card">
            <h2 className="card-title">Calculations</h2>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={taxRate} 
                  onChange={(e) => setTaxRate(Number(e.target.value))} 
                />
              </div>
              <div className="form-group">
                <label>Discount Amount (₹)</label>
                <input 
                  type="number" 
                  min="0" 
                  value={discount} 
                  onChange={(e) => setDiscount(Number(e.target.value))} 
                />
              </div>
            </div>
          </div>
          
        </div>

        {/* Right column — live invoice preview that updates as the user types */}
        <div className="preview-section">
          <div className="card no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px' }}>
            <span style={{fontWeight: 600, fontSize: '14px'}}>Invoice Preview</span>
            <button className="btn btn-accent" onClick={handlePrint}>🖨 Print Invoice</button>
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
                  {customer.address ? <p>{customer.address}</p> : <p className="text-muted no-print" style={{fontStyle: 'italic'}}>Address not provided</p>}
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
                        <td>{item.name || <span className="text-muted no-print" style={{fontStyle: 'italic'}}>Unnamed Item</span>}</td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-right">₹{Number(item.price).toLocaleString('en-IN')}</td>
                        <td className="text-right font-semibold">₹{calculateProductTotal(item.qty, item.price).toLocaleString('en-IN')}</td>
                      </tr>
                    ) : null
                  ))}
                  {/* Empty state protection */}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center no-print" style={{padding: '30px', color: '#9ca3af', fontStyle: 'italic'}}>
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
                <p>Thank you for choosing TechNova Solutions.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
