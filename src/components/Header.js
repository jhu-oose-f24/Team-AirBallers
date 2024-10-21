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

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    window.location.reload(); // Trigger a full page reload
  };

  return (
    <header className="header">
      <a href="/" onClick={handleClick}>
        <h1 className="title">{title}</h1>
      </a>
    </header>
  );
}
