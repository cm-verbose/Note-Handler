"use client";

import { FormEvent, useState } from "react";
import "./login.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const json = await res.json();
        const token = json.access_token;

        localStorage.setItem("accessToken", token);

        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  }

  return (
    <div className="Login">
      <form action="submit" id="login-prompt" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Login</button>
        <p>
          Or <Link href={"/register"}>register</Link>
        </p>
      </form>
    </div>
  );
}
