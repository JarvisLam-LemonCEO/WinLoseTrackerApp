import { formatCurrency, getMonthName } from "../utils/format";

function SummarySection({ title, items, type }) {
  return (
    <section className="panel">
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p className="empty-text">No records yet.</p>
      ) : (
        <div className="card-list">
          {items.map((item) => (
            <div className="info-card" key={type === "year" ? item.year : item.key}>
              <h3>
                {type === "year"
                  ? item.year
                  : `${getMonthName(item.month)} ${item.year}`}
              </h3>

              <p><strong>Total Win Amount:</strong> {formatCurrency(item.totalWinAmount)}</p>
              <p><strong>Total Loss Amount:</strong> {formatCurrency(item.totalLossAmount)}</p>
              <p><strong>Win Count:</strong> {item.winCount}</p>
              <p><strong>Loss Count:</strong> {item.lossCount}</p>
              <p><strong>Net:</strong> {formatCurrency(item.net)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SummarySection;