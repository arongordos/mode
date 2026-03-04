# Mode

Mode is a lightweight issue tracking application built with Next.js. It allows users to register, authenticate, and manage issues with full CRUD functionality.

## 🙌 Inspiration

This project was built while following the [Next.js Fundamentals, v4](https://frontendmasters.com/courses/next-js-v4/) Frontend Masters course.

## 🚀 Features

- 🔐 User Registration & Authentication
- 📝 Create Issues
- ✏️ Edit / Update Issues
- 🗑️ Delete Issues
- ✨ MCP Server integration

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Frontend Library:** React
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **ORM:** Drizzle ORM

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/arongordos/mode.git
```

Run:

```bash
cd mode
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and configure your environment variables:

```ini
DATABASE_URL=your-database-url
JWT_SECRET=your-super-secret-jwt-key
```

## ▶️ Start the app

To start the app, run:

```bash
npm run dev
```

## 🤖 Setup Claude Desktop

To allow Claude Desktop to interact with this app via MCP, add the following configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "issues-server": {
      "command": "/path/to/node",
      "args": ["/path/to/main.ts"],
      "env": {
        "NODE_OPTIONS": "--no-deprecation",
        "AUTH_TOKEN": "your-auth-token"
      }
    }
  }
}
```

You can locate `claude_desktop_config.json` under Settings → Developer → Edit Config.

Make sure you update the `command` to your Node.js executable path, the `args` to the full path of the file and replace the `AUTH_TOKEN` value with your own valid token.
