import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path"; // ← adicionar

// Configurações do Vite com adição de alias para facilitar importações estilo "@/components/..." em vez de "../../../components/..."
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ← adicionar
    },
  },
});
