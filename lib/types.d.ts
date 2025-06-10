// Add TypeScript declarations for our global timeout variables

// Create a new file for global type declarations
interface Window {
  textSizeTimeout: ReturnType<typeof setTimeout> | undefined;
  themeChangeTimeout: ReturnType<typeof setTimeout> | undefined;
}

export interface Station {
  id: string;
  name: string;
  code: string;
  address?: string;
  facilities?: string[];
  status?: "active" | "maintenance" | "closed";
  isAccessible?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
