import { createContext, useContext } from "react";
import { apiPost, apiGet, apiPostWithoutBearer } from "./axios";
import swal from "sweetalert";

export const dataContext = createContext<undefined | any>(undefined);

const DataProvider = ({ children }: any) => {
  const loginAdmins = async (user: any) => {
    try {
      const response = await apiPost("/users/login", user);
      return response.data;
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  const changePassword = async (user: any) => {
    try {
        const changePasswordData = {
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
          confirmPassword: user.confirmPassword
        };
     
        await apiPostWithoutBearer(`/password/change/${user.id}`, changePasswordData)
        .then((response) => {
        console.log(response.data);
      localStorage.setItem("success", response.data);
        swal("ALERT",response.data.message,"success");
       setTimeout(()=>{
        window.location.href = '/login';
      }, 2000)
   });
    } catch (error:any) {
      console.log(error)
      swal("ALERT", error.response.data.error,"error");
    }
  };

  const forgotPassword = async (user: any) => {
    try {
        const forgotPasswordData = {
          email: user.email
        };
       await apiPost(`/password/forgot`, forgotPasswordData).then((response)=>{
        const token  = response.data.token;
       localStorage.setItem("token",token)
      
      swal("OTP sent successfully. Check your mail for instructions to reset your password");
      
       setTimeout(()=>{
        window.location.href = '/verify-otp';
      }, 2000)
   });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const resetPassword = async (user: any) => {
    try {
        const resetPasswordData = {
          newPassword: user.newPassword,
          confirmPassword: user.confirmPassword
        };
       await apiPost(`/password/reset`, resetPasswordData).then((response)=>{
        console.log(response);
      localStorage.setItem("success", response.data);
        swal("Password reset sucessfully");
       setTimeout(()=>{
        window.location.href = '/login';
      }, 2000)
   });
    } catch (error) {
      console.log("Error ", error);
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
        loginAdmins,
        forgotPassword,
        resetPassword,
        changePassword,
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