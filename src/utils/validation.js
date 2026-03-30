// Check if contact number is exactly 10 digits
export const isInvalidContact = (val) =>
  val.trim() !== '' && !/^[0-9]{10}$/.test(val.trim())

// Check if GST number follows the standard 15-character Indian format
export const isInvalidGST = (val) =>
  val.trim() !== '' && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val.trim())
