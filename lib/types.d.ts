// Add TypeScript declarations for our global timeout variables

// Create a new file for global type declarations
interface Window {
  textSizeTimeout: ReturnType<typeof setTimeout> | undefined
  themeChangeTimeout: ReturnType<typeof setTimeout> | undefined
}
