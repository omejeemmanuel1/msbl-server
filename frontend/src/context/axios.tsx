import axios from "axios";

const baseURL = "http://localhost:3000";

export const apiGet = (path: string, options?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...options, // Merge the provided options
  };
  return axios.get(`${baseURL}${path}`, config);
};

export const apiPost = (path: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.post(`${baseURL}${path}`, data, config);
};

export const apiPostWithoutBearer = (path: string, data: any) => {
  return axios.post(`${baseURL}${path}`, data);
};

export const apiPut = (path: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.put(`${baseURL}${path}`, data, config);
};
