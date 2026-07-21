const TaskFilter = ({
  status,
  setStatus,
}) => {
  return (
    <select
      value={status}
      onChange={(e) =>
        setStatus(
          e.target.value
        )
      }
    >
      <option value="">
        All
      </option>

      <option>
        Pending
      </option>

      <option>
        In Progress
      </option>

      <option>
        Done
      </option>
    </select>
  );
};