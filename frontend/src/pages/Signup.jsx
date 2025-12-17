import { useState } from "react";
import { signupUser } from "../api/authApi";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    } catch (err) {
      console.log("error", err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={signupData}>
      <h2>signup</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">email</label>
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
      <button type="submit">signup</button>
    </form>
  );
};

export default Signup;
