import userReducer, { login, register, logout } from "./userSlice";

describe("user reducer", () => {
  const initialState = {
    username: "test",
    token: "jwt123",
    status: "idle",
  };

  it("should sign in user", () => {
    const user = { username: "test", token: "jwt123" };
    const action = { type: login.fulfilled.type, payload: user };
    const state = userReducer({ username: "", token: "" }, action);
    expect(state).toEqual({
      status: "idle",
      username: "test",
      token: "jwt123",
    });
  });

  it("should register user", () => {
    const user = { username: "test", token: "jwt123" };
    const action = { type: register.fulfilled.type, payload: user };
    const state = userReducer({ username: "", token: "" }, action);
    expect(state).toEqual({
      status: "idle",
      username: "test",
      token: "jwt123",
    });
  });

  it("should clear user data when logging out", () => {
    const actual = userReducer(initialState, logout());
    expect(actual.username).toEqual("");
    expect(actual.token).toEqual("");
  });
});
