import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx", "resources/css/app.css"],
            refresh: true,
        }),
        react(),
    ],
    server: {
        hmr: {
            host: "localhost",
            // host: '127.0.0.1',
        },
        host: "localhost",
        // host: '127.0.0.1',
        https: false,
        // https: false,
        port: 443,
        // port: 5173,
        proxy: {
            "^(?!(/@vite|/resources|/node_modules|/@react-refresh|/@react-refresh|/@id))":
                {
                    target: "http://localhost:9000",
                    // changeOrigin: true,
                    // target: 'http://127.0.0.1:8000',
                    secure: false,
                },
        },
    },
});
