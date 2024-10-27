"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form reload
    if (username && password) {
      // Simulate login (replace with actual API call if needed)
      if (username === "admin" && password === "password") {
        router.push("/collection");
      } else {
        setError("Invalid username or password.");
      }
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="login-container">
      <Header title="Login Page" />
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>

      {/* Back Button to Navigate to Home */}
      <button
        className="btn-back mt-4"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
