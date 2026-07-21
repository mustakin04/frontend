import { useEffect, useState } from "react";
import {
  addComment,
  getComments,
} from "../../services/taskService";

const CommentSection = ({ taskId, refreshTask }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskId) {
      loadComments();
    }
  }, [taskId]);

  const loadComments = async () => {
  try {
    const res = await getComments(taskId);

    console.log(res);

    setComments(res.data || []);
  } catch (error) {
    console.log(error);
    setComments([]);
  }
};

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(taskId, comment);

      setComment("");

      await loadComments();

      refreshTask?.();
    } catch (error) {
      console.log("Add comment error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Comments
      </h2>

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write comment..."
          className="border flex-1 rounded px-3 py-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 rounded"
        >
          Send
        </button>
      </div>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((item) => (
            <div
              key={item._id}
              className="border rounded p-3"
            >
              <h4 className="font-semibold">
                {item.user?.name}
              </h4>

              <p>{item.comment}</p>

              <small className="text-gray-500">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;