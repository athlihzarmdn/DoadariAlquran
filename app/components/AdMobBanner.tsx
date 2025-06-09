import React from "react";
import { View, StyleSheet, Platform } from "react-native";

interface AdMobBannerComponentProps {
  adUnitID?: string;
  bannerSize?: any;
}

// Create a separate component for Android ads to isolate native imports
const AndroidAdBanner: React.FC<AdMobBannerComponentProps> = ({
  adUnitID,
  bannerSize,
}) => {
  try {
    const {
      BannerAd,
      BannerAdSize,
      TestIds,
    } = require("react-native-google-mobile-ads");

    const finalAdUnitID = adUnitID || "ca-app-pub-3940256099942544/9214589741"; // Always use test ID

    const finalBannerSize = bannerSize || BannerAdSize.BANNER;

    const handleAdFailedToLoad = (error: any) => {
      console.log("AdMob Banner failed to load:", error);
    };

    const handleAdLoaded = () => {
      console.log("AdMob Banner loaded successfully");
    };

    return (
      <View style={styles.container}>
        <BannerAd
          unitId={finalAdUnitID}
          size={finalBannerSize}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
        />
      </View>
    );
  } catch (error) {
    console.warn("AdMob not available:", error);
    return null;
  }
};

const AdMobBannerComponent: React.FC<AdMobBannerComponentProps> = (props) => {
  // Early return for non-Android platforms to prevent any native module loading
  if (Platform.OS !== "android") {
    return null;
  }

  // Only render the Android ad component on Android platform
  return <AndroidAdBanner {...props} />;
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
