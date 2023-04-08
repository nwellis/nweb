import { readdir } from "node:fs/promises";
import path from "node:path";
import replace from "replace-in-file";

const PreloadFilesRegex = /^(client|hoisted)\.[a-z0-9]+\.js/i;

/**
 * This has had mixed results...
 */
export default (...modulePrefixes) => {
  if (!modulePrefixes.length || true) {
    console.log(`Skipping disable-preload...`);
    return { name: "disable-preload" };
  }

  /** @type {import('astro').AstroIntegration} */
  const integration = {
    name: "disable-preload",
    hooks: {
      "astro:build:done": async ({ dir, routes }) => {
        const astroDir = path.join(dir.pathname, "_astro");
        const files = await readdir(astroDir);
        const preloadingFilepaths = files
          .filter((file) => PreloadFilesRegex.test(file))
          .map((file) => path.join(astroDir, file));
        if (preloadingFilepaths.length === 0) {
          console.error(
            `Failed to find files to disable preload on. Found:\n`,
            files
          );
          return;
        }

        try {
          return await replace({
            files: preloadingFilepaths,
            from: new RegExp(
              `import\\s*["'].*(${modulePrefixes.join(
                "|"
              )}).*\\.[A-Za-z0-9]+\\.js["']`
            ),
            to: `/* disable-preload */`,
          });
        } catch (err) {
          console.error(`Failed to disable preload imports`, err);
        }
      },
    },
  };

  return integration;
};
