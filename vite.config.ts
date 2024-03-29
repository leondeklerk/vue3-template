import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		lib: {
			entry: [
				resolve(__dirname, "src/main.ts"),
				resolve(__dirname, "src/views/views.ts"),
				resolve(__dirname, "src/stores/stores.ts"),
				resolve(__dirname, "src/components/components.ts"),
			],
			name: "LeonLibrary",
			fileName: (_format, name) => {
				return `${name}.js`;
			},
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vue", "pinia", "vue-router"],
			output: {
				preserveModules: true,
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	server: {
		port: 8080,
	},
});
