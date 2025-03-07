## 📌 Project Overview: Git Resource Viewer

### 1. Project Introduction

**Git Resource Viewer** is a **single-page web app** for previewing image files from a github repository URL.
It is deployed via GitHub Pages and utilizes **Lazy Loading** techniques to efficiently explore all images within a repository.

### 2. Key Features

- **GitHub Repository Image Retrieval**  
  Users can enter a GitHub repository URL to fetch and display all image files stored within that repository.

- **URL Sharing**  
  By utilizing React Hash Router, this project supports static single-page routing, allowing filter settings to be stored in query parameters.
  This ensures that the same view can be recreated when sharing a URL.

- **Image Filtering**  
  Users can filter displayed images by including or excluding specific keywords. (Example: `include -exclude` format)

- **Lazy Loading**  
  The `react-virtualized` library is used to optimize rendering performance by loading only the images currently visible on the screen.

- **GitHub API Request Caching**  
  To prevent functionality from being interrupted due to GitHub’s API rate limit, caching mechanisms are implemented.

- **Support for GitHub Personal Access Tokens**  
  Users can enter their GitHub personal access token to perform authenticated requests, increasing the API request limit.

- **Responsive UI**  
  The application is designed to provide an optimal user experience across different screen sizes.

### 3. Technology Stack & Justification

- **Frontend**: React  
  React’s component-based architecture enhances maintainability and reusability while simplifying state management and event handling.

- **Styling**: Tailwind CSS  
  A utility-first approach enables rapid and intuitive styling, reducing redundant code and improving readability.

- **State Management**: Zustand  
  A lightweight state management library that reduces unnecessary complexity, optimizes performance, and improves maintainability with a simple API.

- **Component Library**: Shadcn  
  Prebuilt UI components accelerate development while ensuring consistent design.

- **Data Caching**: IndexedDB  
  IndexedDB Storage is used for large-scale caching, with localStorage as a fallback for unsupported browsers.

- **Routing**: React Hash Router  
  Hash-based routing ensures seamless navigation in static deployments.

- **Performance Optimization**: Lazy Loading  
  `react-virtualized` optimizes large-scale image rendering, while the Intersection Observer API ensures that only visible images are loaded, improving efficiency.

- **Deployment**: GitHub Pages + CI/CD  
  GitHub Pages allows for long-term static hosting without server management, and GitHub Actions automates the CI/CD pipeline for seamless updates upon commits.

### 4. Project Goals

- **Componentization with React Hooks**: Improve maintainability and reusability by modularizing components effectively.
- **Optimized Responsive Web Design**: Use media queries and Tailwind CSS’s responsive features to ensure optimal UI on various screen sizes.
- **Performance Optimization**: Minimize unnecessary re-renders by leveraging React.memo, useMemo, and useCallback.
- **Web Accessibility Enhancement**: Adhere to ARIA standards to improve accessibility.
- **Semantic Commit Messaging**: Adopt a structured commit message format for better collaboration and code tracking.
- **CI/CD Pipeline Implementation**: Automate deployment and testing with GitHub Actions.

### 5. Future Enhancements

- **PWA (Progressive Web App) Support**: Convert the application into a PWA for installation and offline capabilities.
- **Image Compression & Download**: Enable users to download selected images in a compressed format.
- **Screenshot Capture for Current Image List**: Allow users to capture and save a snapshot of the currently displayed image list.

### 6. Deployment Strategy

- The application is deployed as a static site using GitHub Pages.
- CI/CD automation is implemented via GitHub Actions to facilitate seamless updates.

---

> This document was automatically translated from a Korean-written document.
