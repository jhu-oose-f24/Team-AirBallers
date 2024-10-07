"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
        <Link href="/">
            <h1 className="title">TITLE</h1>
        </Link>
      
      <div className="auth-buttons">
        <button className="btn-login">Login/Sign up</button>
      </div>
    </header>
  );
}