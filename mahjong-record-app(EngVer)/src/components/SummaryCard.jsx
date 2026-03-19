import { formatCurrency } from "../utils/format";

function SummaryCard({ title, summary, simple = false }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p><strong>Total Win Amount:</strong> {formatCurrency(summary.totalWinAmount)}</p>
      <p><strong>Total Loss Amount:</strong> {formatCurrency(summary.totalLossAmount)}</p>
      <p><strong>Win Count:</strong> {summary.winCount}</p>
      <p><strong>Loss Count:</strong> {summary.lossCount}</p>
      {!simple && <p><strong>Net:</strong> {formatCurrency(summary.net)}</p>}
      {simple && <p><strong>Net:</strong> {formatCurrency(summary.net)}</p>}
    </div>
  );
}

export default SummaryCard;