import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const View = () => {
    const {id} = useParams()
    const [employee, setEmployee]= useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employeetrack-backend.vercel.app/api/employee/${id}`, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(response.data.success) {
                    setEmployee(response.data.employee);
                }
            }catch(error)
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployee();
    }, []);

    return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Details</h1>

      {!employee ? (
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
                  <p className="font-medium">{employee.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{employee.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Date of Birth:</p>
                  <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{employee.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Designation:</p>
                  <p className="font-medium">{employee.designation}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Salary:</p>
                  <p className="font-medium">{employee.salary}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Gender:</p>
                  <p className="font-medium">{employee.gender}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Marital Status:</p>
                  <p className="font-medium">{employee.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
   );
}

export default View