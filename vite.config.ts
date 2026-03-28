import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8098,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "inject-og-image-url",
      transformIndexHtml(html: string) {
        const fromEnv = process.env.VITE_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "";
        const site =
          fromEnv || (mode === "production" ? "https://naamsplay.games" : "");
        const ogImage = site ? `${site}/og-image.png` : "/og-image.png";
        return html.replaceAll("__OG_IMAGE_URL__", ogImage);
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
