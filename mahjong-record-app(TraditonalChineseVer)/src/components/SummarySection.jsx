import { formatCurrency, getMonthName } from "../utils/format";

function SummarySection({ title, items, type }) {
  return (
    <section className="panel">
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p className="empty-text">沒有記錄</p>
      ) : (
        <div className="card-list">
          {items.map((item) => (
            <div className="info-card" key={type === "year" ? item.year : item.key}>
              <h3>
                {type === "year"
                  ? item.year
                  : `${getMonthName(item.month)} ${item.year}`}
              </h3>

              <p><strong>總贏金額:</strong> {formatCurrency(item.totalWinAmount)}</p>
              <p><strong>總輸金額:</strong> {formatCurrency(item.totalLossAmount)}</p>
              <p><strong>贏次數:</strong> {item.winCount}</p>
              <p><strong>輸次數:</strong> {item.lossCount}</p>
              <p><strong>總金額:</strong> {formatCurrency(item.net)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SummarySection;