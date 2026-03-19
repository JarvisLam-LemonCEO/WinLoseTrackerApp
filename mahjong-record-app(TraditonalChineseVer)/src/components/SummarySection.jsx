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
        <p className="empty-text">沒有記錄</p>
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
                <strong>總贏金額:</strong> {formatCurrency(item.totalWinAmount)}
              </p>
              <p>
                <strong>總輸金額:</strong> {formatCurrency(item.totalLossAmount)}
              </p>
              <p>
                <strong>贏次數:</strong> {item.winCount}
              </p>
              <p>
                <strong>輸次數:</strong> {item.lossCount}
              </p>
              <p>
                <strong>淨贏金額:</strong> {formatCurrency(item.net)}
              </p>

              <div className="summary-card-hint">檢視records</div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SummarySection;