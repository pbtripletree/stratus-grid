import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../features/user/userSlice";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const request = async function (options) {
  options.headers = {
    ...options.headers,
  };

  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
