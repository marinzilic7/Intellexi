// src/components/FilterForm.tsx

import React from "react";

interface FilterFormProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: () => void;
  onReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
  onReset,
}) => {
  return (
    <div className="mb-4 d-flex align-items-center flex-wrap gap-3">
      <div>
        <label>Od: </label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={onStartDateChange}
        />
      </div>
      <div>
        <label>Do: </label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={onEndDateChange}
        />
      </div>
      <div className="d-flex gap-2 align-items-end">
        <button className="btn btn-primary" onClick={onFilter}>
          Filtriraj
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          Poništi
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
