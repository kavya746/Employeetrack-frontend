import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Detail = () => {
    const {id} = useParams()
    const [leave, setLeave]= useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`https://employeetrack-backend.vercel.app/api/leave/detail/${id}`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(response.data.success) {
                    setLeave(response.data.leave);
                }
            }catch(error)
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
        };
        fetchLeave();
    }, []);

    const changeStatus = async(id, status) =>{
         try {
                const response = await axios.put(`https://employeetrack-backend.vercel.app/api/leave/${id}`, {status}, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(response.data.success) {
                    navigate('/admin-dashboard/leaves')
                }
            }catch(error)
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
    }

    return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Leave Details</h1>

      {!leave ? (
        <div className="flex justify-center items-center h-64">
          <div>Loading..</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <div className="p-6 bg-gray-50 h-[500px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Name:</p>
                  <p className="font-medium">{leave.employeeId.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{leave.employeeId.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Leave Type:</p>
                  <p className="font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Reason:</p>
                  <p className="font-medium">{leave.reason}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{leave.employeeId.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Start Date:</p>
                  <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">End Date:</p>
                  <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
             <p>
               <span className="text-lg font-bold">
                {leave.status === "Pending" ? "Action:" : "Status:"}
               </span>
               {leave.status === "Pending" ? (
                <div className="mt-2 flex justify-center gap-4">
                  <button
                    className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <> {leave.status} </>
              )}
            </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default Detail;