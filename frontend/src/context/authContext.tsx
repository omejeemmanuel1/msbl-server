import { createContext, useContext } from "react";
import { apiPost, apiGet } from "./axios";

export const dataContext = createContext<undefined | any>(undefined);

const DataProvider = ({ children }: any) => {
  const login = async (user: any) => {
    try {
      const response = await apiPost("/users/login", user);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const createAdmin = async (admin: any) => {
    try {
      const response = await apiPost("/users/create-admin", admin);
      return response.data;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  };

  const createUser = async (user: any) => {
    try {
      const response = await apiPost("/users/create-user", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiGet("/users/fetch-all");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchSingleUser = async (userId: string) => {
    try {
      const response = await apiGet(`/fetchSingleUser/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const createDepartment = async (department: any) => {
    try {
      const response = await apiPost("/department/create-dept", department);
      return response.data;
    } catch (error) {
      console.error("Error creating department:", error);
      throw error;
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await apiGet("/department/all-departments");
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  };

  const toggleActive = async (userId: number) => {
    try {
      const response = await apiPost(`/users/update/${userId}`, userId);
      return response.data;
    } catch (error) {
      console.error("Error toggling user active status:", error);
      throw error;
    }
  };

  return (
    <dataContext.Provider
      value={{
        login,
        fetchSingleUser,
        createAdmin,
        createUser,
        fetchUsers,
        createDepartment,
        fetchDepartments,
        toggleActive,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(dataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
