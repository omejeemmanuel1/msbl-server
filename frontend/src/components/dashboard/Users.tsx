import React, { useState } from 'react';
import './adminDashboard.css';
import NavBar from './NavBar';

const Users = () => {
  const [usersData, setUsersData] = useState([
    { id: 1, fullName: 'John Doe', department: 'HR', role: 'Admin', isActive: true },
    { id: 2, fullName: 'Jane Smith', department: 'Finance', role: 'User', isActive: true },
    // Add more user data
  ]);

  const toggleActivation = (userId: number) => {
    setUsersData(prevUsersData => {
      return prevUsersData.map(user => {
        if (user.id === userId) {
          return { ...user, isActive: !user.isActive };
        }
        return user;
      });
    });
  };

  return (
    <>
    <NavBar />
    <div className="users-container">
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className={`action-button ${user.isActive ? "active" : "inactive"}`}
                  onClick={() => toggleActivation(user.id)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Users;
