// import React, { useState } from "react";
// import "../App.css";
// import Axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
  
//     const navigate = useNavigate()
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       Axios.post("http://localhost:5000/auth/forgot-password", {
//         email,
//       }).then(response => {
//           if(response.data.status) {
//             alert("check you email for reset password link")
//               navigate('/login')
//           }
          
//       }).catch(err => {
//           console.log(err)
//       })
//     };
//   return (
//     <div className="sign-up-container">
//       <form className="sign-up-form" onSubmit={handleSubmit}>
//         <h2>Forgot Password</h2>
        

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           autoComplete="off"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button type="submit">Send</button>
//       </form>
//     </div>
//   )
// }

// export default ForgotPassword



























import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/user/forgot-password", { email })
      .then((response) => {
        if (response.data.status) {
          alert("Check your email for reset password link");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
