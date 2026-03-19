import { formatCurrency } from "../utils/format";

function RecordTable({ records, onEdit, onDelete }) {
  return (
    <section className="panel">
      <h2>記錄列表</h2>

      {records.length === 0 ? (
        <p className="empty-text">沒有符合的記錄</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>結果</th>
                <th>金額</th>
                <th>備忘錄</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>
                    <span className={record.type === "win" ? "badge win" : "badge loss"}>
  {record.type === "win" ? "贏" : "輸"}
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
                      編輯
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(record.id)}
                    >
                      刪除
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