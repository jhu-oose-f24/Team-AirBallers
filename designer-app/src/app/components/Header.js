"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" scroll={false}>
        <h1 className="title">TITLE</h1>
      </Link>

      <div className="auth-buttons">
        <button className="btn-login">Login/Sign up</button>
      </div>
    </header>
  );
}
