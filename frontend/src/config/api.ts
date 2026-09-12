// Base URL for backend API requests
// In production (Vercel), VITE_API_URL should be set to your backend URL (e.g. https://your-backend.onrender.com)
// In local development, it defaults to http://localhost:4000
export const API_BASE_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:4000"
).replace(/\/$/, "");

// Helper for image URLs
export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};
