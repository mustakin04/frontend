const TaskStatusBadge = ({
  status,
}) => {
  const colors = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    "In Progress":
      "bg-blue-100 text-blue-700",

    Done:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default TaskStatusBadge;