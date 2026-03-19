function EditRecordModal({
  isOpen,
  formData,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Edit Record</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="record-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                required
              />
            </label>

            <label>
              Result
              <select
                name="type"
                value={formData.type}
                onChange={onChange}
              >
                <option value="win">Win</option>
                <option value="loss">Loss</option>
              </select>
            </label>

            <label>
              Amount
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={onChange}
                min="0"
                step="0.01"
                placeholder="Enter amount"
                required
              />
            </label>
          </div>

          <label>
            Note
            <textarea
              name="note"
              value={formData.note}
              onChange={onChange}
              rows="3"
              placeholder="Optional note"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecordModal;