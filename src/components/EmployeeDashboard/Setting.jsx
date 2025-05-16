// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { useAuth } from "../../context/authContext";

// const Setting = () =>{
//     const navigate = useNavigate();
//     const { user } = useAuth();
//     const [setting, setSetting] = useState({
//         userId: user._id,
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null); // ✅ Add success message state
//     const handleChange = (e) => {
//         const { name, value } = e. target;
//         setSetting({ ...setting, [name] : value});
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (setting.newPassword !== setting.confirmPassword) {
//             setError("Password not matched");
//             setSuccess(null); // ✅ Clear success if there's an error
//         } else {
//             try {
//                 const response = await axios.put(
//                     "http://localhost:5000/api/setting/change-password",
//                     setting,
//                     {
//                         headers  : {
//                             Authorization : `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 );
//                 if (response.data.success) {
//                     setSuccess("Password changed successfully."); // ✅ Set success message
//                     // navigate("/admin-dashboard/employees");
//                     setError("")
//                     setSetting({      //added
//                         userId: user._id,
//                         oldPassword: "",
//                         newPassword: "",
//                         confirmPassword: "",
//                     });
//                 }
//             }catch(error){
//                 if(error.response && !error.response.data.success){
//                     setError(error.response.data.error);
//                     setSuccess(null); // ✅ Clear success if there's an error
//                 }
//             }
//         }
//     };

//     return(
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
//             <h2 className="text-2xl font-bold mb-6">Change Password</h2>
//             {error && <p className="text-red-500">{error}</p>}         {/* ✅ Show error message */}
//             {success && <p className="text-green-600">{success}</p>}     {/* ✅ Show success message */}
//             {/* <p className="text-red-500">{error}</p> */}
//             <form onSubmit={handleSubmit}>
//                 {/* Department Name */}
//                 <div>
//                     <label className="text-sm font-medium text-gray-700">
//                      Old Password
//                     </label> 
//                     <input
//                     type="password"
//                     name="oldPassword"
//                     placeholder="Change Password"
//                     onChange={handleChange}
//                     className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//                     required/>               
//                 </div>        
//                 <div>
//                     <label className="text-sm font-medium text-gray-700">
//                         New Password 
//                     </label> 
//                     <input
//                     type="password"
//                     name="newPassword"
//                     placeholder="New Password"
//                     onChange={handleChange}
//                     className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//                     required   
//                     />
//                 </div>  
//                 <div>
//                     <label className="text-sm font-medium text-gray-700">
//                         Confirm Password
//                     </label>
//                     <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     onChange={handleChange}
//                     className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//                     required
//                     />
//                 </div>

//                 <button
//                 type="submit"
//                 className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
//                     Change Password
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default Setting;





























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Validation checks for new password
  const minLength = setting.newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(setting.newPassword);
  const hasNumber = /\d/.test(setting.newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(setting.newPassword);
  const isPasswordValid = minLength && hasUppercase && hasNumber && hasSpecialChar;
  const doPasswordsMatch = setting.newPassword === setting.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra checks before submission
    if (!isPasswordValid) {
      setError("New password does not meet the required criteria.");
      setSuccess(null);
      return;
    }
    if (!doPasswordsMatch) {
      setError("Passwords do not match.");
      setSuccess(null);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSuccess("Password changed successfully.");
        setError(null);
        setSetting({
          userId: user._id,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
        setSuccess(null);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={setting.oldPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={setting.newPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <div className="mt-2 text-sm">
            <p className={minLength ? "text-green-600" : "text-red-600"}>
              • Minimum 8 characters
            </p>
            <p className={hasUppercase ? "text-green-600" : "text-red-600"}>
              • At least 1 uppercase letter
            </p>
            <p className={hasNumber ? "text-green-600" : "text-red-600"}>
              • At least 1 number
            </p>
            <p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
              • At least 1 special character
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={setting.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {!doPasswordsMatch && setting.confirmPassword.length > 0 && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isPasswordValid || !doPasswordsMatch}
          className={`w-full mt-6 py-2 px-4 rounded-md font-bold text-white ${
            isPasswordValid && doPasswordsMatch
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
