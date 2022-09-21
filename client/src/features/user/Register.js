import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, selectUsername, selectRegisterError } from "./userSlice";
import styles from "./User.module.css";

export function Register() {
  const error = useSelector(selectRegisterError);
  const dispatch = useDispatch();
  const rUsername = useSelector(selectUsername);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.authForm}>
      <h3>Register</h3>
      <input
        placeholder="username"
        maxlength="80"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="email"
        maxlength="254"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        maxlength="60"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(register({ username, email, password }))}>
        Register
      </button>
      <Link to="/login">
        <button>Login</button>
      </Link>
      {rUsername && <span class="success">welcome {rUsername}!</span>}
      {error && <span class="error">{error}</span>}
    </div>
  );
}
