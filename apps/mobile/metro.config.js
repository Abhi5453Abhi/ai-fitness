const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Find the project root (monorepo root)
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the monorepo packages folder
config.watchFolders = [monorepoRoot];

// Let Metro know where to find packages
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
];

// Map the shared package to its location
config.resolver.extraNodeModules = {
    "@ai-fitness/shared": path.resolve(monorepoRoot, "packages/shared/src"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
