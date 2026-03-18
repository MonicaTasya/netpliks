import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class", // <--- WAJIB ADA INI
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // ... rest of config
};
export default config;
