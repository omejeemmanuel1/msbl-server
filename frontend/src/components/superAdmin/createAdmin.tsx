import React, { useState } from 'react';
import './createAdmin.css';
import { BsTrash } from 'react-icons/Bs';
import { TbTrashOff } from 'react-icons/Tb';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

const AdminForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      role: '',
    },
  ]);

  const handleAddUser = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        role: '',
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
    <div className="user-form-container">
      <div className="user-list">
      <h2>Create New Admin</h2>
      <button className="btn-user" onClick={handleAddUser}>
        Add another admin
      </button>
        {users.map((user, index) => (
          <div key={user.id} className="user-form">
            <form onSubmit={handleSubmit}>
              <div className="flex-container">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) =>
                      handleUserChange(index, 'firstName', e.target.value)
                    }
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) =>
                      handleUserChange(index, 'lastName', e.target.value)
                    }
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      handleUserChange(index, 'email', e.target.value)
                    }
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={user.department}
                    onChange={(e) =>
                      handleUserChange(index, 'department', e.target.value)
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
                      handleUserChange(index, 'role', e.target.value)
                    }
                    className="select"
                  >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
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
        Create Admins
      </button>
    </div>
    </>
  );
};

export default AdminForm;
