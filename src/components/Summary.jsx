// Tax rate and discount inputs
function Summary({ taxRate, setTaxRate, discount, setDiscount }) {
  return (
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
  )
}

export default Summary
