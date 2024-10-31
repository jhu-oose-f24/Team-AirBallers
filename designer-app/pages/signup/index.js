"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { useBodyID } from "@/util/hooks";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [generalError, setGeneralError] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState([]);

  useBodyID("signup");

  const handleSignup = (event) => {
    event.preventDefault(); // EVENTUALLY WANT TO CHECK THAT EMAIL IS UNIQUE

    if ((!firstName) || (!lastName) || (!email) || (!password) || (!confirmpassword)) {
      setGeneralError("Please fill in all fields.");
      setPasswordErrors([]);
      return;
    }
    if (password != confirmpassword) {
      setGeneralError("Passwords do not match.");
      setPasswordErrors([]);
      return;
    }
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors); // StrongPass123!
      setGeneralError(null);
      return;
    }

    console.log("Account created successfully");
    router.push("/collection"); // EVENTUALLY WE'LL REDIRECT THEM TO AN EMPTY COLLECTION
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 12) {
      errors.push("At least 12 characters"); // TooShort1!
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter"); // weakpass123!
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter"); // WEAKPASS123!
    }
    if (!/\d/.test(password)) {
      errors.push("At least one number"); // StrongPass!@
    }
    if (!/[@$!%*?&#]/.test(password)) {
      errors.push("At least one symbol (e.g., @, $, !, %, *)"); //StrongPass1234
    }
    return errors;
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <Header title="Sign Up" />
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>

          {generalError && (
            <div className="error-message mt-2">{generalError}</div>
          )}
          {passwordErrors.length > 0 && (
            <div className="error-message mt-2">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <button 
            type="button"
            onClick={() => router.push("/login")}
            className="mt-4 text-blue-500 hover:underline"
          >Back to Login</button>
        </form>
      </div>
    </div>
  );
}
