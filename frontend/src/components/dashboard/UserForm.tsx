import React, { useState } from "react";
import "./adminDashboard.css";
import NavBar from "./NavBar";
import { BsTrash } from "react-icons/Bs";
import { TbTrashOff } from "react-icons/Tb";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
    },
  ]);

  const handleAddUser = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: "",
      },
    ]);
  };

  const handleRemoveUser = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const handleUserChange = (
    index: number,
    field: keyof User,
    value: string
  ) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = {
        ...updatedUsers[index],
        [field]: value,
      };
      return updatedUsers;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(users);
  };

  return (
    <>
      <NavBar />
      <div className="user-form-container">
        <div className="user-list">
          <h2>Create new user</h2>
          <button className="btn-user" onClick={handleAddUser}>
            Add users
          </button>
          {users.map((user, index) => (
            <div key={user.id} className="user-form">
              <form onSubmit={handleSubmit}>
                <div className="flex-container">
                  <div className="form-group">
                    <label>First name</label>
                    <input
                      type="text"
                      value={user.firstName}
                      placeholder="Xavier"
                      onChange={(e) =>
                        handleUserChange(index, "firstName", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      value={user.lastName}
                      placeholder="Amaechi"
                      onChange={(e) =>
                        handleUserChange(index, "lastName", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={user.email}
                      placeholder="useremail@example.com"
                      onChange={(e) =>
                        handleUserChange(index, "email", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={user.department}
                      onChange={(e) =>
                        handleUserChange(index, "department", e.target.value)
                      }
                      className="dept"
                    >
                      <option value="">Select Department</option>
                      <option value="GBD">Group Business Development</option>
                      <option value="stock">CRM Stockbroking</option>
                      <option value="contact">Contact</option>
                      <option value="investment">Investment Advisory</option>
                      <option value="wealth">Wealth Advisory</option>
                      <option value="operation">MSBL operations</option>
                      <option value="ICU">ICU(Internal Control Unit)</option>
                      <option value="IT">IT (Information Technology)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUserChange(index, "role", e.target.value)
                      }
                      className="select"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="initiator">Initiator</option>
                      <option value="checker">Checker</option>
                      <option value="requester">Requester</option>
                    </select>
                  </div>
                  <button
                    className="btn-remove"
                    type="button"
                    onClick={() => handleRemoveUser(index)}
                  >
                    <BsTrash className="trash" />
                    <TbTrashOff className="trash-hover" />
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
        <button className="btn-create" onClick={handleSubmit}>
          Create Users
        </button>
      </div>
    </>
  );
};

export default UserForm;
