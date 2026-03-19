import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import YearSummaryPage from "./pages/YearSummaryPage";
import MonthSummaryPage from "./pages/MonthSummaryPage";
import RecordsPage from "./pages/RecordsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/year-summary" element={<YearSummaryPage />} />
        <Route path="/month-summary" element={<MonthSummaryPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;