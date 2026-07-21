import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://crm-api.iatlasstudy.com/api/v1/authentication/forgot-password",
        { email },
       
        
      );
       console.log(res.data.message)
       // token save
    //   localStorage.setItem("token", res.data.token);

    //    // ✅ Save user data for sidebar & routing
    // localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      // Email verified হলে Reset Password page-এ যাও
      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded p-2 mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-blue-600 mt-5 cursor-pointer"
        >
          Back to Login
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;