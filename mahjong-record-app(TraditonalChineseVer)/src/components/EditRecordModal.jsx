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
          <h2>編輯記錄</h2>
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
              日期
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                required
              />
            </label>

            <label>
              結果
              <select
                name="type"
                value={formData.type}
                onChange={onChange}
              >
                <option value="win">贏</option>
                <option value="loss">輸</option>
              </select>
            </label>

            <label>
              金額
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={onChange}
                min="0"
                step="0.01"
                placeholder="輸入金額"
                required
              />
            </label>
          </div>

          <label>
            備忘錄
            <textarea
              name="note"
              value={formData.note}
              onChange={onChange}
              rows="3"
              placeholder="備忘錄事項"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              保存更改
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecordModal;