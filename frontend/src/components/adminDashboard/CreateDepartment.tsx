import React, { useState } from "react";
import NavBar from "./NavBar";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateDepartment = () => {
  const [department, setDepartment] = useState("");
  const { createDepartment } = useData();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const departmentData = {
      departmentName: department,
    };

    try {
      const response = await createDepartment(departmentData);
      console.log("Department created:", response);
      toast.success("Department created successfully!");
      setDepartment("");
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Error creating department!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-form2">
        <h2 style={{ textAlign: "center" }}>Create New Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group2">
            <label>Department:</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input"
            />
          </div>
          <button className="btn-add2" type="submit">
            Create Department
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateDepartment;
