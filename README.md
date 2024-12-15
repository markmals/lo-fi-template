# The Lo-Fi Stack

The lowest-friction way to create a web app with great user experience and developer experience.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 💾 SQLite + DrizzleORM
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Copy `.env.example` to `.env` and provide a `DATABASE_URL` with your database file path. The default is `"./database/db.sqlite3"`, which aligns with the Fly.io deployment configurations.

Start the development server:

```bash
bun run dev
```

Your application will be available at `http://localhost:4321`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com) already configured for a simple default starting experience.

## Deployment

This template includes deployment configuration for deploying using Bun and LiteFS on Fly.io.

[Install `flyctl`](https://fly.io/docs/flyctl/install):

```sh
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Create your Fly app:

```sh
fly apps create
```

Attach Consul for LiteFS:

```sh
fly consul attach
```

Deploy your app:

```sh
fly deploy
```

Before using GitHub Actions, you'll need to add an [Actions secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) named `FLY_API_TOKEN`. You can get a value for this by running:

```sh
fly tokens create deploy -x 999999h
```

---

Built with ❤️ using React Router.
