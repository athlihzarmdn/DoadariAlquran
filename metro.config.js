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

// Improve resolver configuration
config.resolver.alias = {
  ...config.resolver.alias,
  // Ensure proper resolution of React Native Web
  "react-native": "react-native-web",
};

module.exports = withNativeWind(config, { input: "./global.css" });
