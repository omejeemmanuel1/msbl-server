import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import NavBar from "./NavBar";
import { BsTrash } from "react-icons/Bs";
import { TbTrashOff } from "react-icons/Tb";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Department {
  id: number;
  departmentName: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
}

const initialUser: User = {
  id: 1,
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  role: "",
};

const UserForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([initialUser]);

  const [departments, setDepartments] = useState<Department[]>([]);
  const { createUser, fetchDepartments } = useData();

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Error fetching departments:");
      }
    };
    fetchDepartmentsData();
  }, []);

  const handleAddUser = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        department: departments.length > 0 ? departments[0].departmentName : "", // Initialize with the first department, if available
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Remove the 'id' field from each user object
    const usersWithoutIds = users.map(({ id, ...rest }) => rest);

    try {
      const response = await createUser({ users: usersWithoutIds });
      console.log("Users created:", response.data);
      toast.success("User/users created successfully");
      setUsers([initialUser]);
    } catch (error) {
      console.error("Error creating users:", error);
      toast.error("Error creating users:");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-form-container">
        <div className="user-list">
          <h2 style={{ textAlign: "center" }}>Create new user(s)</h2>
          <button className="btn-user" onClick={handleAddUser}>
            Add users
          </button>
          <form onSubmit={handleSubmit}>
            {users.map((user, index) => (
              <div key={user.id} className="user-form">
                <div className="flex-container">
                  <div className="form-group">
                    <label>Firstname:</label>
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
                    <label>Lastname:</label>
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
                    <label>Email:</label>
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
                    <label>Department:</label>
                    <select
                      value={user.department}
                      onChange={(e) =>
                        handleUserChange(index, "department", e.target.value)
                      }
                      className="dept"
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option
                          key={department.id}
                          value={department.departmentName}
                          className="department-option"
                        >
                          {department.departmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="role-label">Role:</label>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUserChange(index, "role", e.target.value)
                      }
                      className="select"
                    >
                      <option value="">Select Role</option>
                      <option value="initiator">Initiator</option>
                      <option value="operations">Operations</option>
                      <option value="ICU">ICU</option>
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
              </div>
            ))}
            <button className="btn-create" type="submit">
              Create Users
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserForm;
