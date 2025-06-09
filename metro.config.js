const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Clear cache on startup to prevent serialization issues
config.resetCache = true;
config.cacheStores = [];

// Exclude tempobook directories from bundling
config.resolver.blockList = [
  /tempobook\/dynamic\/.*/,
  /tempobook\/storyboards\/.*/,
];

// Configure web platform
config.resolver.platforms = ["ios", "android", "native", "web"];

// Add platform-specific extensions for better resolution
config.resolver.platformExtensions = [
  "web.js",
  "web.ts",
  "web.tsx",
  "js",
  "ts",
  "tsx",
];

// Extend source extensions to include all necessary file types
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "cjs",
  "mjs",
];

// Improve resolver configuration
config.resolver.alias = {
  ...config.resolver.alias,
  // Ensure proper resolution of React Native Web
  "react-native": "react-native-web",
};

// Add resolver to handle native-only modules on web
const originalResolver = config.resolver.resolverMainFields;
config.resolver.resolverMainFields = ["browser", "main", ...originalResolver];

// Add node modules paths to help resolve dependencies
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../node_modules"),
];

// Add custom resolver to block native-only modules on web
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Block react-native-google-mobile-ads and its dependencies on web
  if (
    platform === "web" &&
    (moduleName === "react-native-google-mobile-ads" ||
      moduleName.includes("react-native-google-mobile-ads") ||
      moduleName.includes("codegenNativeCommands") ||
      moduleName.includes("GoogleMobileAds"))
  ) {
    // Return a mock module that exports empty objects
    return {
      type: "sourceFile",
      filePath: path.resolve(
        __dirname,
        "node_modules/react-native-web/dist/index.js",
      ),
    };
  }

  // Use the original resolver for all other cases
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
