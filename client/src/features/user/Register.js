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
        onChange={(e) => setUsername(e.target.value)}
      />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(register({ username, email, password }))}>
        Register
      </button>
      <Link to="/login">
        <button>Login</button>
      </Link>
      {rUsername && <span>welcome {rUsername}!</span>}
      {error && <span>{error}</span>}
    </div>
  );
}
