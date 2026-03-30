import { useState } from 'react'
import './App.css'
import InvoiceForm from './components/InvoiceForm'
import ProductTable from './components/ProductTable'
import Summary from './components/Summary'
import InvoicePreview from './components/InvoicePreview'

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

  // Update a specific field in a product row when the user types
  const handleProductChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  // Add a new empty product row to the list
  const addProduct = () => {
    setProducts([...products, { id: Date.now(), name: '', qty: 1, price: 0 }])
  }

  // Remove a product row — at least one row must stay
  const removeProduct = (id) => {
    if (products.length > 1) setProducts(products.filter(p => p.id !== id))
  }

  // Trigger the browser print dialog to print the invoice
  const handlePrint = () => window.print()

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
          <InvoiceForm
            invoiceMeta={invoiceMeta} setInvoiceMeta={setInvoiceMeta}
            supplier={supplier} setSupplier={setSupplier}
            customer={customer} setCustomer={setCustomer}
          />
          <ProductTable
            products={products}
            onProductChange={handleProductChange}
            onAddProduct={addProduct}
            onRemoveProduct={removeProduct}
          />
          <Summary
            taxRate={taxRate} setTaxRate={setTaxRate}
            discount={discount} setDiscount={setDiscount}
          />
        </div>

        {/* Right column — live invoice preview */}
        <InvoicePreview
          invoiceMeta={invoiceMeta}
          supplier={supplier}
          customer={customer}
          products={products}
          taxRate={taxRate}
          discount={discount}
          onPrint={handlePrint}
        />
      </div>
    </div>
  )
}

export default App
