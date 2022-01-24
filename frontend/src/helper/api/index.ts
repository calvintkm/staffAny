import axios from "axios";

export const getAxiosInstance = () => {
  console.log("BASE URL", process.env.REACT_APP_API_BASE_URL);
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
};
