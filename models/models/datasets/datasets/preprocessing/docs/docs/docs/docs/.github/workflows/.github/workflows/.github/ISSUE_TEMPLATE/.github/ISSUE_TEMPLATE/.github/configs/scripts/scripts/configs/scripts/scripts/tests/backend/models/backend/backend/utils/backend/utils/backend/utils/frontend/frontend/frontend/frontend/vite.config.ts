import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {

        plugins: [

            react(),

        ],

        resolve: {

            alias: {

                "@": path.resolve(
                    __dirname,
                    "./src",
                ),

            },

        },

        server: {

            host: "0.0.0.0",

            port: Number(
                env.VITE_PORT || 5173
            ),

            open: true,

            proxy: {

                "/api": {

                    target:
                        env.VITE_API_URL
                        || "http://localhost:8000",

                    changeOrigin: true,

                    secure: false,

                },

                "/docs": {

                    target:
                        env.VITE_API_URL
                        || "http://localhost:8000",

                    changeOrigin: true,

                },

                "/openapi.json": {

                    target:
                        env.VITE_API_URL
                        || "http://localhost:8000",

                    changeOrigin: true,

                },

            },

        },

        preview: {

            host: "0.0.0.0",

            port: 4173,

        },

        build: {

            outDir: "dist",

            assetsDir: "assets",

            sourcemap: false,

            minify: "esbuild",

            cssCodeSplit: true,

            emptyOutDir: true,

            chunkSizeWarningLimit: 1000,

            rollupOptions: {

                output: {

                    manualChunks: {

                        react: [

                            "react",

                            "react-dom",

                        ],

                        mui: [

                            "@mui/material",

                            "@mui/icons-material",

                        ],

                    },

                },

            },

        },

        define: {

            __APP_VERSION__: JSON.stringify(
                process.env.npm_package_version
            ),

        },

    };
});
