# Doars Cricket Academy Web App

Welcome to the official web application for Doars Cricket Academy, West Bengal’s premier cricket training institution. This app provides a modern, interactive, and visually engaging platform for prospective and current students, parents, and cricket enthusiasts to explore programs, learn about the academy, and get in touch.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [Pages Overview](#pages-overview)
- [Authentication](#authentication)
- [Programs Feature](#programs-feature)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Award-winning Animations**: Smooth, modern UI with GSAP and Framer Motion.
- **Magic Cricket Cursor**: Custom animated cursor for a unique user experience.
- **Scroll Progress & Smooth Scrolling**: Interactive scroll bar and smooth navigation.
- **Responsive Navbar & Footer**: Mobile-friendly navigation and information.
- **Dynamic Home Page**: Hero section, stats, features, and call-to-action.
- **Programs Explorer**: Filter, search, and compare cricket training programs.
- **Authentication**: Login and registration with form validation.
- **Newsletter & Contact**: Subscribe and contact forms with feedback.
- **Reusable Components**: Modular design for easy maintenance and scalability.

---

## Screenshots

*(Add screenshots of the Home, Programs, and Auth pages here for visual reference.)*

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
git clone https://github.com/aroy2o/DCA.git
cd DCA
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Project Structure

```
src/
  App.jsx                # Main app component, routing, global providers
  main.jsx               # Entry point
  assets/                # Static assets (images, SVGs)
  components/            # Reusable UI components
    Home/                # Home page-specific components
  constants/             # Shared constants and styles
  data/                  # Static data (e.g., programs)
  pages/                 # Main route pages (Home, Programs, About, Auth, etc.)
  utils/                 # Utility functions (e.g., cricketSounds.js)
  index.css, App.css     # Global and app-specific styles
```

---

## Main Components

- **Navbar**: Responsive navigation with animated effects and authentication awareness.
- **Footer**: Contact info, quick links, newsletter, and social media.
- **ScrollProgress**: Animated progress bar with section indicators.
- **CricketCursor**: Custom animated cursor for cricket-themed interaction.
- **SmoothScrolling**: Enhances scroll experience across the app.
- **Home Page Components**: Hero, Features, Stats, AwardWinningAnimations, Newsletter, etc.
- **Programs Components**: Program cards, filters, comparison, and details.

---

## Pages Overview

- **Home**: Introduction, hero section, stats, features, and call-to-action for trial booking.
- **Programs**: Browse, filter, search, and compare cricket training programs for all age groups and skill levels.
- **Program Detail**: In-depth information about a specific program.
- **About**: Academy history, coaches, success stories, and facilities.
- **Auth**: Login and registration with validation and feedback.

---

## Authentication

- Context-based authentication using React Context API.
- Login and registration forms with validation (email, password, age, etc.).
- Simulated authentication logic (replace with real backend for production).
- Auth state is used to conditionally render navigation and protect routes.

---

## Programs Feature

- **Filter by Age/Type**: Junior, Youth, Adult, Women, Weekend, etc.
- **Search**: Find programs by name, description, or level.
- **Compare**: Select up to 3 programs to compare features side-by-side.
- **Program Details**: Each program has a dedicated detail page.

---

## Tech Stack

- **Frontend**: React, React Router, Framer Motion, GSAP, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

MIT

---

*For any questions or support, please contact the Doars Cricket Academy team via the website contact form.*
