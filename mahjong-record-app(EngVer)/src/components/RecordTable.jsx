import { formatCurrency } from "../utils/format";

function RecordTable({ records, onEdit, onDelete }) {
  return (
    <section className="panel">
      <h2>Record List</h2>

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
                      {record.type}
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
    </section>
  );
}

export default RecordTable;