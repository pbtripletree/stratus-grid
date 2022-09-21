import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUsername, selectLoginError } from "./userSlice";
import styles from "./User.module.css";

export function Login() {
  const username = useSelector(selectUsername);
  const error = useSelector(selectLoginError);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.authForm}>
      <h3>Login</h3>
      {username.length ? (
        <span>Logged in as: {username}</span>
      ) : (
        [
          <input
            placeholder="email"
            maxlength="254"
            onChange={(e) => setEmail(e.target.value)}
          />,
          <input
            placeholder="password"
            type="password"
            maxlength="60"
            onChange={(e) => setPassword(e.target.value)}
          />,
        ]
      )}
      {!username.length
        ? [
            <button onClick={() => dispatch(login({ email, password }))}>
              Login
            </button>,
            <Link to="/register">
              <button>Register</button>
            </Link>,
          ]
        : [
            <button
              onClick={() => {
                dispatch(logout());
                setEmail("");
                setPassword("");
              }}
            >
              Logout
            </button>,
            <Link to="/discussions">
              <button>Discussions</button>
            </Link>,
          ]}
      {error && <span class="error">{error}</span>}
    </div>
  );
}
