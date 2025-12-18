import { useState } from "react";
import { loginUser } from "../api/authApi";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const loginData = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log(res);
      setForm({ email: "", password: "" });
      alert("Login successful");
      navigate("/events");
    } catch (err) {
      console.log("error", err);
      alert("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={loginData}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
