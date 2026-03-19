import { useNavigate } from "react-router-dom";
import { formatCurrency, getMonthName } from "../utils/format";

function SummarySection({ title, items, type }) {
  const navigate = useNavigate();

  function handleCardClick(item) {
    if (type === "year") {
      navigate(`/records?year=${item.year}&month=all`);
      return;
    }

    if (type === "month") {
      navigate(`/records?year=${item.year}&month=${item.month}`);
    }
  }

  return (
    <section className="panel">
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p className="empty-text">No records yet.</p>
      ) : (
        <div className="card-list">
          {items.map((item) => (
            <button
              type="button"
              key={type === "year" ? item.year : item.key}
              className="info-card summary-link-card"
              onClick={() => handleCardClick(item)}
            >
              <h3>
                {type === "year"
                  ? item.year
                  : `${getMonthName(item.month)} ${item.year}`}
              </h3>

              <p>
                <strong>Total Win Amount:</strong> {formatCurrency(item.totalWinAmount)}
              </p>
              <p>
                <strong>Total Loss Amount:</strong> {formatCurrency(item.totalLossAmount)}
              </p>
              <p>
                <strong>Win Count:</strong> {item.winCount}
              </p>
              <p>
                <strong>Loss Count:</strong> {item.lossCount}
              </p>
              <p>
                <strong>Net:</strong> {formatCurrency(item.net)}
              </p>

              <div className="summary-card-hint">Click to view records</div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SummarySection;