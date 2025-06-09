import { Platform } from "react-native";

class InterstitialAdService {
  private interstitialAd: any = null;
  private isLoaded = false;
  private isLoading = false;
  private lastAdShownTime = 0;
  private readonly MIN_AD_INTERVAL = 30000; // 30 seconds minimum between ads
  private readonly adUnitId = "ca-app-pub-3940256099942544/1033173712"; // Always use test ID

  constructor() {
    if (Platform.OS === "android") {
      this.initializeAd();
    }
  }

  private async initializeAd() {
    if (Platform.OS !== "android" || this.isLoading) return;

    try {
      const {
        InterstitialAd,
        AdEventType,
      } = require("react-native-google-mobile-ads");

      this.interstitialAd = InterstitialAd.createForAdRequest(this.adUnitId, {
        requestNonPersonalizedAdsOnly: false,
      });

      this.isLoading = true;

      // Set up event listeners
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log("Interstitial ad loaded");
        this.isLoaded = true;
        this.isLoading = false;
      });

      this.interstitialAd.addAdEventListener(
        AdEventType.ERROR,
        (error: any) => {
          console.log("Interstitial ad failed to load:", error);
          this.isLoaded = false;
          this.isLoading = false;
          // Retry loading after a delay
          setTimeout(() => this.loadAd(), 5000);
        },
      );

      this.interstitialAd.addAdEventListener(AdEventType.OPENED, () => {
        console.log("Interstitial ad opened");
      });

      this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log("Interstitial ad closed");
        this.isLoaded = false;
        this.lastAdShownTime = Date.now();
        // Preload next ad
        setTimeout(() => this.loadAd(), 1000);
      });

      // Load the ad
      await this.interstitialAd.load();
    } catch (error) {
      console.warn("Failed to initialize interstitial ad:", error);
      this.isLoading = false;
    }
  }

  private async loadAd() {
    if (Platform.OS !== "android" || this.isLoading || this.isLoaded) return;

    try {
      this.isLoading = true;
      await this.interstitialAd?.load();
    } catch (error) {
      console.warn("Failed to load interstitial ad:", error);
      this.isLoading = false;
    }
  }

  public async showAd(): Promise<boolean> {
    if (Platform.OS !== "android") return false;

    // Check if enough time has passed since last ad (AdMob policy compliance)
    const timeSinceLastAd = Date.now() - this.lastAdShownTime;
    if (timeSinceLastAd < this.MIN_AD_INTERVAL) {
      console.log("Too soon to show another ad");
      return false;
    }

    if (!this.isLoaded || !this.interstitialAd) {
      console.log("Interstitial ad not ready");
      return false;
    }

    try {
      await this.interstitialAd.show();
      return true;
    } catch (error) {
      console.warn("Failed to show interstitial ad:", error);
      return false;
    }
  }

  public isAdReady(): boolean {
    return this.isLoaded && Platform.OS === "android";
  }

  public preloadAd() {
    if (!this.isLoaded && !this.isLoading) {
      this.loadAd();
    }
  }
}

// Export singleton instance
export const interstitialAdService = new InterstitialAdService();
