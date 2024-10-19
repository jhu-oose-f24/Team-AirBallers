"use client";

import Link from "next/link";

/**
 * @param {{
 *   title: string;
 * }} props
 * @returns
 */
export default function Header(props) {
  const { title = "TITLE" } = props;

  return (
    <header className="header">
      <Link href="/" scroll={false}>
        <h1 className="title">{title}</h1>
      </Link>

      {/* <div className="auth-buttons">
        <button className="btn-login">Login/Sign up</button>
      </div> */}
    </header>
  );
}
