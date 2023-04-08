import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

const CWD = process.cwd();
const idIncludes = (prefix, ...checks) => {
  const withPrefix = checks.map((check) =>
    [prefix, check].filter(Boolean).join("/")
  );
  return (id) => withPrefix.some((check) => id.includes(check));
};
const nodeModuleIncludes = (...checks) => idIncludes("node_modules", ...checks);
const srcIncludes = (...checks) => idIncludes(`${CWD}/src`, ...checks);

const ChunkNameAndCheck = {
  // Add a trailing slash to match the folder name exactly

  // SRC
  game: srcIncludes("game/"),

  // NODE_MODULES
  "vendor-lodash": nodeModuleIncludes("lodash"),

  "vendor-phaser-dist": nodeModuleIncludes("phaser/dist"),
  "vendor-phaser-config": nodeModuleIncludes("phaser/config"),
  "vendor-phaser-plugins": nodeModuleIncludes(
    "phaser/plugins",
    "phaser3-rex-plugins"
  ),
  "vendor-phaser-scripts": nodeModuleIncludes("phaser/scripts"),
  "vendor-phaser-src": nodeModuleIncludes("phaser/src"),
  "vendor-phaser-types": nodeModuleIncludes("phaser/types"),
  "vendor-phaser-misc": nodeModuleIncludes("phaser"),

  // "vendor": nodeModuleIncludes(""),
};
const ManualChunks = Object.entries(ChunkNameAndCheck).map(([name, check]) => ({
  name,
  check,
}));

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    image(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) =>
            ManualChunks.find(({ check }) => check(id))?.name,
        },
      },
    },
  },

  server: { port: 3003 },
});
