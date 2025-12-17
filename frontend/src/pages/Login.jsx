import { useState } from "react";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const loginData = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log(res);
      setForm({ email: "", password: "" });
      alert("login successful");
    } catch (err) {
      console.log("error", err);
      alert("login successful");
    }
  };
  return (
    <form onSubmit={loginData}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Emial</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button type="submit"> Login</button>
    </form>
  );
};

export default Login;
