// API Configuration
export const API_BASE_URL = "http://localhost:8080/api";

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "budget_auth_token",
  USER_DATA: "budget_user_data",
} as const;

// Calendar Configuration
export const CALENDAR_CONFIG = {
  DAYS_OF_WEEK: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  MONTHS: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
} as const;

// Drag and Drop Types
export const DRAG_TYPES = {
  TEMPLATE: "template",
  SCHEDULED: "scheduled",
} as const;

// Recurrence Type Labels
export const RECURRENCE_LABELS = {
  MONTHLY: "Monthly",
  WEEKLY: "Weekly",
  BI_WEEKLY: "Bi-weekly",
  ONE_TIME: "One-time",
} as const;

// Default Values
export const DEFAULTS = {
  STARTING_BALANCE: 0,
  TEMPLATE_AMOUNT: 0,
} as const;

// UI Constants
export const UI = {
  SIDEBAR_WIDTH: "320px",
  CALENDAR_MIN_DAY_HEIGHT: "120px",
  ANIMATION_DURATION: "200ms",
} as const;

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 40,
  },
  TEMPLATE_NAME: {
    MAX_LENGTH: 50,
  },
  AMOUNT: {
    MIN: 0,
    MAX: 999999,
  },
} as const;
