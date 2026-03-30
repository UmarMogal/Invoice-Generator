// Calculate the total for a single product row (qty x price)
const calculateProductTotal = (qty, price) =>
  (Number(qty) || 0) * (Number(price) || 0)

// Product list — each row is one item with qty, price, and total
function ProductTable({ products, onProductChange, onAddProduct, onRemoveProduct }) {
  return (
    <div className="card">
      <h2 className="card-title">Products &amp; Services</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="text-center" style={{ width: '70px' }}>Qty</th>
            <th className="text-right" style={{ width: '110px' }}>Price (₹)</th>
            <th className="text-right" style={{ width: '110px' }}>Total</th>
            <th style={{ width: '36px' }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input type="text" placeholder="Item description" value={product.name}
                  onChange={(e) => onProductChange(product.id, 'name', e.target.value)} />
              </td>
              <td>
                <input type="number" min="1" placeholder="1" value={product.qty}
                  style={{ textAlign: 'center' }}
                  onChange={(e) => onProductChange(product.id, 'qty', e.target.value)} />
              </td>
              <td>
                <input type="number" min="0" placeholder="0" value={product.price}
                  style={{ textAlign: 'right' }}
                  onChange={(e) => onProductChange(product.id, 'price', e.target.value)} />
              </td>
              <td className="product-total-cell">
                ₹{calculateProductTotal(product.qty, product.price).toLocaleString('en-IN')}
              </td>
              <td style={{ textAlign: 'center' }}>
                <button className="btn btn-danger btn-icon" onClick={() => onRemoveProduct(product.id)}
                  disabled={products.length === 1} style={{ opacity: products.length === 1 ? 0.4 : 1 }}>
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={onAddProduct} style={{ marginTop: '8px' }}>+ Add Item</button>
    </div>
  )
}

export default ProductTable
