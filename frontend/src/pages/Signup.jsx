import { useState } from "react";
import { signupUser } from "../api/authApi";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const signupData = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);
      console.log("res", res);

      setForm({
        name: "",
        email: "",
        password: "",
      });
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.log("error", err);
      alert("Signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={signupData}>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
