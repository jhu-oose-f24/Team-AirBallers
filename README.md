# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install Node.js and Yarn (if not already installed)

1. Before running the project, ensure you have Node.js installed. You can download Node.js from [https://nodejs.org/](https://nodejs.org/) or install it using Node Version Manager or Homebrew

2. Once Node.js is installed, if you don't have yarn, run:

```bash
npm install --global yarn
```

3. Now you can navigate to the project directory and install the required packages with the command:

```bash
yarn
```

## Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Formatting

```bash
yarn format
```

Before committing, run the command above to keep format consistent.

This project uses [prettier](https://github.com/prettier/prettier), along with plugins to [organize imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports) and [format jsdoc](https://github.com/hosseinmd/prettier-plugin-jsdoc).
