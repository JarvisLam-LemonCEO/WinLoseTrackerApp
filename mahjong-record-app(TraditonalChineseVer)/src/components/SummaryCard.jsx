import { formatCurrency } from "../utils/format";

function SummaryCard({ title, summary, simple = false }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p><strong>總贏金額:</strong> {formatCurrency(summary.totalWinAmount)}</p>
      <p><strong>總輸金額:</strong> {formatCurrency(summary.totalLossAmount)}</p>
      <p><strong>贏次數:</strong> {summary.winCount}</p>
      <p><strong>輸次數:</strong> {summary.lossCount}</p>
      {!simple && <p><strong>總金額:</strong> {formatCurrency(summary.net)}</p>}
      {simple && <p><strong>總金額:</strong> {formatCurrency(summary.net)}</p>}
    </div>
  );
}

export default SummaryCard;