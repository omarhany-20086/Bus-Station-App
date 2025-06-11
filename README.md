# Bus Station App

A modern web application for managing bus station operations, built with Next.js and TypeScript.

## 🚀 Features

- Modern UI with Tailwind CSS and Radix UI components
- Type-safe development with TypeScript
- Responsive design
- Form handling with React Hook Form
- Data visualization with Recharts
- Theme support with next-themes
- Comprehensive testing setup with Jest

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form with Zod validation
- **Database:** PostgreSQL
- **Testing:** Jest, React Testing Library
- **Animation:** GSAP
- **Charts:** Recharts
- **Date Handling:** date-fns
- **Package Manager:** pnpm

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/zoz911/Bus-Station-App.git
cd Bus-Station-App
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add necessary environment variables.

## 🚀 Development

To start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

## 📁 Project Structure

```
bus-station-app/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
├── scripts/         # Build and utility scripts
├── styles/          # Global styles
└── __tests__/       # Test files
```

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration

## 🔒 PowerShell Execution Policy

If you encounter issues running `pnpm` commands due to PowerShell's execution policy, you can change the execution policy for the current user by running the following command in PowerShell:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

After running this command, you should be able to use `pnpm` commands.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [zoz911](https://github.com/zoz911)
- [omarhany-20086](https://github.com/omarhany-20086)
