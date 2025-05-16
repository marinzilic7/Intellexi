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
    <div className="d-flex jusify-content-between align-items-center flex-wrap gap-3">
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
      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-primary mt-4 btn-sm" onClick={onFilter}>
          Filtriraj
        </button>
        <button className="btn btn-secondary mt-4 btn-sm" onClick={onReset}>
          Poništi
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
