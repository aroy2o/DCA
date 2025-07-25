// Application Constants - Deprecated
// This file is kept for backward compatibility
// Use src/config/index.js for new constants

import { createContext } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
})

// You can add other constants here if needed, but do not export undefined or missing values.

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080
}
