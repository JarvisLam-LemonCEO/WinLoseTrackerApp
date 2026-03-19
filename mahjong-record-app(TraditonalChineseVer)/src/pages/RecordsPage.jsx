import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import RecordForm from "../components/RecordForm";
import RecordTable from "../components/RecordTable";
import EditRecordModal from "../components/EditRecordModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAvailableYears, getFilteredRecords } from "../utils/summary";

const STORAGE_KEY = "mahjong-records-v1";

function RecordsPage() {
  const [records, setRecords] = useLocalStorage(STORAGE_KEY, []);
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

  const filteredRecords = useMemo(() => {
    return getFilteredRecords(records, selectedYear, selectedMonth);
  }, [records, selectedYear, selectedMonth]);

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
      alert("請輸入日期和金額");
      return;
    }

    const cleanAmount = Math.abs(Number(addFormData.amount));

    if (Number.isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("金額要大過 0");
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
      alert("請輸入日期和金額");
      return;
    }

    const cleanAmount = Math.abs(Number(editFormData.amount));

    if (Number.isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("金額要大過 0");
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
    const confirmed = window.confirm("刪除這個記錄?");
    if (!confirmed) return;

    setRecords((prev) => prev.filter((record) => record.id !== id));

    if (editingId === id) {
      closeEditModal();
    }
  }

  return (
    <Layout title="記錄">
      <RecordForm
        formData={addFormData}
        isEditing={false}
        onChange={handleAddChange}
        onSubmit={handleAddSubmit}
        onClear={resetAddForm}
      />

      <section className="panel">
        <h2>篩選記錄</h2>

        <div className="filter-row">
          <label>
            年份
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedMonth("all");
              }}
            >
              <option value="all">所有年份</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            月份
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">所有月份</option>
              <option value="1">1月</option>
              <option value="2">2月</option>
              <option value="3">3月</option>
              <option value="4">4月</option>
              <option value="5">5月</option>
              <option value="6">6月</option>
              <option value="7">7月</option>
              <option value="8">8月</option>
              <option value="9">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
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