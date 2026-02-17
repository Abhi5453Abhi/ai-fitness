// Propeller Ads Configuration
// Replace these with your actual Zone IDs from Propeller Dashboard

export const PROPELLER_ADS_CONFIG = {
  // Get this from Propeller Dashboard → Ad Zones
  interstitialZoneId: 'YOUR_INTERSTITIAL_ZONE_ID', // After workout
  bannerZoneId: 'YOUR_BANNER_ZONE_ID', // Store page
  nativeBannerZoneId: 'YOUR_NATIVE_BANNER_ZONE_ID', // Dashboard
  
  // Publisher ID (from Account Settings)
  publisherId: 'YOUR_PUBLISHER_ID',
  
  // Feature flags
  enableInterstitial: true,
  enableBanner: true,
  enableNativeBanner: true,
  
  // Frequency controls (in milliseconds)
  interstitialFrequency: 30 * 60 * 1000, // 30 minutes
  lastInterstitialShown: 0,
}

// Check if enough time has passed to show interstitial
export const canShowInterstitial = () => {
  const now = Date.now()
  const timeSinceLastAd = now - PROPELLER_ADS_CONFIG.lastInterstitialShown
  return timeSinceLastAd >= PROPELLER_ADS_CONFIG.interstitialFrequency
}

// Update last shown time
export const updateInterstitialTime = () => {
  PROPELLER_ADS_CONFIG.lastInterstitialShown = Date.now()
}
