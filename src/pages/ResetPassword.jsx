
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();


  const validatePassword = (password) => {
    // Minimum 8 characters, at least 1 uppercase letter, 1 number and 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    Axios.post(`https://employeetrack-backend.vercel.app/api/user/resetPassword/${token}`, { password })
      .then((response) => {
        if (response.data.status) {
          alert("Password reset successful");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80">

        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          New Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
