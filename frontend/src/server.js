// Environment-based configuration
const isDevelopment =
  import.meta.env.DEV || window.location.hostname === "localhost";

// Development configuration
const devConfig = {
  server: "http://localhost:8000/api/v2",
  backend_url: "http://localhost:8000/",
};

// Production configuration
const prodConfig = {
  server: "https://e-shop-umber-seven.vercel.app/api/v2",
  backend_url: "https://e-shop-umber-seven.vercel.app/",
};

// Export the appropriate configuration
const config = isDevelopment ? devConfig : prodConfig;

export const server = config.server;
export const backend_url = config.backend_url;

// For debugging - you can remove this in production
console.log(
  `Using ${isDevelopment ? "development" : "production"} server: ${server}`,
);
