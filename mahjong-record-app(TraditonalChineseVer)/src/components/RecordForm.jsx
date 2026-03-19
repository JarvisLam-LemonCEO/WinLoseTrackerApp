function RecordForm({ formData, isEditing, onChange, onSubmit, onClear }) {
  return (
    <section className="panel">
      <h2>新增記錄</h2>

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
            <select name="type" value={formData.type} onChange={onChange}>
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
            新增
          </button>
          <button type="button" className="secondary-btn" onClick={onClear}>
            清除
          </button>
        </div>
      </form>
    </section>
  );
}

export default RecordForm;