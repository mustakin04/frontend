const TaskStats = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="card">
        Total
        {stats.totalTasks}
      </div>

      <div className="card">
        Pending
        {stats.pendingTasks}
      </div>

      <div className="card">
        In Progress
        {stats.inProgressTasks}
      </div>

      <div className="card">
        Done
        {stats.doneTasks}
      </div>

      <div className="card">
        Overdue
        {stats.overdueTasks}
      </div>
    </div>
  );
};