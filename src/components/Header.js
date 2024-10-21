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
      <Link href="/">
          <h1 className="title">{title}</h1>
      </Link>
    </header>
  );
}
