# Getting Started

This is a [Node.js](https://nodejs.org/) server with an Express.js API.

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

## Formatting

```bash
yarn format
```

Before committing, run the command above to keep format consistent.

This project uses [prettier](https://github.com/prettier/prettier), along with plugins to [organize imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports) and [format jsdoc](https://github.com/hosseinmd/prettier-plugin-jsdoc).
