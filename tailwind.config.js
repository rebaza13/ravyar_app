/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,css,vue}",],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50', // Primary Green
          dark: '#388E3C',    // Dark Green
          light: '#C8E6C9',   // Light Green
          accent: '#A5D6A7'   // Green Accent
        },
        neutral: {
          white: '#FFFFFF',     // White
          lightGray: '#F5F5F5', // Light Gray
          gray: '#9E9E9E',      // Gray
          darkGray: '#616161'   // Dark Gray
        },
        complementary: {
          yellow: '#FFEB3B',    // Yellow
          orange: '#FF9800',    // Orange
          blue: '#2196F3',      // Blue
          purple: '#9C27B0'     // Purple
        }
      }
    },
  },
  plugins: [],
}

