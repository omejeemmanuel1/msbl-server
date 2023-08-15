import React, { useState } from "react";
import './createAdmin.css';
import { BsTrash } from "react-icons/Bs";
import { TbTrashOff } from "react-icons/Tb";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

const initialAdmin: Admin = {
  id: 1,
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  role: "",
};

const AdminForm: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([initialAdmin]);

  const { createAdmin } = useData();

  const handleAddAdmin = () => {
    setAdmins((prevAdmins) => [
      ...prevAdmins,
      {
        id: prevAdmins.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: "",
      },
    ]);
  };

  const handleRemoveAdmin = (index: number) => {
    setAdmins((prevAdmins) => prevAdmins.filter((_, i) => i !== index));
  };

  const handleAdminChange = (
    index: number,
    field: keyof Admin,
    value: string
  ) => {
    setAdmins((prevAdmins) => {
      const updatedAdmins = [...prevAdmins];
      updatedAdmins[index] = {
        ...updatedAdmins[index],
        [field]: value,
      };
      return updatedAdmins;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Remove the 'id' field from each user object
    const adminsWithoutIds = admins.map(({ id, ...rest }) => rest);

    try {
      const response = await createAdmin({ admins: adminsWithoutIds });
      console.log("Admins created:", response.data);
      toast.success("Admin(s) created successfully");
      setAdmins([initialAdmin]);
    } catch (error) {
      console.error("Error creating admins:", error);
      toast.error("Error creating admins:");
    }
  };

  return (
    <>
      <div className="user-form-container">
        <div className="user-list">
          <h2 style={{ textAlign: "center" }}>Create New Admin(s)</h2>
          <button className="btn-user" onClick={handleAddAdmin}>
            Add Admin
          </button>
          <form onSubmit={handleSubmit}>
            {admins.map((admin, index) => (
              <div key={admin.id} className="user-form">
                <div className="flex-container">
                  <div className="form-group">
                    <label>Firstname:</label>
                    <input
                      type="text"
                      value={admin.firstName}
                      placeholder="First Name"
                      onChange={(e) =>
                        handleAdminChange(index, "firstName", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Lastname:</label>
                    <input
                      type="text"
                      value={admin.lastName}
                      placeholder="Last Name"
                      onChange={(e) =>
                        handleAdminChange(index, "lastName", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={admin.email}
                      placeholder="admin@example.com"
                      onChange={(e) =>
                        handleAdminChange(index, "email", e.target.value)
                      }
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={admin.department}
                      onChange={(e) =>
                        handleAdminChange(index, "department", e.target.value)
                      }
                      className="dept"
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT (Information Technology)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="role-label">Role:</label>
                    <select
                      value={admin.role}
                      onChange={(e) =>
                        handleAdminChange(index, "role", e.target.value)
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
                    onClick={() => handleRemoveAdmin(index)}
                  >
                    <BsTrash className="trash" />
                    <TbTrashOff className="trash-hover" />
                  </button>
                </div>
              </div>
            ))}
            <button className="admin-btn-create" type="submit">
              Create Admin(s)
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminForm;
