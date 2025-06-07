import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

interface AdMobBannerComponentProps {
  adUnitID?: string;
  bannerSize?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
}

const AdMobBannerComponent: React.FC<AdMobBannerComponentProps> = ({
  adUnitID = "ca-app-pub-5952689957294531/2276644089",
  bannerSize = "banner",
}) => {
  // Only show ads on Android platform
  if (Platform.OS !== "android") {
    return null;
  }

  const handleAdFailedToLoad = (error: any) => {
    console.log("AdMob Banner failed to load:", error);
  };

  const handleAdLoaded = () => {
    console.log("AdMob Banner loaded successfully");
  };

  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize={bannerSize}
        adUnitID={adUnitID}
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={handleAdFailedToLoad}
        onAdViewDidReceiveAd={handleAdLoaded}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
});

export default AdMobBannerComponent;
