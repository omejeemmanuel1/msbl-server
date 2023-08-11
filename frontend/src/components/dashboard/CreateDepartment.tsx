import React, { useState } from 'react'
import NavBar from './NavBar';

const CreateDepartment = () => {
const [department, setDepartment] = useState('');


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      department
    };

    console.log(userData);
  };

  return (
    <>
    <NavBar />
    <div className="user-form2">
      <h2>Create New Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label>Department:</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="input" />
        </div>
        <button className="btn-add2" type="submit">Create Department</button>
      </form>
    </div>
    </>
  )
}

export default CreateDepartment