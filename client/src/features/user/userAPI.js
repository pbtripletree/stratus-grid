import { request } from "../../utils/network";

export const loginUser = async (email, password) => {
  const response = await request({
    method: "post",
    url: "/login",
    data: {
      email,
      password,
    },
  });
  if (response.status === 200) return response.body;
  else throw "email or password incorrect";
};

export const registerUser = async (username, email, password) => {
  const response = await request({
    method: "post",
    url: "/register",
    data: {
      username,
      email,
      password,
    },
  });
  if (response.status === 201) return response.body;
  else throw "error creating user";
};
