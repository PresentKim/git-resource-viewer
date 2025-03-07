# Git Resource Viewer

A single-page web app for previewing image files from a github repository URL

## 🚀 Features

- Fetches image files (PNG, JPG, GIF, SVG, etc.) from public GitHub repositories
- Displays images in a grid-based gallery
- Supports direct input of GitHub repository URLs
- Lightweight and fast with React and Vite

## 🛠️ Usage

1. Enter the GitHub repository URL in the input field.
2. The app fetches all image files from the repository.
3. View images in the gallery.

## 📌 Project Overview

For more details, refer to the full project overview:

- [📄 PROJECT_OVERVIEW (Korean)](./PROJECT_OVERVIEW.kor.md)
- [📄 PROJECT_OVERVIEW (English)](./PROJECT_OVERVIEW.md)

## 🏗️ Technologies

### Frontend

- **React** (`^19.0.0`) – Modern UI library with concurrent rendering for optimal performance.
- **React-DOM** (`^19.0.0`) – Efficient DOM rendering and hydration support.
- **Vite** (`^6.1.0`) – Fast build tool with HMR (Hot Module Replacement).
- **TypeScript** (`~5.7.2`) – Static type checking for better maintainability and developer experience.

### Styling

- **Tailwind CSS** (`^4.0.6`) – Utility-first CSS framework for rapid UI development.
- **tailwind-merge** (`^3.0.1`) – Smart class merging to avoid conflicts.
- **clsx** (`^2.1.1`) – Conditional class name utility for cleaner component logic.

### Tooling & Code Quality

- **ESLint** (`^9.19.0`) – Enforces code consistency and best practices.

### CI/CD & Deployment

- **GitHub Actions** – Automates build and deployment pipeline to GitHub Pages.
- **GitHub Pages** – Static hosting for the project.

## 📜 License

This project is licensed under the MIT License.
