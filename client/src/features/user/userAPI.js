import { request } from "../../utils/network";

export const loginUser = async (email, password) => {
  try {
    const response = await request({
      method: "post",
      url: "/login",
      data: {
        email,
        password,
      },
    });
    return response.body;
  } catch (e) {
    throw "incorrect username or password";
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await request({
      method: "post",
      url: "/register",
      data: {
        username,
        email,
        password,
      },
    });
  } catch (e) {
    throw "error registering user";
  }
};
