// Propeller Ads Configuration
// Using Multitag (All-in-One) - Zone ID: 212033

export const PROPELLER_ADS_CONFIG = {
  // Multitag Zone ID (automatically handles all ad types)
  multitagZoneId: '212033',
  
  // Legacy zone IDs (kept for backward compatibility with existing components)
  interstitialZoneId: '212033', // After workout
  bannerZoneId: '212033', // Store page
  nativeBannerZoneId: '212033', // Dashboard
  
  // Publisher ID
  publisherId: '10621109', // From sw-multitag.js
  
  // Feature flags - Using Multitag in <head>, so disable individual components
  enableInterstitial: false, // Multitag handles this
  enableBanner: false, // Multitag handles this
  enableNativeBanner: false, // Multitag handles this
  
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
