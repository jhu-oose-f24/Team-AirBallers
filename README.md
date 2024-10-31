# Team-AirBallers

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The Designer-App (final name TBD) allows you to use AI to generate and be creative with garments given a simple prompt. You can visualize the clothing and edit them as well (WIP). Your creations are saved in collections, which can be customized and organized to your liking (coming soon).

The frontend is designed with figma. Here's a snippet of some components to be used:

![](https://github.com/user-attachments/assets/b1fb76fb-4381-4eac-882e-27e7fd88c65e)

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Rubik, a Google Font.

## Formatting

```bash
yarn format
```

Before committing, run the command above to keep format consistent.

This project uses [prettier](https://github.com/prettier/prettier), along with plugins to [organize imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports) and [format jsdoc](https://github.com/hosseinmd/prettier-plugin-jsdoc).

## Setting up personal dotenv-vault

If you haven't yet been invited to the dotenv-vault for this project, send us a message via slack with your preferred email and we'll invite you to access our .env secrets. On first .env pull, follow the steps below.

1. Make sure to go to the root project directory:

```bash
cd  ../path/to/designer-app
```

2. Then run the following command to log in to the vault from the browser:

```bash
yarn env-login
```

3. There, either sign up or log in, using the email you were invited to the project with. Once logged in, you can close the browser window and follow the last steps [below](#keeping-env-synchronized) to pull the secrets.

## Keeping .env synchronized

Make sure you are in the root project directory:

```bash
cd  ../path/to/designer-app
```

To pull the up-to-date .env, run:

```bash
yarn env-pull
```

And whenever you make changes to the .env file, push the changes to the shared vault by running:

```bash
yarn env-push
```
