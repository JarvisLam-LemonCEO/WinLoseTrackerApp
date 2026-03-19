import { formatCurrency, getMonthName, getResultLabel } from "../utils/format";

function RecordsListModal({
  isOpen,
  title,
  records,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card modal-large"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {records.length === 0 ? (
          <p className="empty-text">No matching records.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Result</th>
                  <th>Amount</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>
                      <span className={record.type === "win" ? "badge win" : "badge loss"}>
                        {getResultLabel(record.type)}
                      </span>
                    </td>
                    <td>{formatCurrency(record.amount)}</td>
                    <td>{record.note || "-"}</td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => onEdit(record)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => onDelete(record.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordsListModal;