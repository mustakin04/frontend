import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
   
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("Email:", email);
  console.log("Password:", password);

    if (password !== confirmPassword) {
      return setError(
        "Passwords do not match"
      );
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/authentication/reset-password",
        {
          email,
          password,
        }
        
      );
      console.log({
  email,
  password,
});
      console.log("Password Updated");

      alert("Password Updated");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-96"
      >
        <h2 className="text-2xl mb-6 text-center">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-4"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;