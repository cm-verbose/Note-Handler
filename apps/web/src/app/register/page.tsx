"use client";

import "./login.scss";
import { FormEvent, useState } from "react";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegistration(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await res.json();
    console.log(json);
  }

  return (
    <div className="Register">
      <form action="submit" id="login-prompt" onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
