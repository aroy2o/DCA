// Application Constants - Deprecated
// This file is kept for backward compatibility
// Use src/config/index.js for new constants

import { 
  APP_CONFIG, 
  CONTACT_INFO, 
  SOCIAL_LINKS, 
  ANIMATION_CONFIG, 
  LAYOUT_CONFIG 
} from '../config/index.js'

// Re-export for backward compatibility
export const APP_NAME = APP_CONFIG.NAME
export const APP_DESCRIPTION = APP_CONFIG.DESCRIPTION

export { CONTACT_INFO, SOCIAL_LINKS }

export const ANIMATION_DURATION = ANIMATION_CONFIG.DURATION
export const LAYOUT_STYLES = {
  container: LAYOUT_CONFIG.CONTAINER,
  section: LAYOUT_CONFIG.SECTION,
  sectionLarge: LAYOUT_CONFIG.SECTION_LARGE
}

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
