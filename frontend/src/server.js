// using ternary operator to set the server URL based on the environment variable
export const server = import.meta.env.VITE_SERVER
	? import.meta.env.VITE_SERVER
	: "http://localhost:8000/api/v2";

export const backend_url = import.meta.env.VITE_BACKEND_URL
	? import.meta.env.VITE_BACKEND_URL
	: "http://localhost:8000";
