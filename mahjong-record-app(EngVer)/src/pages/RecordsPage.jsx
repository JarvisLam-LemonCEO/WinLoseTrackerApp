import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import RecordForm from "../components/RecordForm";
import RecordTable from "../components/RecordTable";
import EditRecordModal from "../components/EditRecordModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAvailableYears, getFilteredRecords } from "../utils/summary";

const STORAGE_KEY = "mahjong-records-v1";

function RecordsPage() {
  const [records, setRecords] = useLocalStorage(STORAGE_KEY, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const [addFormData, setAddFormData] = useState({
    date: "",
    type: "win",
    amount: "",
    note: "",
  });

  const [editFormData, setEditFormData] = useState({
    date: "",
    type: "win",
    amount: "",
    note: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const availableYears = useMemo(() => getAvailableYears(records), [records]);

  useEffect(() => {
    const yearFromUrl = searchParams.get("year");
    const monthFromUrl = searchParams.get("month");

    if (yearFromUrl) {
      setSelectedYear(yearFromUrl);
    } else {
      setSelectedYear("all");
    }

    if (monthFromUrl) {
      setSelectedMonth(monthFromUrl);
    } else {
      setSelectedMonth("all");
    }
  }, [searchParams]);

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, selectedYear, selectedMonth);
  }, [records, selectedYear, selectedMonth]);

  function updateUrlParams(year, month) {
    setSearchParams({
      year,
      month,
    });
  }

  function resetAddForm() {
    setAddFormData({
      date: "",
      type: "win",
      amount: "",
      note: "",
    });
  }

  function closeEditModal() {
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditFormData({
      date: "",
      type: "win",
      amount: "",
      note: "",
    });
  }

  function handleAddChange(event) {
    const { name, value } = event.target;
    setAddFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddSubmit(event) {
    event.preventDefault();

    if (!addFormData.date || !addFormData.amount) {
      alert("Please enter date and amount.");
      return;
    }

    const cleanAmount = Math.abs(Number(addFormData.amount));

    if (Number.isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const newRecord = {
      id: crypto.randomUUID(),
      date: addFormData.date,
      type: addFormData.type,
      amount: cleanAmount,
      note: addFormData.note.trim(),
    };

    setRecords((prev) => [...prev, newRecord]);
    resetAddForm();
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    if (!editFormData.date || !editFormData.amount) {
      alert("Please enter date and amount.");
      return;
    }

    const cleanAmount = Math.abs(Number(editFormData.amount));

    if (Number.isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    setRecords((prev) =>
      prev.map((record) =>
        record.id === editingId
          ? {
              ...record,
              date: editFormData.date,
              type: editFormData.type,
              amount: cleanAmount,
              note: editFormData.note.trim(),
            }
          : record
      )
    );

    closeEditModal();
  }

  function handleEdit(record) {
    setEditingId(record.id);
    setEditFormData({
      date: record.date || "",
      type: record.type || "win",
      amount: String(record.amount ?? ""),
      note: record.note || "",
    });
    setIsEditModalOpen(true);
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Delete this record?");
    if (!confirmed) return;

    setRecords((prev) => prev.filter((record) => record.id !== id));

    if (editingId === id) {
      closeEditModal();
    }
  }

  function handleYearChange(value) {
    setSelectedYear(value);
    updateUrlParams(value, "all");
  }

  function handleMonthChange(value) {
    setSelectedMonth(value);
    updateUrlParams(selectedYear, value);
  }

  return (
    <Layout title="Records">
      <RecordForm
        formData={addFormData}
        isEditing={false}
        onChange={handleAddChange}
        onSubmit={handleAddSubmit}
        onClear={resetAddForm}
      />

      <section className="panel">
        <h2>Filter Records</h2>

        <div className="filter-row">
          <label>
            Year
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            Month
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              <option value="all">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
        </div>
      </section>

      <RecordTable
        records={filteredRecords}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditRecordModal
        isOpen={isEditModalOpen}
        formData={editFormData}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
        onClose={closeEditModal}
      />
    </Layout>
  );
}

export default RecordsPage;