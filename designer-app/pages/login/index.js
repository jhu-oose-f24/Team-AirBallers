"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import { useBodyID } from "@/util/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useBodyID("login");

  const handleLogin = (event) => {
    event.preventDefault();
    if (username && password) {
      // SIMULATE LOG-IN HERE (REPLACE WITH ACTUAL API CALL)
      if (username === "admin" && password === "1234") {
        router.push("/collection"); // EVENTUALLY WE'LL REDIRECT THEM TO THEIR COLLECTION
      } else {
        setError("Invalid username or password.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <Header title="Log In" />
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-blue-500 text-xs self-start mb-[-10px]"
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>

        <Button label="Log In" onClick={handleLogin} size="sm" tint="#3498db" />
        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="sign-up-prompt">
        <span>Don`&apos;`t have an account?</span>
        <Button
          label="Sign Up"
          onClick={() => router.push("/signup")}
          size="xs"
          tint="#3498db"
        />
      </div>
    </div>
  );
}
