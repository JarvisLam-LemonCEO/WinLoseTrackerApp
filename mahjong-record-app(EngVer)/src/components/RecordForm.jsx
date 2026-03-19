function RecordForm({ formData, isEditing, onChange, onSubmit, onClear }) {
  return (
    <section className="panel">
      <h2>{isEditing ? "Edit Record" : "Add Record"}</h2>

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
            <select name="type" value={formData.type} onChange={onChange}>
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
            {isEditing ? "Update Record" : "Add Record"}
          </button>
          <button type="button" className="secondary-btn" onClick={onClear}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}

export default RecordForm;