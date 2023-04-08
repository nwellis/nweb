import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

const CWD = process.cwd();
const idIncludes = (prefix, ...checks) => {
  const withPrefix = checks.map((check) =>
    [prefix, check].filter(Boolean).join("/")
  );
  return (id) => withPrefix.some((check) => id.includes(check));
};
const nodeModuleIncludes = (...checks) => idIncludes("node_modules", ...checks);
const srcIncludes = (...checks) => idIncludes(`${CWD}/src`, ...checks);
const merge =
  (...checkers) =>
  (id) => {
    return checkers.some((check) => check(id));
  };

const ChunkNameAndCheck = {
  // Add a trailing slash to match the folder name exactly

  "vendor-phaser-core": merge(
    nodeModuleIncludes("phaser/dist"),
    srcIncludes("components/game/demo", "components/game/common")
  ),
  "game-core": srcIncludes("components/game"),

  "vendor-phaser-config": nodeModuleIncludes("phaser/config"),
  "vendor-phaser-plugins": nodeModuleIncludes(
    "phaser/plugins",
    "phaser3-rex-plugins"
  ),
  "vendor-phaser-scripts": nodeModuleIncludes("phaser/scripts"),
  "vendor-phaser-src": nodeModuleIncludes("phaser/src"),
  "vendor-phaser-types": nodeModuleIncludes("phaser/types"),
  "vendor-phaser-misc": nodeModuleIncludes("phaser"),

  "vendor-lodash": nodeModuleIncludes("lodash"),
  // "vendor": nodeModuleIncludes(""),
};

const ManualChunks = Object.entries(ChunkNameAndCheck).map(([name, check]) => ({
  name,
  check,
}));

// https://astro.build/config
export default defineConfig({
  integrations: [
    image(),
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    // disablePreload("vendor-phaser"),
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

  server: {
    port: 3003,
  },
});
