import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import NavBar from "./NavBar";
import { useData } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isActive: boolean;
}

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 10; // Number of users to display per page
  const { fetchUsers, toggleActive } = useData();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const users = await fetchUsers();
        const nonAdminUsers = users.filter(
          (user: User) => user.role !== "admin"
        );
        setUsersData(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsersData();
  }, []);

  const handleToggleActive = async (userId: number) => {
    try {
      const response = await toggleActive(userId);
      console.log("User active status toggled:", response);
      toast.success("User activated successfully!");
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user active status:", error);
      toast.error("Error activating/deactivating user!");
    }
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate index range for current page
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = currentPage * usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <NavBar />
      <div className="users-container">
        <h2 style={{ textAlign: "center" }}>Users</h2>
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
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={`action-button ${
                      user.isActive ? "active" : "inactive"
                    }`}
                    onClick={() => handleToggleActive(user.id)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(usersData.length / usersPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Users;
